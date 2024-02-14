from rest_framework import serializers
from .models import Player, Movie, Category, Receiver, Bet

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ('id', 'name', 'pic_url')

class MoviesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ('id', 'title', 'description', 'poster_url')

class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'description', 'type', 'nominees', 'winner')

class ReceiversSerializer(serializers.ModelSerializer):
    class Meta:
        model = Receiver
        fields = ('id', 'name', 'description', 'photo_url', 'movie', 'category')
    
class BetsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bet
        fields = ('id', 'player', 'category', 'movie', 'receiver')
    
