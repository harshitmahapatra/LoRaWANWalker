# Generated by Django 2.1.2 on 2018-11-08 11:24

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='SensorData',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('celcius', models.DecimalField(decimal_places=7, max_digits=10)),
                ('humidity', models.DecimalField(decimal_places=7, max_digits=10)),
                ('pressure', models.IntegerField(default=0)),
            ],
        ),
    ]
