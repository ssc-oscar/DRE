#!/bin/bash
i=$1
sed -i 's/^$/+ : '$i' : ALL/' /etc/security/access.conf
echo "icputrd:x:2344:audrislocal,adautart,audris,tsaul,dsteadma" >> /etc/group
/usr/sbin/sssd -fd 2
/usr/sbin/sshd -e
cd /opt/mean.js
export DB_1_PORT_27017_TCP_ADDR=db
npm start &

sudo -H -u $i sh -c /bin/notebook.sh 


while true
do echo here $(pwd) $(ps -ef | grep ssh) 
   sleep 15
done 
