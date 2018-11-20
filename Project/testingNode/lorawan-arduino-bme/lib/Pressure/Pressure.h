#include <HX711.h>

enum SensorID
{
    four,
    four_black,
    ten
};

class PressureData
{
  private:
    float average, max, min;
  public:
    PressureData() {};
    PressureData(float _max, float _min, float _average){
        max = _max;
        min = _min;
        average = _average;
    };

    float GetAvg(){
        return average;
    }

    float GetMax()
    {
        return max;
    }

    float GetMin()
    {
        return min;
    }

    void SetAvg(float value)
    {
        average = value;
    }

    void SetMax(float value)
    {
        max = value;
    }

    void SetMin(float value)
    {
        min = value;
    }

    void PrintValues(){
        Serial.print("average: ");
        Serial.println(average);
        Serial.print("max: ");
        Serial.println(max);
        Serial.print("min: ");
        Serial.println(min);
    }
};

PressureData GetPressure(HX711 rightHandle, SensorID sensor);
