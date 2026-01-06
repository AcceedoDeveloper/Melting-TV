import { Component, OnInit } from '@angular/core';
import { ResultServices } from '../services/result-services';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

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


  constructor(private resultServices: ResultServices, private cdRef: ChangeDetectorRef) {}

ngOnInit(): void {
  this.resultServices.getResults().subscribe((data: any[]) => {
    this.rawData = data;

    console.log('Raw Data:', this.rawData);

    this.selectedResult = this.rawData[0];

    this.cdRef.detectChanges();

    console.log('Selected Result:', this.selectedResult);
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

      // 👇 fill remaining slots with placeholders
      while (group.length < size) {
        group.push({ isPlaceholder: true });
      }

      chunks.push(group);
    }

    return chunks;
  }
}
