import { DraftConfig } from './types';
import Pattern from 'freesewing/lib/pattern';
declare var backBlock: {
    draft: (config: DraftConfig, pattern: Pattern) => void;
};
export default backBlock;
