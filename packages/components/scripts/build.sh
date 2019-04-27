#!/bin/bash
# We'll have to come up with a cross-platform way to handle this
# (as in, make sure it works on windows), but until that time
# this shell script will do.

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
CUR=`pwd`

cd $DIR/../src/
rm -rf ../../../dist/components
for d in * ; do {
  cd ..
  mkdir -p ../../dist/components/$d
  echo "Building $d"
  rollup -c ./rollup.config.js ./src/$d/index.js -m -o ../../dist/components/$d/index.js -f cjs
  rollup --silent -c ./rollup.config.js ./src/$d/index.js -m -o ../../dist/components/$d/index.mjs -f es
  cd src
}
done
cd $CUR


