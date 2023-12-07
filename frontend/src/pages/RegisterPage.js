import React, { useState, useContext } from 'react'
import CardCentered from '../ui/CardCentered'
import Input from '../ui/Input'
import AuthForm from '../ui/AuthForm'
import Button from '../ui/Button'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const RegisterPage = () => {
  const { registerUser } = useContext(AuthContext)
  const [registerData, setRegisterData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password2: ''
  })

  const handleInputChange = (e) => {
    setRegisterData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    registerUser(registerData)
  }


  return (
    <CardCentered>
      <AuthForm text='Sign up' onSubmit={handleSubmit}>
        <Input type='text' placeholder='Username' value={registerData.username} name='username' onChange={handleInputChange} />
        <Input type='text' placeholder='First name' value={registerData.first_name} name='first_name' onChange={handleInputChange} />
        <Input type='text' placeholder='Last name' value={registerData.last_name} name='last_name' onChange={handleInputChange} />
        <Input type='email' placeholder='Email address' value={registerData.email} name='email' onChange={handleInputChange} />
        <Input type='password' placeholder='Password' value={registerData.password} name='password' onChange={handleInputChange} />
        <Input type='password' placeholder='Retype password' value={registerData.password2} name='password2' onChange={handleInputChange} />
        <Button type='submit' name='registerButton'>Submit</Button>
        <p>Already have an account? <Link to='/login'>Click here</Link></p>
      </AuthForm>
    </CardCentered>
  )
}

export default RegisterPage