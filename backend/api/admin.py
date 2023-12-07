from django.contrib import admin
from .models import Movie, Watchlist, WatchListMovie


admin.site.register(Movie)
admin.site.register(Watchlist)
admin.site.register(WatchListMovie)
