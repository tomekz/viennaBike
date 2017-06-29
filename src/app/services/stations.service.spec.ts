
import {} from 'jasmine'
import { TestBed, inject } from '@angular/core/testing';
import { StationsService } from './stations.service';
import { StationsComponent } from '.././components/stations/stations.component'
import { HttpModule,Http,Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Observable } from 'rxjs/Rx'
import { Station }  from '.././model/Station'
import fakeStations from '.././components/stations/fake-stations' 

describe('StationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [StationsService, { provide: XHRBackend, useClass: MockBackend }]
    });
  });

 it('should return an Observable<Array<Station>>',
        inject([StationsService, XHRBackend], (stationsService, mockBackend) => {

        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(fakeStations)
          })));
        });

        stationsService.fetchObservable().subscribe((stations) => {
          expect(stations.length).toBe(121);
          expect(stations[0].name).toEqual('Hoher Markt');
          expect(stations[0].free_bikes).toEqual(16);
        });
    }));
});
