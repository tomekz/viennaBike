import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StationsComponent } from './stations/stations.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  { path: '',  component: StationsComponent },
  { path: 'plan',     component: MapComponent },
  { path: 'plan/:id',     component: MapComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
