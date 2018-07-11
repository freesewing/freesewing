import { PatternConfig } from './types';
import Part from './part';
import Option from './option';
export default class Pattern {
    config: PatternConfig;
    parts: {
        [propName: string]: Part;
    };
    options: {
        [propName: string]: Option;
    };
    constructor(config: PatternConfig);
    draft(config: object): void;
    getOption(id: string | number): any;
    o(id: string | number): any;
}
