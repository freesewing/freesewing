---
title: "Bust-aligned buttons"
---

Select an optional bust-aligned button spacing strategy.

- Even spacing
- Split spacing
- Disabled

By default bust-aligned button spacing is "Disabled", and center front buttons are spaced without regard to the bustline. Choosing "Even spacing" or "Split spacing" will ensure that there is a button positioned on the bustline to prevent possible gaping.

- Even spacing: Button spacing is calculated for buttons above the bustline, and this spacing is used for all buttons. The `Button free length` setting is ignored for this option. This option might cause the bottommost button to be positioned in a non-optimal location. If this occurs, you may want to experiment with adding or subtracting a button to see if it produces a better design.
- Split spacing: Different button spacings are calculated and used for buttons above and below the bustline. Buttons above the bustline are spaced evenly. Buttons below the bustline are also spaced evenly, except for the topmost and bottommost buttons. The spacings for those buttons are shifted slightly to make the transition between the top and bottom spacings less noticeable. The `Button free length` setting is obeyed for this option. This option might cause non-optimal, visibly different spacings above and below the bustline. If this occurs, you may want to experiment with adding or subtracting a button to see if it produces a better design.
- Disabled: Even button spacing is calculated and used, without regard to the bustline. The `Button free length` setting is obeyed for this option.
