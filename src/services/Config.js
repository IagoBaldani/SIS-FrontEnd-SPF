import axios from 'axios'
import Cookie from 'js-cookie'

export const http = axios.create({
  baseURL: 'http://10.104.1.5:8081/api/',
  headers: {
    Authorization: `Bearer ${Cookie.get('login_token')}`
  }
})
