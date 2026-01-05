/* ================= ROOT RESPONSE ================= */

export interface ResultResponse {
  customerName: string;
  productName: string;
  planningCompleted: boolean | null;
  spectrumResults: SpectrumResult[];
  stages: Stage[];
}

/* ================= SPECTRUM RESULT ================= */

export interface SpectrumResult {
  Grade: string;
  furnaceNo: number;
  heatNo: string;
  stage: string;
  testedBy: string;
  createdAt: string;
  result: ElementResult[];
}

/* ================= STAGE ================= */

export interface Stage {
  stage: string;
  furnaceNo: number;
  heatNo: string;
  testedBy: string;
  result: ElementResult[];
}

/* ================= ELEMENT RESULT ================= */

export interface ElementResult {
  alloyId: string;
  name: string;
  abbr: string;
  labResult: number;
  weightToBeAdded: number;
  addition: boolean;
}
