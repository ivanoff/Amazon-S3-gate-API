#!/bin/bash

#####
# CURLING module to curl, count search_text and write log to log_file
# Using: ./curling_analyze.sh url text_to_count log_file
#####

url=$1
search_text=$2
log_file=$3

if [ -z $log_file ]; then
    echo "ERROR: check all parameters"
    exit 1
fi

count=$(curl $url 2>/dev/null | grep -o $search_text | wc -l)

echo "[$(date '+%Y-%d-%m %H:%M:%S')] [${url}] [${search_text}] ${count} entries" >> ${log_file}
