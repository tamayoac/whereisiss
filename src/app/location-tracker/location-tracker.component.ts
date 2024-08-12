import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ISSLocation } from '../model/iss-location.model';
import * as fromISS from '../state';
import * as ISSActions from '../state/actions/iss.actions';

@Component({
  selector: 'app-location-tracker',
  standalone: true,
  imports: [],
  templateUrl: './location-tracker.component.html',
  styleUrl: './location-tracker.component.scss'
})
export class LocationTrackerComponent implements OnInit {
  issLocation$: Observable<ISSLocation>;

  constructor(private store: Store<fromISS.ISSState>) {
    this.issLocation$ = this.store.select(fromISS.selectISSLocation);
  }

  ngOnInit(): void {
    this.store.dispatch(ISSActions.loadISSLocation());
  }
}
