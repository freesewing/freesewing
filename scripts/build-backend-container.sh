#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
VERSION=`sed 's/version/VERSION/' $DIR/../package.json | grep VERSION | tr -d 'VERSION [:blank:] ["] [:] [,]'`
docker build \
  ./sites/backend/.
