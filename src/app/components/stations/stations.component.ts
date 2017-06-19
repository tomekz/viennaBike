import { Component, OnInit, OnDestroy } from '@angular/core';
import { StationsService } from '../.././stations.service';
import { Station } from '../../model/Station';
import { StationFilter } from '../../model/StationFilter';
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
  filter: StationFilter = new StationFilter();
  bezirks = [1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20];
  bikeCounts = Array.from(Array(20).keys());

  constructor(private service: StationsService, private router: Router) { }

  ngOnInit() {
    this.service.fetchObservable()
                .takeUntil(this.ngUnsubscribe)
                .subscribe(
                  (data) => this.stations = data,
                );
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.unsubscribe();
  }
}
