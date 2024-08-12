import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, timer } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as ISSActions from '../actions/iss.actions';
import { ISSLocation } from '../../model/iss-location.model';

@Injectable()
export class ISSEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  loadISSLocation$ = createEffect(() =>
    timer(0, 5000).pipe(
      mergeMap(() =>
        this.http.get<ISSLocation>('https://api.wheretheiss.at/v1/satellites/25544').pipe(
          map((response: ISSLocation) =>
            ISSActions.loadISSLocationSuccess({
              latitude: response.latitude,
              longitude: response.longitude,
              velocity: response.velocity,
              altitude: response.altitude,
              timestamp: response.timestamp,
            })
          ),
          catchError(error => of(ISSActions.loadISSLocationFailure({ error })))
        )
      )
    )
  );
}