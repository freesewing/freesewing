// This is an a file on its own to avoid
// a circular dependency
/** Rounds a value to 2 decimals */
export function round(value) {
  return Math.round(value * 1e2) / 1e2;
}
