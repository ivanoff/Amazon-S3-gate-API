#!/bin/bash

#####
# Add users - script that accepts as command line comma separated list of users, 
# a group name, and an option to use ssh key auth or password creates group, 
# creates these users as normal users on the system, adds them to the created 
# group and sets passwords to them (or generates ssh keys basing on the command 
# line input)
#####

VERSION=0.01

usage() { echo "Add users v.${VERSION} - add users to group.
Usage:
    $0 -g <group_name> -u <user_name>[,<user_name>] [options]
Options:
    -g      Group name.
    -u      Lists of users, separeted by comma.
Optionals:
    -k      Generate ssh keys for each user
    -c      Append to exists group
    -a      Append exists users to group
Example:" 1>&2; exit 1; }

# parse command line options and check it for requirement parameters
while getopts ":g:u:kca" o; do
    case "${o}" in
        g)
            group_name=${OPTARG}
            ;;
        u)
            users_list=${OPTARG}
            ;;
        k)
            ssh_key=1
            ;;
        c)
            force_group_append=1
            ;;
        a)
            force_user_append=1
            ;;
        *)
            usage
            ;;
    esac
done
shift $((OPTIND-1))

if [ -z "${group_name}" ] || [ -z "${users_list}" ]; then
    usage
fi

users_list=(${users_list//,/ })

# check each user and if user exists and not force_user_append, then error: use -a option
for u in "${users_list[@]}"; do 
    if [ ! -z $(getent passwd ${u}) ]; then
        if [ -z "${force_user_append}" ]; then
            echo "Error: user ${u} exists." 1>&2
            user_exists=1
        fi
    fi
done
if [ ! -z $user_exists ]; then
    echo "Please, use -a option to force add all exists users to the group" 1>&2
    exit 3;
fi

# check if group exists and not force_group_append, then error: use -c option
if [ ! -z $(getent group ${group_name}) ]; then
    if [ -z "${force_group_append}" ]; then
        echo "Error: group ${group_name} exists. Please, use -c option to force add users to exists group" 1>&2
        exit 2;
    fi
else
    groupadd "${group_name}"
    echo "Group ${group_name} was created"
fi

# append exists user to group / create and add user to group
for u in "${users_list[@]}"; do 
    if [ -z $(getent passwd ${u}) ]; then
        useradd -G "${group_name}" "${u}"
        echo "User ${u} was added and appended to ${group_name} group"
    else
        usermod -g "${group_name}" "${u}"
        echo "User ${u} was appended to ${group_name} group"
    fi

    if [ -z $ssh_key ]; then
# set password for user and echo it
        password=${u}$(shuf -i 10000-99999 -n 1)
        echo $password | passwd --stdin ${u}
        echo "  Set password ${password} for user ${u}"
    else
# generate rsa key, set add open key to authorized_keys for user and show usefull information
        keyfile="sshkey_g${group_name}_u${u}"
        ssh-keygen -t rsa -f keys/$keyfile -q -N ""
        mkdir /home/${u}/.ssh
        cat keys/${keyfile}.pub >> /home/${u}/.ssh/authorized_keys
        chown -R ${u}: /home/${u}/.ssh
        chmod 0640 /home/${u}/.ssh/authorized_keys 
        echo "  New private key for user ${u} was generated: keys/${keyfile}"
        echo "  Just send it to user and ask him to do:"
        echo "    1. Save this file in safety place. For example: ~/.ssh/${keyfile} )"
        echo "    2. Set permissions 0700 to this folder: chown 0700 ~/.ssh"
        echo "    3. Set permissions 0600 to key file:    chown 0600 ~/.ssh/${keyfile}"
        echo "    4. Connect to remote host, using file:  ssh -i ~/.ssh/${keyfile} ${u}@remote_host"
    fi

done




