import { Draft } from './themes/draft'
import { Paperless } from './themes/paperless'
import { Sample } from './themes/sample'
import { Compare } from './themes/compare'

/** Standard themes that ship with freesewing */
var themes = {
  draft: new Draft(),
  paperless: new Paperless(),
  sample: new Sample(),
  compare: new Compare()
}

export default themes;
