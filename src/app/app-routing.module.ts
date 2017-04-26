import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StationsComponent } from './stations/stations.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  { path: '', redirectTo: '/stations', pathMatch: 'full' },
  { path: 'stations',  component: StationsComponent },
  { path: 'map',     component: MapComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
