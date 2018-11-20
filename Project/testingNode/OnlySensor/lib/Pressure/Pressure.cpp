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
  if (handle.read() == 8388608)
  {
    Serial.println("Its fucked");
  }
  //Getting data line Min/Max/Avg
  for(size_t i = 0; i < samples; i++)
  {
    if (sensor == SensorID::four) {
      pressure = float(handle.read() - 8547100) / 215822;
    }
    else if (sensor == SensorID::four_black)
    {
      pressure = float(handle.read() - 8524000) / 215380;
    } 
    else
    {
      pressure = float(handle.read() - 8240692) / 219056;
    }
    Serial.print("pressure: ");
    Serial.println(pressure);

    if (pressure < min)
      min = pressure;
    if (max < pressure)
      max = pressure;
    total += pressure;
  }

  avg = total / samples;

  return PressureData(max, min, avg);
}



// PressureData GetPressure(HX711 rightHandle, HX711 leftHandle)
// {

//   float rightValue, minRight = 0, maxRight = 0, totalRight = 0, avgRight = 0,
//                     leftValue, minLeft = 0, maxLeft = 0, totalLeft = 0, avgLeft = 0;
//   int samples = 15;

//   //Getting data line Min/Max/Avg
//   for (size_t i = 0; i < samples; i++)
//   {
//     rightValue = rightHandle.read();
//     leftValue = leftHandle.read();

//     //4
//     // rightValue=float(rightHandle.read()-8547100)/215822;
//     //leftValue=float(leftHandle.read()-8547100)/215822;

//     //4b
//     rightValue = float(rightHandle.read() - 8524000) / 215380;
//     //leftValue=float(leftHandle.read()-8524000)/215380;

//     //10
//     //rightValue=float(rightHandle.read()-8240692)/219056;
//     leftValue = float(leftHandle.read() - 8240692) / 219056;

//     if (rightValue < minRight)
//       minRight = rightValue;
//     if (maxRight < rightValue)
//       maxRight = rightValue;
//     totalRight += rightValue;

//     if (leftValue < minLeft)
//       minLeft = leftValue;
//     if (maxLeft < leftValue)
//       maxLeft = leftValue;
//     totalLeft += leftValue;
//   }

//   avgRight = totalRight / samples;
//   avgLeft = totalLeft / samples;

//   PressureData rightHandleData = PressureData(maxRight, minRight, avgRight);
//   PressureData leftHandleData = PressureData(maxLeft, minLeft, avgLeft);

//   Serial.println(avgRight);
//   Serial.println(avgLeft);
// }