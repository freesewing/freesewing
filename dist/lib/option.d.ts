import { PatternOption } from './types';
export default class Option {
    id: string;
    config: PatternOption;
    val: number;
    constructor(config: PatternOption);
}
