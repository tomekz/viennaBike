import { Component, OnInit, OnDestroy } from '@angular/core';
import { GoogleApiService} from '.././google-api.service';
import { StationsService} from '.././stations.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})
export class MapComponent implements OnInit, OnDestroy {
private routeSubscription: any;
stationId = '111';
zoomIn = 17;
zoomOut = 14;

  constructor(
    private googleApiService: GoogleApiService, 
    private stationsService: StationsService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    await this.googleApiService.initMap();
    let stations = await this.stationsService.fetch();
    
    let station = stations.find((x) => x.extra.uid === this.stationId)
    let map =  new google.maps.Map(document.getElementById('map'), {
                     center: new google.maps.LatLng(station.latitude, station.longitude),
                     zoom: this.zoomOut
    });

    stations.forEach((station) => {
           let marker = new google.maps.Marker({
               position: new google.maps.LatLng(station.latitude, station.longitude),
               map: map,
               title: station.name
            });

            // marker.addListener('click', function() {
            //   map.setZoom(this.zoomIn);
            //   map.setCenter(marker.getPosition());

            // });
    })

    this.routeSubscription = this.route.params.subscribe(params => {
      
       let zoom = this.zoomOut;
       if(params['id'] !== undefined){
         this.stationId = params['id']; 
         zoom = this.zoomIn;
       }
       let station = stations.find((x) => x.extra.uid === this.stationId)
        map.setZoom(zoom);
        map.setCenter({lat: station.latitude, lng: station.longitude});
    });


   }

   ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    //TODO: remove market listeners here
  }



}
