from django.shortcuts import render
from rest_framework import generics
from django.http import JsonResponse
from .models import Movie
from .serializers import MovieSerializer

class TopGrossMoviesView(generics.ListAPIView):
    serializer_class = MovieSerializer
    def get_queryset(self):
        year = self.request.query_params.get('year')
        if year:
            return Movie.objects.filter(year=year).order_by('-gross')[:5]
        return Movie.objects.none()

class TopRatedMoviesView(generics.ListAPIView):
    serializer_class = MovieSerializer

    def get_queryset(self):
        year = self.request.query_params.get('year')
        if year:
            return Movie.objects.filter(year=year).order_by('-rating')[:10]
        return Movie.objects.none()

class TopVotedMoviesView(generics.ListAPIView):
    serializer_class = MovieSerializer

    def get_queryset(self):
        return Movie.objects.order_by('-votes')[:5]

class AvailableYearsView(generics.GenericAPIView):
    def get(self, request):
        years = Movie.objects.values_list('year', flat=True).distinct().order_by('year')
        return JsonResponse(list(years), safe=False)
