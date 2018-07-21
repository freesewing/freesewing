import F from 'freesewing'
import cutonfold from '@freesewing-plugins/macro-cutonfold'
import * as patternConfig from '../config/config'
import back from './back'

var brian = new F.pattern(patternConfig)
  .withPlugin(cutonfold);

brian.draft = function()
{
  back.draft(brian.parts.back, brian.context);

  return brian;
}

module.exports = brian;
