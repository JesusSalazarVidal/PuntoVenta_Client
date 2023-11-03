import axios from './axios'
const API = 'http://localhost:3000/api'

export const registerRequest = (usuario) => axios.post('/register', usuario)

export const loginRequest = usuario => axios.post('/login', usuario)

export const verifyTokenRequest = () => axios.get('/verify')
