import pattern from './lib/pattern';
import bezier from 'bezier-js';
declare var Freesewing: {
    version: string;
    pattern: typeof pattern;
    bezier: typeof bezier;
};
export default Freesewing;
