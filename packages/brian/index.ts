import Freesewing from 'freesewing'
import * as patternConfig from './config/config'
import { manSize40 as measurements} from '@freesewing/models'
import backBlock from './lib/back'

var brian = new Freesewing.pattern(patternConfig);

brian.draft = function(config) {
  backBlock.draft(config);
}

const config = {
  mode: 'draft',
  units: 'metric',
  measurements,
  sa: 10,
  theme: 'default'
}

brian.draft(config);


