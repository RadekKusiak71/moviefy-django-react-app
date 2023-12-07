import React from 'react'
import classes from './CardCentered.module.css'

const CardCentered = ({ children }) => {
    return (
        <div className={classes['centered']}>{children}</div>
    )
}

export default CardCentered