# IoT To-Do


- If its not moving only send data sporadically
- Add timestamp and nodeID to each data point
- Store with (timestamp+nodeID) as primary key





# Tests

## Modularity
- Add GPS

## Energy
- Use for 15 min
- Leave it overnight

## Consistency
- Walk around for 10 measurements, putting bands on the pressure sensors

## Accuracy
Pressure we tested (completely accurate)
HR - Use max's 
Movement - Get 10 measurements and see percentage it got right
GPS - Go outdoors and get 10 measurements. Compare with phone

## Scalability
Add primary key

## Serviceability
- Have Max disconnect some cables and Patrick reconnect. Measure time
- Time for replacing battery

## Reliability
To measure reliability we will use the walker for 30 minutes and calculate the percentage of times the sensor data got stored in the server’s database
