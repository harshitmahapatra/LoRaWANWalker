#include <Arduino.h>
#include <MPU9250.h>
#include <stdlib.h> /* abs */

#define THRESHOLD 0.05

//Finds out if the walker is moving or not
bool IsMoving(MPU9250 IMU)
{
  IMU.readSensor();

  // float isMovingValue = IMU.getAccelX_mss() - 0.20 + IMU.getAccelY_mss() + 1.59 + IMU.getAccelZ_mss() + 9.61;
  float isMovingValue = abs(IMU.getGyroX_rads()) + abs(IMU.getGyroY_rads()) + abs(IMU.getGyroZ_rads());

  return (isMovingValue > THRESHOLD);
}
