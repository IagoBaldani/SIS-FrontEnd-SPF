import Cookie from 'js-cookie'
import axios from 'axios'

export default {
  async verificaToken () {
    const token = Cookie.get('login_token')

    await axios.get(`http://localhost:8081/auth/${token}`)
      .then(response => {
        this.responseStatus = response.data
      })

    if (this.responseStatus == 'ERRO') {
      window.location.href = 'http://localhost:8080/login'
    }
  }
}
