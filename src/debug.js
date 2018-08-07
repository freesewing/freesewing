import * as hooklib from "hooks";

function Debug(hooks) {
  for (let k in hooklib) this[k] = hooklib[k];
  this.hooks = hooks;

  let self = this;
  this.hooks.attach("debug", self);

  return this;
}

/** Debug method, exposes debug hook */
Debug.prototype.debug = function(data) {};

export default Debug;
