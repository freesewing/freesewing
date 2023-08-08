#!/bin/bash
find . -type f -name "en.md" -exec sed -i '' "/^image:/d"  {} +

