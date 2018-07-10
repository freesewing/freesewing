export interface PatternOption {
  type?: "measure" | "percentage" | "angle" | "choice";
  onlyIf?: {
    option: string;
    oneOf: number[];
  }
  min?: number;
  max?: number;
  std: number;
  options?: {
    [index: number]: string;
  }
}

export interface PatternConfig {
  parts: string[];
  measurements: string[];
  options: PatternOption[];
  [propName: string]: any;
}

export type Pattern = {
  parts: string[];
  measurements: string[];
  config: PatternConfig;
}
