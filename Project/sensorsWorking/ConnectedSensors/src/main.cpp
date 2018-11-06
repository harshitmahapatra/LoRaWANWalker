#include <Arduino.h>
#include <string.h>
#include <SoftwareSerial.h>
#include <GPS.h>
#include <10DOF.h>
using namespace std;

//SoftwareSerial ss(DD6, DD7);

void setup(){
  Serial.begin(9600);
  //ss.begin(9600);
}

void loop(){
  Serial.println("Start");
  String sendPackage ="";
  //sendPackage += GetGpsData(ss);
  Get10DOFData();
  Serial.println(sendPackage);
}


