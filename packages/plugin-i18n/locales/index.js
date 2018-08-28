import patterns from './patterns';
import plugins from './plugins';

export default {
  en: {
    ...patterns.en,
    ...plugins.en
  },
  nl: {
    ...patterns.nl,
    ...plugins.nl
  }
};
