#include <Arduino.h>
#include <string.h>
#include <SoftwareSerial.h>
#include <GPS.h>
#include <Pressure.h>
#include <Movement.h> 
//#include <10DOF.h>

using namespace std;

//SoftwareSerial GpsConnection(6, 7); //Port 6 7
HX711 RightHandle(8, 9); //Port 9 8
// HX711 LeftHandle(2, 3); //Port 10 11
// MPU9250 IMU(Wire,0x68); //Port SCL SDA
// int status; 

void setup(){
  Serial.begin(9600);
  while(!Serial) {}
 
  // start communication with IMU 
  // status = IMU.begin();
  // if (status < 0) {
  //   Serial.println(status);
  //   while(1) {}
  // }
  
  //GpsConnection.begin(9600);
  
}

void loop(){
  Serial.println("Start");
  String packageToSend ="";
  //packageToSend += GetGpsData(GpsConnection);
  PressureData rightHandleData = GetPressure(RightHandle, SensorID::four_black);
  // PressureData leftHandleData = GetPressure(LeftHandle, SensorID::ten);

  rightHandleData.PrintValues();
  // leftHandleData.PrintValues();
  // packageToSend += IsMoving(IMU);
  //Serial.println(packageToSend);
  delay(500); // waits for a second
}


