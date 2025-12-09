import { Injectable, inject } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, timer } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as SatelliteActions from '../actions/satellite.actions';
import { SatelliteService } from '../../services/satellite.service';
import { selectTrackedIds } from '../selectors/satellite.selectors';

const POLL_INTERVAL_MS = 30000; // 30s to respect N2YO free tier limits
const MAX_SATELLITES_PER_POLL = 5;

@Injectable()
export class SatelliteEffects {
  private actions$ = inject(Actions);
  private satelliteService = inject(SatelliteService);
  private store = inject(Store);

  // Load satellites every 5 seconds
  loadSatellites$ = createEffect(() =>
    timer(0, POLL_INTERVAL_MS).pipe(
      withLatestFrom(this.store.select(selectTrackedIds)),
      switchMap(([_, trackedIds]) => {
        const limitedIds = trackedIds.slice(0, MAX_SATELLITES_PER_POLL);
        return this.satelliteService.getMultipleSatellitePositions(limitedIds).pipe(
          map((satellites) =>
            SatelliteActions.loadSatellitesSuccess({ satellites })
          ),
          catchError((error) =>
            of(SatelliteActions.loadSatellitesFailure({ error }))
          )
        );
      })
    )
  );
}
