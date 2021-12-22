import axios from 'axios'
import Cookie from 'js-cookie'

export const variavel = axios.create({
  baseURL: 'http://192.168.30.162:8080/',
  headers: {
    Authorization: `Bearer ${Cookie.get('login_token')}`
  }
})
