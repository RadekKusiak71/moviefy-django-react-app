import React, { useState } from 'react'
import UpperButton from '../ui/UpperButton'
import classes from './HomePage.module.css'
import FilmsDisplay from '../components/FilmPallete/FilmsDisplay'
import leftArrows from '../assets/DoubleLeft.svg'
import rightArrows from '../assets/DoubleRight.svg'
import FilmSearch from '../components/Search/FilmSearch'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const [page, setPage] = useState(1)
  const [openSearch, setOpenSearch] = useState(false)
  const navigate = useNavigate()

  const generateRandomId = () => {
    navigate(`/film/${Math.floor(Math.random() * 20000)}`)
  }

  const handleOpenSearch = () => {
    setOpenSearch(!openSearch)
  }
  const nextPage = () => {
    if (page === 500) {
      setPage(1)
    } else {
      setPage((prevState) => prevState += 1)
    }
  }
  const lastPage = () => {
    if (page === 1) {
      setPage(500)
    } else {
      setPage((prevState) => prevState -= 1)
    }
  }

  return (
    <div className={classes['home-container']} >
      {openSearch && (
        <FilmSearch handleOpenSearch={handleOpenSearch} />
      )}
      <div className={classes['upper-buttons-container']}>
        <UpperButton onClick={generateRandomId}>RANDOM FILM</UpperButton>
        <UpperButton onClick={handleOpenSearch}>SEARCH</UpperButton>
      </div>
      <div className={classes['pages']}>
        <button onClick={lastPage}><img src={leftArrows} alt='arrows' /></button>
        <p>{page}/500</p>
        <button onClick={nextPage}><img src={rightArrows} alt='arrows' /></button>
      </div>
      <FilmsDisplay page={page} />
      <div className={classes['pages']}>
        <button onClick={lastPage}><img src={leftArrows} alt='arrows' /></button>
        <p>{page}/500</p>
        <button onClick={nextPage}><img src={rightArrows} alt='arrows' /></button>
      </div>
    </div >
  )
}

export default HomePage