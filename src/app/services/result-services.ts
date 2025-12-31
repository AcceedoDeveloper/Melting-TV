import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ResultServices {

  

  constructor(private http: HttpClient) {
  }


  getResults() {

    const api = 'http://localhost:3002/planning/spectrum/from-furnace';
    return this.http.get(api);
  }
  
}
