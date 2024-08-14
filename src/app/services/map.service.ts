import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private map!: mapboxgl.Map;
  private marker!: mapboxgl.Marker;

  initializeMap(containerId: string, latitude: number, longitude: number): mapboxgl.Map {
    this.map = new mapboxgl.Map({
      container: containerId,
      style: 'mapbox://styles/yamatoac/clzucus2900hc01ra4g8g2b92',
      center: [longitude, latitude],
      zoom: 2,
      accessToken: environment.mapbox.accessToken,
    });
   
    this.map.addControl(new mapboxgl.NavigationControl());
    this.addMarker(latitude, longitude);
    this.map.on('load', () => {
      this.resizeMap();
    });
    return this.map;
  }

  private addMarker(latitude: number, longitude: number): void {
    const markerElement = document.createElement('div');
    markerElement.className = 'custom-marker';
    markerElement.style.backgroundImage = 'url("assets/iss.svg")';
    markerElement.style.width = '50px';
    markerElement.style.height = '50px';
    markerElement.style.backgroundSize = 'contain';

    this.marker = new mapboxgl.Marker({
      element: markerElement,
      anchor: 'center',
    })
      .setLngLat([longitude, latitude])
      .addTo(this.map);
  }

  updateMarkerPosition(latitude: number, longitude: number): void {
    if (this.marker) {
      this.marker.setLngLat([longitude, latitude]);
      this.map.setCenter([longitude, latitude]);
    }
  }

  removeMap(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  isMapInitialized(): boolean {
    return !!this.map;
  }

  resizeMap(): void {
    if (this.map) {
      this.map.resize();
    }
  }
}