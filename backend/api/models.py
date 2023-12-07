from django.db import models
from django.contrib.auth.models import User


class Watchlist(models.Model):
    created_by = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='created_by')

    def __str__(self):
        return f'{self.created_by.username} watchlist'


class Movie(models.Model):
    title = models.CharField(max_length=256)
    description = models.TextField()
    popularity = models.TextField(max_length=256)
    poster_path = models.CharField(max_length=256)
    avg_rating = models.CharField(max_length=256)
    release_date = models.CharField(max_length=256)
    adult = models.BooleanField()

    def __str__(self):
        return f'{self.title}'


class WatchListMovie(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    watchlist = models.ForeignKey(Watchlist, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.movie.title}'
