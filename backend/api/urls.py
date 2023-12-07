from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, MovieViewSet, WatchlistViewSet, ListMovieViewSet
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

# Default router initialization + url conf
router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'movies', MovieViewSet, basename='movie')
router.register(r'listmovies', ListMovieViewSet, basename='listmovie')
router.register(r'watchlists', WatchlistViewSet, basename='watchlist')

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

urlpatterns += router.urls

print(urlpatterns)
