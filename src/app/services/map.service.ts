import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../environments/environment';
import { Satellite, SatelliteCategory } from '../model/satellite.model';

interface MarkerData {
  marker: mapboxgl.Marker;
  popup: mapboxgl.Popup;
}

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private map!: mapboxgl.Map;
  private markers: Map<number, MarkerData> = new Map();
  private selectedSatelliteId: number | null = null;

  initializeMap(containerId: string, latitude: number, longitude: number): mapboxgl.Map {
    this.map = new mapboxgl.Map({
      container: containerId,
      style: 'mapbox://styles/yamatoac/clzucus2900hc01ra4g8g2b92',
      center: [longitude, latitude],
      zoom: 1.5,
      accessToken: environment.mapbox.accessToken,
    });

    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.on('load', () => {
      this.resizeMap();
    });
    return this.map;
  }

  /**
   * Update all satellite markers on the map
   */
  updateSatellites(satellites: Satellite[]): void {
    const currentIds = new Set(satellites.map((s) => s.id));

    // Remove markers for satellites no longer tracked
    this.markers.forEach((_, id) => {
      if (!currentIds.has(id)) {
        this.removeMarker(id);
      }
    });

    // Add or update markers
    satellites.forEach((sat) => {
      if (this.markers.has(sat.id)) {
        this.updateMarker(sat);
      } else {
        this.addSatelliteMarker(sat);
      }
    });
  }

  /**
   * Add a new satellite marker
   */
  private addSatelliteMarker(satellite: Satellite): void {
    const el = this.createMarkerElement(satellite);
    const popup = this.createPopup(satellite);

    const marker = new mapboxgl.Marker({
      element: el,
      anchor: 'center',
    })
      .setLngLat([satellite.longitude, satellite.latitude])
      .setPopup(popup)
      .addTo(this.map);

    // Click handler to select satellite
    el.addEventListener('click', () => {
      this.selectSatellite(satellite.id);
    });

    this.markers.set(satellite.id, { marker, popup });
  }

  /**
   * Update existing marker position and popup
   */
  private updateMarker(satellite: Satellite): void {
    const data = this.markers.get(satellite.id);
    if (!data) return;

    data.marker.setLngLat([satellite.longitude, satellite.latitude]);
    data.popup.setHTML(this.getPopupContent(satellite));
  }

  /**
   * Remove a marker
   */
  private removeMarker(satId: number): void {
    const data = this.markers.get(satId);
    if (data) {
      data.marker.remove();
      this.markers.delete(satId);
    }
  }

  /**
   * Create marker DOM element
   */
  private createMarkerElement(satellite: Satellite): HTMLDivElement {
    const el = document.createElement('div');
    el.className = 'satellite-marker';
    el.style.width = '36px';
    el.style.height = '36px';
    el.style.backgroundSize = 'contain';
    el.style.backgroundRepeat = 'no-repeat';
    el.style.backgroundPosition = 'center';
    el.style.cursor = 'pointer';
    el.style.transition = 'transform 0.2s ease';

    // Set icon based on category
    const icon = this.getIconForCategory(satellite);
    el.style.backgroundImage = `url("assets/${icon}.svg")`;

    // Highlight ISS
    if (satellite.id === 25544) {
      el.style.width = '48px';
      el.style.height = '48px';
    }

    return el;
  }

  /**
   * Get icon name based on satellite category
   */
  private getIconForCategory(satellite: Satellite): string {
    if (satellite.id === 25544) return 'iss';
    switch (satellite.category) {
      case SatelliteCategory.SPACE_STATIONS:
        return 'station';
      case SatelliteCategory.WEATHER:
        return 'weather-sat';
      case SatelliteCategory.SCIENCE:
        return 'science-sat';
      case SatelliteCategory.STARLINK:
        return 'starlink';
      default:
        return 'satellite';
    }
  }

  /**
   * Create popup for satellite
   */
  private createPopup(satellite: Satellite): mapboxgl.Popup {
    return new mapboxgl.Popup({
      offset: 25,
      closeButton: false,
      className: 'satellite-popup',
    }).setHTML(this.getPopupContent(satellite));
  }

  /**
   * Get popup HTML content
   */
  private getPopupContent(satellite: Satellite): string {
    return `
      <div style="font-family: system-ui, sans-serif; padding: 6px 6px 4px;">
        <strong style="color: #34d399; letter-spacing: 0.01em;">${satellite.name}</strong>
        <div style="font-size: 11px; color: #a7f3d0; margin-top: 4px;">
          Alt: ${satellite.altitude.toFixed(1)} km
        </div>
      </div>
    `;
  }

  /**
   * Select a satellite and center map on it
   */
  selectSatellite(satId: number): void {
    this.selectedSatelliteId = satId;
    const data = this.markers.get(satId);
    if (data) {
      const lngLat = data.marker.getLngLat();
      this.map.flyTo({
        center: [lngLat.lng, lngLat.lat],
        zoom: 3,
        duration: 1000,
      });
      data.popup.addTo(this.map);
    }
  }

  /**
   * Get currently selected satellite ID
   */
  getSelectedSatelliteId(): number | null {
    return this.selectedSatelliteId;
  }

  /**
   * Center map on coordinates
   */
  centerOn(lat: number, lng: number, zoom?: number): void {
    this.map.flyTo({
      center: [lng, lat],
      zoom: zoom || this.map.getZoom(),
      duration: 800,
    });
  }

  removeMap(): void {
    if (this.map) {
      this.markers.forEach((data) => data.marker.remove());
      this.markers.clear();
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

  // Legacy support for single marker (ISS only mode)
  updateMarkerPosition(latitude: number, longitude: number): void {
    const issMarker = this.markers.get(25544);
    if (issMarker) {
      issMarker.marker.setLngLat([longitude, latitude]);
      this.map.setCenter([longitude, latitude]);
    }
  }
}
