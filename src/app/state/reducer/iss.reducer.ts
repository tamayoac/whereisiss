import { createReducer, on } from '@ngrx/store';
import * as ISSActions from '../actions/iss.actions';
import { ISSLocation } from '../../model/iss-location.model';
export interface ISSState {
    issLocation: ISSLocation | null;
    error: any;
  }

  export const initialState: ISSState = {
    issLocation: null,
    error: null,
  };

  export const issReducer = createReducer(
    initialState,
    on(ISSActions.loadISSLocationSuccess, (state, { issLocation }) => {
      console.log('Reducer received issLocation:', issLocation); 
      return {
        ...state,
        issLocation: issLocation,
        error: null,
      }
    }),
    on(ISSActions.loadISSLocationFailure, (state, { error }) => ({
      ...state,
      error,
    })),
  );