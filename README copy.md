# Server
## Description
NodeJS test server for testing features

## Setup MySQL database
This server requires a MySQL database. 
Setup MySQL database:
1. Download MySQL docker image:  
`docker pull mysql`
2. Initialize container with name 'mysql_db' on the '3307' port with root password '123'  
`docker run -d -e MYSQL_ROOT_PASSWORD=123 --name mysql_db -p 3307:3306 mysql`
3. Check the list of containers
`docker ps`
4. Enter the docker container
`docker exec -it <id> sh`
5. Inside the container to access the mysql(password: 123):  
`mysql -u root -p`
6. How to watch all databases
`SHOW DATABASES;`
7. Create the database inside MySQL:  
`CREATE DATABASE mysql_dev;`
8. How to enter in database
`USE mysql_dev;`
9. How to watch tables in database
`SHOW TABLES;`
10. Check mySqlConfig.json for consistency