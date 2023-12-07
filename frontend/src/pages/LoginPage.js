import React, { useContext, useState } from 'react'
import CardCentered from '../ui/CardCentered'
import AuthForm from '../ui/AuthForm'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const LoginPage = () => {

  const { loginUser } = useContext(AuthContext)

  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  })

  const handleInputChange = (e) => {
    setLoginData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    loginUser(loginData)
  }

  return (
    <CardCentered>
      <AuthForm text='Sign in' onSubmit={handleSubmit}>
        <Input type='text' placeholder='Username' value={loginData.username} name='username' onChange={handleInputChange} />
        <Input type='password' placeholder='Password' value={loginData.password} name='password' onChange={handleInputChange} />
        <Button type='submit' name='loginButton'>Submit</Button>
        <p>Dont have an account yet? <Link to='/register'>Click here</Link></p>
      </AuthForm>
    </CardCentered>
  )
}

export default LoginPage