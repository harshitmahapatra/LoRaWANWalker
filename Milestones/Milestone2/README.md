# Milestone 2

## Building the docker image

To build the image, use `docker build` inside the application directory:

```
$ docker build -t india/milestone2 .
```

## Running the docker image

To create a container from the created image and run the application, use the
`docker run` command:

```
$ ocker run --privileged -p 3000:3000 -d india/milestone2
```

## Check program

To check if the program is running correctly, use the following command if you are testing from inside the raspberry pi:
```
curl localhost:3000
```
Do the following if you are testing from another machine:
```
curl <raspberry pi IP>:3000
```

## Stop the Program

To stop the application, use `docker ps` followed by this command:
```
docker stop <CONTAINER ID>
```
