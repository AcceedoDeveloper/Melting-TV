import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResultResponse } from '../model/result.model';
import { Observable } from 'rxjs';
import { AppConfigService } from './app-config.service';


// @Injectable({
//   providedIn: 'root',
// })
// export class ResultServices {

//   constructor(private http: HttpClient) {
//   }

// getResults(): Observable<ResultResponse[]> {
// const api = 'http://103.5.113.101:9006/planning/spectrum/from-furnace';
//   return this.http.get<ResultResponse[]>(api);
// }

  
// }



@Injectable({
  providedIn: 'root',
})
export class ResultServices {
  constructor(
    private http: HttpClient,
    private config: AppConfigService
  ) {}

  getResults(): Observable<ResultResponse[]> {
    const baseUrl = this.config.getApiBaseUrl();
    const api = `${baseUrl}/planning/spectrum/from-furnace`;
    return this.http.get<ResultResponse[]>(api);
  }

  getCompanyDetails() : Observable<any> {
    const baseUrl = this.config.getApiBaseUrl();
    const api = `${baseUrl}/company`;
    return this.http.get<any>(api);
  }



}

