from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Movie, Watchlist, WatchListMovie
from django.contrib.auth.models import User
from .serializers import WatchListMovieSerialzier, RegisterSerializer, UserSerializer, MovieSerialzier, WatchlistSerialzier


class CreateUserPermission(AllowAny):
    def has_permission(self, request, view):
        return True


class UserViewSet(viewsets.ViewSet):

    def list(self, request):
        queryset = User.objects.all()
        serialized_data = UserSerializer(queryset, many=True).data
        return Response(serialized_data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['GET'], url_path='movies')
    def get_user_movies(self, request):
        watchlist = Watchlist.objects.get(created_by=request.user)
        watchlist_movies_relation = WatchListMovie.objects.filter(
            watchlist=watchlist)

        movies_data = []

        for query in watchlist_movies_relation:
            movie_serializer = MovieSerialzier(query.movie)
            movies_data.append(movie_serializer.data)

        return Response(movies_data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['GET'], url_path='search/(?P<query>[^/.]+)')
    def user_search_by_username(self, request, query=None):
        queryset = User.objects.filter(username__contains=query)
        serialized_data = UserSerializer(queryset, many=True).data
        if len(serialized_data) > 0:
            return Response(serialized_data)
        return Response({'message': 'No user found'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['GET'], url_path='watchlists')
    def get_user_watchlists(self, request):
        queryset = Watchlist.objects.filter(created_by=request.user)
        serialized_data = WatchlistSerialzier(queryset, many=True).data
        if len(serialized_data) > 0:
            return Response(serialized_data)
        return Response({'message': 'No watchlists found'}, status=status.HTTP_404_NOT_FOUND)

    def create(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully."}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        user = get_object_or_404(User, id=pk)
        serialized_data = UserSerializer(user, many=False).data
        return Response(serialized_data, status=status.HTTP_200_OK)

    def update(self, request, pk=None):
        user = get_object_or_404(User, id=pk)
        serializer = UserSerializer(user, request.data, partial=False)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User has been successfully updated.'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Invalid payload.'}, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, pk=None):
        user = get_object_or_404(User, id=pk)
        serializer = UserSerializer(user, request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User has been successfully updated.'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Invalid payload.'}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        user = get_object_or_404(User, id=pk)
        user.delete()
        return Response({'message': 'User has been successfully deleted.'}, status=status.HTTP_200_OK)


class MovieViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request):
        queryset = Movie.objects.all()
        serialized_data = MovieSerialzier(queryset, many=True).data
        return Response(serialized_data, status=status.HTTP_200_OK)

    def create(self, request):
        existing_movie = Movie.objects.filter(
            title=request.data.get('title')).exists()

        if existing_movie:
            existing_movie = Movie.objects.get(
                title=request.data.get('title'))
            serialized_data = MovieSerialzier(
                existing_movie, many=False).data
            return Response(serialized_data, status=status.HTTP_302_FOUND)
        serializer = MovieSerialzier(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Movie created successfully.", 'movie': serializer.data}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        movie = get_object_or_404(Movie, id=pk)
        serialized_data = MovieSerialzier(movie, many=False).data
        return Response(serialized_data, status=status.HTTP_200_OK)

    def update(self, request, pk=None):

        movie = get_object_or_404(Movie, id=pk)
        serializer = MovieSerialzier(movie, request.data, partial=False)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Movie has been successfully updated.'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Invalid payload.'}, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, pk=None):
        movie = get_object_or_404(Movie, id=pk)
        serializer = MovieSerialzier(movie, request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Movie has been successfully updated.'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Invalid payload.'}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        movie = get_object_or_404(Movie, id=pk)
        movie.delete()
        return Response({'message': 'Movie has been successfully deleted.'}, status=status.HTTP_200_OK)


class WatchlistViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request):
        queryset = Watchlist.objects.all()
        serialized_data = WatchlistSerialzier(queryset, many=True).data
        return Response(serialized_data, status=status.HTTP_200_OK)

    def create(self, request):
        serializer = WatchlistSerialzier(data=request.data)
        if serializer.is_valid():
            serializer.save(creator=request.user)
            serializer.save(members=[request.user.id])
            return Response({"message": "Watchlist created successfully."}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        watchlist = get_object_or_404(Watchlist, id=pk)
        serialized_data = WatchlistSerialzier(watchlist, many=False).data
        return Response(serialized_data, status=status.HTTP_200_OK)

    def update(self, request, pk=None):
        watchlist = get_object_or_404(Watchlist, id=pk)
        serializer = WatchlistSerialzier(
            watchlist, request.data, partial=False)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Watchlist has been successfully updated.'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Invalid payload.'}, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, pk=None):
        watchlist = get_object_or_404(Watchlist, id=pk)
        serializer = WatchlistSerialzier(watchlist, request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Watchlist has been successfully updated.'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Invalid payload.'}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        watchlist = get_object_or_404(Watchlist, id=pk)
        watchlist.delete()
        return Response({'message': 'Watchlist has been successfully deleted.'}, status=status.HTTP_200_OK)


class ListMovieViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request):
        queryset = WatchListMovie.objects.all()
        serialized_data = WatchListMovieSerialzier(queryset, many=True).data
        return Response(serialized_data, status=status.HTTP_200_OK)

    def create(self, request):
        existing_movie_in_watchlist = WatchListMovie.objects.filter(
            movie__title=request.data.get('title'),
            watchlist__created_by=request.user
        ).exists()

        if existing_movie_in_watchlist:
            return Response({"message": "Movie already exists in the watchlist."}, status=status.HTTP_400_BAD_REQUEST)

        watchlist = Watchlist.objects.get(created_by=request.user)

        existing_movie = Movie.objects.filter(
            title=request.data.get('title')).exists()

        if existing_movie:
            existing_movie = Movie.objects.get(title=request.data.get('title'))
            WatchListMovie.objects.create(
                movie=existing_movie, watchlist=watchlist)
            return Response({"message": "Movie added to watchlist successfully."}, status=status.HTTP_201_CREATED)

        serialized_data = MovieSerialzier(data=request.data)
        if serialized_data.is_valid():

            movie_instance, created = Movie.objects.get_or_create(
                title=request.data.get('title'),
                defaults=serialized_data.validated_data
            )

            WatchListMovie.objects.create(
                movie=movie_instance, watchlist=watchlist
            )

            return Response({"message": "Movie added to watchlist successfully."}, status=status.HTTP_201_CREATED)
        else:
            print(serialized_data.errors)
            return Response({"message": "Invalid payload.", "errors": serialized_data.errors}, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        watch_list_movie = get_object_or_404(WatchListMovie, id=pk)
        serialized_data = WatchListMovieSerialzier(
            watch_list_movie, many=False).data
        return Response(serialized_data, status=status.HTTP_200_OK)

    def update(self, request, pk=None):
        watch_list_movie = get_object_or_404(WatchListMovie, id=pk)
        serializer = WatchListMovieSerialzier(
            watch_list_movie, request.data, partial=False)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Movie in watchlist has been successfully updated.'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Invalid payload.'}, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, pk=None):
        watch_list_movie = get_object_or_404(WatchListMovie, id=pk)
        serializer = WatchListMovieSerialzier(
            watch_list_movie, request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Movie in watchlist has been successfully updated.'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Invalid payload.'}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        watchlist = Watchlist.objects.get(created_by=request.user)
        watch_list_movie = WatchListMovie.objects.get(
            watchlist=watchlist, movie=pk)
        watch_list_movie.delete()
        return Response({'message': 'Movie in watchlist has been successfully deleted.'}, status=status.HTTP_200_OK)
