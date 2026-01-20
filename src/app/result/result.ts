import { Component, OnInit } from '@angular/core';
import { ResultServices } from '../services/result-services';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { SpectrumElement } from '../model/result.model';
import { Renderer2 } from '@angular/core';


@Component({
  selector: 'app-result',
  imports: [CommonModule],
  templateUrl: './result.html',
  styleUrl: './result.scss',
})
export class Result implements OnInit {
  rawData: any[] = [];
  selectedResult: any = null;
  status : boolean = false;
  count : number = 0;


  ALL_STAGES = [
  { status: 0, name: 'Scheduled' },
  { status: 1, name: 'Started' },
  { status: 2, name: 'Charge Mix' },
  { status: 3, name: 'Spectrum Result' }
];


  constructor(private resultServices: ResultServices, 
    private cdRef: ChangeDetectorRef, 
    private socketService: SocketService,
    private renderer: Renderer2) {}

// ngOnInit(): void {

//   this.resultServices.getResults().subscribe((data: any[]) => {
//     this.rawData = data;
//     console.log('full data', this.rawData);

//     this.selectedResult = data.find(
//       (d: any) => d.spectrumResults?.length > 0
//     );

//     this.cdRef.detectChanges();
//   });

//   this.socketService.on<any[]>('MELTING_TV').subscribe((data) => {
//     console.log('socket io data', data);
    
//     this.rawData = data;

//     this.selectedResult = data.find(
//       (d: any) => d.spectrumResults?.length > 0
//     );

//     this.cdRef.detectChanges();
//   });
// }


ngOnInit(): void {

  this.resultServices.getResults().subscribe((data: any[]) => {
    this.rawData = data;

    this.selectedResult = data.find(
      (d: any) => d.spectrumResults?.length > 0
    );

    if (this.selectedResult) {
      this.calculateStatus(this.selectedResult);
    }

    // ✅ ADD HERE
    this.updateBackground();

    this.cdRef.detectChanges();
  });

  this.socketService.on<any[]>('MELTING_TV').subscribe((data) => {
    this.rawData = data;

    this.selectedResult = data.find(
      (d: any) => d.spectrumResults?.length > 0
    );

    if (this.selectedResult) {
      this.calculateStatus(this.selectedResult);
    }

    // ✅ ADD HERE ALSO
    this.updateBackground();

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
    this.count++;
    return 'low';      
  }

  if (el.labResult > upper) {
    this.count++;
    return 'high';      
  }

  return 'normal';       
}



sttatusCheck(){
if(this.count === 0){
  this.status = true;
}
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


getStageIcon(status: number): string {
  switch (status) {
    case 0:
      return 'assets/schedule.png';
    case 1:
      return 'assets/rocket.png';
    case 2:
      return 'assets/mixing-bowl.png';
    default:
      return 'assets/spectrum.png';
  }
}


getStageEmoji(status: number): string {
  switch (status) {
    case 0: return '📅'; // Scheduled
    case 1: return '🏃'; // Started
    case 2: return '⚡'; // Charge Mix
    default: return '🔥';
  }
}


getCurrentStageIndex(furnace: any): number {
  if (!furnace.stages || furnace.stages.length === 0) {
    return -1;
  }
  return Math.max(...furnace.stages.map((s: any) => s.status));
}



isFinished(stageStatus: number, currentIndex: number): boolean {
  return stageStatus < currentIndex;
}

isCurrent(stageStatus: number, currentIndex: number): boolean {
  return stageStatus === currentIndex;
}

isUpcoming(stageStatus: number, currentIndex: number): boolean {
  return stageStatus > currentIndex;
}

getStageDate(furnace: any, status: number): string | null {
  const found = furnace.stages.find((s: any) => s.status === status);
  return found ? found.createdAt : null;
}



getStageDuration(furnace: any, status: number): string {
  const stages = furnace.stages;

  const current = stages.find((s: any) => s.status === status);
  const next = stages.find((s: any) => s.status === status + 1);

  if (!current || !next) return '';

  const start = new Date(current.createdAt).getTime();
  const end = new Date(next.createdAt).getTime();

  const diffSec = Math.floor((end - start) / 1000);

  const min = Math.floor(diffSec / 60);
  const sec = diffSec % 60;

  return `${min}:${sec.toString().padStart(2, '0')}`;
}

getCorrectionStages(furnace: any) {
  return furnace.stages?.filter((s: any) => s.status >= 3) || [];
}


calculateStatus(result: any) {
  this.count = 0;

  const elements = result?.spectrumResults?.[0]?.result || [];

  for (const el of elements) {
    if (
      el.percent === undefined ||
      el.plus === undefined ||
      el.minus === undefined ||
      el.labResult === undefined
    ) {
      continue;
    }

    const lower = el.percent - el.minus;
    const upper = el.percent + el.plus;

    if (el.labResult < lower || el.labResult > upper) {
      this.count++;
    }
  }

  this.status = this.count === 0;
}


shouldShowResultUI(result: any): boolean {
  return (
    result?.spectrumResults?.length === 1 &&
    result?.spectrumResults?.[0]?.isViewed === false
  );
}

get isResultView(): boolean {
  return !!(
    this.selectedResult &&
    this.shouldShowResultUI(this.selectedResult)
  );
}


updateBackground(): void {
  const body = document.body;

  this.renderer.removeClass(body, 'bg-red');
  this.renderer.removeClass(body, 'bg-white');

  if (this.isResultView) {
    this.renderer.addClass(body, 'bg-red');
  } else {
    this.renderer.addClass(body, 'bg-white');
  }
}




}
