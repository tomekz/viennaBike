import { Routes, RouterModule } from '@angular/router';
import { StationsComponent } from './components/stations/stations.component';
import { MapComponent } from './components/map/map.component';

export const routes: Routes = [
  { path: '',  component: StationsComponent },
  { path: 'near',  component: StationsComponent },
  { path: 'plan',     component: MapComponent },
  { path: 'plan/:id',     component: MapComponent }
  
];