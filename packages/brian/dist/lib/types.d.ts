export declare type DraftMode = "sample" | "compare" | "draft";
export declare type CompareGroup = "men" | "women";
export declare type Units = "metric" | "imperial";
export interface DraftConfig {
    mode: DraftMode;
    units?: Units;
    options: {
        [index: string]: number;
    };
    measurements?: {
        [index: string]: number;
    };
    sa?: number;
    scope?: string[];
    theme?: string;
}
