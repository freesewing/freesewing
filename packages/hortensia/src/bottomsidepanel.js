export default function (points, topMiddle, w, h, sizeRatio) {
  const c = 0.551915024494 // circle constant
  const cornerCP = 20 * sizeRatio

  points.bottomLeft = topMiddle.shift(180, w / 2).shift(270, h)
  points.bottomLeftU = points.bottomLeft.shift(90, cornerCP)
  points.bottomLeftUcp = points.bottomLeftU.shift(270, cornerCP * c)
  points.bottomLeftR = points.bottomLeft.shift(0, cornerCP)
  points.bottomLeftRcp = points.bottomLeftR.shift(180, cornerCP * c)
  points.bottomRight = topMiddle.shift(0, w / 2).shift(270, h)
  points.bottomRightU = points.bottomRight.shift(90, cornerCP)
  points.bottomRightUcp = points.bottomRightU.shift(270, cornerCP * c)
  points.bottomRightL = points.bottomRight.shift(180, cornerCP)
  points.bottomRightLcp = points.bottomRightL.shift(0, cornerCP * c)
}
