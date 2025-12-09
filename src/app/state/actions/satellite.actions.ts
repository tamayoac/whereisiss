import { createAction, props } from '@ngrx/store';
import { Satellite } from '../../model/satellite.model';

// Load all tracked satellites
export const loadSatellites = createAction('[Satellite] Load Satellites');

export const loadSatellitesSuccess = createAction(
  '[Satellite] Load Satellites Success',
  props<{ satellites: Satellite[] }>()
);

export const loadSatellitesFailure = createAction(
  '[Satellite] Load Satellites Failure',
  props<{ error: any }>()
);

// Select a satellite to highlight
export const selectSatellite = createAction(
  '[Satellite] Select Satellite',
  props<{ satelliteId: number }>()
);

// Toggle satellite tracking
export const toggleSatelliteTracking = createAction(
  '[Satellite] Toggle Tracking',
  props<{ satelliteId: number; enabled: boolean }>()
);

