export class Hooks {
  _hooks: object;

  constructor(app) {
    this._hooks = {};
  }

  on(hook, method): void {
    if(typeof this.hooks._hooks[method] === 'undefined') {
      this.hooks._hooks[hook] = [];
    }
    this.hooks._hooks[hook].push(method);
    console.log('in on method', hook, method);
  }

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
        console.log('in attach', hook, func);
        obj.pre(hook, func);
      }
    }

}
