from django.db import models

# Create your models here.
class SensorData(models.Model):
    leftHandPressure = models.DecimalField(max_digits=4,decimal_places=2, default=0)
    rightHandPressure = models.DecimalField(max_digits=4,decimal_places=2, default=0)
    heartRate = models.IntegerField(default=0)
    movement = models.BooleanField(default=False)
    timestamp = models.DateTimeField(default=None)
    nodeID = models.CharField(max_length=50, default=None)


    def getjson(self):
        return {
            "NodeID: ": str(self.nodeID),
            "Timestamp: ": str(self.timestamp),
            "Left hand pressure: " : str(self.leftHandPressure),
            "Right hand pressure: " : str(self.rightHandPressure),
            "Heart rate: " : str(self.heartRate),
            "Movement: " : str(self.movement)
        }

    def __str__(self):
        summary = \
            " NodeID: " + str(self.nodeID) + \
            " Timestamp: " + str(self.timestamp) + \
            " Left hand pressure: " + str(self.leftHandPressure) + \
            " Right hand pressure: " + str(self.rightHandPressure) + \
            " Heart rate: " + str(self.heartRate) + \
            " Movement: " + str(self.movement) + "\n"
        return summary

    def getsummary(self):
        return self.__str__()
