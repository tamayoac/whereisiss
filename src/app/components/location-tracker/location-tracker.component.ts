import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { ISSLocation } from '../../model/iss-location.model';
import * as ISSActions from '../../state/actions/iss.actions';
import * as fromISS from '../../state';
import { environment } from '../../../environments/environment'; 
import * as mapboxgl from 'mapbox-gl';
import { selectISSLocation } from '../../state/selectors/iss.selectors';

@Component({
  selector: 'app-location-tracker',
  templateUrl: './location-tracker.component.html',
})
export class LocationTrackerComponent implements OnInit, AfterViewInit, OnDestroy {
  issLocation$: Observable<ISSLocation>;
  map!: mapboxgl.Map;
  marker!: mapboxgl.Marker;
  private destroy$ = new Subject<void>();
  

  constructor(private store: Store<fromISS.ISSState>) {
    this.issLocation$ = this.store.select(selectISSLocation).pipe(
      filter((location): location is ISSLocation => location !== null)
    );
  }
  ngOnInit(): void {
    this.store.dispatch(ISSActions.loadISSLocation());
  }

  ngAfterViewInit(): void {
    this.issLocation$
      .pipe(takeUntil(this.destroy$))
      .subscribe(location => {
        if (!this.map) {
          this.map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [location.longitude, location.latitude],
            zoom: 2,
            accessToken: environment.mapbox.accessToken
          });

          this.map.addControl(new mapboxgl.NavigationControl());

          const markerElement = document.createElement('div');
          markerElement.className = 'custom-marker';
          markerElement.style.backgroundImage = 'url("assets/iss.svg")';
          markerElement.style.width = '50px';
          markerElement.style.height = '50px';
          markerElement.style.backgroundSize = 'contain';

          this.marker = new mapboxgl.Marker({
            element: markerElement,
            anchor: 'center'
          })
            .setLngLat([location.longitude, location.latitude])
            .addTo(this.map);
        } else {
          this.marker.setLngLat([location.longitude, location.latitude]);
          this.map.setCenter([location.longitude, location.latitude]);
        }
      });
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
    this.destroy$.next();
    this.destroy$.complete();
  }
  convertTimestampToDate(timestamp: number): Date {
    return new Date(timestamp * 1000); // Convert from seconds to milliseconds
  }
}