import React, { useEffect, useState } from 'react'
import classes from './FilmSearch.module.css'
import Input from '../../ui/Input'
import { Link } from 'react-router-dom'
const FilmSearch = (props) => {
    const [title, setTitle] = useState('')
    const [res, setRes] = useState([])

    const backdropClose = () => {
        props.handleOpenSearch()
    }

    const handleInputChange = (e) => {
        setTitle(e.target.value)
    }


    useEffect(() => {

        const handleSearch = async () => {
            const url = `https://api.themoviedb.org/3/search/movie?query=${title}&language=en-US`
            try {
                let response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYTE2OTk1YmE0MjhjZjlkODZjMGQ1NDgyNTRjN2ZmZSIsInN1YiI6IjY0NWMxYTlkMDIzMWYyMDBlNDE3YjJkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ftI-9QxtM-ueszcHc6OhsZ3x7z2BkDDptXoGUpszmdQ'
                    }
                })
                let data = await response.json()
                if (response.ok) {
                    setRes(data.results)
                } else {
                    throw new Error(response)
                }
            } catch (err) {
                console.log(err)
            }
        }

        if (title.trim().length !== 0) {
            const debounce = setTimeout(() => handleSearch(), 400);
            return () => clearTimeout(debounce)
        } else {
            setRes([]);
        }
    }, [title])

    return (
        <div onClick={() => backdropClose()} className={classes['film-search-backdrop']}>
            <div onClick={(e) => e.stopPropagation()} className={classes['search-box']}>
                <Input type='text' onChange={handleInputChange} value={title} placeholder='Enter title' />
            </div>
            <div className={classes['result-overflow']}>
                {res.map((r, index) =>
                    <Link to={`/film/${r.id}`} className={classes['film-res']} key={index}>
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
                            <p className={classes['overview']}>{r.overview}</p>
                        </div>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default FilmSearch