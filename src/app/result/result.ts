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
      d => d.spectrumResults?.length > 0
    );
    this.cdRef.detectChanges();
    console.log('get from the restAPI', this.selectedResult);
  });

  this.socketService.on<any>('newResult').subscribe((data) => {
    console.log('Socket data received:', data);
     this.rawData[0] = data;
     this.selectedResult = this.rawData[0];
      this.cdRef.detectChanges();
  })
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
}
