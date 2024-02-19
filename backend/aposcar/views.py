from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Player, Movie, Category, Receiver, Bet
from .serializers import PlayerSerializer, MoviesSerializer, CategoriesSerializer, ReceiversSerializer, BetsSerializer

class PlayerView(APIView):
    def get(self, request):
        players = Player.objects.all()
        serializer = PlayerSerializer(players, many=True)
        return Response({"players": serializer.data})
    
    def post(self, request):
        player = request.data.get('player')

        serializer = PlayerSerializer(data=player)
        if serializer.is_valid(raise_exception=True):
            serializer.save()

            return Response(serializer.data, status=201)
        
        return Response(serializer.errors, status=400)

class PlayerDetailView(APIView):
    def get(self, request, pk):
        player = Player.objects.get(pk=pk)
        serializer = PlayerSerializer(player)
        return Response({"player": serializer.data})
    
    def put(self, request, pk):
        saved_player = Player.objects.get(pk=pk)
        data = request.data.get('player')
        serializer = PlayerSerializer(instance=saved_player, data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            player_saved = serializer.save()
        return Response({"success": "Player '{}' updated successfully".format(player_saved.name)})
    
    def delete(self, request, pk):
        player = Player.objects.get(pk=pk)
        player.delete()
        return Response({"message": "Player with id `{}` has been deleted.".format(pk)}, status=204)
    
class MoviesView(APIView):
    def get(self, request):
        movies = Movie.objects.all()
        serializer = MoviesSerializer(movies, many=True)
        return Response({"movies": serializer.data})
    
    def post(self, request):
        movie = request.data.get('movie')
        serializer = MoviesSerializer(data=movie)
        if serializer.is_valid(raise_exception=True):
            movie_saved = serializer.save()
        return Response({"success": "Movie '{}' created successfully".format(movie_saved.title)})

class MoviesDetailView(APIView):
    def get(self, request, pk):
        movie = Movie.objects.get(pk=pk)
        serializer = MoviesSerializer(movie)
        return Response({"movie": serializer.data})
    
    def put(self, request, pk):
        saved_movie = Movie.objects.get(pk=pk)
        data = request.data.get('movie')
        serializer = MoviesSerializer(instance=saved_movie, data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            movie_saved = serializer.save()
        return Response({"success": "Movie '{}' updated successfully".format(movie_saved.title)})
    
    def delete(self, request, pk):
        movie = Movie.objects.get(pk=pk)
        movie.delete()
        return Response({"message": "Movie with id `{}` has been deleted.".format(pk)}, status=204)
    
class CategoriesView(APIView):
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategoriesSerializer(categories, many=True)
        return Response({"categories": serializer.data})
    
    def post(self, request):
        category = request.data.get('category')
        serializer = CategoriesSerializer(data=category)
        if serializer.is_valid(raise_exception=True):
            category_saved = serializer.save()
        return Response({"success": "Category '{}' created successfully".format(category_saved.name)})

class CategoriesDetailView(APIView):
    def get(self, request, pk):
        category = Category.objects.get(pk=pk)
        serializer = CategoriesSerializer(category)
        return Response({"category": serializer.data})
    
    def put(self, request, pk):
        saved_category = Category.objects.get(pk=pk)
        data = request.data.get('category')
        serializer = CategoriesSerializer(instance=saved_category, data=data, partial=True)

        if serializer.is_valid(raise_exception=True):
            category_saved = serializer.save()
            
        return Response({"success": "Category '{}' updated successfully".format(category_saved.name)})
    
    def delete(self, request, pk):
        category = Category.objects.get(pk=pk)
        category.delete()
        return Response({"message": "Category with id `{}` has been deleted.".format(pk)}, status=204)
    
class ReceiversView(APIView):
    def get(self, request):
        receivers = Receiver.objects.all()
        serializer = ReceiversSerializer(receivers, many=True)
        return Response({"receivers": serializer.data})
    
    def post(self, request):
        receiver = request.data.get('receiver')
        serializer = ReceiversSerializer(data=receiver)
        if serializer.is_valid(raise_exception=True):
            receiver_saved = serializer.save()
        return Response({"success": "Receiver '{}' created successfully".format(receiver_saved.name)})
    
class ReceiversDetailView(APIView):
    def get(self, request, pk):
        receiver = Receiver.objects.get(pk=pk)
        serializer = ReceiversSerializer(receiver)
        return Response({"receiver": serializer.data})
    
    def put(self, request, pk):
        saved_receiver = Receiver.objects.get(pk=pk)
        data = request.data.get('receiver')
        serializer = ReceiversSerializer(instance=saved_receiver, data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            receiver_saved = serializer.save()
        return Response({"success": "Receiver '{}' updated successfully".format(receiver_saved.name)})
    
    def delete(self, request, pk):
        receiver = Receiver.objects.get(pk=pk)
        receiver.delete()
        return Response({"message": "Receiver with id `{}` has been deleted.".format(pk)}, status=204)
    
class BetsView(APIView):
    def get(self, request):
        bets = Bet.objects.all()
        serializer = BetsSerializer(bets, many=True)
        return Response({"bets": serializer.data})
    
    def post(self, request):
        bet = request.data.get('bet')

        serializer = BetsSerializer(data=bet)
        if serializer.is_valid(raise_exception=True):
            serializer.save()

            return Response(serializer.data, status=201)
        
        return Response(serializer.errors, status=400)
    
class BetsDetailView(APIView):
    def get(self, request, pk):
        bet = Bet.objects.get(pk=pk)
        serializer = BetsSerializer(bet)
        return Response({"bet": serializer.data})
    
    def put(self, request, pk):
        saved_bet = Bet.objects.get(pk=pk)
        data = request.data.get('bet')
        serializer = BetsSerializer(instance=saved_bet, data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            bet_saved = serializer.save()
        return Response({"success": "Bet '{}' updated successfully".format(bet_saved.id)})
    
    def delete(self, request, pk):
        bet = Bet.objects.get(pk=pk)
        bet.delete()
        return Response({"message": "Bet with id `{}` has been deleted.".format(pk)}, status=204)