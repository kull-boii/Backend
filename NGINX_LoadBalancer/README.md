You need docker desktop on windows 10 and nginx installed :)

just clone the repo

and in terminal type

`docker build . -t myserver`

myserver is the name of the docker image that i gave (feel free to choose your own)

now on your docker desktop you should see an image 

now in the terminal run four docker containers on different ports

`docker run -p 1111:7777 -d myserver`
`docker run -p 2222:7777 -d myserver`
`docker run -p 3333:7777 -d myserver`
`docker run -p 4444:7777 -d myserver`

you can change the ports {1111,2222,3333,4444} but if you change make sure to change them in nginx.conf file

now in your docker desktop you may see 4 containers running

or you can type `docker ps` 

now we need to configure nginx.conf

you may find it in the directory where you have installed nginx

for me it was in "C:\Program Files\nginx-1.23.2\conf"

open nginx.conf in vscode

and copy paste this (make sure you save the previously written content so you can undo easily)




        events {

        }

        http {

            include mime.types;

            upstream backendserver{
                server 127.0.0.1:1111;
                server 127.0.0.1:3333;
                server 127.0.0.1:4444;
            }

            server{
                listen 8080;

                location / {
                    proxy_pass http://backendserver/; 
                }
            }
        }


run nginx by (make sure you open a new terminal in the folder where nginx is installed  "C:\Program Files\nginx-1.23.2"

`start nginx`

in browser open localhost:8080

default nginx uses round robin.

thus we have set up a load balancer exposed a single ip and a port and eventually we may scale our containers 

make sure to stop and delete the containers and image

to stop nginx type

`nginx -s quit`
