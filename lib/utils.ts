/** Rounds a value to PRECISION */
export function round(value: number): number {
  return Math.round(value * 1e2) / 1e2;
}

/** Radians to degrees */
export function rad2deg(radians: number): number {
  return radians * 57.29577951308232;
}

/** Degrees to radians */
export function deg2rad(degrees: number): number {
  return degrees / 57.29577951308232;
}

