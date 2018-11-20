from django.apps import AppConfig


class TrackConfig(AppConfig):
    name = 'track'
    def ready(self):
        from . import mqtt
        mqtt.client.loop_start()