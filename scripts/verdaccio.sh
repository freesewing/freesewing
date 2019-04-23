#!/bin/bash
# This requires: yarn global add verdaccio

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
set -e

# start local registry
tmp_registry_log=`mktemp`
rm -rf $DIR/../.registry
mkdir -p $DIR/../.registry
cp $DIR/../config/verdaccio.yaml $DIR/../.registry/config.yaml
cp $DIR/../config/verdaccio.css $DIR/../node_modules/verdaccio/static/freesewing.css
cp $DIR/../media/logo-emblem-dark.svg $DIR/../node_modules/verdaccio/static/logo.svg
# Adding a space to the closing head tag ensures we'll only insert this CSS once
sed -i 's@</head>@<link href="/-/static/freesewing.css" rel="stylesheet"></head >@' $DIR/../node_modules/verdaccio/static/index.html
sh -c "npx verdaccio -c $DIR/../.registry/config.yaml &>$tmp_registry_log"
# wait for `verdaccio` to boot
grep -q 'http address' <(tail -f $tmp_registry_log)

