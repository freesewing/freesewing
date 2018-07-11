import pattern from './lib/pattern';
import point from './lib/point';
import bezier from 'bezier-js';
declare var Freesewing: {
    version: string;
    pattern: typeof pattern;
    point: typeof point;
    bezier: typeof bezier;
};
export default Freesewing;
