import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
// import { Map } from 'leaflet';

@Component({
  selector: 'vb-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit() {
     let mymap = L.map('map').setView([51.505, -0.09], 13);
  }

}
