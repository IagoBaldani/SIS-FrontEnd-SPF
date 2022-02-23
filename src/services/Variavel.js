import axios from 'axios'
import Cookie from 'js-cookie'

export const variavel = axios.create({
  baseURL: 'http://10.104.1.5:8080/',
  headers: {
    Authorization: `Bearer ${Cookie.get('login_token')}`
  }
})
