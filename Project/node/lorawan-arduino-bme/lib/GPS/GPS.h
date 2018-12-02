#include <Arduino.h>
#include <SoftwareSerial.h>

String CutGpsString(String);
void GetGpsData(String);
char* CutStringAtComma(char*, int);
void GetRelevantData(char*);
float GetLatitude();
float GetLongitude();
char* removeDot(char*);