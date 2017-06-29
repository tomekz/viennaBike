import { Pipe, PipeTransform } from '@angular/core';
import { Station } from '.././model/Station';
import { StationFilter } from '.././model/StationFilter';

@Pipe({
    name: 'stationFilter',
    pure: false
})
export class StationFilterPipe implements PipeTransform {
  transform(items: Station[], filter: StationFilter): Station[] {
    if (!items || !filter) {
      return items;
    }

    return items.filter((item: Station) => this.applyFilter(item, filter));
  }
  
  applyFilter(station: Station, filter: StationFilter): boolean {
    for (let field in filter) {
      if (filter[field]) {
        if (field === "name" ) {
          if (station.name.toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
            return false;
          }
        } else if (field === "free_bikes") {
          if (station.free_bikes < filter.free_bikes) {
            return false;
          }
        } else if (field ==="uid") {
          if (Number.parseInt(station.extra.uid.toString().slice(0,-2)) !== filter.uid) {
            return false;
          }
        }
      }
    }
    return true;
  }
}