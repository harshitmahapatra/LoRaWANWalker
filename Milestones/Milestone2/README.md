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
$ docker run --privileged -p 3000:3000 -d india/milestone2
```

## Check program

To check if the program is running correctly, use the following command if you are testing from inside the raspberry pi:
```
$ curl localhost:3000
```
Do the following if you are testing from another machine:
```
$ curl <raspberry pi IP>:3000
```

## Stop the Program

To stop the application, use `docker ps` followed by this command:
```
$ docker stop <CONTAINER ID>
```

# Requests

## Get request:

### Pages
- Welcome page
	-  /pi
- Sensors page
	- /pi/sensors
- Movement sensor
	- /pi/sensors/pir
- Temperature sensor
	- /pi/sensors/temperature
- Humidity sensor
	-  /pi/sensors/humidity
-  Actuators
	- /pi/actuators
-  LED's
	- /pi/actuators/leds
-  Red LED (connected to Gpio port 4)
	- /pi/actuators/leds/red
-  Yellow LED (connected to Gpio port 22)
	- /pi/actuators/leds/yellow
-  Green LED (connected to Gpio port 2)
	- /pi/actuators/leds/green
 
### Tree of the webpage
- /pi
	- /sensors
		- /pir
		- /temperature
		- /humidity
	- /actuators
		- leds
			- red
			- yellow
			- green

## Post request for setting LED status:
- Turn on led with ***color***
/pi/actuators/leds/***color***?state=ON
- Turn off led with color ***color***
/pi/actuators/leds/***color***?state=OFF
