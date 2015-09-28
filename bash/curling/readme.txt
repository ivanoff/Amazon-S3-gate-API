CURLING WORDS COUNTER v.0.01

What Is This?
-------------
This script starts after each system reboot for a 40 minutes, gets a random web page
with an interval of X seconds and counts occurrences of a specific substring in the 
html code of that web page.


Install
-------------
1. Unpack all files from archive
tar zxf curling.tar.gz

2. Move folder curling to /opt directory
sudo mv curling /opt

3. Make script executable at boot time
chmod +x /etc/rc.d/rc.local
echo "/opt/curling/curl_timeout_start.sh WORD_TO_COUNT" >> /etc/rc.d/rc.local

4.Open and edit configuration file
cd /opt/curling && vi etc/curling.conf


Usage
-------------
The main module will start afrer each reboot and stop after 40 minutes of running.

If you need to abort curling script, then use command below:
cd /opt/curling && ./curl_stop.sh

If you need to change specific word to count, replace one line in rc.local:
sed -i '/curl_timeout_start.sh WORD_TO_COUNT$/d' /etc/rc.d/rc.local
echo '/opt/curling/curl_timeout_start.sh script' >> /etc/rc.d/rc.local


Example
-------------
For manual check run curling.sh: 
cd /opt/curling/lib && ./curling.sh script

In this example the programm will count word "script" in one of urls from config file.
All results are stored in log file ( /opt/curling/log/curling.log )


Log file example
-------------
[2015-18-09 21:40:39] [kyanmedia.com] [script] 0 entries
[2015-18-09 21:40:44] [www.pikaboo.be] [script] 47 entries
[2015-18-09 21:40:45] [playgroundblues.com/] [script] 0 entries
[2015-18-09 21:40:48] [cssmoon.com] [script] 0 entries
[2015-18-09 21:40:50] [cliframework.com] [script] 31 entries
[2015-18-09 21:40:52] [mariusroosendaal.com] [script] 52 entries
[2015-18-09 21:40:53] [codingbat.com/java] [script] 9 entries


Errors list
-------------
ERROR code 1: interval parameter must be a positive value greater than zero
Please change interval in config file to any positive integer number greater than zero

ERROR code 2: define search text
You need to check if search text is defined in parameters

ERROR code 3: check all parameters
Please, check parameters for curling.sh script


File list
-------------
curl_timeout_start.sh   script to run in crontab or rc.local
curl_stop.sh            script to early stop curling
etc/curling.conf        config file
lib/curling.sh          main module for run curling_analyze.sh
lib/curling_analyze.sh  module for download and check url
log/                    folder for log file
run/                    folder for write pid file
readme.txt              this readme


Created by
-------------
Dimitry, 2@ivanoff.org.ua
curl -A cv ivanoff.org.ua


