export type DraftMode = "sample" | "compare" | "draft";
export type CompareGroup = "men" | "women";
export type Units = "metric" | "imperial";

export interface DraftConfig {
  mode: DraftMode;
  units?: Units;
  options: {
    [index:string]: number;
  };
  measurements?: {
    [index:string]: number;
  };
  sa?: number;
  scope?: string[];
  theme?: string;
}


