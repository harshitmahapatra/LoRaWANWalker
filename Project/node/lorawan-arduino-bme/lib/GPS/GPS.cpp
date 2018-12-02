
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
    gpsData = CutGpsString(gpsData);

    GetRelevantData("$GPGGA,110617.00,4123.45635,N,00831.54761,W,1,05,2.68,129.0,M,50.1,M,,*42");
    //GetRelevantData(gpsData);
}

void GetRelevantData(String s)
{
    //Latitude
    String latitude = CutStringAtComma(s,1);
    latitude = removeDot(latitude);
    _latitude = latitude.toInt();

    //Longitude
    String longitude = CutStringAtComma(s,3);
    longitude = removeDot(longitude);
    _longitude = longitude.toInt();
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
  String strOut="";
  for(char c:str)
  {
    if(c!='.')
    {
      strOut+=c;
    }
  }
  return strOut;
}