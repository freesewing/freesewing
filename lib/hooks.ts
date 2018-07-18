export class Hooks {
  hooks: object;
  all: string[];

  constructor(app) {
    this._hooks = {};
    this.all = ['preRenderSvg', 'postRenderSvg'];
  }

  ///** Add hook */
  //on(hook, method): void {
  //  // This gets called from the pattern context
  //  // so 'this' is not actually this class
  //  let self = this.hooks;
  //  if(typeof self._hooks[method] === 'undefined') {
  //    self._hooks[hook] = [];
  //  }
  //  self._hooks[hook].push(method);
  //}

  list(hook): function[] {
    if(typeof this._hooks[hook] === 'undefined') {
      return false;
    }

    return this._hooks[hook];
  }

  attachPre (hook: string, obj: object): void {
      this._attach('pre', hook, obj);
    }
  attachPost (hook: string, obj: object): void {
      this._attach('post', hook, obj);
    }

  attach (hook: string, obj: object): void {
      if(typeof this._hooks[hook] === 'undefined') return;
      for(let func of this._hooks[hook]) {
        obj.pre(hook, func);
      }
    }
}
