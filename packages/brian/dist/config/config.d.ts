/** Pattern parts */
export declare const parts: string[];
/** Requires measurements */
export declare const measurements: string[];
export declare const options: ({
    "id": string;
    "val": number;
    "type": string;
    "min"?: undefined;
    "max"?: undefined;
} | {
    "id": string;
    "val": number;
    "min": number;
    "max": number;
    "type"?: undefined;
} | {
    "id": string;
    "val": number;
    "type": string;
    "min": number;
    "max": number;
})[];
