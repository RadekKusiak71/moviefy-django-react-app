import React, { useContext } from 'react'
import classes from './Header.module.css'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'

const Header = () => {
    const { user, logoutUser } = useContext(AuthContext)
    return (
        <header className={classes.header}>
            <div className={classes['header-logo-container']}>
                <Link to='/'>MOVIEFY</Link>
            </div>
            <nav className={classes['header-menu-container']}>
                {user ? (
                    <>
                        <Link to='/' className={classes['menu-link']}>Home</Link>
                        <Link to='/watchlist' className={classes['menu-link']}>Watchlists</Link>
                        <Link to='/login' onClick={() => logoutUser()} className={classes['menu-link']}>Logout</Link>
                    </>
                ) : (
                    <>
                        <Link to='/login' className={classes['menu-link']}>Login</Link>
                        <Link to='/register' className={classes['menu-link']}>Sing Up</Link>
                    </>
                )}


            </nav>
        </header >
    )
}

export default Header