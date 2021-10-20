#!/bin/bash

date=$(date +%F)
backupDir="/fs/backup/mongo/${date}/"
[ -z "$1" ] && echo "Missing param" && exit 1
database=$1

mkdir -p $backupDir
mongodump --db $database --out $backupDir
