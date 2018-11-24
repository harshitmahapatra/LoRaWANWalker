#include <Arduino.h>


int BPM, avgValue, LastTime, InitTime;

int GetAvgHR(int8_t SIGNAL_PIN)
{
    LastTime = millis();
    avgValue = 550;
    BPM=0;
    while(!(60<BPM && BPM<120))
    {
        //Serial.println(avgValue);
        //Serial.println(analogRead(0));

        avgValue = avgValue * 0.95 + analogRead(SIGNAL_PIN) * 0.05;
        //difference=analogRead(0)/avgValue;
        //Serial.println(difference);

        if (analogRead(SIGNAL_PIN) > (avgValue + 70) && analogRead(SIGNAL_PIN) < (avgValue + 100) && avgValue > 430 && avgValue < 830)
        {
            BPM = millis() - LastTime;
            BPM = int(60 / (float(BPM) / 1000));
            LastTime = millis();
            //Serial.print(avgValue);
            //Serial.print("    ");
            //Serial.print(analogRead(0));
            //Serial.print("    ");
            //Serial.print(analogRead(0)-avgValue);
            //Serial.print("    ");
            //Serial.println(BPM);
            delay(400);
        }
        delay(5);
    }
    return BPM;
}