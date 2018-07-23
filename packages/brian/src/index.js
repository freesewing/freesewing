import * as freesewing from 'freesewing'
import * as cutonfold from '@freesewing-plugins/macro-cutonfold'
import { config } from '../config/config'
import back from './back'

import { version } from "../package.json"
console.log('config', config);
var brian = new freesewing.pattern(config)
  .withPlugin(cutonfold);

brian.draft = function()
{
  back.draft(brian.parts.back, brian.context);

  return brian;
}

brian.version = version;

export default brian;
