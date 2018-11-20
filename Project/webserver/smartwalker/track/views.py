from django.shortcuts import render
from django.http import HttpResponse
from .models import SensorData
# Create your views here.

def index(request):
    all_objects = SensorData.objects.all()
    output = '<br>'.join([data.getsummary() for data in all_objects])
    print(output)
    return HttpResponse(output)