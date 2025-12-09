import { createSelector, createFeatureSelector } from '@ngrx/store';
import { SatelliteState } from '../reducer/satellite.reducer';

export const selectSatelliteState = createFeatureSelector<SatelliteState>('satellite');

export const selectAllSatellites = createSelector(
  selectSatelliteState,
  (state) => state.satellites
);

export const selectSelectedSatelliteId = createSelector(
  selectSatelliteState,
  (state) => state.selectedSatelliteId
);

export const selectSelectedSatellite = createSelector(
  selectAllSatellites,
  selectSelectedSatelliteId,
  (satellites, selectedId) =>
    satellites.find((sat) => sat.id === selectedId) || null
);

export const selectTrackedIds = createSelector(
  selectSatelliteState,
  (state) => state.trackedIds
);

export const selectSatelliteLoading = createSelector(
  selectSatelliteState,
  (state) => state.loading
);

export const selectSatelliteError = createSelector(
  selectSatelliteState,
  (state) => state.error
);

