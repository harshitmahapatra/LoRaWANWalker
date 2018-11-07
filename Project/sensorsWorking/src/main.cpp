#include <Arduino.h>
#include <string.h>
#include <SoftwareSerial.h>
#include <GPS.h>
#include <Pressure.h>
#include <Movement.h> 
//#include <10DOF.h>

using namespace std;

SoftwareSerial GpsConnection(6, 7);
HX711 RightHandle(11,10); //Port 10 11
HX711 LeftHandle(8,9); //Port 8 9
MPU9250 IMU(Wire,0x68); //Port SCL SDA
int status; 

void setup(){
  Serial.begin(9600);
  while(!Serial) {}
 
  // start communication with IMU 
  status = IMU.begin();
  if (status < 0) {
    Serial.println(status);
    while(1) {}
  }
  
  GpsConnection.begin(9600);
  
}

void loop(){
  Serial.println("Start");
  String packageToSend ="";
  packageToSend += GetGpsData(GpsConnection);
  packageToSend += GetPressure(RightHandle,LeftHandle);
  packageToSend += IsMoving(IMU);
  Serial.println(packageToSend);
}


