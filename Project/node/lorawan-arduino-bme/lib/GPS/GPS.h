#include <Arduino.h>
#include <SoftwareSerial.h>

String CutGpsString(String s);
String CutStringAtComma(String s, int from);
void GetRelevantData(String s);
void ParseGpsData(String gpsData);
int32_t GetLatitude();
int32_t GetLongitude();
String removeDot(String);