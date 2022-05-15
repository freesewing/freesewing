#!/bin/bash
if git diff HEAD^ HEAD --quiet ../freesewing.shared || git diff --quiet HEAD^ HEAD  . ; then
  # We have local changes, go ahead and build
  echo "✅ - Changed detected; Let's build this thing"
  exit 1;
else
  # No changes, do not waste time building this commit
  echo "🛑 - No changes detected; Let's just not"
  exit 0;
fi

