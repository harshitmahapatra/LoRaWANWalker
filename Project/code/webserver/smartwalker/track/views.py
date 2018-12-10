from django.http import HttpResponse
from django.template import loader
from .models import SensorData
# Create your views here.

def index(request):
    all_objects = SensorData.objects.all()
    template = loader.get_template('track/index.html')

    context = {
        'data_lines': [data for data in all_objects]
    }

    return HttpResponse(template.render(context, request))

    
    
    
    
    
    
    # output = '<br>'.join([data.getsummary() for data in all_objects])
