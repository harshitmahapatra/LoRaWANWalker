# Milestone 1

## Building the docker image

To build the image, use `docker build` inside the application directory:

```
$ docker build -t india/milestone1 .
```

## Running the docker image

To create a container from the created image and run the application, use the
`docker run` command:

```
$ docker run -p 8080:8080 --privileged -d india/milestone1
```

## Check program

To check if the program is running correctly, use the following command if you are testing from inside the raspberry pi:
```
$ curl localhost:8080
```
Do the following if you are testing from another machine:
```
$ curl <raspberry pi IP>:8080
```

## Stop the Program

To stop the application, use `docker ps` followed by this command:
```
$ docker stop <CONTAINER ID>
```
