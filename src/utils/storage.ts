function non<T>(value: T) {
  return value !== null && value !== void 0;
}

function getKey(key: string) {
  return `${key}_${'https://huangbin-c5ff86.postdemo.tcn.asia/api/v2/'}`;
}

function getValue(storage: Storage, key: string): string {
  return storage.getItem(getKey(key))!;
}

function setValue(storage: Storage, key: string, value: string) {
  non(value)
    ? storage.setItem(getKey(key), value)
    : storage.removeItem(getKey(key));
}

export function getLocalStorage(key: string): string {
  return getValue(localStorage, key);
}

export function setLocalStorage(key: string, value: string): string {
  return setValue(localStorage, key, value), value;
}
