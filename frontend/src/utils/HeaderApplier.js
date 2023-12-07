import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header'

const HeaderApplier = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default HeaderApplier