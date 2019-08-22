#!/bin/bash
for locale in $(ls --hide index.js src/locales); do
  echo Sorting $locale
  for file in $(ls src/locales/$locale/*.yaml); do
    sort $file -o $file
    sed -i '/^$/d' $file
  done
  for file in $(ls src/locales/$locale/plugin/patterns/*.yaml); do
    sort $file -o $file
    sed -i '/^$/d' $file
  done
  for file in $(ls src/locales/$locale/plugin/plugins/*.yaml); do
    sort $file -o $file
    sed -i '/^$/d' $file
  done
done
