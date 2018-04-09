#!/bin/bash

rm Packages*
./dpkg-scanpackages -m . /dev/null >Packages
bzip2 Packages

