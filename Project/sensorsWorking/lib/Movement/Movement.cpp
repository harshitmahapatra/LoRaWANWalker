#include <Arduino.h>
#include <MPU9250.h>

//Finds out if the walker is moving or not
String IsMoving(MPU9250 IMU) {
  IMU.readSensor();
  float isMovingValue = IMU.getAccelX_mss()-0.20 + IMU.getAccelY_mss()+1.59 + IMU.getAccelZ_mss()+9.61;
  if(isMovingValue>1)
  {
    //Serial.println("moving");
    //Serial.println(isMovingValue);
    return "1";
  }
  else
  {
    //Serial.println("not moving");
    //Serial.println(isMovingValue);
    return "0";
  }

  /*
  // read the sensor
  IMU.readSensor();
  // display the data
  Serial.print(IMU.getAccelX_mss()-0.20,2);
  Serial.print("\t");
  Serial.print(IMU.getAccelY_mss()+1.59,2);
  Serial.print("\t");
  Serial.print(IMU.getAccelZ_mss()+9.61,2);
  Serial.print("\t");
  Serial.print(IMU.getGyroX_rads(),6);
  Serial.print("\t");
  Serial.print(IMU.getGyroY_rads(),6);
  Serial.print("\t");
  Serial.print(IMU.getGyroZ_rads(),6);
  Serial.print("\t");
  Serial.print(IMU.getMagX_uT(),6);
  Serial.print("\t");
  Serial.print(IMU.getMagY_uT(),6);
  Serial.print("\t");
  Serial.print(IMU.getMagZ_uT(),6);
  Serial.print("\t");
  Serial.println(IMU.getTemperature_C(),6);
  delay(100);
  */
}