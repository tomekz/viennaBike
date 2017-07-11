import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';


@Injectable()
export class GeolocationService {
  position: Position
  html5LocationToggled: EventEmitter<PositionError>

  constructor() {
    this.html5LocationToggled = new EventEmitter()
  }

  getPosition(){
    return new Promise<Position>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => {
          resolve(position)
          this.html5LocationToggled.emit(null)
        }, (err) => {
          this.html5LocationToggled.emit(err)
        }
      )
    })
  }

  // credit goes to: https://stackoverflow.com/a/27943
  distance(lat1, lon1, lat2, lon2) {
    var R = 6371;
    var dLat = this.deg2rad(lat2-lat1);
    var dLon = this.deg2rad(lon2-lon1);
    var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI/180)
  }
}
