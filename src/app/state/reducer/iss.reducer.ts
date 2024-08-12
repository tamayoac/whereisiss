import { createReducer, on } from '@ngrx/store';
import * as ISSActions from '../actions/iss.actions';
import { ISSLocation } from '../../model/iss-location.model';
export interface ISSState {
    dataContent: ISSLocation;
    error: any;
  }

  export const initialState: ISSState = {
    dataContent: {
      latitude: 0,
      longitude: 0,
      velocity: 0,
      altitude: 0,
      timestamp: 0,
    },
    error: null,
  };

  export const issReducer = createReducer(
    initialState,
    on(ISSActions.loadISSLocationSuccess, (state, { latitude, longitude, velocity, altitude, timestamp }) => ({
      ...state,
      dataContent: {
        latitude,
        longitude,
        velocity,
        altitude,
        timestamp,
      },
      error: null,
    })),
    on(ISSActions.loadISSLocationFailure, (state, { error }) => ({
      ...state,
      error,
    }))
  );