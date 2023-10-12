# Run this app: 
- install docker-compose 
    - on mac: `brew install docker-compose`
    - on linux: `apt ...` (untested)
- run the docker daemon
    - on mac: install the docker desktop app: https://docs.docker.com/desktop/mac/install/ and run it
    - on linux: `sudo systemctl start docker` ?(not tested...)

- spin up the whole system, in this directory run: 
`docker-compose up --build`

# Get into the shell of a running container
 
 show all containers, get the name of the one you want:
`docker ps`
log into that container (it = interactive) and start a bash-shell:
`sudo docker exec -it <CONTAINER_NAME_HERE> bash`

# Get access to the mongoDB
logged into the mongo container, get into the mongosh as an authenticated user (credentials specified in the docker-compose.yml)
`mongosh --port 27017  --authenticationDatabase "admin" -u "admin-user" -p "admin-password"`
run the commands you want: 
`use stairlicationDB`
`db.Buildings.find()`

# Run without docker

```
//mongo???

cd api-server/app 
npm install
npm start

cd api-server/app 
npm install
npm start
```
