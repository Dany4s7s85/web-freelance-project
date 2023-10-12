docker-compose down 
docker kill api-server
docker kill database
docker kill react-app


docker system prune -a

docker volume rm web-root
docker volume rm server_mongoV

docker-compose up --build
