import { Component, OnInit } from '@angular/core';
import { StationsService } from '../../services/stations.service';
import { GeolocationService } from '../../services/geolocation.service'
import { StationListItem } from '../../model/Station';


@Component({
  templateUrl: './nearMe.component.html',
  styleUrls: ['./nearMe.component.less']
})
export class NearMeComponent implements OnInit  {
  stationItems: StationListItem[];
  errorMsg: string

  constructor(private stationService: StationsService, private geolocation: GeolocationService) { }

  async ngOnInit() {
     this.geolocation.html5LocationToggled.subscribe((enabled) => {
      if(enabled)
        this.errorMsg = undefined
      else 
        this.errorMsg = this.geolocation.err ? this.geolocation.err.message : 'turn on your HTML5 browser geolocation'     
    })

    let stations = await this.stationService.fetch();
    let position = await this.geolocation.getPosition()
    this.stationItems = this.getStationsNearMe(stations, position) 
  }

   getStationsNearMe(stations, pos){  
    return stations.map( s =>  {
      let distance = this.geolocation.distance(pos.coords.latitude, pos.coords.longitude, s.latitude, s.longitude)
      return new StationListItem({ name: `Station ${s.extra.uid} ${s.name}` , distance : distance.toFixed(1), uid: s.extra.uid} )
    }).sort((a, b) => a.distance - b.distance ).slice(0,10)
   
  }  
}
