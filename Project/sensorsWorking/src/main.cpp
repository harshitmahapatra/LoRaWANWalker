#include <Arduino.h>
#include <string.h>
#include <SoftwareSerial.h>
#include <GPS.h>
#include <Pressure.h>
//#include <10DOF.h>
using namespace std;

//SoftwareSerial GpsConnection(6, 7);
//HX711 RightHandle(11,10);
//HX711 LeftHandle(11,10);

void setup(){
  Serial.begin(9600);
  //GpsConnection.begin(9600);
}

void loop(){
  Serial.println("Start");
  String packageToSend ="";
  //packageToSend += GetGpsData(GpsConnection);
  //packageToSend += GetPressure(RightHandle,LeftHandle)
  //Get10DOFData();
  Serial.println(packageToSend);
}


