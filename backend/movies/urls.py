from django.urls import path
from .views import TopGrossMoviesView, TopRatedMoviesView, TopVotedMoviesView,AvailableYearsView

urlpatterns = [
    path('top-gross-movies/', TopGrossMoviesView.as_view(), name='top-gross-movies'),
    path('top-rated-movies/', TopRatedMoviesView.as_view(), name='top-rated-movies'),
    path('top-voted-movies/', TopVotedMoviesView.as_view(), name='top-voted-movies'),
    path('available-years/', AvailableYearsView.as_view(), name='available-years')
]

