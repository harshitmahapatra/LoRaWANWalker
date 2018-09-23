# Milestone 3
*Disclaimer: the DHT sensor was not working when we left and we didnt have physical access to the Raspberry Pi, which means we couldn't fix it. Since that was not the point of this milestone we decided to have it return mock temperature and humidity levels.*
# For this milestone we have three different servers

- The Raspberry Pi as an MQTT client
- An MQTT Broker
- A Webserver that is also an MQTT client

# System Setup
- The MQTT Broker is running at `35.204.82.222` and receives messages through `port 1883`
- The Webserver is also running at `35.204.82.222` and is serving its webpage through `port 8080`

The following instructions assume you are inside the folder *IoT/Milestones/Milestone3*
## Building and running the Raspberry Pi server
To build the image, use `docker build` inside the application directory:
```sh
$ cd RaspberryPI 
$ docker build -t india/rpi .
```
To create a container from the created image and run the application, use the `docker run` command:
```sh
$ docker run --privileged -p 8080:8080 -d india/rpi
```

# Testing
### Using our servers running on the cloud
- Open your browser and navigate to http://35.204.82.222:8080
- Observe that the values will keep updating automatically
- Click on one of the buttons to change the LEDs and wait for the RPi to report that it has in fact changed its state

### Deploying our broker and webserver on another machine
Before doing this, you will have to change the variable `cloudBroker` on both *RaspberryPI/src/server.ts* and *Webserver/src/server.ts* to the IP where the broker will be running.
```sh
$ cd Broker
$ docker build -t india/broker .
$ docker run --privileged -p 1883:1883 -d india/broker
$ cd ../Webserver
$ docker build -t india/webserver .
$ docker run --privileged -p 8080:8080 -d india/webserver
```
Now do the same as above but substitute the IP on the previous URL for the IP of the webserver.
