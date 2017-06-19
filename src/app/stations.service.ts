import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import  { Station }  from './model/Station';


@Injectable()
export class StationsService {
  private url = 'https://api.citybik.es/v2/networks/citybike-wien';
  private poolInterval = 10000 //10 secs

  constructor(private http: Http) { }

  fetchObservable(): Observable<Station[]> { 
    return Observable
        .interval(this.poolInterval)
        .startWith(0)
        .flatMap(() => {
          return  this.http.get(this.url)
                    .map((res: Response) => this.mapResponse(res))
                    ._catch((err) => {
                      console.log(err);
                      throw err;
                    });
        })
  }

  fetch(): Promise<Station[]>{
    return this.http.get(this.url)
                    .map((res: Response) => this.mapResponse(res))
                    .toPromise()
                    .catch((error) => {
                        console.error('An error occurred', error);
                        return Promise.reject(error.message || error);
                    })
  }

  private mapResponse(res: Response){  
    console.log('fetched data')
    let body = res.json();
    return body.network.stations || {};
  }
  
}
