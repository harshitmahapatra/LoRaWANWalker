#include <Arduino.h>
#include <SoftwareSerial.h>

char* CutGpsString(char*);
void GetGpsData(SoftwareSerial);
char* CutStringAtComma(char*, int);
void GetRelevantData(char*);
float GetLatitude();
float GetLongitude();
char* removeDot(char*);