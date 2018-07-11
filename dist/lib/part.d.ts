import Point from './point';
export default class Part {
    id: string | number;
    points: {
        [index: string]: Point;
    };
    [propName: string]: any;
    constructor(id: string | number);
    newPoint(id: string | number, x: number, y: number): void;
}
