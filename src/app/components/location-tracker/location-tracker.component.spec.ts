import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationTrackerComponent } from './location-tracker.component';

describe('LocationTrackerComponent', () => {
  let component: LocationTrackerComponent;
  let fixture: ComponentFixture<LocationTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationTrackerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
