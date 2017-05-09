import { Component, OnInit } from '@angular/core';
import { StationsService} from '.././stations.service';
import { Station } from '../model/Station';
import { StationFilter } from '../model/StationFilter';
import { Router } from '@angular/router';

@Component({
  selector: 'vb-map',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.less']
})
export class StationsComponent implements OnInit {
  stations: Station[];
  errorMsg: string;
  filter: StationFilter = new StationFilter();

  constructor(private service: StationsService, private router: Router) { }

  ngOnInit() {
    this.service.fetch()
                .subscribe(
                  (data) => this.stations = data,
                  (err) => this.errorMsg = err
                );
  }

  goToMap():void{
    this.router.navigate(['/map'])
  }

}
