#!/bin/bash
#
# For reasons that I don't know nor have been able to fix, Crowding
# sometimes (but not always) changes the frontmatter marker from:
# --- to: - - -
# This causes the webpack loader to not recognize it as frontmatter,
# which is not good and causes all sorts of problems.
# This script changes all occurances of `- - -` on a single line to `---`
# for all files under the markdown folder.
find ./markdown/org/. -type f -name "*.md" -exec sed -i "s/^- - -$/---/g" {} +
# Replace translated frontmatter keys
find ./markdown/org/docs/. -type f -name "fr.md" -exec sed -i "s/^titre: /title: /g" {} +
find ./markdown/org/docs/. -type f -name "fr.md" -exec sed -i "s/^titre : /title: /g" {} +
find ./markdown/org/docs/. -type f -name "nl.md" -exec sed -i "s/^titel: /title: /g" {} +
find ./markdown/org/docs/. -type f -name "uk.md" -exec sed -i "s/^Назва: /title: /g" {} +
find ./markdown/org/docs/. -type f -name "uk.md" -exec sed -i "s/^\"Назва\": /title: /g" {} +
find ./markdown/org/docs/. -type f -name "uk.md" -exec sed -i "s/^заголовок: /title: /g" {} +
find ./markdown/org/docs/. -type f -name "uk.md" -exec sed -i "s/^\"Корнеліус велосипедні штани\": /title: /g" {} +
find ./markdown/org/docs/. -type f -name "*.md" -exec sed -i "s/^title : /title: /g" {} +
find ./markdown/org/. -type f -name "*.md" -exec sed -i "s/^title:\"/title: \"/g" {} +
find ./markdown/org/. -type f -name "*.md" -exec sed -i "s.<0>..g" {} +
find ./markdown/org/. -type f -name "*.md" -exec sed -i "s.<li>..g" {} +
find ./markdown/org/. -type f -name "*.md" -exec sed -i "s.<em>..g" {} +
find ./markdown/org/. -type f -name "*.md" -exec sed -i "s.<ul>..g" {} +
find ./markdown/org/. -type f -name "*.md" -exec sed -i "s.<ol>..g" {} +
find ./markdown/org/. -type f -name "*.md" -exec sed -i "s.<p>..g" {} +
find ./markdown/org/. -type f -name "*.md" -exec sed -i "s.</li>..g" {} +
find ./markdown/org/. -type f -name "*.md" -exec sed -i "s.</em>..g" {} +
find ./markdown/org/. -type f -name "*.md" -exec sed -i "s.</ul>..g" {} +
find ./markdown/org/. -type f -name "*.md" -exec sed -i "s.</ol>..g" {} +
find ./markdown/org/. -type f -name "*.md" -exec sed -i "s.</p>..g" {} +
find ./markdown/org/. -type f -name "*.md" -exec sed -i "s.<unk>..g" {} +
# Replace double quotes in Ukranian titles
find ./markdown/org/docs/designs/carlita/.. -type f -name "uk.md" -exec sed -i "s/ \"Карліта\": / 'Карліта': /g" {} +
find ./markdown/org/docs/designs/carlton/.. -type f -name "uk.md" -exec sed -i "s/ \"Карлтон\": / 'Карлтон': /g" {} +
find ./markdown/org/docs/designs/cathrin/.. -type f -name "uk.md" -exec sed -i "s/ \"Катрін\": / 'Катрін': /g" {} +
find ./markdown/org/docs/designs/diana/.. -type f -name "uk.md" -exec sed -i "s/ \"Діана\": / 'Діана': /g" {} +
find ./markdown/org/docs/designs/florence/.. -type f -name "uk.md" -exec sed -i "s/ \"Флоренція\": / 'Флоренція': /g" {} +
find ./markdown/org/docs/designs/florent/.. -type f -name "uk.md" -exec sed -i "s/ \"Флоран\": / 'Флоран': /g" {} +
find ./markdown/org/docs/designs/huey/.. -type f -name "uk.md" -exec sed -i "s/ \"Г'юї\": / 'Г'юї': /g" {} +
find ./markdown/org/docs/designs/simon/.. -type f -name "uk.md" -exec sed -i "s/ \"Саймон\": / 'Саймон': /g" {} +

# Find markdown files with missing title frontmatter:
grep -L "^title: " -R markdown/org/docs | grep ".md"
