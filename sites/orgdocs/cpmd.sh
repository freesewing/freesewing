#!/bin/bash
rm -rf docs/*
cp -R ../../markdown/org/docs/* docs/
find . -type f -name "en.md" -execdir mv {} readme.mdx \;
find . -type f -name "fr.md" -execdir rm {} \;
find . -type f -name "de.md" -execdir rm {} \;
find . -type f -name "es.md" -execdir rm {} \;
find . -type f -name "nl.md" -execdir rm {} \;
find . -type f -name "uk.md" -execdir rm {} \;

