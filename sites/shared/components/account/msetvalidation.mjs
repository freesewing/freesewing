//  __SDEFILE__ - This file is a dependency for the stand-alone environment
import { formatMm } from '../../utils.mjs'

const descendingCheck = [
  ['hpsToWaistFront', 'hpsToBust'],
  ['hpsToWaistFront', 'waistToUnderbust'],
  ['hpsToWaistFront', 'waistToArmpit'],
  ['hpsToWaistBack', 'waistToArmpit'],
  ['shoulderToWrist', 'shoulderToElbow'],
  ['waistToFloor', 'waistToKnee', 'waistToUpperLeg', 'waistToSeat', 'waistToHips'],
  ['waistToFloor', 'inseam'],
  ['crossSeam', 'crossSeamFront'],
  ['seat', 'seatBack'],
  ['highBust', 'highBustFront'],
  ['chest', 'bustFront', 'bustSpan'],
  ['waist', 'waistBack'],
]

const constraintCheck = [
  {
    lhs: [
      { m: 'highBust', coefficient: 1 },
      { m: 'highBustFront', coefficient: -1 },
    ],
    rhs: [
      { m: 'chest', coefficient: 1 },
      { m: 'bustFront', coefficient: -1 },
    ],
    tolerance: 0.05,
    key: 'backChest',
  },
  {
    lhs: [{ m: 'hpsToWaistFront', coefficient: 1 }],
    rhs: [
      { m: 'hpsToBust', coefficient: 1 },
      { m: 'bustPointToUnderbust', coefficient: 1 },
      { m: 'waistToUnderbust', coefficient: 1 },
    ],
    lhsMustBeSmaller: true,
    tolerance: 0.1,
    key: 'bustFront',
  },
  {
    lhs: [{ m: 'waistToFloor', coefficient: 1 }],
    rhs: [
      { m: 'waistToUpperLeg', coefficient: 1 },
      { m: 'inseam', coefficient: 1 },
    ],
    tolerance: 0.1,
    lhsMustBeSmaller: true,
    key: 'waistToUpperLeg',
  },
  {
    lhs: [{ m: 'waist', coefficient: 1 }],
    rhs: [{ m: 'waistBack', coefficient: 2 }],
    tolerance: 0.1,
    lhsMustBeSmaller: true,
    key: 'waistBack',
  },
  {
    lhs: [{ m: 'chest', coefficient: 1 }],
    rhs: [{ m: 'bustFront', coefficient: 2 }],
    tolerance: 0.1,
    lhsMustBeSmaller: true,
    key: 'bustFront',
  },
  {
    lhs: [{ m: 'highBust', coefficient: 1 }],
    rhs: [{ m: 'highBustFront', coefficient: 2 }],
    tolerance: 0.1,
    key: 'highBustFront',
  },
]

function checkDescendingSet(t, set, warnings, measies) {
  let biggerValue = null
  let biggerMeasurement = null
  for (const measurement of set) {
    let value = measies[measurement]
    if (value !== null) {
      if (biggerValue !== null && value >= biggerValue) {
        warnings.push(t('shouldBeLarger', { lhs: t(biggerMeasurement), rhs: t(measurement) }))
      } else {
        biggerValue = value
        biggerMeasurement = measurement
      }
    }
  }
}

function formatSum(t, params) {
  let result = ''
  for (const e of params) {
    let prefix = ' + '
    if (e.coefficient === -1) {
      prefix = ' - '
    } else if (e.coefficient !== 1 && e.coefficient > 0) {
      prefix = ' + ' + e.coefficient + '×'
    } else if (e.coefficient !== 1 && e.coefficient < 0) {
      prefix = ' - ' + -e.coefficient + '×'
    }
    result += prefix + t(e.m)
  }
  return result.replaceAll(/^ \+ /g, '').trim()
}

function sumMeasurements(params, measies) {
  let result = 0
  for (const e of params) {
    if (!measies[e.m]) {
      return false
    }
    result += e.coefficient * measies[e.m]
  }
  return result
}

function formatWarningMessage(t, constraint, lhsSum, rhsSum, imperial) {
  let leftConstraint = formatSum(t, constraint.lhs)
  let rightConstraint = formatSum(t, constraint.rhs)

  return (
    t(constraint.key + '.t') +
    ': ' +
    t(constraint.lhsMustBeSmaller ? 'shouldBeSlightlySmaller' : 'shouldBeEqual', {
      lhsSum: formatMm(lhsSum, imperial),
      lhsConstraint: leftConstraint,
      rhsSum: formatMm(rhsSum, imperial),
      rhsConstraint: rightConstraint,
    }) +
    ' ' +
    t(constraint.key + '.d')
  )
}

function checkConstraint(t, constraint, warnings, measies, imperial) {
  let lhsSum = sumMeasurements(constraint.lhs, measies)
  let rhsSum = sumMeasurements(constraint.rhs, measies)
  if (lhsSum === false || rhsSum === false) {
    // Some measurements are missing
    return
  }
  const difference = Math.abs(((lhsSum - rhsSum) / (lhsSum + rhsSum)) * 2)
  if (difference <= constraint.tolerance) {
    // minor difference
    return
  }
  if (constraint.lhsMustBeSmaller) {
    if (lhsSum > rhsSum) {
      warnings.push(formatWarningMessage(t, constraint, lhsSum, rhsSum, imperial))
    }
  } else {
    warnings.push(formatWarningMessage(t, constraint, lhsSum, rhsSum, imperial))
  }
}

function checkDescendingSets(t, warnings, measies) {
  for (const e of descendingCheck) {
    checkDescendingSet(t, e, warnings, measies)
  }
}
function checkConstraints(t, warnings, measies, imperial) {
  for (const e of constraintCheck) {
    checkConstraint(t, e, warnings, measies, imperial)
  }
}

export function validateMset(t, measies, imperial) {
  const warnings = []
  checkDescendingSets(t, warnings, measies)
  checkConstraints(t, warnings, measies, imperial)
  if (warnings.length === 0) {
    warnings.push(t('validationSuccess'))
  }
  return warnings
}
