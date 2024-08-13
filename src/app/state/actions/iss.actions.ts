import { createAction, props } from '@ngrx/store';
import { ISSLocation } from '../../model/iss-location.model'
export const loadISSLocation = createAction(
  '[ISS API] Load ISS Location'
);

export const loadISSLocationSuccess = createAction(
  '[ISS] Load Location Success',
  props<{ issLocation: ISSLocation }>()
);

export const loadISSLocationFailure = createAction(
  '[ISS] Load Location Failure',
  props<{ error: any }>()
);