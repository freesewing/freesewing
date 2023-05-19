#!/bin/bash
#
# For reasons that I don't know nor have been able to fix, Crowding
# sometimes (but not always) changes the frontmatter marker from:
# --- to: - - -
# This causes the webpack loader to not recognize it as frontmatter,
# which is not good and causes all sorts of problems.
# This script changes all occurances of `- - -` on a single line to `---`
# for all files under the markdown folder.
find ./markdown/. -type f -name "*.md" -exec sed -i "s/^- - -$/---/g" {} +
