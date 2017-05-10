import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { StationsService } from './stations.service'
import { GoogleApiService } from './google-api.service'
import { StationFilterPipe } from './shared/stations-filter.pipe'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StationsComponent } from './stations/stations.component';
import { MapComponent } from './map/map.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdMenuModule, MdCardModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    StationsComponent,
    MapComponent,
    StationFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MdMenuModule, 
    MdCardModule
  ],
  providers: [
    StationsService,
    GoogleApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
