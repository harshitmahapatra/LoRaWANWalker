#include <Arduino.h>
#include "GPS.h"
#include <SoftwareSerial.h>
#include <string.h>

//GPS DATA FORMAT
//         time,latitude,longitude,
//  $GPGGA,110617.00,41XX.XXXXX,N,00831.54761,W,1,05,2.68,129.0,M,50.1,M,,*42
//
int32_t _latitude, _longitude;

void GetGpsData(SoftwareSerial ss)
{ 
  char* out = "";
  while (ss.available() > 0){
    // get the byte data from the GPS
    // byte gpsData = ss.read();
    // char h = (char)gpsData;
    // out+= h;
    // uint8_t i = 0;
    Serial.print('|');
  }
  Serial.println(' ');
  char* mock = "$GPGGA,110617.00,4145.56675,N,10831.54761,W,1,05,2.68,129.0,M,50.1,M,,*42";
  GetRelevantData(mock);
  //out = CutGpsString(out);
  //GetRelevantData(out);
}

float GetLatitude(){
  return _latitude;
}

float GetLongitude(){
  return _longitude;
}

void GetRelevantData(char* s)
{
  //Time
  // String locationTime = CutStringAtComma(s,0);
  // relevantData += locationTime.substring(0,locationTime.length()-3);
  const char* s2=s;
  char* a;
  char* b;
  a = strdup(s2);
  b = strdup(s2);
  //Latitude
  char* latitude = CutStringAtComma(a,2);
  Serial.println(latitude);
  latitude = removeDot(latitude);
  Serial.println(latitude);
  _latitude = atoi(latitude);
  Serial.println(_latitude);
  //Longitude
  char* longitude = CutStringAtComma(b,4);
  Serial.println(longitude);
  longitude = removeDot(longitude);
  Serial.println(longitude);
  _longitude = atoi(longitude);
  Serial.println(_longitude);
}

char* removeDot(char* s)
{
  char outChar[strlen(s)];
  int counter=0;
  for(int i = 0; s[i] != '\0'; i++) 
  {
      if(s[i]!='.')
      {
          outChar[counter]=s[i];
          counter++;
      }
  }
  return outChar;
}

//Cut output at specific comma
char* CutStringAtComma(char* s, int from)
{
  int c=0;
  char *pt;
  pt = strtok (s,",");
  while (pt != NULL) {
        if(c==from)
        {
            return pt;
        }
        pt = strtok (NULL, ",");
        c++;
    }
  return "";
}

//Cut whole String to get the needed line
String CutGpsString(String s)
{
  int save=0;
  for(size_t i = 1; i < s.length(); i++)
  {
    if(s[i]=='$')
    {
      save=i;
    }
  }
  return s.substring(save, s.length());
}