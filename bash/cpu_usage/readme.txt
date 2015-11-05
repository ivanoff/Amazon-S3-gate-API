CPU USAGE CONTROL v.0.01

What Is This?
-------------
This script checks local system's CPU usage each 10 seconds. If any process uses CPU 
over than 5% - a warning appears in log file. This warning also contains some process 
details ( pid, user, args ).

Required parameter - partial name of observed processes, not less than 4 letters.


Install
-------------
1. Unpack all files from archive
tar zxf cpu_usage.tar.gz

2. Move folder cpu_usage to /opt directory
sudo mv cpu_usage /opt


Usage
-------------
cd /opt/cpu_usage
sudo ./cpu_usage.sh [options] <process_partial_name>

Options: -h show this help

Process partial name has to be not less than 4 letters long.


Example
-------------
Check any perl processes for CPU usage: 
sudo ./cpu_usage.sh perl


Log file example
-------------
[2015-16-09 21:57:38] [INFO] Started
[2015-16-09 21:57:57] [OVERLOAD] processes found:
%CPU   PID USER     COMMAND 
39.4 11102 root     /usr/bin/perl -w ./cpu_usage.pl
[2015-16-09 21:58:25] [INFO] Stopped


Error list
-------------
Error code 2: Directory $DIR doesn't exists
Please check and create necessary directories

Error code 3: Process partial name has to be not less than $MIN_NAME_LONG letters long
Please increase the length of the partial name string
                                

File list
-------------
cpu_usage.sh    main script
log/            folder for log file
tmp/            temporary folder
readme.txt      this readme


Created by
-------------
Dimitry, 2@ivanoff.org.ua
curl -A cv ivanoff.org.ua


