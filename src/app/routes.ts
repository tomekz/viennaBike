import { Routes, RouterModule } from '@angular/router';
import { StationsComponent } from './components/stations/stations.component';
import { MapComponent } from './components/map/map.component';
import { NearMeComponent } from './components/nearMe/nearMe.component';

export const routes: Routes = [
  { path: '',  component: StationsComponent },
  { path: 'near',  component: NearMeComponent },
  { path: 'plan',     component: MapComponent },
  { path: 'plan/:id',     component: MapComponent }
];
