---
title: Measurements
---

Below are the standard measurement names for all measurements
currently used by the designs we maintain:

| Measurement | Description |
|-------------|-------------|
| `ankle` | Ankle circumference |
| `biceps` | Biceps circumference |
| `bustFront` | Front part of `chest` circumference |
| `bustPointToUnderbust` | Distance from bust point to `underbust` circumference |
| `bustSpan`  | Distance between two bust apex points |
| `chest` | Chest circumference at fullest part (but see [pluginBust below](#measurements-from-pluginbust)) |
| `crossSeam` | Distance from `waist` line in front, through legs, to `waist` line in back |
| `crossSeamFront` | Front portion of `crossSeam` |
| `crotchDepth` | Height from surface to `waist` line when seated |
| `head` | Head circumference |
| `heel` | Heel circumference |
| `highBust` | Chest circumference just under the arms |
| `highBustFront` | Front portion of `highBust` |
| `hips` | Hips circumference |
| `hpsToBust` | [High point shoulder][hps] to `bust` line |
| `hpsToWaistBack` | [High point shoulder][hps] to `waist` line in back |
| `hpsToWaistFront` | [High point shoulder][hps] to `waist` line in front |
| `inseam` | Distance from crotch fork to floor |
| `knee` | Knee circumference |
| `neck` | Neck circumference |
| `seat` | Seat circumference |
| `seatBack` | Back portion of `seat` circumference |
| `shoulderSlope` | Angle that the shoulder line slopes downward, in degrees |
| `shoulderToElbow` | Distance from tip of shoulder to elbow |
| `shoulderToShoulder` | Distance from tip of one shoulder to the other, across the back |
| `shoulderToWrist` | Distance from tip of shoulder to wrist |
| `underbust` | Chest circumference just below the breasts |
| `upperLeg` | Leg circumference near the top of the leg |
| `waist` | Waist circumference |
| `waistBack` | Back portion of `waist` circumference |
| `waistToFloor` | Distance from `waist` line to floor |
| `waistToHips` | Distance from `waist` line to `hips` circumference, along side of body |
| `waistToKnee` | Distance from `waist` line to `knee` circumference, along side of body |
| `waistToSeat` | Distance from `waist` line to `seat` circumference, along side of body |
| `waistToUnderbust` | Distance from `waist` line to `underbust` circumference, along side of body |
| `waistToUpperLeg` | Distance from `waist` line to `upperLeg` circumference, along side of body |
| `wrist` | Wrist circumference |

[hps]: https://freesewing.org/docs/measurements/hps/

## Measurements from `plugin-measurements`

In addition, the [@freesewing/plugin-measurements](/reference/plugins/measurements)
plugin will add the following measurements if the required measurements
they are derived from are provided:

| Measurement | Description | Required Measurements |
|-------------|-------------|-----------|
| `seatFront` | Front portion of `seat` circumference | `seat`, `seatBack` |
| `seatBackArc` | Half of `seatBack` | `seat`, `seatBack` |
| `seatFrontArc` | Half of `seatFront` | `seat`, `seatBack` |
| `waistFront` | Front portion of `waist` circumference | `waist`, `waistBack` |
| `waistBackArc` | Half of `waistBack` | `waist`, `waistBack` |
| `waistFrontArc` | Half of `waistFront` | `waist`, `waistBack` |
| `crossSeamBack` | Back portion of `crossSeam` | `crossSeam`,  `crossSeamFront` |

## Measurements from `plugin-bust`

In addition, the [@freesewing/plugin-bust](/reference/plugins/bust)
plugin will add and modify the following measurements.

| Measurement | Description |
|-------------|-------------|
| `bust` | Bust circumference (`bust` is set to the value of `chest`) |
| `chest` | (`chest` is changed to the value of `highBust`) |

<Tip>

##### How to take measurements is documented on FreeSewing.org

For instructions on how to take measurements, please refer to our
maker documentation on FreeSewing.org: https://freesewing.org/docs/measurements/

</Tip>
