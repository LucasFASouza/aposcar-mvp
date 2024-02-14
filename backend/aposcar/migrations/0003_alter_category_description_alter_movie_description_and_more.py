# Generated by Django 5.0 on 2024-02-14 04:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('aposcar', '0002_rename_bets_bet_rename_categories_category_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='movie',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='movie',
            name='poster_url',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='player',
            name='pic_url',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='receiver',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='receiver',
            name='photo_url',
            field=models.URLField(blank=True, null=True),
        ),
    ]
