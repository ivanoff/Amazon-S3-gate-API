#!/bin/bash

#####
# CURLING main module. Read and parse CONFIG_FILE, sleep $config_interval 
# seconds and run module to curl, count search_text and write log to
# log_file putting this module in the background
# Manual using: ./curling.sh search_text
#####

VERSION=0.01

# path to config file
CONFIG_FILE=/opt/curling/etc/curling.conf

search_text=$1

if [ -z $search_text ]; then
    echo "ERROR: define search text"
    exit 2
fi


# read config
while IFS='= ' read lhs rhs
do
    if [[ ! $lhs =~ ^\ *# && -n $lhs ]]; then
        rhs="${rhs%%\#*}"    # Del in line right comments
        rhs="${rhs%%*( )}"   # Del trailing spaces
        rhs="${rhs%\"*}"     # Del opening string quotes 
        rhs="${rhs#\"*}"     # Del closing string quotes 
        declare "config_$lhs=$rhs"
    fi
done < $CONFIG_FILE

if [ $config_interval -le 0 ]; then
    echo "ERROR: interval parameter must be a positive value greater than zero"
    exit 3
fi

urls=(${config_url//,/ })

RANDOM=$$$(date +%s)

# write pid file to know what to kill
cd $config_pid_path && echo $$ > curling.pid

while [ 1 ]
do
    sleep $config_interval
    url=${urls[$RANDOM % ${#urls[@]} ]}
# run analyze script to curl url and count entries of search_text and write result to config_log_file
    cd $config_lib_path && ./curling_analyze.sh "$url" "$search_text" "$config_log_file" &
done
