from django.db import models

# Create your models here.
class SensorData(models.Model):
    celcius = models.DecimalField(max_digits=10,decimal_places=7)
    humidity = models.DecimalField(max_digits=10,decimal_places=7)
    pressure = models.IntegerField(default=0)
    
    def __str__(self):
        summary = "Celcius: " + str(self.celcius) + "Humidity: " + str(self.humidity) + "Pressure: " + str(self.pressure) 
        return summary
    def getsummary(self):
        summary = "Celcius: " + str(self.celcius) + "Humidity: " + str(self.humidity) + "Pressure: " + str(self.pressure) 
        return summary