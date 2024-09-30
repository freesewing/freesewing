#!/bin/bash
#rm -rf docs/*
#cp -R ../../markdown/org/docs/* docs/
#find . -type f -name "en.md" -execdir mv {} readme.mdx \;
#find . -type f -name "fr.md" -execdir rm {} \;
#find . -type f -name "de.md" -execdir rm {} \;
#find . -type f -name "es.md" -execdir rm {} \;
#find . -type f -name "nl.md" -execdir rm {} \;
#find . -type f -name "uk.md" -execdir rm {} \;

#find docs/ -type f -name "readme.mdx" -exec sed -i '' 's/<Tip>/:::tip\n/g' {} +
#find docs/ -type f -name "readme.mdx" -exec sed -i '' 's/<Note>/:::note\n/g' {} +
#find docs/ -type f -name "readme.mdx" -exec sed -i '' 's/<Warning>/:::warning\n/g' {} +
#find docs/ -type f -name "readme.mdx" -exec sed -i '' 's/<Tip compact>/:::tip\n/g' {} +
#find docs/ -type f -name "readme.mdx" -exec sed -i '' 's/<Note compact>/:::note\n/g' {} +
#find docs/ -type f -name "readme.mdx" -exec sed -i '' 's/<Warning compact>/:::warning\n/g' {} +
#find docs/ -type f -name "readme.mdx" -exec sed -i '' 's_</Tip>_:::_g' {} +
#find docs/ -type f -name "readme.mdx" -exec sed -i '' 's_</Note>_:::_g' {} +
find docs/ -type f -name "readme.mdx" -exec sed -i '' 's_</Warning>_:::_g' {} +

