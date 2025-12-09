import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {
  N2YOPositionsResponse,
  Satellite,
  SatelliteOption,
  TRACKED_SATELLITES,
} from '../model/satellite.model';
import { ISSLocation } from '../model/iss-location.model';

@Injectable({
  providedIn: 'root',
})
export class SatelliteService {
  private baseUrl = environment.n2yo.baseUrl;
  private apiKey = environment.n2yo.apiKey;
  private issApi = environment.issapi;

  // Default observer location (can be updated)
  private observerLat = 0;
  private observerLng = 0;
  private observerAlt = 0;

  constructor(private http: HttpClient) {}

  /**
   * Get position of a single satellite by NORAD ID
   */
  getSatellitePosition(satId: number): Observable<Satellite | null> {
    const url = `${this.baseUrl}/positions/${satId}/${this.observerLat}/${this.observerLng}/${this.observerAlt}/1&apiKey=${this.apiKey}`;

    return this.http.get<N2YOPositionsResponse>(url).pipe(
      switchMap((response: any) => {
        // N2YO can return HTTP 200 with an error payload; handle ISS fallback
        if (this.isRateLimitPayload(response) && satId === 25544) {
          return this.getIssFallback();
        }
        return of(this.mapToSatellite(response as N2YOPositionsResponse));
      }),
      catchError((error) => {
        if (this.isRateLimitError(error) && satId === 25544) {
          return this.getIssFallback();
        }
        console.error(`Failed to fetch satellite ${satId}:`, error);
        return of(null);
      })
    );
  }

  /**
   * Get positions of multiple satellites
   */
  getMultipleSatellitePositions(satIds: number[]): Observable<Satellite[]> {
    const requests = satIds.map((id) => this.getSatellitePosition(id));

    return forkJoin(requests).pipe(
      map((results) => results.filter((sat): sat is Satellite => sat !== null))
    );
  }

  /**
   * Get all tracked satellites (predefined list)
   */
  getTrackedSatellites(): Observable<Satellite[]> {
    const ids = TRACKED_SATELLITES.map((sat) => sat.id);
    return this.getMultipleSatellitePositions(ids);
  }

  /**
   * Get available satellite options
   */
  getSatelliteOptions(): SatelliteOption[] {
    return TRACKED_SATELLITES;
  }

  /**
   * Map N2YO response to our Satellite model
   */
  private mapToSatellite(response: N2YOPositionsResponse): Satellite | null {
    if (!response || !response.positions || response.positions.length === 0) {
      return null;
    }

    const pos = response.positions[0];
    const option = TRACKED_SATELLITES.find((s) => s.id === response.info.satid);

    return {
      id: response.info.satid,
      name: response.info.satname,
      latitude: pos.satlatitude,
      longitude: pos.satlongitude,
      altitude: pos.sataltitude,
      timestamp: pos.timestamp,
      eclipsed: pos.eclipsed,
      category: option?.category || ('other' as any),
    };
  }

  /**
   * Update observer location (for more accurate azimuth/elevation)
   */
  setObserverLocation(lat: number, lng: number, alt: number = 0): void {
    this.observerLat = lat;
    this.observerLng = lng;
    this.observerAlt = alt;
  }

  /**
   * Fallback to ISS API when N2YO rate limit is exceeded
   */
  private getIssFallback(): Observable<Satellite | null> {
    if (!this.issApi) {
      return of(null);
    }
    return this.http.get<ISSLocation>(this.issApi).pipe(
      map((iss) => ({
        id: 25544,
        name: 'ISS (ZARYA)',
        latitude: iss.latitude,
        longitude: iss.longitude,
        altitude: iss.altitude,
        timestamp: iss.timestamp,
        eclipsed: iss.visibility !== 'daylight',
        category: 'space-stations' as any,
      })),
      catchError((err) => {
        console.error('Fallback ISS fetch failed:', err);
        return of(null);
      })
    );
  }

  private isRateLimitError(error: any): boolean {
    const message =
      (error?.error && (error.error.error || error.error.message)) ||
      error?.message ||
      '';
    return typeof message === 'string' && message.toLowerCase().includes('transactions allowed per hour');
  }

  private isRateLimitPayload(response: any): boolean {
    const message = response?.error || response?.message || '';
    return typeof message === 'string' && message.toLowerCase().includes('transactions allowed per hour');
  }
}

