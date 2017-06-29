import { BrowserModule } from '@angular/platform-browser';
import { NgModule  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { StationsService } from './services/stations.service'
import { GeolocationService } from './services/geolocation.service'
import { GoogleMapApiService } from './services/google-api.service'
import { StationFilterPipe } from './pipes/stations-filter.pipe'
import { AppRoutingModule } from './app-routing.module';
import { MenuComponent } from './components/menu/menu.component';
import { AppComponent } from './components/app.component';
import { StationsComponent } from './components/stations/stations.component';
import { MapComponent } from './components/map/map.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module'; 

@NgModule({
  declarations: [
    AppComponent,
    StationsComponent,
    MapComponent,
    StationFilterPipe,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    StationsService,
    GoogleMapApiService,
    GeolocationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
