---
title: flip
---

The `flip` macro flips (mirrors) an entire part vertically around the Y-axis. It takes no arguments.

Under the hood, this macro will:

 - Go through all Points in your Part, and multiply their X-coordinate by -1
 - Go through all the Paths in your Part, and for each drawing operation will multiply the X-coordinare by -1
 - Go through all the Snippets in your Part and multiply the X-coordinate of the anchor point by -1

<Note>

The `flip` macro is provided by the [flip plugin](/reference/plugins/flip).

</Note>



