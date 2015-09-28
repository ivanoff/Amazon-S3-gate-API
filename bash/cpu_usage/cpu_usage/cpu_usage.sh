#!/bin/bash

####
# CPU USAGE CONTROL
# Description
#   A script that each 10 seconds will check CPU usage of a process/processes on local system 
#   by partial name (cmd param, not less than 4 letters). If CPU usage exceeds 5% - a warning 
#   log should appear with process details. 
# Usage
#   ./cpu_usage.sh [options] <process_partial_name>
# Options
#   -h show this help
# Examples
#   ./cpu_usage.sh perl
# Created by
#   Dimitry, 2@ivanoff.org.ua
####

VERSION=0.01

LOG_FILE=/opt/cpu_usage/log/cpu_usage.log   # log file
TMP_FILE=/opt/cpu_usage/tmp/cpu_usage.tmp   # temp file
CHECK_INTERVAL=10       # interval between checks
MAX_CPU_USAGE=5         # cpu maximum value. Process marked as overload in case of excess of this value
MIN_NAME_LONG=4         # minimum partial name lenght

# usage information
if [ -z "$1" ] || [ "$1" = "-h" ]; then
echo "CPU usage control v.${VERSION}
Usage: 
    $0 [options] <process_partial_name>
Options:
    -h      show this help
Examples:
    $0 perl
    $0 'crond -n'
Note:
    Process partial name has to be not less than ${MIN_NAME_LONG} letters long" 1>&2; 
    exit 1; 
fi

# check directories
for FILE in $LOG_FILE $TMP_FILE
do
    DIR=$(dirname "${FILE}")
    if [ ! -d "$DIR" ] && [ ! -L "$DIR" ]; then
        echo "Error: Directory $DIR doesn't exists" 1>&2; 
        exit 2;
    fi
done

# check length of incoming name
if [ ${#1} -lt $MIN_NAME_LONG ]; then
    echo "Error: Process partial name has to be not less than ${MIN_NAME_LONG} letters long" 1>&2; 
    exit 3;
fi

# Function for logging. Usage: log text type show.
# Info: save text to log file with type information. Third parameter tells to show text on default stdout
# Example: log "wrong number" WARNING show
# default type is "INFO"
function log() {
    type=$2;
    [ -z $type ] && type="INFO"
    echo "[$(date '+%Y-%d-%m %H:%M:%S')] [$type] $1" >> ${LOG_FILE}
    [ ! -z $3 ] && echo "[$(date '+%Y-%d-%m %H:%M:%S')] [$type] $1"
}

log Started INFO 1;

# catch ctrl-c, write to log, remove temp files, then exit 0
trap ctrl_c INT
function ctrl_c() { log Stopped "" 1; rm $TMP_FILE; exit 0; }

while [ : ]
do
# write result of ps to temp dir to analyze
    ps -eo pcpu,pid,user,args | tail -n+2 | sort -nr -k1 > ${TMP_FILE}

    OVERLOAD="";
    while read p; do
        PROCESS=`echo $p | awk '{ print $4 }' | grep "$1"`
# if we found processes by prtical name, check if they're overloaded
        if [ ! -z $PROCESS ]; then
            USAGE=`echo $p | awk '{ print $1 }'`
            USAGE=${USAGE%%.*}
            [ $USAGE -ge $MAX_CPU_USAGE ] && OVERLOAD="${OVERLOAD}"$'\n'"${p}"
        fi
    done < ${TMP_FILE}

# write all overloaded processes to log
    if [ -n "$OVERLOAD" ]; then
        log "processes found:
%CPU   PID USER     COMMAND $OVERLOAD" OVERLOAD
    fi

    sleep $CHECK_INTERVAL
    
done
