declare const config: {
    "parts": string[];
    "measurements": string[];
    "options": ({
        "id": string;
        "min": number;
        "max": number;
        "std": number;
        "type"?: undefined;
    } | {
        "id": string;
        "type": string;
        "min": number;
        "max": number;
        "std": number;
    })[];
};
export default config;
