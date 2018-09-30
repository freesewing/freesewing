function Hooks() {
  this._hooks = {};
  this.all = [
    "preDraft",
    "postDraft",
    "preSample",
    "postSample",
    "preRender",
    "postRender",
    "insertText",
    "debug"
  ];
}

Hooks.prototype.list = function(hook) {
  if (typeof this._hooks[hook] === "undefined") {
    return false;
  }

  return this._hooks[hook];
};

Hooks.prototype.attach = function(hook, obj) {
  if (typeof this._hooks[hook] === "undefined") return;
  for (let func of this._hooks[hook]) obj.pre(hook, func);
};

export default Hooks;
