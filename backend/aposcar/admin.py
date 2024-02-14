from django.contrib import admin
from .models import Player, Movie, Category, Receiver, Bet

admin.site.register(Player)
admin.site.register(Movie)
admin.site.register(Category)
admin.site.register(Receiver)
admin.site.register(Bet)