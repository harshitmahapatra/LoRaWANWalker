
#include "GPS.h"
#include <SoftwareSerial.h>

//GPS DATA FORMAT
//         time,latitude,longitude,
//  $GPGGA,110617.00,41XX.XXXXX,N,00831.54761,W,1,05,2.68,129.0,M,50.1,M,,*42
//

int32_t _latitude, _longitude;

int32_t GetLatitude(){
  return _latitude;
}

int32_t GetLongitude(){
  return _longitude;
}

void ParseGpsData(String gpsData)
{ 
    Serial.println("enter parseGPSData: \n" + gpsData)
    gpsData = CutGpsString(gpsData);

    out = CutGpsString(out);
    Serial.println("Line we want from gps: \n" + out)

    GetRelevantData("$GPGGA,110617.00,41XX.XXXXX,N,00831.54761,W,1,05,2.68,129.0,M,50.1,M,,*42");
    //GetRelevantData(out);
}

void GetRelevantData(String s)
{
    //Latitude
    String latitude = CutStringAtComma(s,1);
    Serial.println("latitude after cutting: " + latitude);
    latitude = removeDot(latitude);
    Serial.println("latitude after cutting the dot: " + latitude);
    _latitude = atoi(latitude);
    Serial.println(_latitude);

    //Longitude
    String longitude = CutStringAtComma(s,3);
    Serial.println("longitude after cutting: " + longitude);
    longitude = removeDot(longitude);
    Serial.println("longitude after cutting the dot: " + longitude);
    _longitude = atoi(longitude);
    Serial.println(_longitude);
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

String removeDot(String str)
{
//   int i,c;
//   for(i=0;i<strlen(str);i++)
//   {
//     if(str[i]=='.')
//     {
//         c = i;
//     }
//   }
//   memmove(str+c, str+c+1, strlen(str)-c);  
    return "11061700";
}