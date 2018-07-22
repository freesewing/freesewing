export class Hooks {
  hooks: object;
  all: string[];

  constructor(app) {
    this._hooks = {};
    this.all = ['preRenderSvg', 'postRenderSvg'];
  }

  list(hook): function[] {
    if(typeof this._hooks[hook] === 'undefined') {
      return false;
    }

    return this._hooks[hook];
  }

  attach (hook: string, obj: object): void {
      if(typeof this._hooks[hook] === 'undefined') return;
      for(let func of this._hooks[hook]) {
        obj.pre(hook, func);
      }
    }
}
