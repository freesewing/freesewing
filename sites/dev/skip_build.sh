#!/bin/bash

# Don't block production builds
if [[ "$VERCEL_ENV" == "production" ]] ; then
  echo "VERCEL_ENV: $VERCEL_ENV"
  echo "✅ - Production build - Proceed to build"
  exit 1;
fi

# Do not build dependabot PRs
if [[ "$VERCEL_GIT_COMMIT_REF" == "v2" ]] ; then
  echo "✅ - V2 branch build - Proceed to build"
  exit 1;
fi

# Do not waste time building this commit
echo "🛑 - Not production and not v2 - Do not build"
exit 0;

