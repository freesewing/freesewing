import F from 'freesewing'
import * as patternConfig from './config/config'
import { DraftConfig } from './lib/types'
import { Pattern } from 'freesewing/dist/lib/pattern'
import backBlock from './lib/back'
import { manSize38 } from '@freesewing/models'

var brian = new F.pattern(patternConfig);

brian.draft = function(final: boolean = true): Pattern {
  backBlock.draft(brian, final);

  return brian;
}

export default brian;




// This is not for inclusion in production

console.log(manSize38);
brian.settings.measurements = manSize38;

brian.draft();
console.log(brian.parts.backBlock.points);



