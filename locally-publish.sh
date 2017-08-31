#!/usr/bin/env bash
if [ -z "$1" ]
then
    echo "Please specify a version: major|minor|patch"
    exit
fi
npm version $1
if [ "$?" -ne "0" ]
then
  exit $?
fi
npm publish