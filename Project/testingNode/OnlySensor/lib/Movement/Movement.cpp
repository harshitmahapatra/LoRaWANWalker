#include <Arduino.h>
#include <MPU9250.h>

#define THRESHOLD 0.1

float xBias = 0, yBias = 0, zBias = 0;

//Finds out if the walker is moving or not
bool IsMoving(MPU9250 IMU)
{
  IMU.readSensor();

  Serial.print("getGyroX_rads: ");
  Serial.println(IMU.getGyroX_rads());
  Serial.print("getGyroY_rads: ");
  Serial.println(IMU.getGyroY_rads());
  Serial.print("getGyroZ_rads: ");
  Serial.println(IMU.getGyroZ_rads());

  // float isMovingValue = IMU.getAccelX_mss() - 0.20 + IMU.getAccelY_mss() + 1.59 + IMU.getAccelZ_mss() + 9.61;
  float isMovingValue = IMU.getGyroX_rads() + IMU.getGyroY_rads() + IMU.getGyroZ_rads();

  Serial.print("isMovingValue: ");
  Serial.println(isMovingValue);
  return (isMovingValue > THRESHOLD);
}
