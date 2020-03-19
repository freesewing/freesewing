#!/bin/bash
# This will iterate over all directories in packages
# so you can do once-off maintenance like removing
# node_modules folders and things like that.

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
CUR=`pwd`

cd $DIR
for d in ../packages/*/ ; do {
  cd $d
  # do something here
  pwd
  rm -rf report
  cd ..
}
done
cd $CUR


