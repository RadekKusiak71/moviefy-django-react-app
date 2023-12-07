import React, { useCallback, useEffect, useState, useContext } from 'react';
import classes from './WatchListPage.module.css';
import AuthContext from '../context/AuthContext';
import { motion } from 'framer-motion'

const WatchListPage = () => {
  const [movies, setMovies] = useState([]);
  const { authTokens } = useContext(AuthContext);

  const fetchMovies = useCallback(async () => {
    try {
      let response = await fetch('http://127.0.0.1:8000/api/users/movies/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authTokens.access}`,
        },
      });
      let data = await response.json();
      if (response.ok) {
        setMovies(data);
      } else {
        console.log('Error fetching movies');
      }
    } catch (err) {
      console.log(err);
    }
  }, [setMovies, authTokens.access]);

  const handleDeleteMovie = async (movieId) => {
    try {
      await fetch(`http://127.0.0.1:8000/api/listmovies/${movieId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authTokens.access}`,
        },
      });
      fetchMovies();
    } catch (err) {
      console.log('Error deleting movie:', err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <div>
      {movies.map((r, index) => (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={index} className={classes['movie-container']}>
          <div to={`/film/${r.id}`} className={classes['film-res']}>
            <div className={classes['film-image']}>
              <img
                src={`https://image.tmdb.org/t/p/w300/${r.poster_path}`}
                alt={r.title}
              />
            </div>
            <div className={classes['film-overview-search']}>
              <h1>{r.title}</h1>
              <p className={classes['overview2']}>Release Date: {r.release_date}</p>
              <p className={classes['overview2']}>Overview:</p>
              <p className={classes['overview']}>{r.description}</p>
            </div>
            <button
              className={`${classes['delete-button']} ${classes['film-delete-button']}`}
              onClick={() => handleDeleteMovie(r.id)}
            >
              Delete
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default WatchListPage;