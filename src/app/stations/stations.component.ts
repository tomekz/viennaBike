import { Component, OnInit, OnDestroy } from '@angular/core';
import { StationsService} from '.././stations.service';
import { Station } from '../model/Station';
import { StationFilter } from '../model/StationFilter';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

@Component({
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.less']
})
export class StationsComponent implements OnDestroy, OnInit  {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  stations: Station[];
  errorMsg: string;
  filter: StationFilter = new StationFilter();

  constructor(private service: StationsService, private router: Router) { }

  ngOnInit() {
    this.service.fetchObservable()
                .takeUntil(this.ngUnsubscribe)
                .subscribe(
                  (data) => this.stations = data,
                  (err) => this.errorMsg = err
                );
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.unsubscribe();
  }
}
