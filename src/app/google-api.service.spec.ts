import { TestBed, inject } from '@angular/core/testing';
import { GoogleMapApiService } from './google-api.service';

describe('GoogleApiService', () => {

const API_KEY = 'AIzaSyCd-J7Qkn0OV7HgGCEERozyc9j_bN_4qFM';
const url = 'https://maps.googleapis.com/maps/api/js?key='+ API_KEY +'&callback=initMap';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleMapApiService]
    });
  });

  it('should init map', inject([GoogleMapApiService], (service: GoogleMapApiService) => {

    service.initMap().then(() => {  
        expect(document.getElementsByTagName('script')[0].src).toEqual(url);  //google maps script source inserted
        expect(typeof window['initMap']).toBe('function'); // google maps callback inserted
    })
  }));
});
