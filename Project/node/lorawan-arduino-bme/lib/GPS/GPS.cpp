#include <Arduino.h>
#include "GPS.h"
#include <SoftwareSerial.h>

//GPS DATA FORMAT
//         time,latitude,longitude,
//  $GPGGA,110617.00,41XX.XXXXX,N,00831.54761,W,1,05,2.68,129.0,M,50.1,M,,*42
//
int32_t _latitude, _longitude;

String GetGpsData(SoftwareSerial ss)
{ 
  String out = "";
  while (ss.available() > 0){
    // get the byte data from the GPS
    byte gpsData = ss.read();
    char h = (char)gpsData;
    out+= h;
    uint8_t i = 0;
  }
  delay(2000);
  out = CutGpsString(out);
  GetRelevantData("$GPGGA,110617.00,4145.56675,N,10831.54761,W,1,05,2.68,129.0,M,50.1,M,,*42");
  //return GetRelevantData(out);
}

float GetLatitude(){
  return _latitude;
}

float GetLongitude(){
  return _longitude;
}

void GetRelevantData(String s)
{
  //Time
  // String locationTime = CutStringAtComma(s,0);
  // relevantData += locationTime.substring(0,locationTime.length()-3);

  //Latitude
  String latitude = CutStringAtComma(s,1);
  latitude = removeDot(latitude);
  _latitude = latitude.toInt();
  //Longitude
  String longitude = CutStringAtComma(s,3);
  longitude = removeDot(longitude);
  _longitude = longitude.toInt();
}

String removeDot(String s)
{
  String snew="";
  for(char c:s)
  {
    if(c!='.')
    {
      snew+=c;
    }
  }
  return snew;
}

//Cut output at specific comma
String CutStringAtComma(String s, int from)
{
  int fromPosition, toPosition, counter=0;
  
  for(size_t i = 0; i < s.length(); i++)
  {
    if(s[i]==',')
    {
      counter++;
    }
    if(from==counter)
    {
      fromPosition = i+2;
    }
    if(from+1==counter)
    {
      toPosition = i+1;
    }
  }
  return s.substring(fromPosition,toPosition);
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