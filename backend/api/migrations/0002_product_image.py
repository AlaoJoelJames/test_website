# Generated by Django 3.2.12 on 2024-05-18 02:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='image',
            field=models.ImageField(default='images/None/no-img.jpg', upload_to='images/'),
        ),
    ]
