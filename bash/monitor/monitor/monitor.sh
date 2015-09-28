#!/bin/bash

#####
# Monitor - script that monitor specific log file via ssh (key authentication).
# and will send to stdout only lines containing only specified text.
# For more details type: ./curling.sh -h
#####

VERSION=0.01

usage() { echo "Monitor v.${VERSION} - monitor specific log file via ssh.
Usage:
    $0 -l <logfile_path> -s <search_text> -r <remote_host>[,<rsa_key_file>] [-r <remote_host>[,<rsa_key_file>]]
Options: 
    -l      Path to log file on remote server.
    -s      Specified text to find in appended line to show this line.
    -r      Remote host parameters: user@host. RSA key file path ( not required ) goes after comma.
            It is possible to specify more than one remote server to monitor. Just add next -r option.
    -h      Show this help
Example:
    ./monitor.sh -s error -l /var/log/apache2/error.log -r 10.11.12.26 -r 10.11.12.27,/home/user/.ssh/id_work -r root@127.0.0.1 2>/dev/null
    ./monitor.sh -s \"is marked as crashed\" -l /var/log/mysql/error.log -r 10.11.12.26 -r root@10.11.12.27
Output example:
    establishing connection to 10.11.12.26 done...
    establishing connection to 10.11.12.27 with /root/.ssh/id_work key done...
    establishing connection to root@127.0.0.1 done...
    [20270] Started. Ctrl-C to break
    150916 13:26:09 [ERROR] /usr/sbin/mysqld: Table './mysql/proc' is marked as crashed and should be repaired
WARNING:
    Please do not use kill -9 to stop this script! 
    You can stop it by Ctrl-C combination or by sending TERM signal." 1>&2; exit 1; }

remote=()

# parse command line options and check it
while getopts ":l:s:r:" o; do
    case "${o}" in
        l)
            logfinle_path=${OPTARG}
            ;;
        s)
            search_text=${OPTARG}
            ;;
        r)
            remote+=(${OPTARG})
            ;;
        *)
            usage
            ;;
    esac
done
shift $((OPTIND-1))

if [ -z "${logfinle_path}" ] || [ -z "${search_text}" ] || [ -z "${remote}" ]; then
    usage
fi

# establishing connection with remoute host and run tail -0f logfinle_path and grep by search_text
for e in "${remote[@]}"; do 
    REMOTE_PARAMS=(${e//,/ })
    echo -n "establishing connection to ${REMOTE_PARAMS[0]} " 1>&2
    key="";
    if [ ! -z ${REMOTE_PARAMS[1]} ]; then
        echo -n "with ${REMOTE_PARAMS[1]} key " 1>&2
        key="-i ${REMOTE_PARAMS[1]}"
    fi
    ssh -t -t $key ${REMOTE_PARAMS[0]} "tail -0f ${logfinle_path} | grep '${search_text}'" &
    echo "done..." 1>&2
done

echo "[$$] Started. Ctrl-C to break" 1>&2

# kill all childs jobs after terminate to avoid of running commands on remote hosts
# please do not use kill -9 to stop this script!
trap 'kill $(jobs -p)' 0

wait

