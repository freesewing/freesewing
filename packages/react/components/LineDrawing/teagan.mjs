import React from 'react'
import { LineDrawingWrapper, thin, dashed } from './shared.mjs'

/*
 * This strokeScale factor is used to normalize the stroke across
 * designs so we have a consistent look when showing our collection
 */
const strokeScale = 0.5

/**
 * A linedrawing component for Teagan
 *
 * @param {object} props - All React props
 * @param {string} props.className - Any CSS classes to apply
 * @param {number} props.stroke - The stroke width to apply
 */
export const Teagan = ({ className, stroke = 1 }) => (
  <LineDrawingWrapper viewBox="0 0 170 90" {...{ className }}>
    <Front stroke={stroke * strokeScale} />
    <Back stroke={stroke * strokeScale} />
  </LineDrawingWrapper>
)

/**
 * A linedrawing component for the front of Teagan
 *
 * @param {object} props - All React props
 * @param {string} props.className - Any CSS classes to apply
 * @param {number} props.stroke - The stroke width to apply
 */
export const TeaganFront = ({ className, stroke = 1 }) => (
  <LineDrawingWrapper viewBox="-2 0 90 90" {...{ className }}>
    <Front stroke={stroke * strokeScale} />
  </LineDrawingWrapper>
)

/*
 * React component for the back
 */
export const TeaganBack = ({
  className = 'w-64', // CSS classes to apply
  stroke = 1, // Stroke width to use
}) => {
  // Normalize stroke across designs
  stroke = stroke * strokeScale

  return (
    <LineDrawingWrapper viewBox="85 0 85 90" {...{ className, stroke }}>
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
      d="M 54.584904,4.0137479 C 51.407545,6.6387691 46.596054,6.6410307 42.797276,6.7364187 38.998506,6.8318448 35.253233,6.5680491 32.090083,4.4056922 m 23.7707,-1.7487673 c -0.226967,1.3805877 -0.70758,2.4055001 -1.257793,3.4129229 -1.79755,3.2911993 -6.2235,5.4814032 -12.292379,5.4814032 -6.068878,0 -9.926077,-3.6731567 -10.937556,-5.6930103 C 30.676675,4.4676188 30.681427,3.9597594 30.573789,2.6569249 M 67.360442,83.637596 c -12.880611,1.343127 -33.90761,0.952872 -46.856766,0.02596 M 81.589265,35.722268 67.074634,38.175524 M 5.9038296,36.171725 19.405882,38.576654"
    />
    <path
      key="folds"
      opacity={0.3}
      d="M 70.604927,7.8173242 C 65.467797,19.5193 64.584133,27.06187 65.368485,32.535438 M 15.896282,7.8173242 C 21.033411,19.5193 22.087929,26.927052 21.303578,32.400621"
    />
    <path
      key="outline"
      d="M 54.849304,2.6569249 C 51.498412,5.080635 46.631917,5.0712645 42.523261,5.1686755 38.414617,5.2660102 34.386724,4.7308408 31.585268,2.6569249 M 18.601133,6.1964535 C 18.059196,6.3529524 16.917532,6.7591626 15.896282,7.8173242 10.817273,19.976317 7.9895978,25.631963 5.2511921,38.499302 l 13.4772069,2.282212 2.57518,-8.380894 c -0.556419,16.573489 -0.820761,53.949473 -0.820761,53.949473 18.517936,1.450282 28.387462,1.14069 47.062271,0.268834 0,0 -2.371454,-36.98114 -2.176604,-54.083481 l 2.298993,7.599865 14.499934,-2.469782 C 79.159569,23.828122 76.609669,19.261934 70.604927,7.8173242 69.583693,6.7591626 68.442017,6.3527616 67.900088,6.1964535 L 54.849304,2.6569249 C 54.572522,5.8486492 50.410016,10.491775 42.613516,10.44712 35.304224,10.405256 31.86586,5.880341 31.585268,2.6569249 Z"
    />
  </>
)

/*
 * SVG elements for the back
 */
const Back = ({ stroke }) => (
  <>
    <path
      key="stitches"
      {...dashed(stroke)}
      {...thin(stroke)}
      d="m 112.93882,2.9758369 c 0,0 1.00458,3.552872 12.67873,3.592531 11.67414,0.03967 13.34077,-3.489055 13.34077,-3.489055 m 10.9664,80.5820081 c -12.89497,1.34353 -33.94542,0.95316 -46.90901,0.026 m 61.1537,-47.953317 -14.50137,2.547881 m -61.268455,-2.098291 13.502445,2.450004"
    />
    <path
      key="folds"
      opacity={0.3}
      d="M 153.17283,7.8188359 C 148.02997,19.524239 147.14532,25.048574 147.93055,30.523747 M 98.403176,7.8188359 C 103.54604,19.524239 104.60173,24.913717 103.8165,30.38889 m 4.78524,20.949681 c 6.03678,-4.14932 21.64867,-3.66915 31.6282,-8.061709 m -21.58001,11.172179 c 10.51228,-3.49506 15.19194,0.58831 22.83301,-0.81461"
    />
    <path
      key="outline"
      d="m 125.05984,5.1694109 c -4.11322,0.09736 -8.1456,-0.437962 -10.95018,-2.512486 l -12.99861,3.540566 c -0.54254,0.156544 -1.685484,0.562873 -2.707874,1.621345 -5.08468,12.1625561 -7.9155,17.8220271 -10.656953,30.6931421 l 13.491047,2.28288 2.57923,-8.385525 c -0.55703,16.578348 -0.82167,53.965289 -0.82167,53.965289 18.53859,1.450699 28.41911,1.141019 47.11475,0.26891 0,0 -2.37411,-36.99198 -2.17903,-54.099334 l 2.30273,7.60427 14.51492,-2.470509 c -3.0112,-13.841465 -5.56394,-18.41116 -11.57537,-29.8591231 -1.02238,-1.058472 -2.16533,-1.464992 -2.70786,-1.621345 l -13.06533,-3.540566 c -3.35464,2.42442 -8.22655,2.415047 -12.3398,2.512486 z"
    />
  </>
)
