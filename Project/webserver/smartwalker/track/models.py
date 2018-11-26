from django.db import models

# Create your models here.
class SensorData(models.Model):
    leftHandPressure = models.DecimalField(max_digits=10,decimal_places=4, default=0)
    rightHandPressure = models.DecimalField(max_digits=10,decimal_places=4, default=0)
    heartRate = models.IntegerField(default=0)
    movement = models.BooleanField(default=False)
    
    def getjson(self):
        return {
            "Left hand pressure: " : str(self.leftHandPressure),
            " Right hand pressure: " : str(self.rightHandPressure),
            " Heart rate: " : str(self.heartRate),
            " Movement: " : str(self.movement)
        }

    def __str__(self):
        summary = \
            "Left hand pressure: " + str(self.leftHandPressure) + \
            " Right hand pressure: " + str(self.rightHandPressure) + \
            " Heart rate: " + str(self.heartRate) + \
            " Movement: " + str(self.movement) + "\n"
        return summary

    def getsummary(self):
        return self.__str__()
