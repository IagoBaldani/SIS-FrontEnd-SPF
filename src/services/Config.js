import axios from 'axios'
import Cookie from 'js-cookie'

export const http = axios.create({
  baseURL: 'http://192.168.38.10:8081/api/',
  headers: {
    Authorization: `Bearer ${Cookie.get('login_token')}`
  }
})
