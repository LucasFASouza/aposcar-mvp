# Generated by Django 5.0.2 on 2024-02-16 14:56

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('aposcar', '0003_alter_category_description_alter_movie_description_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bet',
            name='category',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='aposcar.category'),
        ),
        migrations.AlterField(
            model_name='bet',
            name='movie',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='aposcar.movie'),
        ),
        migrations.AlterField(
            model_name='bet',
            name='player',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='bets', to='aposcar.player'),
        ),
    ]
