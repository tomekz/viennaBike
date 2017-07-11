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
  isLoading: boolean = true

  constructor(private stationService: StationsService, private geolocation: GeolocationService) { }

  async ngOnInit() {
    this.geolocation.html5LocationToggled.subscribe((err) => {
      if(err){
        switch(err.code){
          case 1: this.errorMsg = 'Turn on your geolocation service '
                  break
          case 2: this.errorMsg = `Currently it's not possible to locate your position`
                  break
          default: this.errorMsg = 'There was an error retrieving your location'
        }
        this.isLoading = false
        return
      }
    })

    try{
      let position = await this.geolocation.getPosition()
      let stations = await this.stationService.fetch();
      this.stationItems = await this.getStationsNearMe(stations, position)
    }
    catch(err){
      this.errorMsg = err
    }
    finally{
      this.isLoading = false
    }
  }

   getStationsNearMe(stations, pos){
    return new Promise<StationListItem[]>((resolve, reject) => {
      let res = stations.map( s =>  {
        let distance = this.geolocation.distance(pos.coords.latitude, pos.coords.longitude, s.latitude, s.longitude)
        return new StationListItem({ name: `Station ${s.extra.uid} ${s.name}` , distance : distance.toFixed(1), uid: s.extra.uid} )
      }).sort((a, b) => a.distance - b.distance ).slice(0,10)
      resolve(res)
    })
  }
}
