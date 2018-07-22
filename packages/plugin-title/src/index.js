import style from './lib/style';
const VERSION = require('../package.json').version;

module.exports = {
  hooks: {
    preRenderSvg: function(next) {
      // Without this, our custom attribute won't be valid
      this.attributes.add("xmlns:freesewing-plugins", "http://freesewing.org/namespaces/freesewing-plugins");
      this.attributes.add("freesewing-plugins:macro-title", VERSION);
      this.style += style;
      next();
    }
  }
, macros: {
    title: function(next, so) {
      let points = this.points;
      so.at.attr('data-text', so.nr)
        .attr('data-text-class', 'title-nr');
      points.titleName =  so.at.shift(-90, 20)
        .attr('data-text', title)
        .attr('data-text-class', 'title-name');
      points.titlePattern =  so.at.shift(-90, 40)
        .attr('data-text', pattern)
        .attr('data-text-class', 'title-pattern');
      next();
    }
  }
}
