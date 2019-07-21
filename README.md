# Linux Docker permission

sudo groupadd docker
sudo usermod -aG docker \$USER
sudo setenforce 0

# Bulid dev

sudo docker-compose build
cd bff
npm install
cd ../front
npm install
sudo docker-compose -f docker-compose.yml up

# Local network Linux

ifconfig -a // in the .env file => replace 127.0.0.1 by ex: 192.168.1.XX
sudo docker-compose -f docker-compose.yml up

# Remove

docker-compose down -v

# Start postgres

docker exec -it postgres psql -U <pg-user>

# Dump DB

docker ps // postgres <container-name>
docker exec <container-name> pg_dump -U <pg-user> <pg-db> > dump\_`date +%d-%m-%Y*%H-%M-%S`.sql

# Restor DB

docker ps // postgres <container-name>
docker exec <container-name> pg_restor -U <pg-user> -d <pg-db> < <dump-file-name>.sql
