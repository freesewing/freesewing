import F from 'freesewing'
import * as patternConfig from './config/config'
import { DraftConfig } from './lib/types'
import { Pattern } from 'freesewing/lib/pattern'
import backBlock from './lib/back'

export var brian = new F.pattern(patternConfig);

brian.draft = function(final: boolean = true): void {
  backBlock.draft(brian, final);
}

