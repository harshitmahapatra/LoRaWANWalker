#include <Arduino.h>
#define SIGNAL_PIN 0
#define BUTTON_PIN 7

int BPM, avgValue = 0, LastTime;

void setup()
{
    Serial.begin(9600);
    LastTime = millis();
    pinMode(BUTTON_PIN, INPUT_PULLUP);
}

void loop()
{
    if (digitalRead(BUTTON_PIN) == LOW)
    {
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
            Serial.println(BPM);
            delay(450);
        }
        delay(5);