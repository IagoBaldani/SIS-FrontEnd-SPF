import Cookie from 'js-cookie'
import { variavel } from './Variavel'
import { http } from './Config'
import crypto from 'crypto'

export default {
  verificaPerfil () {
    const crypto = require('crypto')
    const alg = 'aes-256-ctr'
    const pwd = 'abcdabcd'
    const perfilCriptografado = Cookie.get('perfil_usuario')

    // eslint-disable-next-line node/no-deprecated-api
    const decipher = crypto.createDecipher(alg, pwd)
    const perfil = decipher.update(perfilCriptografado, 'hex', 'utf8')

    console.log(perfil)

    if (perfil != 'ROLE_ADMINISTRADOR') {
      return false
    } else {
      return true
    }
  }
}
