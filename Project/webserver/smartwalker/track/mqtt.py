import paho.mqtt.client as mqtt
from .deserializer import Payload
from .models import SensorData
from datetime import datetime

APPID  = "56470000001"
PW    = "ttn-account-v2.oi0FW4p2vZlZgXx1hutQzHfE8EfU9HTeSMY89cEfONc"
# SensorData.objects.all().delete()

# The callback for when the client receives a CONNACK response from the server.
def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))

    # subscribe to all the devices
    client.subscribe('+/devices/+/up')

# The callback for when a PUBLISH message is received from the server.
def on_message(client, userdata, msg):
    #print(msg.topic+" "+str(msg.payload))
    print("bla" + str(msg.payload))
    print("bla" + str(msg))

    payload = Payload(msg.payload).__dict__
    fields = payload["payload_fields"]
    print(payload)
    sd = SensorData(\
        leftHandPressure=fields["leftPressure"], \
        rightHandPressure=fields["rightPressure"], \
        heartRate=fields["avgHR"], \
        movement=fields["isMoving"], \
        timestamp=datetime.now(), \
        nodeID=payload["dev_id"]
    )

    print(sd)
    sd.save()
    print("succesfull!!")
    
def on_disconnect(client, userdata, rc):
    client.loop_stop(force=False)
    if rc != 0:
        print("Unexpected disconnection.")
    else:
        print("Disconnected")

client = mqtt.Client()
client.on_connect = on_connect
client.on_disconnect = on_disconnect
client.on_message = on_message
client.username_pw_set(APPID,PW)
client.connect("eu.thethings.network", 1883, 60)
#client.connect("broker.mqttdashboard.com",1883,60)


