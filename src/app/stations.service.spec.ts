
import {} from 'jasmine'
import { TestBed, inject } from '@angular/core/testing';
import { StationsService } from './stations.service';
import { StationsComponent } from './components/stations/stations.component'
import { Observable } from 'rxjs/Rx'
import { Station }  from './model/Station'
import data from './components/stations/fake-stations' 

describe('StationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StationsService]
    });
  });

  it('should ...', inject([StationsService], (service: StationsService) => {
    expect(service).toBeTruthy();
  }));
});
