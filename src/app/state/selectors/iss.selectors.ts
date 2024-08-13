import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ISSState } from '../reducer/iss.reducer';

export const selectISSState = createFeatureSelector<ISSState>('iss');

export const selectISSLocation = createSelector(
  selectISSState,
  (state: ISSState) => state.issLocation
);

export const selectISSError = createSelector(
  selectISSState,
  (state: ISSState) => state.error
);