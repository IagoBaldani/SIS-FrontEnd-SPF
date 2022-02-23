import Cookie from 'js-cookie'
import axios from 'axios'

export default {
  async verificaToken () {
    const token = Cookie.get('login_token')

    await axios.get(`http://10.104.1.5:8081/api/auth/${token}`)
      .then(response => {
        this.responseStatus = response.data
        console.log('AUTENTICADO')
      })

    if (this.responseStatus == 'ERRO') {
      window.location.href = 'http://10.104.1.5:8080/login'
      console.log('NÃO AUTENTICADO')
    }
  }
}
