
#include "GPS.h"
#include <SoftwareSerial.h>

String GetGpsData(SoftwareSerial ss)
{
  String out = "";
  while (ss.available() > 0){
    // get the byte data from the GPS
    byte gpsData = ss.read();
    char h = (char)gpsData;
    out+= h;
  }
  delay(2000);
  out = CutGpsString(out);
  return GetRelevantData("$GPGGA,110617.00,41XX.XXXXX,N,00831.54761,W,1,05,2.68,129.0,M,50.1,M,,*42");
}

String GetRelevantData(String s)
{
  //Output String
  String relevantData="";

  //Time
  String locationTime = CutStringAtComma(s,0);
  relevantData += locationTime.substring(0,locationTime.length()-3);

  //Latitude
  String latitude = CutStringAtComma(s,1);
  relevantData += latitude;

  //Longitude
  String longitude = CutStringAtComma(s,3);
  relevantData += longitude;

  return relevantData;
}

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