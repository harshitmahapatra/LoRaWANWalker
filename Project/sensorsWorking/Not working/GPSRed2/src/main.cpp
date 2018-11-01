#include <Arduino.h>
using namespace std;
/*
 * Rui Santos 
 * Complete Project Details http://randomnerdtutorials.com
 */
 
#include <SoftwareSerial.h>

// The serial connection to the GPS module
SoftwareSerial ss(13, 11);

void setup(){
  Serial.begin(9600);
  ss.begin(9600);
}

void loop(){
  
  while (ss.available() > 0){
    // get the byte data from the GPS
    byte gpsData = ss.read();
    Serial.write(gpsData);
  }
}