import header from './lib/header';
import style from './lib/style';
import markers from './lib/markers';
import snippets from './lib/snippets';
import logo from './lib/logo';

module.exports = {
  preRenderSvg: function(next) {
    this.header = header;
    this.style = style;
    this.defs = markers+snippets+logo;
    this.attributes.add("xmlns:freesewing", "http://freesewing.org/namespaces/freesewing");
    this.attributes.add("freesewing:theme", "default");
  }
}
