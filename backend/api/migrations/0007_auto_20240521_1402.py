# Generated by Django 3.2.12 on 2024-05-21 14:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_auto_20240521_1306'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='capacity',
            field=models.IntegerField(default=0, max_length=15),
        ),
        migrations.AlterField(
            model_name='product',
            name='metric2',
            field=models.CharField(default='m', max_length=2),
        ),
    ]
