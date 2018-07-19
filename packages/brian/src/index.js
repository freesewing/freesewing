import F from 'freesewing'
import * as patternConfig from '../config/config'
import back from './back'

var brian = new F.pattern(patternConfig);

brian.draft = function()
{
  back.draft(brian.parts.back, brian.context);

  return brian;
}

module.exports = brian;
