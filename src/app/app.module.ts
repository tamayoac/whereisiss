import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { issReducer } from './state/reducer/iss.reducer';
import { ISSEffects } from './state/effects/iss.effects';
import { satelliteReducer } from './state/reducer/satellite.reducer';
import { SatelliteEffects } from './state/effects/satellite.effects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocationTrackerComponent } from './components/location-tracker/location-tracker.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { ISSLocationService } from './services/iss-location.service';
import { SatelliteService } from './services/satellite.service';

@NgModule({
  declarations: [
    AppComponent,
    LocationTrackerComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({
      iss: issReducer,
      satellite: satelliteReducer
    }),
    EffectsModule.forRoot([ISSEffects, SatelliteEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
  ],
  providers: [ISSLocationService, SatelliteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
