#include <Arduino.h>
#include <SoftwareSerial.h>

String CutGpsString(String);
String GetGpsData(SoftwareSerial);
String CutStringAtComma(String, int);
String GetRelevantData(String);