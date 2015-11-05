#Load and performance

##Install yandex-tank

###Installing

```bash
sudo echo "deb http://ppa.launchpad.net/yandex-load/main/ubuntu precise main" >> /etc/apt/sources.list
sudo echo "deb-src http://ppa.launchpad.net/yandex-load/main/ubuntu precise main" >> /etc/apt/sources.list
```

```bash
apt-get update && sudo apt-get install yandex-load-tank-base
```

###Create config
```bash
vi load.ini
```

Copy-paste code below and save file load.ini
```ini
[phantom]
address=localhost:3000
rps_schedule=line(1, 100, 10m)
headers = [Host: example.org] [Connection: close] [Bloody: yes]
uris=/
  /users
  /img
```

###Start
```bash
yandex-tank
```


##Analyzing

###Graphite

sudo apt-get install python python-dev python-cairo
sudo pip install whisper carbon graphite-web django==1.5.1 Twisted==11.1.0 django-tagging
for file in /opt/graphite/conf/*.example; do cp $file ${file%.*}; done

/opt/graphite/conf/storage-schemas.conf

[load]
pattern = ^one_sec\.yandex_tank\.
retentions = 1s:7d,5s:1y



cd /opt/graphite/webapp/graphite
python manage.py syncdb

