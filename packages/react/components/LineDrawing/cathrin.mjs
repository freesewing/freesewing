import React from 'react'
import { LineDrawingWrapper, thin, dashed } from './shared.mjs'

/*
 * This strokeScale factor is used to normalize the stroke across
 * designs so we have a consistent look when showing our collection
 */
const strokeScale = 0.5

/**
 * A linedrawing component for Cathrin
 *
 * @param {object} props - All React props
 * @param {string} props.className - Any CSS classes to apply
 * @param {number} props.stroke - The stroke width to apply
 */
export const Cathrin = ({ className, stroke = 1 }) => (
  <LineDrawingWrapper viewBox="0 0 288 159" {...{ className }}>
    <Front stroke={stroke * strokeScale} />
    <Back stroke={stroke * strokeScale} />
  </LineDrawingWrapper>
)

/**
 * A linedrawing component for the front of Cathrin
 *
 * @param {object} props - All React props
 * @param {string} props.className - Any CSS classes to apply
 * @param {number} props.stroke - The stroke width to apply
 */
export const CathrinFront = ({ className, stroke = 1 }) => (
  <LineDrawingWrapper viewBox="2 2 138 139" {...{ className, stroke }}>
    <Front stroke={stroke * strokeScale} />
  </LineDrawingWrapper>
)

/*
 * React component for the back
 */
export const CathrinBack = ({
  className = 'w-64', // CSS classes to apply
  stroke = 1, // Stroke width to use
}) => {
  // Normalize stroke across designs
  stroke = stroke * strokeScale

  return (
    <LineDrawingWrapper viewBox="144 0 144 159" {...{ className, stroke }}>
      <Back stroke={stroke} />
    </LineDrawingWrapper>
  )
}

/*
 * SVG elements for the front
 */
export const Front = ({ stroke }) => (
  <>
    <path
      key="stitches"
      {...dashed(stroke)}
      {...thin(stroke)}
      d="m 93.75,13.24 -2.03,6.48
      c -0.17,0.62 -0.41,1.5 -0.68,2.56 -1.65,6.54 -2.24,11.58 -2.36,12.64 -0.57,5.06 -0.46,9.01 -0.4,11.2 0.8,26.65 1.6,36.4 1.6,36.4 0.79,9.56 1.72,24.17 2.69,41.91

      m 3.61,-110.01 -1.87,5.33
      c -0.23,0.78 -0.57,1.96 -0.93,3.4 -1.54,6.19 -1.96,11 -2.2,13.8 -0.79,9.19 0.19,14.09 0.4,28
      l 3.94,58.02

      m 11.4,-104.87 -2.84,8.64
      c -0.3,1.18 -0.69,2.85 -1.1,4.86 -1.11,5.42 -2.01,9.83 -2,15.3 0.01,4.1 0.52,7.37 1.2,11.68 0.09,0.55 0.39,2.46 1.2,6.44 1.24,6.09 2.32,10.5 2.8,12.48 2.24,9.34 3.44,17.22 4,20.94 0.64,4.24 1.23,9.35 1.81,16.53

      m -2.93,-95.7 -2,5.6
      c -0.33,0.98 -0.76,2.35 -1.2,4 -0.4,1.53 -1.64,6.46 -2,13.2 -0.16,2.98 -0.35,6.93 0.4,12 0.28,1.93 0.72,3.82 1.6,7.6 1.1,4.75 1.98,7.97 2.4,9.6 0.79,3.03 1.59,7.62 3.2,16.8 2.1,12.01 2.8,17.35 3.2,20.8 0.18,1.49 0.29,3.71 0.39,4.58

      M 76.16,10.05 75.87,130.3

      M 120.62,21.92
      c 0,0 -20.11,-6.73 -28.32,-9.47 -8.21,-2.74 -13.54,-3.8 -20.93,-3.8 -7.39,-0 -12.91,1.12 -21.12,3.86 -8.21,2.74 -28.13,9.41 -28.13,9.41

      m 26.88,-8.68 2.03,6.48
      c 0.17,0.62 0.41,1.5 0.68,2.56 1.65,6.54 2.24,11.58 2.36,12.64 0.57,5.06 0.46,9.01 0.4,11.2 -0.8,26.65 -1.6,36.4 -1.6,36.4 -0.79,9.56 -1.73,24.19 -2.7,41.92

      m -3.6,-110.02 1.87,5.33
      c 0.23,0.78 0.57,1.96 0.93,3.4 1.54,6.19 1.96,11 2.2,13.8 0.79,9.19 -0.19,14.09 -0.4,28
      l -4,58.05

      m -11.34,-104.9 2.84,8.64
      c 0.3,1.18 0.69,2.85 1.1,4.86 1.11,5.42 2.01,9.83 2,15.3 -0.01,4.1 -0.52,7.37 -1.2,11.68 -0.09,0.55 -0.39,2.46 -1.2,6.44 -1.24,6.09 -2.32,10.5 -2.8,12.48 -2.24,9.34 -3.44,17.22 -4,20.94 -0.64,4.24 -1.38,9.55 -1.96,16.72

      m 3.08,-95.89 2,5.6
      c 0.33,0.98 0.76,2.35 1.2,4 0.4,1.53 1.64,6.46 2,13.2 0.16,2.98 0.35,6.93 -0.4,12 -0.28,1.93 -0.72,3.82 -1.6,7.6 -1.1,4.75 -1.98,7.97 -2.4,9.6 -0.79,3.03 -1.59,7.62 -3.2,16.8 -2.1,12.01 -2.8,17.35 -3.2,20.8 -0.18,1.49 -0.27,4.03 -0.36,4.9

      M 66.43,9.99 66.77,130.33

      m 69.5,-25.68 -44.15,21.26
      c -10.82,5.6 -13,5.95 -20.75,5.95 -7.76,0 -9.76,-0.25 -20.57,-5.86 -10.82,-5.6 -44.33,-21.36 -44.33,-21.36

      M 72.25,9.77 72.14,130.5

      M 70.88,9.89 70.72,130.5"
    />
    <path
      key="outline"
      d="m 76.91,9.79 -0.29,120.69

      m 16.28,-116.66 -2.03,6.48
      c -0.17,0.62 -0.41,1.5 -0.68,2.56 -1.65,6.54 -2.24,11.58 -2.36,12.64 -0.57,5.06 -0.46,9.01 -0.4,11.2 0.8,26.65 1.6,36.4 1.6,36.4 0.79,9.56 1.86,24.05 2.83,41.78

      m 4.96,-109.92 -1.87,5.33
      c -0.23,0.78 -0.57,1.96 -0.93,3.4 -1.54,6.19 -1.96,11 -2.2,13.8 -0.79,9.19 0.19,14.09 0.4,28
      l 3.94,57.16

      m 10,-104.56 -2.84,8.58
      c -0.3,1.17 -0.69,2.83 -1.1,4.82 -1.11,5.39 -2.01,9.76 -2,15.2 0.01,4.07 0.52,7.32 1.2,11.6 0.09,0.55 0.39,2.44 1.2,6.4 1.24,6.05 2.32,10.42 2.8,12.4 2.24,9.28 3.44,17.1 4,20.8 0.64,4.2 1.34,10.28 1.92,17.4

      m -1.52,-95.8 -2,5.6
      c -0.33,0.98 -0.76,2.35 -1.2,4 -0.4,1.53 -1.64,6.46 -2,13.2 -0.16,2.98 -0.35,6.93 0.4,12 0.28,1.93 0.72,3.82 1.6,7.6 1.1,4.75 1.98,7.97 2.4,9.6 0.79,3.03 1.59,7.62 3.2,16.8 2.1,12.01 2.8,17.35 3.2,20.8 0.18,1.49 0.21,3.24 0.3,4.1

      m 4.63,-90.34
      c 0,0 -20.44,-6.86 -28.61,-9.61 -8.17,-2.74 -13.26,-3.66 -20.42,-3.66 -7.16,0 -12.14,0.88 -20.31,3.62 -8.17,2.74 -28.72,9.65 -28.72,9.65

      M 136.23,103.5
      c 0,0 -33.61,15.81 -44.43,21.41 -10.82,5.6 -12.78,5.8 -20.47,5.8 -7.69,0 -9.51,-0.52 -20.48,-5.81
      L 6.43,103.5

      M 122.03,18.1
      c -1.63,4.82 -3.12,7.5 -4.2,11.4 -0.76,2.75 -1.37,5.56 -1.6,8.4 -0.43,5.32 -0.65,10.77 0.4,16 1.37,6.87 4.86,13.15 7.6,19.6 1.61,3.79 3.02,6.1 5.2,11.2 4.17,9.75 5.98,16.11 6.4,17.6 0.74,2.66 1.27,4.88 1.6,6.4 0,0 -33.6,15.68 -44.62,21.35 -11.02,5.67 -13.62,5.45 -21.48,5.45 -7.86,0 -9.45,0.74 -20.47,-4.93 -11.02,-5.67 -45.63,-21.87 -45.63,-21.87 0.33,-1.52 0.86,-3.74 1.6,-6.4 0.42,-1.49 2.23,-7.85 6.4,-17.6 2.18,-5.1 3.59,-7.41 5.2,-11.2 2.74,-6.45 6.23,-12.73 7.6,-19.6 1.05,-5.23 0.83,-10.68 0.4,-16 -0.23,-2.84 -0.84,-5.65 -1.6,-8.4 -1.08,-3.9 -2.57,-6.58 -4.2,-11.4 0,0 20.53,-6.52 28.98,-9.2 8.45,-2.68 14.09,-3.7 21.72,-3.7 7.63,0 13.48,1.08 21.93,3.76
      z

      m -56.29,-8.31 0.29,120.55

      m -16.28,-116.52 2.03,6.48
      c 0.17,0.62 0.41,1.5 0.68,2.56 1.65,6.54 2.24,11.58 2.36,12.64 0.57,5.06 0.46,9.01 0.4,11.2 -0.8,26.65 -1.6,36.4 -1.6,36.4 -0.79,9.56 -1.75,24.09 -2.72,41.83

      m -5.07,-109.96 1.87,5.33
      c 0.23,0.78 0.57,1.96 0.93,3.4 1.54,6.19 1.96,11 2.2,13.8 0.79,9.19 -0.19,14.09 -0.4,28
      l -3.88,57.27

      m -10.06,-104.67 2.84,8.58
      c 0.3,1.17 0.69,2.83 1.1,4.82 1.11,5.39 2.01,9.76 2,15.2 -0.01,4.07 -0.52,7.32 -1.2,11.6 -0.09,0.55 -0.39,2.44 -1.2,6.4 -1.24,6.05 -2.32,10.42 -2.8,12.4 -2.24,9.28 -3.44,17.1 -4,20.8 -0.64,4.2 -1.36,10.5 -1.94,17.62

      m 1.54,-96.02 2,5.6
      c 0.33,0.98 0.76,2.35 1.2,4 0.4,1.53 1.64,6.46 2,13.2 0.16,2.98 0.35,6.93 -0.4,12 -0.28,1.93 -0.72,3.82 -1.6,7.6 -1.1,4.75 -1.98,7.97 -2.4,9.6 -0.79,3.03 -1.59,7.62 -3.2,16.8 -2.1,12.01 -2.8,17.35 -3.2,20.8 -0.18,1.49 -0.21,3.4 -0.3,4.27

      M 71.43,9.71
      V 130.68"
    />
  </>
)

/*
 * SVG elements for the back
 */
const Back = ({ stroke }) => (
  <>
    <path
      key="outline"
      d="m 217.01,115.03
      c 0,0 1.09,1.43 0.14,3.09 0,0 -1.17,0.5 -2.11,0.07 0,0.01 0.38,-1.96 -0.46,-3.02

      m 0.51,1.43
      c 0,0 -1.97,1.87 -1.71,4.18 0.26,2.31 0.72,-0.81 0.72,-0.81

      m 3.43,-3.09
      c 0,0 1.27,1.53 1.53,2.65 0.26,1.12 -0.71,1.18 -0.76,0.4 0.03,-1.54 -0.43,-2.61 -0.76,-3.04
      z

      m -5.55,3.42
      c -0.58,3.46 -2.06,7.02 -2.39,7.22 1.27,0.78 3.1,-0.13 3.1,-0.13 1.68,-1.99 2.26,-8.04 2.36,-9.21 -0,-0 -0,-0 -0,-0 0,0 0.01,-0.03 0.01,-0.04

      m 2.39,-2.19
      c 0.15,0.55 0.18,1.3 -0.26,2.11 0.08,3.74 2.52,8.87 2.52,8.87 0,0 1.19,1.43 2.24,0.94 1.05,-0.49 1.51,-1.08 1.51,-1.08 -0.82,-0.1 -2.67,-3.43 -2.99,-6.55

      m -3.02,-4.29
      c 0,0 0.01,0.01 0.01,0.01 0.07,0.06 0.22,0.18 0.39,0.33 0.6,0.49 1.74,1.49 2.34,2.93 0.04,0.09 0.08,0.18 0.11,0.27 0.04,0.12 0.08,0.25 0.11,0.37 0.03,0.12 0.05,0.25 0.06,0.38 0.02,0.16 0.04,0.33 0.07,0.49 0.01,0.07 0.02,0.15 0.04,0.22 0.01,0.06 0.02,0.12 0.03,0.18 0.04,0.21 0.09,0.43 0.14,0.64 0.57,1.1 1.06,2.26 1.31,3.4 0.09,0.17 0.19,0.32 0.28,0.47 0,0 0,0.01 0.01,0.01 0.09,0.14 0.18,0.28 0.27,0.4 0,0 0,0 0,0.01 0.01,0.02 0.02,0.03 0.03,0.04 0.04,0.06 0.09,0.11 0.13,0.16 0.03,0.03 0.06,0.07 0.08,0.1 0.03,0.04 0.07,0.07 0.1,0.11 0.03,0.03 0.06,0.06 0.09,0.09 0.04,0.03 0.07,0.07 0.11,0.09 0.01,0.01 0.01,0.01 0.02,0.01 0.05,0.04 0.09,0.06 0.14,0.09 0.01,0.01 0.03,0.01 0.04,0.02 0.01,0.01 0.02,0.01 0.03,0.01 0.03,0.01 0.05,0.01 0.07,0.02 0,0 -0.06,0.07 -0.16,0.17 0.74,-0.65 1.39,-1.92 0.36,-4.32 -1.79,-4.16 -6.63,-7.62 -6.63,-7.62
      h -0
      c -0.21,-0.14 -0.46,-0.22 -0.74,-0.23 -0.47,-0.03 -1.05,0.11 -1.69,0.37 0.08,0.51 -4.17,2.94 -6.09,4.56 -1.91,1.62 -1.56,3.51 -0.54,6.09 0,0 1.03,1.58 1.7,1.75 -0.02,-0.02 -0.06,-0.02 -0.08,-0.05 0.03,-0.01 0.07,-0.07 0.11,-0.1 0.38,-0.69 0.75,-1.61 1.04,-2.41 -0.16,-0.18 -1.81,-2.23 -0.19,-3.57 0.53,-0.44 1.03,-0.83 1.5,-1.19 0.04,-0.18 0.09,-0.35 0.13,-0.52 0.02,-0.07 0.04,-0.13 0.06,-0.19 0.03,-0.1 0.06,-0.21 0.1,-0.3 0.02,-0.06 0.05,-0.12 0.07,-0.18 0.04,-0.1 0.07,-0.2 0.11,-0.29 0.02,-0.06 0.05,-0.11 0.08,-0.17 0.04,-0.08 0.07,-0.17 0.11,-0.24 0.03,-0.07 0.07,-0.14 0.1,-0.2 0.03,-0.06 0.06,-0.12 0.1,-0.18 0.04,-0.07 0.08,-0.13 0.11,-0.2 0.03,-0.05 0.06,-0.11 0.1,-0.16 0.04,-0.06 0.08,-0.12 0.11,-0.18 0.03,-0.05 0.07,-0.1 0.1,-0.15 0.04,-0.05 0.07,-0.11 0.11,-0.16 0.04,-0.05 0.07,-0.1 0.11,-0.15 0.04,-0.05 0.07,-0.09 0.11,-0.14 0.03,-0.04 0.06,-0.08 0.09,-0.11 0.04,-0.05 0.08,-0.1 0.12,-0.14 0.02,-0.03 0.04,-0.05 0.06,-0.07 0.11,-0.13 0.22,-0.24 0.32,-0.34 0.1,-0.1 0.49,-0.52 0.57,-0.6

      m 0.26,2.38 -0.01,0.01
      c 0,0 -0,0.01 -0,0.02
      l 0.01,-0.01
      c 0,-0 0,0 0,0 0,-0 0,-0.01 0,-0.01
      z

      m 0.03,-0.31
      c -0,0.01 -0,0.02 -0,0.03 0,-0.01 0,-0.02 0,-0.03 -0,-0 -0,0 -0,0
      z

      m -0.03,0.32 -0.01,0.01
      c 0,0 -0.01,0.11 -0.02,0.2 0.01,-0.03 0.01,-0.09 0.03,-0.2
      z

      m -2.18,9.18
      c -0.71,9.24 -1.79,22.1 -2.42,24.64
      l 3.29,-0.45
      c 0,0 1.72,-30.88 1.92,-32.52 0.02,-0.16 0.01,-0.3 -0.01,-0.42 -0.21,-0.02 -0.43,-0.07 -0.63,-0.16

      m 2.38,-0.74
      c -0.02,0.08 -0.05,0.16 -0.08,0.24 0.03,-0.08 0.06,-0.16 0.08,-0.24
      z

      m -0.14,0.38
      c -0.04,0.09 -0.09,0.19 -0.14,0.29 0,0 -0.32,0.14 -0.77,0.21 -0.09,0.77 -0.72,6.59 -0.23,10.25 0.52,3.91 0.67,22.28 1.2,23.48
      l 2.85,1.32
      c 0,0 -1.34,-21.59 -1.66,-25.06 -0.22,-2.41 -0.28,-2.93 -0.3,-5.05 -0.54,-1.63 -1.03,-3.54 -1.07,-5.19 0.04,-0.08 0.08,-0.16 0.11,-0.24
      z

      m -9.66,2.66 -1.17,0.39

      m 16.77,-13.6 -7.48,2.44

      m -2.62,0.82 -2.43,0.83 -1.58,0.51

      m 14.12,-2.82 -4.71,1.54

      m -2.69,0.88 -6.84,2.24

      m 0.06,-6.23 14.19,4.68

      m -14.19,-2.89 13.82,4.51

      m 0.35,-19.31 -7.48,2.44

      m -2.62,0.82 -2.43,0.83 -1.58,0.51

      m 14.12,-2.82 -4.71,1.54

      m -2.69,0.88 -6.84,2.24

      m 0.06,-6.23 14.19,4.68

      m -14.19,-2.89 13.82,4.51

      m -0.3,-44.7 -6.83,2.23

      m -2.62,0.82 -2.43,0.83 -1.58,0.51

      m 14.12,-2.82 -4.71,1.54

      m -2.69,0.88 -6.84,2.24

      m 0.06,-6.23 14.19,4.68

      m -14.19,-2.89 13.82,4.51

      m 0.35,6.29 -7.48,2.44

      m -2.62,0.82 -2.43,0.83 -1.58,0.51

      m 14.12,-2.82 -4.71,1.54

      m -2.69,0.88 -6.84,2.24

      m 0.06,-6.23 14.19,4.68

      m -14.19,-2.89 13.82,4.51

      m 0.35,6.29 -7.48,2.44

      m -2.62,0.82 -2.43,0.83 -1.58,0.51

      m 14.12,-2.82 -4.71,1.54

      m -2.69,0.88 -6.84,2.24

      m 0.06,-6.23 14.19,4.68

      m -14.19,-2.89 13.82,4.51

      m 0.35,-44.51 -7.48,2.44

      m -2.62,0.82 -2.43,0.83 -1.58,0.51

      m 14.12,-2.82 -4.71,1.54

      m -2.69,0.88 -6.84,2.24

      m 0.06,-6.23 14.19,4.68

      m -14.19,-2.89 13.82,4.51

      m 0.35,-19.31 -7.48,2.44

      m -2.62,0.82 -2.43,0.83 -1.58,0.51

      m 14.12,-2.82 -4.71,1.54

      m -2.69,0.88 -6.84,2.24

      m 0.06,-6.23 14.19,4.68

      m -14.19,-2.89 13.82,4.51

      m 2.35,75.56 -7.96,2.59

      m -5.22,1.72 -1.27,0.41 -1.58,0.52 -2.85,0.93

      m 19.66,-4.63 -6.88,2.24

      m -13.32,-4.04 8.63,2.84

      m 5.44,1.9 5.35,1.66

      m -18.88,-4.43 2.72,0.89 0.31,0.1 3.23,1.06

      m 9.41,3.07 4.01,1.31

      m -0.4,-21.2 -2.52,0.83 -7.67,2.5

      m -2.62,0.83 -2.43,0.82 -4.43,1.45

      m 19.66,-4.63 -7.4,2.42

      m -2.69,0.88 -8.89,2.9

      m 0,-7.6 18.2,6 0.5,0.17

      m -19.38,-4.6 19.68,6.43

      m -0.4,-20.94 -2.02,0.66 -7.37,2.41

      m -2.62,0.83 -2.43,0.82 -4.43,1.45

      m 19.66,-4.63 -2.88,0.94 -4.52,1.48

      m -2.78,0.91 -9.37,3.06

      m -0.65,-8.19 19.42,6.4

      m -18.88,-4.43 17.68,5.78 2,0.65

      m -0.8,-20.94 -9.4,3.07

      m -2.62,0.83 -2.43,0.82 -4.43,1.45

      m 19.66,-4.63 -7.4,2.42

      m -2.78,0.91 -9.37,3.06

      m -0.65,-8.19 19.42,6.4

      m -18.88,-4.43 19.68,6.43

      m -0.8,-20.94 -9.4,3.07

      m -2.62,0.83 -2.43,0.82 -4.43,1.45

      m 19.66,-4.63 -2.84,0.93 -4.56,1.49

      m -2.69,0.88 -9.46,3.09

      m -0.65,-8.19 19.42,6.4

      m -18.88,-4.43 19.68,6.43

      m -0.8,-20.54 -9.4,3.07

      m -2.62,0.83 -2.43,0.82 -4.43,1.45

      m 19.66,-4.63 -7.4,2.42

      m -2.69,0.88 -9.46,3.09

      m -0.65,-8.19 19.42,6.4

      m -18.88,-4.43 19.68,6.43

      m -0.8,-20.94 -9.4,3.07

      m -2.62,0.83 -2.43,0.82 -4.43,1.45

      m 19.66,-4.63 -7.4,2.42

      m -2.69,0.88 -9.46,3.09

      m -0.65,-8.19 19.42,6.4

      m -18.88,-4.43 19.68,6.43

      m -0.8,-20.94 -9.4,3.07

      m -2.62,0.83 -2.43,0.82 -4.43,1.45

      m 19.66,-4.63 -1.78,0.58 -5.62,1.84

      m -2.69,0.88 -9.46,3.09

      m -0.65,-8.19 2.16,0.72 17.26,5.68

      m -18.88,-4.43 19.68,6.43

      m 2.2,87.9
      c 0,0.83 -0.67,1.5 -1.5,1.5 -0.83,0 -1.5,-0.67 -1.5,-1.5 0,-0.83 0.67,-1.5 1.5,-1.5 0.83,0 1.5,0.67 1.5,1.5
      z

      m 0,-6.4
      c 0,0.83 -0.67,1.5 -1.5,1.5 -0.83,0 -1.5,-0.67 -1.5,-1.5 0,-0.83 0.67,-1.5 1.5,-1.5 0.83,0 1.5,0.67 1.5,1.5
      z

      m 0,-6.4
      c 0,0.83 -0.67,1.5 -1.5,1.5 -0.83,0 -1.5,-0.67 -1.5,-1.5 0,-0.83 0.67,-1.5 1.5,-1.5 0.83,0 1.5,0.67 1.5,1.5
      z

      m 0,-6.4
      c 0,0.83 -0.67,1.5 -1.5,1.5 -0.83,0 -1.5,-0.67 -1.5,-1.5 0,-0.83 0.67,-1.5 1.5,-1.5 0.83,0 1.5,0.67 1.5,1.5
      z

      m 0,-6.4
      c 0,0.83 -0.67,1.5 -1.5,1.5 -0.83,0 -1.5,-0.67 -1.5,-1.5 0,-0.83 0.67,-1.5 1.5,-1.5 0.83,0 1.5,0.67 1.5,1.5
      z

      m 0,-6.4
      c 0,0.83 -0.67,1.5 -1.5,1.5 -0.83,0 -1.5,-0.67 -1.5,-1.5 0,-0.83 0.67,-1.5 1.5,-1.5 0.83,0 1.5,0.67 1.5,1.5
      z

      m 0,-6.4
      c 0,0.83 -0.67,1.5 -1.5,1.5 -0.83,0 -1.5,-0.67 -1.5,-1.5 0,-0.83 0.67,-1.5 1.5,-1.5 0.83,0 1.5,0.67 1.5,1.5
      z

      m 0,-6.4
      c 0,0.83 -0.67,1.5 -1.5,1.5 -0.83,0 -1.5,-0.67 -1.5,-1.5 0,-0.83 0.67,-1.5 1.5,-1.5 0.83,0 1.5,0.67 1.5,1.5
      z

      m 0,-6.4
      c 0,0.83 -0.67,1.5 -1.5,1.5 -0.83,0 -1.5,-0.67 -1.5,-1.5 0,-0.83 0.67,-1.5 1.5,-1.5 0.83,0 1.5,0.67 1.5,1.5
      z

      m 0,-6.4
      c 0,0.83 -0.67,1.5 -1.5,1.5 -0.83,0 -1.5,-0.67 -1.5,-1.5 0,-0.83 0.67,-1.5 1.5,-1.5 0.83,0 1.5,0.67 1.5,1.5
      z

      m 0,-6
      c 0,0.83 -0.67,1.5 -1.5,1.5 -0.83,0 -1.5,-0.67 -1.5,-1.5 0,-0.83 0.67,-1.5 1.5,-1.5 0.83,0 1.5,0.67 1.5,1.5
      z

      m 0,-6.4
      c 0,0.83 -0.67,1.5 -1.5,1.5 -0.83,0 -1.5,-0.67 -1.5,-1.5 0,-0.83 0.67,-1.5 1.5,-1.5 0.83,0 1.5,0.67 1.5,1.5
      z

      m 0,-6.4
      c 0,0.83 -0.67,1.5 -1.5,1.5 -0.83,0 -1.5,-0.67 -1.5,-1.5 0,-0.83 0.67,-1.5 1.5,-1.5 0.83,0 1.5,0.67 1.5,1.5
      z

      m 0,-6.4
      c 0,0.83 -0.67,1.5 -1.5,1.5 -0.83,0 -1.5,-0.67 -1.5,-1.5 0,-0.83 0.67,-1.5 1.5,-1.5 0.83,0 1.5,0.67 1.5,1.5
      z

      m 0,-6.4
      c 0,0.83 -0.67,1.5 -1.5,1.5 -0.83,0 -1.5,-0.67 -1.5,-1.5 0,-0.83 0.67,-1.5 1.5,-1.5 0.83,0 1.5,0.67 1.5,1.5
      z

      m 0,-6.4
      c 0,0.83 -0.67,1.5 -1.5,1.5 -0.83,0 -1.5,-0.67 -1.5,-1.5 0,-0.83 0.67,-1.5 1.5,-1.5 0.83,0 1.5,0.67 1.5,1.5
      z

      m -21.6,96
      c 0,0.83 -0.67,1.5 -1.5,1.5 -0.83,0 -1.5,-0.67 -1.5,-1.5 0,-0.83 0.67,-1.5 1.5,-1.5 0.83,0 1.5,0.67 1.5,1.5
      z

      m 0,-6.4
      c 0,0.83 -0.67,1.5 -1.5,1.5 -0.83,0 -1.5,-0.67 -1.5,-1.5 0,-0.83 0.67,-1.5 1.5,-1.5 0.83,0 1.5,0.67 1.5,1.5
      z

      m 0,-6.4
      c 0,0.83 -0.67,1.5 -1.5,1.5 -0.83,0 -1.5,-0.67 -1.5,-1.5 0,-0.83 0.67,-1.5 1.5,-1.5 0.83,0 1.5,0.67 1.5,1.5
      z

      m 0,-6.4
      c 0,0.83 -0.67,1.5 -1.5,1.5 -0.83,0 -1.5,-0.67 -1.5,-1.5 0,-0.83 0.67,-1.5 1.5,-1.5 0.83,0 1.5,0.67 1.5,1.5
      z

      m 0,-6.4
      c 0,0.83 -0.67,1.5 -1.5,1.5 -0.83,0 -1.5,-0.67 -1.5,-1.5 0,-0.83 0.67,-1.5 1.5,-1.5 0.83,0 1.5,0.67 1.5,1.5
      z

      m 0,-6.4
      c 0,0.83 -0.67,1.5 -1.5,1.5 -0.83,0 -1.5,-0.67 -1.5,-1.5 0,-0.83 0.67,-1.5 1.5,-1.5 0.83,0 1.5,0.67 1.5,1.5
      z

      m 0,-6.4
      c 0,0.83 -0.67,1.5 -1.5,1.5 -0.83,0 -1.5,-0.67 -1.5,-1.5 0,-0.83 0.67,-1.5 1.5,-1.5 0.83,0 1.5,0.67 1.5,1.5
      z

      m 0,-6.4
      c 0,0.83 -0.67,1.5 -1.5,1.5 -0.83,0 -1.5,-0.67 -1.5,-1.5 0,-0.83 0.67,-1.5 1.5,-1.5 0.83,0 1.5,0.67 1.5,1.5
      z

      m 0,-6.4
      c 0,0.83 -0.67,1.5 -1.5,1.5 -0.83,0 -1.5,-0.67 -1.5,-1.5 0,-0.83 0.67,-1.5 1.5,-1.5 0.83,0 1.5,0.67 1.5,1.5
      z

      m 0,-6.4
      c 0,0.83 -0.67,1.5 -1.5,1.5 -0.83,0 -1.5,-0.67 -1.5,-1.5 0,-0.83 0.67,-1.5 1.5,-1.5 0.83,0 1.5,0.67 1.5,1.5
      z

      m 0,-6
      c 0,0.83 -0.67,1.5 -1.5,1.5 -0.83,0 -1.5,-0.67 -1.5,-1.5 0,-0.83 0.67,-1.5 1.5,-1.5 0.83,0 1.5,0.67 1.5,1.5
      z

      m 0,-6.4
      c 0,0.83 -0.67,1.5 -1.5,1.5 -0.83,0 -1.5,-0.67 -1.5,-1.5 0,-0.83 0.67,-1.5 1.5,-1.5 0.83,0 1.5,0.67 1.5,1.5
      z

      m 0,-6.4
      c 0,0.83 -0.67,1.5 -1.5,1.5 -0.83,0 -1.5,-0.67 -1.5,-1.5 0,-0.83 0.67,-1.5 1.5,-1.5 0.83,0 1.5,0.67 1.5,1.5
      z

      m 0,-6.4
      c 0,0.83 -0.67,1.5 -1.5,1.5 -0.83,0 -1.5,-0.67 -1.5,-1.5 0,-0.83 0.67,-1.5 1.5,-1.5 0.83,0 1.5,0.67 1.5,1.5
      z

      m 0,-6.4
      c 0,0.83 -0.67,1.5 -1.5,1.5 -0.83,0 -1.5,-0.67 -1.5,-1.5 0,-0.83 0.67,-1.5 1.5,-1.5 0.83,0 1.5,0.67 1.5,1.5
      z

      m 0,-6.4
      c 0,0.83 -0.67,1.5 -1.5,1.5 -0.83,0 -1.5,-0.67 -1.5,-1.5 0,-0.83 0.67,-1.5 1.5,-1.5 0.83,0 1.5,0.67 1.5,1.5
      z

      m 2.28,-0.05 -0.01,-9.93
      c 0,0 -14.08,0.3 -21.09,0.84 -7.46,0.57 -22.31,2.54 -22.31,2.54 1.64,4.83 3.13,8.7 4.22,11.41 0.79,1.97 1.88,4.6 3.22,8.41 0.35,1 0.9,2.93 2.01,6.81 0.61,2.14 0.87,3.09 0.8,4.4 -0.11,2.37 -1.17,4.09 -1.61,4.8 0,0 -1.52,2.49 -10.85,19.62 -1.94,3.55 -3.03,6.11 -5.22,11.21 -4.19,9.76 -6.01,16.12 -6.43,17.61 -0.75,2.66 -1.27,4.89 -1.61,6.41 0,0 29.61,17.02 45.46,23.2 4.45,1.73 13.8,3.84 13.8,3.84

      m -0.31,-109.35 0.01,2.7

      m 0,1.76 0.02,6.52

      m 0,1.81 0,2.72

      m 0,1.75 0.02,6.5

      m 0,1.82 0,2.69

      m 0,1.79 0.02,6.17

      m 0,1.76 0.01,2.63

      m 0,1.84 0.01,6.57

      m 0,1.81 0.01,2.62

      m 0,1.79 0.02,6.6

      m 0,1.78 0,2.59

      m 0,1.78 0.02,6.78

      m 0,1.77 0.01,2.26

      m 0,1.86 0.01,5.25
      v 1.5

      m 0.01,1.8 0,2.6

      m 0.02,9.24 0.02,8.25

      M 196.39,19.65
      c 0.17,0.62 0.61,2.15 0.88,3.21 1.65,6.54 2.24,11.58 2.36,12.64 0.57,5.06 0.46,9.01 0.4,11.2 -0.8,26.65 -1.6,36.4 -1.6,36.4 -0.79,9.56 -1.83,25.47 -2.8,43.2

      M 192.33,19.93
      c 0.23,0.78 0.73,2.32 1.09,3.76 1.54,6.19 1.96,11 2.2,13.8 0.79,9.19 -0.19,14.09 -0.4,28
      l -4,58.8

      m -8.95,-103.45 1.85,5.83
      c 0.3,1.17 0.69,2.83 1.1,4.82 1.11,5.39 2.01,9.76 2,15.2 -0.01,4.07 -0.52,7.32 -1.2,11.6 -0.09,0.55 -0.39,2.44 -1.2,6.4 -1.24,6.05 -2.32,10.42 -2.8,12.4 -2.24,9.28 -3.44,17.1 -4,20.8 -0.64,4.2 -1.44,12.09 -2.02,19.21

      m 2.3,-95.84
      c 0.33,0.98 2.08,6.18 2.52,7.83 0.4,1.53 1.64,6.46 2,13.2 0.16,2.98 0.35,6.93 -0.4,12 -0.28,1.93 -0.72,3.82 -1.6,7.6 -1.1,4.75 -1.98,7.97 -2.4,9.6 -0.79,3.03 -1.59,7.62 -3.2,16.8 -2.1,12.01 -2.8,17.35 -3.2,20.8 -0.18,1.49 -0.34,4.77 -0.44,5.64

      m -4.5,-91.86
      c 0,0 14.04,-2.07 21.1,-2.71 6.93,-0.62 20.84,-1.08 20.84,-1.08

      m -57.81,84.38
      c 0,0 29.26,17.18 45.02,23.27 4.1,1.58 12.74,3.38 12.74,3.38

      m 14.3,-103.93 -0.01,3.06

      m -0,1.74 -0.01,6.2

      m -0,1.8 -0.01,3.04

      m -0,1.74 -0.02,6.23

      m -0,1.79 -0.01,3.02

      m -0,1.74 -0.01,5.85

      m -0,1.72 -0.01,3.08

      m -0,1.74 -0.01,6.27

      m -0,1.8 -0.01,2.98

      m -0,1.74 -0.02,6.4

      m -0,1.68 -0,2.96

      m -0,1.74 -0.02,5.95
      v 0.23

      m -0,1.79 -0.01,3.21

      m -0,1.74 -0.02,6.2

      m -0,1.79 -0,2.93

      m -0,1.74 -0,1.3

      m -0.01,5.78 -0.02,8.7

      M 235.83,19.79
      c -0.17,0.62 -0.57,2.01 -0.84,3.06 -1.65,6.54 -2.24,11.58 -2.36,12.64 -0.57,5.06 -0.46,9.01 -0.4,11.2 0.8,26.65 1.6,36.4 1.6,36.4 0.79,9.56 1.83,25.47 2.8,43.2

      M 239.87,19.97
      c -0.23,0.78 -0.69,2.28 -1.05,3.73 -1.54,6.19 -1.96,11 -2.2,13.8 -0.79,9.19 0.19,14.09 0.4,28
      l 4,58.8

      M 249.88,20.72
      c -0.63,1.34 -2.58,8.86 -2.85,10.78 -1.11,5.39 -2.01,9.76 -2,15.2 0.01,4.07 0.52,7.32 1.2,11.6 0.09,0.55 0.39,2.44 1.2,6.4 1.24,6.05 2.32,10.42 2.8,12.4 2.24,9.28 3.44,17.1 4,20.8 0.64,4.2 1.42,11.28 2,18.4

      m -2.25,-94.93 -1.35,3.73
      c -0.33,0.98 -0.76,2.35 -1.2,4 -0.4,1.53 -1.64,6.46 -2,13.2 -0.16,2.98 -0.35,6.93 0.4,12 0.28,1.93 0.72,3.82 1.6,7.6 1.1,4.75 1.98,7.97 2.4,9.6 0.79,3.03 1.59,7.62 3.2,16.8 2.1,12.01 2.8,17.35 3.2,20.8 0.18,1.49 0.31,4.33 0.4,5.2

      m 4.54,-91.41 -15.31,-2.18
      c 0,0 -3.35,-0.35 -5.03,-0.47 -7.2,-0.53 -21.63,-1.16 -21.63,-1.16

      m 57.83,84.4
      c 0,0 -29.35,17.22 -45.14,23.37 -4.18,1.63 -13,3.53 -13,3.53

      m 0.13,5.38
      c 0,0 9.46,-2.16 13.96,-3.91 15.76,-6.16 45.24,-23.05 45.24,-23.05 -0.33,-1.52 -0.86,-3.74 -1.61,-6.41 -0.42,-1.49 -2.25,-7.85 -6.45,-17.61 -2.2,-5.1 -3.3,-7.66 -5.24,-11.21 -9.37,-17.12 -10.89,-19.62 -10.89,-19.62 -0.44,-0.72 -1.5,-2.44 -1.61,-4.8 -0.06,-1.31 0.19,-2.26 0.81,-4.4 1.11,-3.88 1.67,-5.81 2.02,-6.81 1.34,-3.81 2.43,-6.44 3.23,-8.41 1.1,-2.71 2.59,-6.58 4.24,-11.41 0,0 -14.4,-1.93 -21.65,-2.5 -7.31,-0.58 -21.99,-0.93 -21.99,-0.93
      l 0.22,9.72"
    />
    <path
      key="stitches"
      {...dashed(stroke)}
      {...thin(stroke)}
      d="m 195.73,19.78
      c 0.17,0.62 0.42,1.43 0.69,2.48 1.65,6.54 2.24,11.58 2.36,12.64 0.57,5.06 0.46,9.01 0.4,11.2 -0.8,26.65 -1.6,36.4 -1.6,36.4 -0.79,9.56 -1.83,25.47 -2.8,43.2

      M 193.27,19.95
      c 0.23,0.78 0.45,1.75 0.81,3.2 1.54,6.19 1.96,11 2.2,13.8 0.79,9.19 -0.19,14.09 -0.4,28
      l -4,59.6

      m -10.4,-103.64 1.9,5.82
      c 0.3,1.18 0.69,2.85 1.1,4.86 1.11,5.42 2.01,9.83 2,15.3 -0.01,4.1 -0.52,7.37 -1.2,11.68 -0.09,0.55 -0.39,2.46 -1.2,6.44 -1.24,6.09 -2.32,10.5 -2.8,12.48 -2.24,9.34 -3.44,17.22 -4,20.94 -0.64,4.24 -1.41,11.04 -1.98,18.21

      m 3.87,-95.35 1.24,3.57
      c 0.33,0.98 0.76,2.35 1.2,4 0.4,1.53 1.64,6.46 2,13.2 0.16,2.98 0.35,6.93 -0.4,12 -0.28,1.93 -0.72,3.82 -1.6,7.6 -1.1,4.75 -1.98,7.97 -2.4,9.6 -0.79,3.03 -1.59,7.62 -3.2,16.8 -2.1,12.01 -2.8,17.35 -3.2,20.8 -0.18,1.49 -0.34,5.25 -0.44,6.12

      m 35.57,-95.55 0.04,4.76

      m -41.15,-2.28
      c 0,0 14.17,-2.02 21.3,-2.62 6.9,-0.59 20.75,-0.98 20.75,-0.98

      m -57.7,86.3
      c 18.05,10.09 37.41,20.52 44.63,22.94 4.36,1.46 7.65,2.44 13.36,3.65

      M 236.55,19.91
      c -0.18,0.62 -0.45,1.36 -0.73,2.41 -1.7,6.54 -2.32,11.57 -2.44,12.64 -0.59,5.06 -0.48,9 -0.41,11.19 0.82,26.63 1.65,36.38 1.65,36.38 0.81,9.55 1.89,25.46 2.89,43.18

      m 1.51,-105.77
      c -0.23,0.78 -0.58,1.76 -0.94,3.2 -1.54,6.19 -1.96,11 -2.2,13.8 -0.79,9.19 0.19,14.09 0.4,28
      l 4,59.6

      m -16.29,-16.78 -0.01,5.6

      m -0,1.79 -0.01,3.52

      m -0,1.74 -0.02,3.06

      m -0.02,2.81 -0.02,3.74

      m 57.08,-25.4
      c -14.66,7.75 -28.9,16.22 -44.23,22.76 -5.19,2.04 -9.13,2.57 -13.69,3.84

      m -15.1,-105.24 0,2.27
      v 0.42
      l 0,0.71

      m 0,1.79 0.01,5.84

      m 0,1.79 0.01,3.38

      m 0,1.79 0.01,5.86

      m 0.01,1.79 0,3.36

      m 0.01,1.78 0.01,5.48

      m 0,1.79 0.01,3.33

      m 0,1.79 0.01,5.89

      m 0,1.79 0.01,3.32

      m 0,1.79 0.02,5.91

      m 0,1.79 0.01,3.3

      m 0,1.79 0.01,6.06

      m 0,1.79 0.01,3.02

      m 0,1.79 0.01,4.64
      v 1.36

      m 0,1.86 0,0.37 0,2.56
      v 0.33

      m 15.86,-36.48 -0.01,5.74

      m -0,1.74 -0.01,3.56

      m -0,1.63 -0.01,5.69

      m -0,1.79 -0.01,3.8

      m 0.22,-86.58 -0.04,4.64

      m -0,1.72 -0.01,3.74

      m -0,1.74 -0.01,5.61

      m -0,1.8 -0.01,3.64

      m -0,1.74 -0.01,5.64

      m -0,1.79 -0.01,3.62

      m -0,1.74 -0.01,5.26

      m -0,1.79 -0.01,3.6

      m -0,1.74 -0.01,5.67

      m -0,1.8 -0.01,3.58

      m 26.65,-59.36 -1.93,5.78
      c -0.3,1.18 -0.69,2.85 -1.1,4.86 -1.11,5.42 -2.01,9.83 -2,15.3 0.01,4.1 0.52,7.37 1.2,11.68 0.09,0.55 0.39,2.46 1.2,6.44 1.24,6.09 2.32,10.5 2.8,12.48 2.24,9.34 3.44,17.22 4,20.94 0.64,4.24 1.42,10.15 2,17.33

      m -3.81,-94.53 -1.31,3.64
      c -0.33,0.98 -0.76,2.35 -1.2,4 -0.4,1.53 -1.64,6.46 -2,13.2 -0.16,2.98 -0.35,6.93 0.4,12 0.28,1.93 0.72,3.82 1.6,7.6 1.1,4.75 1.98,7.97 2.4,9.6 0.79,3.03 1.59,7.62 3.2,16.8 2.1,12.01 2.8,17.35 3.2,20.8 0.18,1.49 0.31,4.73 0.4,5.6

      m 5.59,-92.54
      c 0,0 -13.11,-1.9 -19.71,-2.47 -7.38,-0.64 -22.2,-1.08 -22.2,-1.08

      m -15.17,107.92 -0.1,3.47"
    />
  </>
)
