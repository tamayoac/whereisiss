import { createReducer, on } from '@ngrx/store';
import * as SatelliteActions from '../actions/satellite.actions';
import { Satellite, TRACKED_SATELLITES } from '../../model/satellite.model';

export interface SatelliteState {
  satellites: Satellite[];
  selectedSatelliteId: number | null;
  trackedIds: number[];
  loading: boolean;
  error: any;
}

export const initialState: SatelliteState = {
  satellites: [],
  selectedSatelliteId: 25544, // ISS by default
  trackedIds: TRACKED_SATELLITES.map((s) => s.id),
  loading: false,
  error: null,
};

export const satelliteReducer = createReducer(
  initialState,

  on(SatelliteActions.loadSatellites, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(SatelliteActions.loadSatellitesSuccess, (state, { satellites }) => ({
    ...state,
    satellites,
    loading: false,
    error: null,
  })),

  on(SatelliteActions.loadSatellitesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(SatelliteActions.selectSatellite, (state, { satelliteId }) => ({
    ...state,
    selectedSatelliteId: satelliteId,
  })),

  on(SatelliteActions.toggleSatelliteTracking, (state, { satelliteId, enabled }) => ({
    ...state,
    trackedIds: enabled
      ? [...state.trackedIds, satelliteId]
      : state.trackedIds.filter((id) => id !== satelliteId),
  }))
);

