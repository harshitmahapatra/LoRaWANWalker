#include <Arduino.h>

int sensorPin = A0; // FSR is connected to analog 0
int ledPin = D1;      // connect Red LED to pin 11 (PWM pin)
int fsrReading;      // the analog reading from the FSR resistor divider
int LEDbrightness;
 

//Variables:
int value; //save analog value


void setup(){
	
  pinMode(ledPin, OUTPUT);  //Set pin 3 as 'output' 
  Serial.begin(9600);       //Begin serial communication

}

void loop(){
  
  value = analogRead(sensorPin);       //Read and save analog value from potentiometer
  Serial.println(value);               //Print value
  value = map(value, 0, 1023, 0, 255); //Map value 0-1023 to 0-255 (PWM)
  analogWrite(ledPin, value);          //Send PWM value to led
  delay(100);                          //Small delay
  
}