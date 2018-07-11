export type PatternOptionType = "measure" | "percentage" | "angle" | "choice" | "constant";

export interface PatternOption {
  id: string;
  val: number;
  type?: string;
  onlyIf?: {
    option: string;
    oneOf: number[];
  }
  min?: number;
  max?: number;
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

export type DraftMode = "sample" | "compare" | "draft";
export type CompareGroup = "men" | "women";
export type Units = "metric" | "imperial";

export interface DraftConfig {
  mode: DraftMode;
  units?: Units;
  options: PatternOption[];
  measurements?: {
    [index:string]: number;
  };
  sa?: number;
  scope?: string[];
  theme?: string;
}
