import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { StationsService } from './stations.service'
import { GoogleMapApiService } from './google-api.service'
import { StationFilterPipe } from './shared/stations-filter.pipe'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StationsComponent } from './stations/stations.component';
import { MapComponent } from './map/map.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdMenuModule, MdCardModule, MdIconModule, MdButtonModule, MdSelectModule } from '@angular/material';
import { MenuComponent } from './menu/menu.component';


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
    MdMenuModule, 
    MdCardModule,
    MdIconModule,
    MdButtonModule,
    MdSelectModule
  ],
  providers: [
    StationsService,
    GoogleMapApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
