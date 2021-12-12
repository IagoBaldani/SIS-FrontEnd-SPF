import axios from 'axios'
import Cookie from 'js-cookie'

export const variavel = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {
      Authorization: `Bearer ${Cookie.get('login_token')}`
    }
  })