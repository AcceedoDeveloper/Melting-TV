import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResultResponse } from '../model/result.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ResultServices {

  constructor(private http: HttpClient) {
  }

getResults(): Observable<ResultResponse[]> {
const api = 'http://localhost:3003/planning/spectrum/from-furnace';
  return this.http.get<ResultResponse[]>(api);
}

  
}
