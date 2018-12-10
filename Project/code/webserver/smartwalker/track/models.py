from django.db import models
from django.utils import timezone

# Create your models here.
class SensorData(models.Model):
    nodeID = models.CharField(max_length=50, default=None)
    timestamp = models.DateTimeField(default=timezone.now)
    leftHandPressure = models.DecimalField(max_digits=4,decimal_places=2, default=0)
    rightHandPressure = models.DecimalField(max_digits=4,decimal_places=2, default=0)
    heartRate = models.IntegerField(default=0)
    latitude = models.DecimalField(max_digits=12,decimal_places=6, default=-1)
    longitude = models.DecimalField(max_digits=12,decimal_places=6, default=-1)
    movement = models.BooleanField(default=False)



    def getjson(self):
        return {
            "NodeID: ": str(self.nodeID),
            "Timestamp: ": str(self.timestamp),
            "Left hand pressure: " : str(self.leftHandPressure),
            "Right hand pressure: " : str(self.rightHandPressure),
            "Heart rate: " : str(self.heartRate),
            "latitude: ": str(self.latitude),
            "longitude: ": str(self.longitude),
            "Movement: " : str(self.movement)
        }

    def __str__(self):
        summary = \
            " NodeID: " + str(self.nodeID) + \
            " Timestamp: " + str(self.timestamp) + \
            " Left hand pressure: " + str(self.leftHandPressure) + \
            " Right hand pressure: " + str(self.rightHandPressure) + \
            " Heart rate: " + str(self.heartRate) + \
            " latitude: " + str(self.latitude) + \
            " longitude: " + str(self.longitude) + \
            " Movement: " + str(self.movement) + "\n"
        return summary

    def getsummary(self):
        return self.__str__()
