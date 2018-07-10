"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config = {
    "parts": [
        "backBlock",
        "frontBlock",
        "sleeveBlock"
    ],
    "measurements": [
        "bicepsCircumference",
        "centerBackNeckToWaist",
        "chestCircumference",
        "naturalWaistToHip",
        "neckCircumference",
        "shoulderSlope",
        "shoulderToShoulder",
        "hipsCircumference",
        "shoulderToWrist",
        "wristCircumference"
    ],
    "options": [
        {
            "id": "chestEase",
            "min": -40,
            "max": 160,
            "std": 30
        },
        {
            "id": "bicepsEase",
            "min": 30,
            "max": 80,
            "std": 50
        },
        {
            "id": "cuffEase",
            "min": 0,
            "max": 100,
            "std": 45
        },
        {
            "id": "lengthBonus",
            "min": -40,
            "max": 120,
            "std": 0
        },
        {
            "id": "sleeveLengthBonus",
            "min": -40,
            "max": 80,
            "std": 0
        },
        {
            "id": "armholeDepthFactor",
            "type": "percentage",
            "min": 50,
            "max": 65,
            "std": 50
        },
        {
            "id": "sleevecapHeightFactor",
            "type": "percentage",
            "min": 35,
            "max": 75,
            "std": 55
        },
        {
            "id": "acrossBackFactor",
            "type": "percentage",
            "min": 93,
            "max": 99,
            "std": 96
        }
    ]
};
exports.default = config;
