# Generated by Django 4.2.7 on 2023-12-07 22:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='watchlist',
            name='created_at',
        ),
        migrations.RemoveField(
            model_name='watchlist',
            name='members',
        ),
        migrations.RemoveField(
            model_name='watchlist',
            name='title',
        ),
        migrations.RemoveField(
            model_name='watchlistmovie',
            name='added_by',
        ),
        migrations.RemoveField(
            model_name='watchlistmovie',
            name='watched',
        ),
    ]
