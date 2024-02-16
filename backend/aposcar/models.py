from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    pass

class Player(models.Model):
    name = models.CharField(max_length=100)
    pic_url = models.URLField(blank=True, null=True)

    def __str__(self):
        return f'{self.name}'

class Movie(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    poster_url = models.URLField(blank=True, null=True)

    def __str__(self):
        return f'{self.title}'

class Category(models.Model):
    CATEGORIES_TYPES = [
        ('Main', 'Main'),
        ('Sup', 'Sup'),
        ('Tech', 'Tech'),
    ]
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    type = models.CharField(choices=CATEGORIES_TYPES, max_length=4, default='Main')

    nominees = models.ManyToManyField(Movie, blank=True, related_name="nominations")
    winner = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name="winnings", blank=True, null=True)

    def __str__(self):
        return f'{self.name}'

class Receiver(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    photo_url = models.URLField(blank=True, null=True)

    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):    
        if self.description:
            return f'{self.name} {self.description} from {self.movie}'
        else:
            return f'{self.name} by {self.movie}'

class Bet(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name="bets", blank=True, null=True)
    player = models.ForeignKey(Player, on_delete=models.CASCADE, related_name="bets", blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="bets", blank=True, null=True)
    receiver = models.ForeignKey(Receiver, on_delete=models.CASCADE, related_name="bets", blank=True, null=True)

    def __str__(self):
        return f'{self.player} - {self.category} - {self.movie}'