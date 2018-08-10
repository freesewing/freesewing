import { version, name } from "../package.json";

export default {
  name: name,
  version: version,
  hooks: {
    preDraft: function(next) {
      for(let m in this.config.measurements) {
        let measurement = this.config.measurements[m];
        if(!this.context.settings.measurements[measurement]) {
          this.debug('Missing measurement:', measurement);
          this.debug('All measurements:', this.settings.measurements);
          throw `Missing measurement: ${measurement}`;
        }
      }
      next();
    }
  }
};
