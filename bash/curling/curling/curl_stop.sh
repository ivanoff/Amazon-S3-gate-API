#!/bin/bash

#####
# stop curling script
#####

cd /opt/curling && ps aux | grep curling.sh | grep -v grep && kill -9 $(cat run/curling.pid) && rm run/curling.pid && echo Curling was stopped
