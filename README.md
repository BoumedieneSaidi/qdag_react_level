# launch the app 
# 1 - create the image : sudo docker build -t react-app .
# 2 - launch the container : sudo docker run -it --rm -v ${PWD}:/app -v /app/node_modules -p 3000:3000 -e CHOKIDAR_USEPOLLING=true react-app
# 3- Target@ must be configurable !!
