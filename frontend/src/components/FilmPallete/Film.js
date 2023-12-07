import React, { memo } from 'react';
import classes from './Film.module.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Film = memo((props) => {
    return (
        <Link to={`/film/${props.film.id}`} className={classes.film}>
            <motion.img loading='lazy' initial={{ translateY: '-20%' }} animate={{ translateY: '0%' }} src={`https://image.tmdb.org/t/p/w300${props.film.poster_path}`} />
        </Link>
    );
});

export default Film;
