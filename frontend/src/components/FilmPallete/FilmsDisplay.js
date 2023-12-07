import React, { useEffect, useState } from 'react'
import classes from './FilmsDisplay.module.css'
import Film from './Film'

const FilmsDisplay = (props) => {
    const [films, setFilms] = useState([])

    const fetchMovies = async (page) => {
        try {
            let response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYTE2OTk1YmE0MjhjZjlkODZjMGQ1NDgyNTRjN2ZmZSIsInN1YiI6IjY0NWMxYTlkMDIzMWYyMDBlNDE3YjJkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ftI-9QxtM-ueszcHc6OhsZ3x7z2BkDDptXoGUpszmdQ'
                }
            })
            let data = await response.json()
            if (response.ok) {
                setFilms(data.results)
            } else {
                throw new Error(response)
            }
        } catch (err) {
            console.log(err)
        }

    }
    useEffect(() => {
        setFilms([])
        const delayDebounceFn = setTimeout(() => {
            fetchMovies(props.page)
        }, 500);
        return () => clearTimeout(delayDebounceFn);
    }, [props.page]);

    return (
        <div className={classes.layout}>
            {films.map((film, index) => (<Film key={index} delay={index} film={film} />))}
        </div>
    )
}

export default FilmsDisplay