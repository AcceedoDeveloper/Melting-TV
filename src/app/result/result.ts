import { Component, OnInit } from '@angular/core';
import { ResultServices} from '../services/result-services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-result',
  imports: [CommonModule],
  templateUrl: './result.html',
  styleUrl: './result.scss',
})
export class Result implements OnInit {

  rawData: any[] = [];
  
  constructor(private resultServices: ResultServices) {}

  ngOnInit(): void {
    this.resultServices.getResults().subscribe((data: any[]) => {
      this.rawData = data;
      console.log('Raw Data', this.rawData);

     
    });
  }
}

