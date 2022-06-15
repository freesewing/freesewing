#!/bin/bash
check=( \
  "." \
  "../../markdown/dev" \
  "../freesewing.shared" \
)
build=0
for d in ${check[@]}; do
  if `git diff HEAD^ HEAD --quiet $d`; then
    # We have changes, go ahead and build
    echo "✅ - Changed detected in $d, let's build this thing"
    exit 1;
  fi
done

# No changes, do not waste time building this commit
echo "🛑 - No changes detected; Let's just not"
exit 0;

