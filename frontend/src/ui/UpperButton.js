import React from 'react'
import classes from './UpperButton.module.css'

const UpperButton = (props) => {
  return (
    <button className={classes['upper-button']} type={props.type} onClick={props.onClick}>
      {props.children}
    </button>
  )
}

export default UpperButton