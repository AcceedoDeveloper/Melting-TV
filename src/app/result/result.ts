import { Component, OnInit } from '@angular/core';
import { ResultServices } from '../services/result-services';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { SocketService } from '../services/socket.service';

interface SpectrumElement {
  abbr?: string;
  labResult?: number;
  weightToBeAdded?: number;
  isPlaceholder?: boolean;
  qtyTaken?: number;
}

@Component({
  selector: 'app-result',
  imports: [CommonModule],
  templateUrl: './result.html',
  styleUrl: './result.scss',
})
export class Result implements OnInit {
  rawData: any[] = [];
  selectedResult: any = null;


  constructor(private resultServices: ResultServices, private cdRef: ChangeDetectorRef, private socketService: SocketService) {}

ngOnInit(): void {

  this.resultServices.getResults().subscribe((data: any[]) => {
    this.rawData = data;
    console.log('full data', this.rawData);

    this.selectedResult = data.find(
      (d: any) => d.spectrumResults?.length > 0
    );

    this.cdRef.detectChanges();
  });

  this.socketService.on<any[]>('MELTING_TV').subscribe((data) => {
    this.rawData = data;

    this.selectedResult = data.find(
      (d: any) => d.spectrumResults?.length > 0
    );

    this.cdRef.detectChanges();
  });
}

  


  chunkArray(
    array: SpectrumElement[] | null | undefined,
    size: number
  ): SpectrumElement[][] {
    if (!array) return [];

    const chunks: SpectrumElement[][] = [];

    for (let i = 0; i < array.length; i += size) {
      const group = array.slice(i, i + size);

      while (group.length < size) {
        group.push({ isPlaceholder: true });
      }

      chunks.push(group);
    }

    return chunks;
  }



  getResultClass(el: any): string {
  if (
    el.percent === undefined ||
    el.plus === undefined ||
    el.minus === undefined ||
    el.labResult === undefined
  ) {
    return '';
  }

  const lower = el.percent - el.minus;
  const upper = el.percent + el.plus;

  if (el.labResult < lower) {
    return 'low';      
  }

  if (el.labResult > upper) {
    return 'high';      
  }

  return 'normal';       
}



getStageClass(status: number): string {
  switch (status) {
    case 0:
      return 'scheduled';
    case 1:
      return 'started';
    case 2:
      return 'charge';
    default:
      return '';
  }
}




}
