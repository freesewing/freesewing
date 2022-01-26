// Common width for elastics
export const elastics = {
  metric: [3.5, 5, 10, 12, 20, 25, 30, 40, 50, 60, 80, 100, 120],
  imperial: [
    3.175, 6.35, 9.525, 12.7, 15.875, 19.05, 25.4, 31.75, 38.1, 44.45, 50.8, 76.2, 101.6, 127,
  ],
}

// Common length for zippers
export const zippers = {
  metric: [
    80, 100, 120, 140, 150, 160, 180, 200, 220, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700,
    750, 800, 900, 1000, 1100, 1200,
  ],
  imperial: 25.4,
}

// Snap to small steps (~1mm)
export const smallsteps = {
  metric: 1,
  imperial: 0.79375, // 1/32 inch
}

// Snap to medium steps (~5mm)
export const steps = {
  metric: 5,
  imperial: 3.175, // 1/8 inch
}

// Snap to big steps (~10mm)
export const bigsteps = {
  metric: 10,
  imperial: 12.7, // 1/2 inch
}
const frowns = -1
