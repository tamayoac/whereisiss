import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { ISSLocation } from '../../model/iss-location.model';
import * as ISSActions from '../../state/actions/iss.actions';
import * as fromISS from '../../state';
import * as mapboxgl from 'mapbox-gl';
import { selectISSLocation } from '../../state/selectors/iss.selectors';
import { MapService } from '../../services/map.service';
import { environment } from '../../../environments/environment.prod';
@Component({
  selector: 'app-location-tracker',
  templateUrl: './location-tracker.component.html',
})
export class LocationTrackerComponent implements OnInit, AfterViewInit, OnDestroy {
  issLocation$: Observable<ISSLocation>;
  map!: mapboxgl.Map;
  marker!: mapboxgl.Marker;
  videoUrl: string;
  private destroy$ = new Subject<void>();
  

  constructor(private store: Store<fromISS.ISSState>, private mapService: MapService ) {
    this.issLocation$ = this.store.select(selectISSLocation).pipe(
      filter((location): location is ISSLocation => location !== null)
    );
    this.videoUrl = this.getSafeUrl(environment.youtubeVideoId);
  }
  ngOnInit(): void {
    this.store.dispatch(ISSActions.loadISSLocation());
  }
  getSafeUrl(videoId: string | undefined): string {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
  }
  ngAfterViewInit(): void {
    this.issLocation$
      .pipe(takeUntil(this.destroy$))
      .subscribe(location => {
        if (!this.mapService.isMapInitialized()) {
          this.mapService.initializeMap('map', location.latitude, location.longitude);
        } else {
          this.mapService.updateMarkerPosition(location.latitude, location.longitude);
        }
      });
  }

  ngOnDestroy(): void {
    this.mapService.removeMap();
    this.destroy$.next();
    this.destroy$.complete();
  }
  convertTimestampToDate(timestamp: number): Date {
    return new Date(timestamp * 1000);
  }
}