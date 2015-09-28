MONITORING REMOTE HOSTS v.0.01

What Is This?
-------------
This is script that monitors specific log file via ssh (key authentication) 
and sends lines witch contains only specified text to stdout.


Install
-------------
1. Unpack all files from archive
tar zxf monitor.tar.gz

2. Move folder monitor to /opt directory
sudo mv monitor /opt


WARNING
-------------
Please do not use kill -9 to stop this script! 
You can stop it by Ctrl-C combination or by sending TERM signal


Usage
-------------
cd /opt/monitor
./monitor.sh -l <logfile_path> -s <search_text> -r <remote_host>[,<rsa_key_file>] [-r <remote_host>[,<rsa_key_file>]]

Options: 
    -l      Path to log file on remote server.
    -s      Specified text to find in appended line to show this line.
    -r      Remote host parameters: user@host. RSA key file path ( not required ) goes after comma.
            It is possible to specify more than one remote server to monitor. Just add next -r option.
    -h      Show this help


Examples
-------------
For search word "error" in file "/var/log/apache2/error.log" by monitoring remote hosts 10.11.12.26,
10.11.12.27 with key "/home/user/.ssh/id_work" and root@127.0.0.1 2, with no information/error
messages, use below example
./monitor.sh -s error -l /var/log/apache2/error.log -r 10.11.12.26 -r 10.11.12.27,/home/user/.ssh/id_work -r root@127.0.0.1 2>/dev/null

Another example to show new errors "marked as crashed" in mysql error.log file on 10.11.12.26 
and root@10.11.12.27
./monitor.sh -s "marked as crashed" -l /var/log/mysql/error.log -r 10.11.12.26 -r root@10.11.12.27


Output example
-------------
establishing connection to 10.11.12.26 done...
establishing connection to 10.11.12.27 with /root/.ssh/id_work key done...
establishing connection to root@127.0.0.1 done...
[20270] Started. Ctrl-C to break
150916 13:26:09 [ERROR] /usr/sbin/mysqld: Table './mysql/proc' is marked as crashed and should be repaired


File list
-------------
monitor.sh  script to run in crontab or rc.local
readme.txt  this readme


Created by
-------------
Dimitry, 2@ivanoff.org.ua
curl -A cv ivanoff.org.ua


