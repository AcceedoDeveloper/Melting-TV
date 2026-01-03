import { Component, OnInit } from '@angular/core';
import { ResultServices} from '../services/result-services';
import { ResultResponse } from '../model/result.model';

@Component({
  selector: 'app-result',
  imports: [],
  templateUrl: './result.html',
  styleUrl: './result.scss',
})
export class Result  implements OnInit {

  result : ResultResponse[] = [] ;

  constructor(private resultServices: ResultServices) {
  }

  ngOnInit(): void {
    this.resultServices.getResults().subscribe((data : ResultResponse[]) => {

      this.result = data;
      console.log( 'data', data);
    })
  }

}
