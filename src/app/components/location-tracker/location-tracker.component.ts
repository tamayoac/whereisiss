import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, combineLatest } from 'rxjs';
import { takeUntil, filter, tap } from 'rxjs/operators';
import { Satellite, SatelliteOption, TRACKED_SATELLITES } from '../../model/satellite.model';
import * as SatelliteActions from '../../state/actions/satellite.actions';
import {
  selectAllSatellites,
  selectSelectedSatellite,
  selectSelectedSatelliteId,
  selectSatelliteLoading,
} from '../../state/selectors/satellite.selectors';
import { MapService } from '../../services/map.service';
import { environment } from '../../../environments/environment.prod';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-location-tracker',
  templateUrl: './location-tracker.component.html',
})
export class LocationTrackerComponent implements OnInit, AfterViewInit, OnDestroy {
  satellites$: Observable<Satellite[]>;
  selectedSatellite$: Observable<Satellite | null>;
  selectedSatelliteId$: Observable<number | null>;
  loading$: Observable<boolean>;

  satelliteOptions: SatelliteOption[] = TRACKED_SATELLITES;
  videoUrl: SafeResourceUrl;

  private destroy$ = new Subject<void>();
  private selectedId: number | null = null;

  constructor(
    private store: Store,
    private mapService: MapService,
    private sanitizer: DomSanitizer
  ) {
    this.satellites$ = this.store.select(selectAllSatellites);
    this.selectedSatellite$ = this.store.select(selectSelectedSatellite);
    this.selectedSatelliteId$ = this.store.select(selectSelectedSatelliteId);
    this.loading$ = this.store.select(selectSatelliteLoading);
    this.videoUrl = this.getSafeUrl(environment.youtubeVideoId);
  }

  ngOnInit(): void {
    this.store.dispatch(SatelliteActions.loadSatellites());
  }

  getSafeUrl(videoId: string | undefined): SafeResourceUrl {
    const url = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngAfterViewInit(): void {
    this.satellites$
      .pipe(takeUntil(this.destroy$))
      .subscribe((satellites) => {
        // Initialize map even if we have no data yet, so container renders.
        if (!this.mapService.isMapInitialized()) {
          const centerSat = satellites.find((s) => s.id === 25544) || satellites[0];
          const lat = centerSat?.latitude ?? 0;
          const lng = centerSat?.longitude ?? 0;
          this.mapService.initializeMap('map', lat, lng);
        }

        if (satellites.length > 0) {
          this.mapService.updateSatellites(satellites);
          // Auto-follow selected satellite when its position updates
          if (this.selectedId !== null) {
            const target = satellites.find((s) => s.id === this.selectedId);
            if (target) {
              this.mapService.centerOn(target.latitude, target.longitude, 3);
            }
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.mapService.removeMap();
    this.destroy$.next();
    this.destroy$.complete();
  }

  selectSatellite(satId: number): void {
    this.selectedId = satId;
    this.store.dispatch(SatelliteActions.selectSatellite({ satelliteId: satId }));
    this.mapService.selectSatellite(satId);
  }

  convertTimestampToDate(timestamp: number): Date {
    return new Date(timestamp * 1000);
  }

  getSatelliteIcon(sat: Satellite | { id: number; category?: string }): string {
    const category = (sat as any).category;
    if (sat.id === 25544) return '🛰️';
    switch (category) {
      case 'space-stations':
        return '🚀';
      case 'weather':
        return '🌤️';
      case 'science':
        return '🔭';
      case 'starlink':
        return '📡';
      default:
        return '🛰️';
    }
  }
}
