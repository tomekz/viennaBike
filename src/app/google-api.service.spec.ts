import { TestBed, inject } from '@angular/core/testing';

import { GoogleMapApiService } from './google-api.service';

describe('GoogleApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleMapApiService]
    });
  });

  it('should ...', inject([GoogleMapApiService], (service: GoogleMapApiService) => {
    expect(service).toBeTruthy();
  }));
});
