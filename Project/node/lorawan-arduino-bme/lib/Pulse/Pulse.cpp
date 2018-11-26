#include <Arduino.h>


int BPM, avgValue, LastTime, InitTime, pastValue;

int GetAvgHR(int8_t SIGNAL_PIN)
{
    LastTime = millis();
    avgValue = 450;
    pastValue =  analogRead(SIGNAL_PIN);
    int signalRead=0;
    BPM=0;
    while(!(55<BPM && BPM<150))
    {
        signalRead = analogRead(SIGNAL_PIN);
        
        avgValue = avgValue * 0.92 + signalRead * 0.08;

        // Print for visualization
        // Serial.println(signalRead - avgValue);
        // Serial.print(" ");
        // Serial.print(signalRead);
        // Serial.print(" ");
        // Serial.print(avgValue);
        // Serial.print(" ");
        // if(pastValue>signalRead)
        // {
        //     Serial.println(400);
        // }else{
        //     Serial.println(420);
        // }
        // Serial.println("");
        
        if (pastValue>signalRead&&signalRead>(avgValue+20))
        {
            BPM = millis() - LastTime;
            BPM = int(60 / (float(BPM) / 1000));
            LastTime = millis();
        }
        pastValue =  signalRead;
        delay(10);
      
    }
    return BPM;
}