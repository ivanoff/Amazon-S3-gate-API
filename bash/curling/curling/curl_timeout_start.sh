#!/bin/bash

######
# start curling script for a 40 minutes
######

cd /opt/curling && timeout 40m lib/curling.sh $1
