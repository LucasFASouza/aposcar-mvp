# Generated by Django 5.0 on 2024-02-14 02:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('aposcar', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Bets',
            new_name='Bet',
        ),
        migrations.RenameModel(
            old_name='Categories',
            new_name='Category',
        ),
        migrations.RenameModel(
            old_name='Movies',
            new_name='Movie',
        ),
        migrations.RenameModel(
            old_name='Receivers',
            new_name='Receiver',
        ),
    ]
