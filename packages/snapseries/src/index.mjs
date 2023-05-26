const inchesToMm = (i) => (Array.isArray(i) ? i.map((x) => x * 25.4) : i * 25.4)

// Common width for elastics
export const elastics = {
  metric: [3.5, 5, 10, 12, 20, 25, 30, 40, 50, 60, 80, 100, 120],
  imperial: inchesToMm([
    1 / 8,
    1 / 4,
    3 / 8,
    1 / 2,
    5 / 8,
    3 / 4,
    1,
    1 + 1 / 4,
    1 + 1 / 2,
    1 + 3 / 4,
    2,
    3,
    4,
    5,
  ]),
}

// Common length for zippers
export const zippers = {
  metric: [
    80, 100, 120, 140, 150, 160, 180, 200, 220, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700,
    750, 800, 900, 1000, 1100, 1200,
  ],
  imperial: inchesToMm([
    3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 28, 30, 36, 42, 48, 60, 80,
  ]),
}

// Snap to small steps (~1mm)
export const smallSteps = {
  metric: 1,
  imperial: 0.79375, // 1/32 inch
}

// Snap to medium steps (~5mm)
export const steps = {
  metric: 5,
  imperial: 3.175, // 1/8 inch
}

// Snap to big steps (~10mm)
export const bigSteps = {
  metric: 10,
  imperial: 12.7, // 1/2 inch
}

// Default export
export default {
  elastics,
  zippers,
  smallSteps,
  steps,
  bigSteps,
}
