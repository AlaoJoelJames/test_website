# Generated by Django 3.2.12 on 2024-05-24 15:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_auto_20240524_1515'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='metric2',
            field=models.CharField(default='na', max_length=2),
        ),
    ]
