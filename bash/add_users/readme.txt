ADD USERS v.0.01

What Is This?
-------------
Script add users to group. Script accepts as command line comma separated list of 
users, a group name, and an option to use ssh key auth or password creates group. 
Creates these users as normal users on the system, adds them to the created group 
and sets passwords to them (or generates ssh keys basing on the command line input)


Install
-------------
1. Unpack all files from archive
tar zxf add_users.tar.gz

2. Move folder add_users to /opt directory
sudo mv add_users /opt


Usage
-------------
cd /optor/add_users
sudo ./add_users.sh -g <group_name> -u <user_name>[,<user_name>] [options]
Options:
    -g      Group name.
    -u      Lists of users, separeted by comma.
Optionals:
    -k      Generate ssh keys for each user
    -c      Append to exists group
    -a      Append exists users to group


Examples
-------------
    All examples are under root user:

sudo bash

    Trying to create group aaa and append to it new created users aaa1,ivanoff,aaa3.
    But user ivanoff exists.

./add_users.sh -g aaa -u aaa1,ivanoff,aaa3
Error: user ivanoff exists.
Please, use -a option to force add all exists users to the group

    Trying to create group aaa and append to it new created users aaa1,ivanoff,aaa3.
    Now with -a option to force add all exists users to the group.

./add_users.sh -g aaa -u aaa1,ivanoff,aaa3 -a
Group aaa was created
User aaa1 was added and appended to aaa group
  Set password aaa151883 for user aaa1
User ivanoff was appended to aaa group
  Set password ivanoff18469 for user ivanoff
User aaa3 was added and appended to aaa group
  Set password aaa391391 for user aaa3

    Trying to create group aaa and append to it new created users aaa5 with key auth.
    But the group already exists.

./add_users.sh -g aaa -u aaa5 -k
Error: group aaa exists. Please, use -c option to force add users to exists group

    Ok then. Trying to create group aaa and append to it new created users aaa5 with key auth.
    Right now we use -c option to force add users to exists group.

./add_users.sh -g aaa -u aaa5 -k -c
User aaa5 was added and appended to aaa group
  New private key for user aaa5 was generated: keys/sshkey_gaaa_uaaa5
  Just send it to user and ask him to do:
    1. Save this file in safety place. For example: ~/.ssh/sshkey_gaaa_uaaa5 )
    2. Set permissions 0700 to this folder: chown 0700 ~/.ssh
    3. Set permissions 0600 to key file:    chown 0600 ~/.ssh/sshkey_gaaa_uaaa5
    4. Connect to remote host, using file:  ssh -i ~/.ssh/sshkey_gaaa_uaaa5 aaa5@remote_host


File list
-------------
add_users.sh  script to run in crontab or rc.local
keys/         forder for new generated keys
readme.txt    this readme


Created by
-------------
Dimitry, 2@ivanoff.org.ua
curl -A cv ivanoff.org.ua


