import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapissComponent } from './mapiss.component';

describe('MapissComponent', () => {
  let component: MapissComponent;
  let fixture: ComponentFixture<MapissComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapissComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapissComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
