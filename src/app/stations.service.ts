import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import  { Station }  from './model/Station';

@Injectable()
export class StationsService {
  private url = 'https://api.citybik.es/v2/networks/citybike-wien';
  private poolInterval = 10000 //10 secs

  constructor(private http: Http) { }

  fetch(): Observable<Station[]> {
    
    return Observable
        .interval(this.poolInterval)
        .startWith(0)
        .flatMap(() => {
          return  this.http.get(this.url)
                    .map((res: Response) => {
                        let body = res.json();
                        return body.network.stations || {};
                    })
                    ._catch((err) => {
                      console.log(err);
                      throw err;
                    });
        })
  }
}
