# IOT node.js project template

This repository includes a simple template for a node.js/express application,
along with a Dockerfile.

## Running the application manually

The application consists of a single file `src/app.js`. It can be started from
the application directory with the `node` command:

```
$ node src/app.js
```

The `package.json` file is setup to include a `start` script and express+sensor
package dependencies. Scripts provide a more convinient way to start the application
using `npm`:

```
$ npm start
```

## Building the docker image

To build the image, use `docker build` inside the application directory:

```
$ docker build -t fancy-pants/iot-assignment .
```

The `-t` switch is followed by the image name (tag), in this example consisting
of a group name and a chosen application name, separated by a slash.

## Running the docker image

To create a container from the created image and run the application, use the
`docker run` command:

```
$ docker run -d --rm -p 8080:8080 --privileged fancy-pants/iot-assignment
```

The `-d` switch detaches the running container from the terminal, `-p 8080:8080`
binds the local port 8080 to the port exposed by the application (also 8080 in
case of this example). The `--privileged` switch allows sensor packages to access
the GPIO.

## Other Tips

The included `Dockerfile` should be general enough to be usable in your own node.js
application. If you take just the `Dockerfile` from here, make sure to also take
`.dockerignore` along with it, which ensures the `node_modules` folder doesn't get
included in the image.

