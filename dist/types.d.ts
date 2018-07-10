export interface StringArray {
    [index: number]: string;
}
export interface PatternOptionDependency {
    option: string;
    oneOf: number[];
}
export declare type PatternOptionType = "measure" | "percentage" | "angle" | "choice";
export interface PatternOption {
    type?: PatternOptionType;
    onlyIf?: PatternOptionDependency;
}
export interface PatternOptionNumeric extends PatternOption {
    min: number;
    max: number;
    std: number;
}
export interface PatternOptionChoice extends PatternOption {
    type: "choice";
    options: {
        [index: number]: string;
    };
}
export interface PatternOptionArray {
    [index: string]: PatternOptionNumeric | PatternOptionChoice;
}
export interface PatternConfig {
    parts: StringArray;
    measurements: StringArray;
    options: PatternOptionArray;
    [propName: string]: any;
}
