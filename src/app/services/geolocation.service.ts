import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';


@Injectable()
export class GeolocationService {
  position: Position
  err: PositionError
  html5LocationToggled: EventEmitter<boolean>

  constructor() {
    this.html5LocationToggled = new EventEmitter()
    this.getPosition().then((position) => this.position = position)
                      .catch((err) => this.err = err)
  }

  getPosition(){
    return new Promise<Position>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition( (position) => {
          resolve(position)
          this.html5LocationToggled.emit(true)        
        }, (err) => {
          reject(err)
          this.html5LocationToggled.emit(false)
        }
      )
    })
  }

  
  // taken from: https://stackoverflow.com/a/27943
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
    //console.log(d)
    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI/180)
  }
}