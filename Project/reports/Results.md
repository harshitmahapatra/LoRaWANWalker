# Results

---
# MEGA TRIALS
TRIAL 1 (30 MINUTES)
time        hr.      press      energy
          60->72      0.45      105mAh -> 210mAh/h
7:35      70->76      0.39
8:06      00->82      0.45
6:47      65->72      0.38
6:13      66->74      0.40

TRIAL 2 (30 MINUTES)
time        hr.      press      energy
          72->64      0.41      104mAh -> 208mAh/h
6         00->64      0.44
4:43      62->72      0.43
5:05      65->70      0.44
5:14      61->65      0.43
4:24      64->64      0.39

---

## Energy
### IDLE

# Run 1
12:30 ~ 2498mAh,
		0.2A = 200mA
01:00 ~ 200mAh

# Run 2
18:00 ~ 3505mAh,

01:00 ~ 195mAh

Battery types
- Zinc(400 mAh) 		-> 02:00h
- Alcaline(550 mAh) 	-> 02:45h
- Lithium(1200 mAh)		-> 06:00h 


### Moving around
1st stint: 105mAh -> 210mA
2nd stint: 104mAh -> 208mA

---
## Latency (min: 4:24, max: 8:06, avg: 6:05)

# 1st run (avg: 7:18)
7:35
8:06
6:47
6:13
# 2nd run (avg: 5:05)
6:00
4:43
5:05
5:14
4:24

---

## Accuracy/Precision

### Pressure Sensors
accuracy
We measured the pressure 5 times with a 1kg bag of rice and always got a measurement of exactly 1.00.

# 1st run (avg:0.41 sd:0.0336 or 0.082%)
0.45
0.39
0.45
0.38
0.40
# 2nd run (avg:0.42 sd: 0.0197)
0.41
0.44
0.43
0.44
0.43
0.39



### Accelerometer
100%
### GPS

### Heart Rate
# 1st run (avg error: 8.25)
12 6 7 8 diffs
60->72
70->76
00->82
65->72
66->74
# 2nd run (avg error: 5.4)
8 10 5 4 0 diffs
72->64
00->64
62->72
65->70
61->65
64->64

---

## Modularity
To test modularity, we added the GPS sensor only in the testing phase. 
Took 2 days
Challenges:
- Hard to find a port that was not somehow taken up by other sensor.
- Library support is crude and hard to integrate, so after unsuccessfully trying to use external libraries, we ended up implementing it ourselves, which took some extra time.

---

## Reliability
We used the walker continuously for 30 minutes two times, and the only failure was that on each of the runs, there was a reading that did not include the heart-rate. This means that out of the 12 packets sent (5 in the 1st run and 6 in the 2nd), 


## Scalability
4:50


