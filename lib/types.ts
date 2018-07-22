export type context = {
  settings: {[propName: string]: any};
  options: {[propName: string]: any};
  values: {[propName: string]: any};
}

/////////////////////////////////////////////////////////////
/*
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

declare namespace Pattern {
  export type OptionType = "measure" | "percentage" | "angle" | "choice" | "constant";

  export interface Option {
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

  export interface Config {
    parts: string[];
    measurements: string[];
    options: Option[];
    [propName: string]: any;
  }
}
*/
