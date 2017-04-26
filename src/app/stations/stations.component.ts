import { Component, OnInit } from '@angular/core';
import { StationsService} from '.././stations.service';
import { Station } from '../model/station';

@Component({
  selector: 'vb-map',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.less']
})
export class StationsComponent implements OnInit {
  stations: Station[];
  errorMsg: string;

  constructor(private service: StationsService) { }

  ngOnInit() {
    this.service.fetch()
                .subscribe(
                  (data) => this.stations = data,
                  (err) => this.errorMsg = err
                );
  }

}
