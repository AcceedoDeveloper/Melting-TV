import { Component, OnInit } from '@angular/core';
import { ResultServices} from '../services/result-services';

@Component({
  selector: 'app-result',
  imports: [],
  templateUrl: './result.html',
  styleUrl: './result.scss',
})
export class Result  implements OnInit {

  constructor(private resultServices: ResultServices) {
  }

  ngOnInit(): void {
    this.resultServices.getResults().subscribe((data) => {
      console.log( 'data', data);
    })
  }

}
