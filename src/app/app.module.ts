import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects'
import { issReducer } from './state/reducer/iss.reducer';
import { ISSEffects } from './state/effects/iss.effects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocationTrackerComponent } from './components/location-tracker/location-tracker.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { ISSLocationService } from './services/iss-location.service';

@NgModule({
  declarations: [
    AppComponent,
    LocationTrackerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({ iss: issReducer }),
    EffectsModule.forRoot([ISSEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
  ],
  providers: [ISSLocationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
