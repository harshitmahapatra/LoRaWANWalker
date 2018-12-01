#include <Arduino.h>
#include <SoftwareSerial.h>

String CutGpsString(String);
String GetGpsData(SoftwareSerial);
String CutStringAtComma(String, int);
void GetRelevantData(String);
float GetLatitude();
float GetLongitude();
String removeDot(String);