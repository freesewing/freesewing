#!/bin/bash

# Don't block production builds
if [[ "$VERCEL_ENV" == "production" ]] ; then
  echo "VERCEL_ENV: $VERCEL_ENV"
  echo "✅ - Production build - Proceed to build"
  exit 1;
fi

# Do not build dependabot PRs
if [[ "$VERCEL_GIT_COMMIT_AUTHOR_LOGIN" == "dependabot[bot]" ]] ; then
  echo "🛑 - Dependebot PR - Do not build"
  exit 0;
fi

# Do not build dependabot PRs
if [[ "$VERCEL_GIT_COMMIT_AUTHOR_LOGIN" == "dependabot[bot]" ]] ; then
  echo "🛑 - Dependebot PR - Do not build"
  exit 0;
fi

check=( \
  "." \
)
build=0
for d in ${check[@]}; do
  if `git diff HEAD^ HEAD --quiet $d`; then
    # We have changes, go ahead and build
    echo "✅ - Changed detected in $d - Proceed to build"
    exit 1;
  fi
done

# No changes, do not waste time building this commit
echo "🛑 - No changes detected - Do not build"
exit 0;

