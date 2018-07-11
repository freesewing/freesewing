import FS from 'freesewing'
import * as patternConfig from './config/config'
import { manSize40 as model} from '@freesewing/models'
import { DraftConfig } from './lib/types'
import Pattern from 'freesewing/lib/pattern'

/** This would come in from whoever is consuming this module */
const config = {
  mode: 'draft',
  units: 'metric',
  measurements: model,
  sa: 10,
  theme: 'default'
}

var brian = new FS.pattern(patternConfig);
var back = brian.parts.backBlock;

brian.draft = function(config: DraftConfig): void {
  back.draft(config, brian);
}

back.draft = function (config: DraftConfig, pattern: Pattern){
  back.points.cbNeck = new FS.point(0, pattern.o('backNeckCutout'));
  back.points.cbArmhole = new FS.point(0, back.points.cbNeck.y + ( model.shoulderSlope - pattern.o('shoulderSlopeReduction') ) / 2);
  console.log(back.points);
}

// Calling this here for now so we see something happening
brian.draft(config);

export default brian;
