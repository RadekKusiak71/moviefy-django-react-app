import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import classes from './FilmPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion'
import Button from '../ui/Button'
import AuthContext from '../context/AuthContext';

const FilmPage = () => {
    const { filmID } = useParams();
    const [film, setFilm] = useState({});
    const navigate = useNavigate()
    const { authTokens } = useContext(AuthContext)

    const addToWatchlist = async () => {
        console.log(film)
        const formData = new FormData()
        formData.append('title', film.title)
        formData.append('description', film.overview)
        formData.append('popularity', film.popularity)
        formData.append('poster_path', film.poster_path)
        formData.append('avg_rating', film.vote_average)
        formData.append('release_date', film.release_date)
        formData.append('adult', film.adult)
        try {
            let response = await fetch('http://127.0.0.1:8000/api/listmovies/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${authTokens.access}`,
                },
                body: formData
            })
            let data = await response.json()
            if (!response.ok) {
                console.log(response, data)
            }
        } catch (err) {
            console.log(err)
        }
    }



    useLayoutEffect(() => {
        const fetchFilm = async () => {
            const url = `https://api.themoviedb.org/3/movie/${filmID}?language=en-US`;
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYTE2OTk1YmE0MjhjZjlkODZjMGQ1NDgyNTRjN2ZmZSIsInN1YiI6IjY0NWMxYTlkMDIzMWYyMDBlNDE3YjJkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ftI-9QxtM-ueszcHc6OhsZ3x7z2BkDDptXoGUpszmdQ'
                }
            });
            let data = await response.json();
            if (response.ok) {
                setFilm(data);
            } else {
                navigate('/')
                console.log('Failed to fetch film form IMDB ( imdb problem id )')
            }
        };
        fetchFilm();
    }, [filmID, navigate]);

    return (
        <motion.div animate={{ translateY: ['-50%', '0%'] }} className={classes['film-container']}>
            <div className={classes['film-details']}>
                <div className={classes['film-image']}>
                    <img
                        src={`https://image.tmdb.org/t/p/w300/${film.poster_path}`}
                        alt='film'
                    />
                </div>
                <div className={classes['film-overview']}>
                    <h1>{film.title}</h1>
                    <p className={classes['overview2']}>Release Date: {film.release_date}</p>
                    <p className={classes['overview2']}>Overview:</p>
                    <p className={classes['overview']}>{film.overview}</p>
                    <Button onClick={() => addToWatchlist()} >Add to watchlist</Button>
                </div>
            </div>
        </motion.div>
    );
};

export default FilmPage;
