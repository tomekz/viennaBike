import { Component, OnInit, OnDestroy } from '@angular/core';
import { StationsService } from '../../services/stations.service';
import { GeolocationService } from '../../services/geolocation.service'
import { Station } from '../../model/Station';
import { StationFilter } from '../../model/StationFilter';
import { Router  } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/takeUntil';

@Component({
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.less']
})
export class StationsComponent implements OnDestroy, OnInit  {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  stations: Station[];
  filter: StationFilter = new StationFilter();
  bezirks = [1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20];
  bikeCounts = Array.from(Array(20).keys());
  errorMsg: string

  constructor(private service: StationsService, private geolocation: GeolocationService, private router: Router) { }

  ngOnInit() {

    this.geolocation.html5LocationToggled.subscribe((position) => {
      if(this.isThisNearMeRoute()){
        if(position){
          this.stations = this.getStationsNearMe(position)
          this.errorMsg = undefined
        } else {
          this.errorMsg = this.geolocation.err ? this.geolocation.err.message : 'turn on your HTML5 browser geolocation'
        }
      }
    })

    this.service.fetchObservable()
                .takeUntil(this.ngUnsubscribe)
                .subscribe(
                  (data) => { 
                    this.stations = data 
                    if(this.isThisNearMeRoute())
                      this.geolocation.getPosition()
                      .catch((err) => console.log(err))
                  });
  }

  getStationsNearMe(position){
    const RANGE = 1 // get stations in 1 km range
    let myLat = position.coords.latitude
    let myLon = position.coords.longitude
     
    return this.stations.filter( s => this.geolocation.distance(myLat, myLon, s.latitude, s.longitude) < RANGE)
    
  }

  isThisNearMeRoute(){
    return this.router.url === '/near'
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.unsubscribe();
  }

  
}
