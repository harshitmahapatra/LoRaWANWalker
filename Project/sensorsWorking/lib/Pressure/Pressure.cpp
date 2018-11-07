#include <Arduino.h> 
#include <HX711.h>

//Number Zero 1 Kilo
//4  Serial.println(float(val-8547100)/215822);
//4b Serial.println(float(val-8524000)/215380 );
//10 Serial.println(float (val-8240692)/219056);

long val = 0;
float count = 0;
float value = 0;

String GetPressure(HX711 rightHandle,HX711 leftHandle){
  //MinMaxAVG

  float rightValue, smallestRight=0, biggestRight=0, avgRight=0, 
        leftValue, smallestLeft=0, biggestLeft=0, avgLeft=0;
  int samples=15;

  //Getting data line Min/Max/Avg
  for(size_t i = 0; i < samples; i++)
  {
      rightValue=rightHandle.read();
      leftValue=leftHandle.read();

      //4
      rightValue=float(rightHandle.read()-8547100)/215822;
      //leftValue=float(leftHandle.read()-8547100)/215822;

      //4b
      //rightValue=float(rightHandle.read()-8524000)/215380;
      leftValue=float(leftHandle.read()-8524000)/215380;

      //10
      //rightValue=float(rightHandle.read()-8240692)/219056;
      //leftValue=float(leftHandle.read()-8240692)/219056;

      if(rightValue<smallestRight) smallestRight=rightValue;
      if(biggestRight<rightValue) biggestRight=rightValue;
      avgRight+=rightValue;

      if(leftValue<smallestLeft) smallestLeft=leftValue;
      if(biggestLeft<leftValue) biggestLeft=leftValue;
      avgLeft+=leftValue;
  }

  avgRight=avgRight/samples;
  avgLeft=avgLeft/samples;

  //Converting to String
  String output="";
  output+=rightValue;
  output+=smallestRight;
  output+=biggestRight;
  output+=avgRight;
  output+=leftValue; 
  output+=smallestLeft;
  output+=biggestLeft;
  output+=avgLeft;
}