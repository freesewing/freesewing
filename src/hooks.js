export default function hooks() {
  this._hooks = {};
  this.all = ["preRenderSvg", "postRenderSvg", "insertText"];
}

hooks.prototype.list = function(hook) {
  if (typeof this._hooks[hook] === "undefined") {
    return false;
  }

  return this._hooks[hook];
};

hooks.prototype.attach = function(hook, obj) {
  if (typeof this._hooks[hook] === "undefined") return;
  for (let func of this._hooks[hook]) {
    obj.pre(hook, func);
  }
};
