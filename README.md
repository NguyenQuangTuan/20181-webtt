# RUN APP 
## - Install gulp global if not exist
```
sudo npm install gulp -g
```
## - Open project and run in terminal 
```
gulp
```
## - Run app

# DOCKER
## Build 
```
 sudo docker build -t ptpmcn-sales-page:{ version } .
```
 ## Run 
```
 sudo docker run --rm -p { port }:8080 --env NODE_ENV={ env } ptpmcn-sales-page:{version}
 ```
 ## Create tag
 ```
 sudo docker tag ptpmcn-sales-page:{ version } tuannq(repo)/ptpmcn(group)/ptpmcn-sales-page:{ version }
 ```
 ## Push tag
 ```
 sudo docker push tuannq(repo)/ptpmcn(group)/ptpmcn-sales-page:{ version }
 ```
 ## Pull tag
 ```
 sudo docker pull tuannq(repo)/ptpmcn(group)/ptpmcn-sales-page:{ version }
 ```
 ## View image 
 ```
 sudo docker image ls
 ```
 ## View container
 ```
 sudo docker container ls
 ```
 ## Stop
 ```
 sudo docker stop {container_id}
 ```
 ## Remove image
 ```
  sudo docker rmi {image_id}
 ```
