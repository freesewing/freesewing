export default class Storage {
  set(key, value, isJson) {
    if (typeof localStorage === "undefined") {
      return;
    }

    const _key = "fswb_" + key;

    if (typeof value === "undefined" || value === null) {
      localStorage.removeItem(_key);
    } else {
      localStorage.setItem(_key, isJson ? JSON.stringify(value) : value);
    }

    return value;
  }

  get(key, isJson) {
    if (typeof localStorage === "undefined") {
      return;
    }

    const _key = "fswb_" + key;

    const value = localStorage.getItem(_key);

    return isJson ? JSON.parse(value) : value;
  }
}
