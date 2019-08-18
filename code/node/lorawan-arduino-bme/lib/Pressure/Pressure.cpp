#include <Arduino.h> 
#include <HX711.h>
#include "Pressure.h"
//Number Zero 1 Kilo
//4  Serial.println(float(val-8547100)/215822);
//4b Serial.println(float(val-8524000)/215380 );
//10 Serial.println(float (val-8240692)/219056);

long val = 0;
float count = 0;
float value = 0;

PressureData GetPressure(HX711 handle, SensorID sensor)
{

  float pressure, min = 0, max = 0, total = 0, avg = 0;
  int samples=15;

    //Getting data line Min/Max/Avg
    for (size_t i = 0; i < samples; i++)
    {
      //8388607
      long handleRead = handle.read();
      if(handleRead!=8388607 && handleRead!=9437183){
        if (sensor == SensorID::four)
        {
          pressure = float(handleRead - 8547100) / 215822;
        }
        else if (sensor == SensorID::four_black)
        {
          
          // Serial.println(handleRead);
          pressure = float(handleRead - 8530729) / 215380;
          // Serial.println(pressure);
        }
        else if (sensor == SensorID::ten)
        {
          // Serial.println(handleRead);
          pressure = float(handleRead - 8238388) / 219056;
          // Serial.println(pressure);
        }

        if (pressure < min)
          min = pressure;
        if (max < pressure)
          max = pressure;
        total += pressure;
      }
    }

  avg = total / samples;

  return PressureData(max, min, avg);
}