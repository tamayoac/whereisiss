import { Injectable } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { of, timer } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as ISSActions from '../actions/iss.actions';
import { ISSLocation } from '../../model/iss-location.model';
import { ISSLocationService } from '../../services/iss-location.service';
@Injectable()
export class ISSEffects {

constructor(private issLocationService: ISSLocationService) {}
loadISSLocation$ = createEffect(() =>
  timer(0, 5000).pipe(
    switchMap(() => {
      return this.issLocationService.getLocation().pipe(
        map((response: ISSLocation) => {
          return ISSActions.loadISSLocationSuccess({ issLocation: response });
        }),
        catchError((error) => {
          return of(ISSActions.loadISSLocationFailure({ error }));
        })
      );
    })
  )
);
}