import { PatternOption } from './types';
export default class Model {
    id: string;
    config: PatternOption;
    val: number;
    constructor(config: PatternOption);
}
