export interface ResultResponse {
  customerName: string;
  productName: string;
  planningCompleted: boolean | null;
  stages: Stage[];
  spectrumResults: SpectrumResult[];
}

export interface Stage {
  stage: string;
  furnaceNo: number;
  heatNo: string;
  testedBy: string;
  result: ElementResult[];
}

export interface SpectrumResult {
  Grade: string;
  furnaceNo: number;
  heatNo: string;
  stage: string;
  testedBy: string;
  result: ElementResult[];
}

export interface ElementResult {
  abbr: string;
  name: string;
  labResult: number;
  addition: boolean;
  alloyId: string;
  weightToBeAdded: number;
}
