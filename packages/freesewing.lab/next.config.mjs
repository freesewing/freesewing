import configBuilder from '../freesewing.shared/config/next.mjs'
import config from './freesewing.config.mjs'

const allPatterns = []
for (const section in config.patterns) {
  for (const pattern of config.patterns[section]) {
    allPatterns.push(pattern)
  }
}

export default configBuilder('lab', [], allPatterns)
