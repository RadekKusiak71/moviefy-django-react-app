import React from 'react'
import classes from './AuthForm.module.css'

const AuthForm = (props) => {
  return (
    <form
      className={classes['auth-form']}
      onSubmit={props.onSubmit}
    >
      <h1 className={classes['auth-form-title']}>{props.text}</h1>
      <div className={classes['auth-form-inputs']}>
        {props.children}
      </div>
    </form>
  )
}

export default AuthForm