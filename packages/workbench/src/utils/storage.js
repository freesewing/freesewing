export default class Storage {
  set(key, value, raw = false) {
    if (typeof localStorage === "undefined") {
      return;
    }

    const _key = "fswb_" + key;

    if (typeof value === "undefined" || value === null) {
      localStorage.removeItem(_key);
    } else {
      localStorage.setItem(_key, raw ? value : JSON.stringify(value));
    }

    return value;
  }

  get(key, raw = false) {
    if (typeof localStorage === "undefined") {
      return;
    }

    const _key = "fswb_" + key;

    const value = localStorage.getItem(_key);

    return raw ? value : JSON.parse(value);
  }
}
