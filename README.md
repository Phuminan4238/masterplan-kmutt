### Deployment
### Install Node V.18
- https://techviewleo.com/how-to-install-node-js-18-lts-on-ubuntu/?expand_article=1
### Install MySQL Server
- https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04
  ## config remote mysql server
  - https://www.digitalocean.com/community/tutorials/how-to-set-up-a-remote-database-to-optimize-site-performance-with-mysql-on-ubuntu-18-04
  ## create mysql user strapi
  ## create database
  ## import database
### Install Strapi
  ## setup manual -> database
### Build front-end
### Build back-end
  ## npm run dev
  ## create service
  - https://medium.com/@benmorel/creating-a-linux-service-with-systemd-611b5c8b91d6
_____________________

### Deployment
pull git
sudo npm install

sudo npm run build
-> build

sudo mv public public-backup
sudo mv build public

### error
sudo rm -rf public
sudo mv public-o public

git pull
udo npm run build
-> build

### move 
rsync -avP source destination

### change owner
sudo chown -R user: *
_____________________

## create service
  - https://medium.com/@benmorel/creating-a-linux-service-with-systemd-611b5c8b91d6

/etc/systemd/system/journal_strapi.service 

[Unit]
Description=journal strapi service
After=network.target

[Service]
User=testuser
ExecStart=/bin/bash /home/testuser/journal_strapi.sh

[Install]
WantedBy=multi-user.target



nxkmutt_strapi.sh

#!/bin/bash

cd /home/testuser/kmutt-journal/backend/journal
npm run develop

testuser@boss-dev-vm:~$ ls
kmutt-journal  strapi-admin-2.sql  strapi-admin.sql
testuser@boss-dev-vm:~$ cd kmutt-journal/
testuser@boss-dev-vm:~/kmutt-journal$ ls
backend  frontend  src
testuser@boss-dev-vm:~/kmutt-journal$ cd backend/
testuser@boss-dev-vm:~/kmutt-journal/backend$ ls
journal
testuser@boss-dev-vm:~/kmutt-journal/backend$ cd journal/
testuser@boss-dev-vm:~/kmutt-journal/backend/journal$ ls
README.md  config    favicon.png    node_modules       package.json  src
build      database  jsconfig.json  package-lock.json  public
testuser@boss-dev-vm:~/kmutt-journal/backend/journal$ pwd
/home/testuser/kmutt-journal/backend/journal
testuser@boss-dev-vm:~/kmutt-journal/backend/journal$ cd
testuser@boss-dev-vm:~$ nano journal_strapi.sh
testuser@boss-dev-vm:~$ ls
journal_strapi.sh  kmutt-journal  strapi-admin-2.sql  strapi-admin.sql
testuser@boss-dev-vm:~$ sudo nano /etc/systemd/system/journal_strapi.service 
[sudo] password for testuser: 
testuser@boss-dev-vm:~$ sudo systemctl enable journal_strapi
Created symlink /etc/systemd/system/multi-user.target.wants/journal_strapi.service → /etc/systemd/system/journal_strapi.service.
testuser@boss-dev-vm:~$ ls
journal_strapi.sh  kmutt-journal  strapi-admin-2.sql  strapi-admin.sql
testuser@boss-dev-vm:~$ sudo systemctl status journal_strapi
○ journal_strapi.service - journal strapi service
     Loaded: loaded (/etc/systemd/system/journal_strapi.service; enabled; vendor preset: >
     Active: inactive (dead)
testuser@boss-dev-vm:~$ sudo systemctl start journal_strapi
testuser@boss-dev-vm:~$ sudo systemctl status journal_strapi
● journal_strapi.service - journal strapi service
     Loaded: loaded (/etc/systemd/system/journal_strapi.service; enabled; vendor preset: >
     Active: active (running) since Fri 2023-09-01 08:28:25 UTC; 3s ago
   Main PID: 19450 (bash)
      Tasks: 20 (limit: 2141)
     Memory: 81.1M
        CPU: 3.520s
     CGroup: /system.slice/journal_strapi.service
             ├─19450 /bin/bash /home/testuser/journal_strapi.sh
             ├─19451 "npm run develop" "" "" "" "" "" "" "" "" "" "" "" "" "" ""
             ├─19462 sh -c "strapi develop"
             └─19463 node /home/testuser/kmutt-journal/backend/journal/node_modules/.bin/>

Sep 01 08:28:25 boss-dev-vm systemd[1]: Started journal strapi service.
Sep 01 08:28:27 boss-dev-vm bash[19451]: > journal@0.1.0 develop
Sep 01 08:28:27 boss-dev-vm bash[19451]: > strapi develop
testuser@boss-dev-vm:~$ sudo systemctl status journal_strapi
● journal_strapi.service - journal strapi service
     Loaded: loaded (/etc/systemd/system/journal_strapi.service; enabled; vendor preset: >
     Active: active (running) since Fri 2023-09-01 08:28:25 UTC; 19s ago
   Main PID: 19450 (bash)
      Tasks: 31 (limit: 2141)
     Memory: 278.9M
        CPU: 17.131s
     CGroup: /system.slice/journal_strapi.service
             ├─19450 /bin/bash /home/testuser/journal_strapi.sh
             ├─19451 "npm run develop" "" "" "" "" "" "" "" "" "" "" "" "" "" ""
             ├─19462 sh -c "strapi develop"
             ├─19463 node /home/testuser/kmutt-journal/backend/journal/node_modules/.bin/>
             └─19474 /usr/bin/node /home/testuser/kmutt-journal/backend/journal/node_modu>

Sep 01 08:28:39 boss-dev-vm bash[19474]: │ Version            │ 4.12.7 (node v18.17.1)   >
Sep 01 08:28:39 boss-dev-vm bash[19474]: │ Edition            │ Community                >
Sep 01 08:28:39 boss-dev-vm bash[19474]: │ Database           │ mysql                    >
Sep 01 08:28:39 boss-dev-vm bash[19474]: └────────────────────┴──────────────────────────>
Sep 01 08:28:39 boss-dev-vm bash[19474]:  Actions available
Sep 01 08:28:39 boss-dev-vm bash[19474]: Welcome back!
Sep 01 08:28:39 boss-dev-vm bash[19474]: To manage your project 🚀, go to the administrat>
Sep 01 08:28:39 boss-dev-vm bash[19474]: http://localhost:1337/admin
Sep 01 08:28:39 boss-dev-vm bash[19474]: To access the server ⚡️, go to:
Sep 01 08:28:39 boss-dev-vm bash[19474]: http://localhost:1337
