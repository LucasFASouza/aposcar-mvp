from rest_framework import serializers
from .models import Player, Movie, Category, Receiver, Bet

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ('id', 'name', 'pic_url', 'letterboxd')

class MoviesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ('id', 'title', 'description', 'poster_url')

class CategoriesSerializer(serializers.ModelSerializer):
    nominees = MoviesSerializer(many=True, required=False)
    winner = MoviesSerializer(required=False)
    class Meta:
        model = Category
        fields = ('id', 'name', 'description', 'type', 'nominees', 'winner')

class ReceiversSerializer(serializers.ModelSerializer):
    movie = MoviesSerializer()
    category = CategoriesSerializer()
    class Meta:
        model = Receiver
        fields = ('id', 'name', 'description', 'photo_url', 'movie', 'category')
    
class BetsSerializer(serializers.ModelSerializer):
    player = PlayerSerializer(many=False)
    category = CategoriesSerializer(many=False)
    movie = MoviesSerializer(many=False)
    receiver = ReceiversSerializer(many=False, required=False)

    class Meta:
        model = Bet
        fields = ('id', 'player', 'category', 'movie', 'receiver')

    def create(self, validated_data):
        player_data = validated_data.pop('player')

        category_data = validated_data.pop('category')
        movie_data = validated_data.pop('movie')
        receiver_data = validated_data.pop('receiver', None)

        bet = Bet.objects.create(**validated_data)

        player = Player.objects.get_or_create(**player_data)[0]
        player.bets.add(bet)

        movie = Movie.objects.get_or_create(**movie_data)[0] 
        movie.bets.add(bet)

        category = Category.objects.get_or_create(**category_data)[0]
        category.bets.add(bet)

        if receiver_data:
            receiver = Receiver.objects.get_or_create(**receiver_data)[0]
            receiver.bets.add(bet)

        return bet
