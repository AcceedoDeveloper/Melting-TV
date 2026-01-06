import { Component, OnInit } from '@angular/core';
import { ResultServices } from '../services/result-services';
import { CommonModule } from '@angular/common';

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

  constructor(private resultServices: ResultServices) {}

  ngOnInit(): void {
    this.resultServices.getResults().subscribe((data: any[]) => {
      this.rawData = data;
      console.log('Raw Data', this.rawData);

      console.log('customer name', this.rawData[0].customerName);
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
