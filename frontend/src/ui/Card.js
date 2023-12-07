import React from 'react'
import classes from './Card.module.css'
import { Outlet } from 'react-router-dom'

const Card = () => {
    return (
        <div className={classes['card-container']}><Outlet /></div>
    )
}

export default Card