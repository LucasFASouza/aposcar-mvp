from django.urls import path
from .views import PlayerView,PlayerDetailView, MoviesView, MoviesDetailView, CategoriesView, CategoriesDetailView, ReceiversView, ReceiversDetailView, BetsView, BetsDetailView

urlpatterns = [
    path('players', PlayerView.as_view()),
    path('players/<int:pk>', PlayerDetailView.as_view()),
    path('movies', MoviesView.as_view()),
    path('movies/<int:pk>', MoviesDetailView.as_view()),
    path('categories', CategoriesView.as_view()),
    path('categories/<int:pk>', CategoriesDetailView.as_view()),
    path('receivers', ReceiversView.as_view()),
    path('receivers/<int:pk>', ReceiversDetailView.as_view()),
    path('bets', BetsView.as_view()),
    path('bets/<int:pk>', BetsDetailView.as_view()),
]