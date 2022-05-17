#!/bin/bash
exclude=( \
  "components" \
  "create-freesewing-pattern" \
  "css-theme" \
  "freesewing.dev" \
  "freesewing.shared" \
  "fresewing.dev" \
  "fresewing.lab" \
  "freesewwin.org" \
  "freesewing.shared" \
  "gatsby-remark-jargon" \
  "models" \
  "mui-theme" \
  "pattern-info" \
  "plugin-export-xdf" \
  "prettier-config" \
  "remark-jargon" \
  "snapseries" \
  "strapi" \
  "svgtopdf" \
)
build=0
for d in ../*/ ; do
  skip=0
  for s in ${exclude[@]}; do
    if [[ "$d" = "../$s/" ]];
    then
      skip=1
    fi
  done
  if [[ "$skip" = "0" ]]; then
    src="${d}src"
    config="${d}config"
    if `git diff HEAD^ HEAD $src`; then
      # We have local changes, go ahead and build
      echo "✅ - Changed detected in $src  Let's build this thing"
      exit 1;
    fi
    if `git diff HEAD^ HEAD $config`; then
      # We have local changes, go ahead and build
      echo "✅ - Changed detected in $config  Let's build this thing"
      exit 1;
    fi
  fi
done

if \
  git diff HEAD^ HEAD --quiet ../freesewing.shared || \
  git diff --quiet HEAD^ HEAD  . \
  ; then
  # We have local changes, go ahead and build
  echo "✅ - Changed detected; Let's build this thing"
  exit 1;
else
  # No changes, do not waste time building this commit
  echo "🛑 - No changes detected; Let's just not"
  exit 0;
fi

