import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement }    from '@angular/core';
import { By }              from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { GoogleMapApiService} from '../../services/google-api.service';
import { StationsService} from '../../services/stations.service';
import { MapComponent } from './map.component';
import { HttpModule } from '@angular/http';
import { Station } from '../../model/Station';
import fakeStations from '../stations/fake-stations' 



describe('MapComponent', () => {
  let component: MapComponent;
  let debugElement: DebugElement;
  let fixture: ComponentFixture<MapComponent>;
  let initMapSpy: any;
  let stationsSpy: any;
  const stations: Station[] = fakeStations.network.stations.map(s => new Station(s))

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, RouterTestingModule],
      providers: [GoogleMapApiService, StationsService],
      declarations: [ MapComponent ]
    })
    .compileComponents()
    .then(() => {
        fixture = TestBed.createComponent(MapComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        let googleMapApiService = fixture.debugElement.injector.get(GoogleMapApiService);
        let stationsService = fixture.debugElement.injector.get(StationsService);
        initMapSpy = spyOn(googleMapApiService, 'initMap').and.returnValue(Promise.resolve());
        stationsSpy = spyOn(stationsService, 'fetch').and.returnValue(Promise.resolve(stations));
    }); 
  }));

  it('should create ', () => {
    expect(component).toBeTruthy();
  });

  it('should have a map-container and map placeholder', () => {
    let container = debugElement.query(By.css('.map-container'));
    let placeholder = debugElement.query(By.css('#map'));
    expect(container).toBeTruthy();
    expect(placeholder).toBeTruthy();
  });

  it('should init map after component initialized', () => {
     fixture.detectChanges();
     expect(initMapSpy.calls.any()).toBe(true, 'initMap called');
  });

  it('should not fetch data until initMap finished(resolved)', () => {
     fixture.detectChanges();
     expect(initMapSpy.calls.any()).toBe(true, 'initMap called');
     expect(stationsSpy.calls.any()).toBe(false, 'fetch must await for initMap to be resolved');
     
  });

  it('should init map with markers', async(() => {
     fixture.detectChanges();
     fixture.whenStable().then(() => { // wait for initMap and fetch stations to finish             
      expect(component.markers.length).toBe(121);
    });
  }));

});
