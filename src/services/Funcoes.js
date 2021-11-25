import Cookie from 'js-cookie'
import { http } from '../services/Config'

export default {
  async verificaToken () {
    const token = Cookie.get('login_token')

    await http.get(`auth/${token}`)
      .then(response => {
        this.responseStatus = response.data
        console.log('AUTENTICADO')
      })

    if (this.responseStatus == 'ERRO') {
      window.location.href = 'http://localhost:8080/login'
      console.log('NÃO AUTENTICADO')
    }
  }
}
