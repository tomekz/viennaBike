import { Component, OnInit, OnDestroy } from '@angular/core';
import { GoogleMapApiService} from '../../services/google-api.service';
import { StationsService} from '../../services/stations.service';
import { ActivatedRoute } from '@angular/router';
import { Station } from '../../model/Station';
import {} from 'googlemaps'

const MARKER_TOUCH_EVENT = 'mousedown';
const ZOOM_L = 17;
const ZOOM_S = 12;
const FALLBACK_STATION = 111 //Opern

@Component({
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})
export class MapComponent implements OnInit, OnDestroy {
private onRouteChange: any;
private map: google.maps.Map;
markers: google.maps.Marker[] = [];

  constructor(
    private googleApiService: GoogleMapApiService, 
    private stationsService: StationsService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    await this.googleApiService.initMap();       
    let stations = await this.stationsService.fetch();    
    this.map =  new google.maps.Map(document.getElementById('map'));  
    this.markers = this.initMarkers(stations);

    this.onRouteChange = this.route.params.subscribe(params => {
       let routeWithNoId =  params['id'] === undefined;
       let stationId = routeWithNoId ? `${FALLBACK_STATION}` : params['id'] // if no station requested fallback to default station 
       let station = stations.find((x) => x.extra.uid === stationId)
       let markerIndex = stations.indexOf(station);
       this.map.setZoom(routeWithNoId ? ZOOM_S : ZOOM_L);
       this.map.setCenter({lat: station.latitude, lng: station.longitude});    
       google.maps.event.trigger(this.markers[markerIndex], MARKER_TOUCH_EVENT);  //open InfoWindow          
    });

  }

  private initMarkers (stations: Station[]): google.maps.Marker[] {
    let self = this;
    let markers: google.maps.Marker[] = [];
    let infoWindow = new google.maps.InfoWindow();

    stations.forEach((s) => {  
      let marker = new google.maps.Marker({
          position: new google.maps.LatLng(s.latitude, s.longitude),
          map: this.map,
          title: `station ${s.extra.uid} ${s.name}` 
      });

      marker.addListener(MARKER_TOUCH_EVENT, function() {
        infoWindow.setOptions({ content: self.markerInfoContent(s)});
        infoWindow.open(this.map,marker);
      });

      markers.push(marker);
    });

    return markers;
  }

  private markerInfoContent(station: Station): string{
    return `<h4>station ${station.extra.uid} - ${station.name}</h4>
                    <ul>
                        <li>
                           ${station.free_bikes} bikes available
                        </li>
                        <li>
                           ${station.empty_slots} empty bike slots
                        </li>
                    </ul>`;
  }

  ngOnDestroy() {
    this.onRouteChange.unsubscribe();
    this.markers.forEach( x =>  google.maps.event.clearListeners(x, MARKER_TOUCH_EVENT))
  }
}
