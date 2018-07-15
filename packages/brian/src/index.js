import freesewing from 'freesewing'
import * as patternConfig from '../config/config'
import { Pattern } from 'freesewing/dist/lib/pattern'
import backBlock from './lib/back'

var brian = new freesewing.pattern(patternConfig);

brian.draft = function(final = true) {
  backBlock.draft(brian, final);

  return brian;
}

module.exports = brian;
