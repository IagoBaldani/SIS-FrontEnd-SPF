<template>
    <div class="container">
      <div class="form-login">
        <form class="formulario" @submit.stop.prevent="submit">
          <h2>Faça seu login</h2>
          <h3>(Credenciais SIS)</h3>

          <input v-model="loginInput.matricula" class="input" type="text" placeholder="Matrícula" required />
          <input v-model="loginInput.senha" class="input" type="password" placeholder="Senha" required/>
          <p id="validacaoCampos" class="none">Matricula ou senha inválida</p>
          <!-- <a href="">Esqueceu sua senha?</a> -->

          <input class="submit" type="submit" value="CONFIRMAR"/>
        </form>
      </div>
    </div>
</template>

<script>
import Cookie from 'js-cookie'
import { http } from '../../services/Config'
import { variavel } from '../../services/Variavel'
import Crypto from 'vue-cryptojs'
import crypto from 'crypto'

export default {
  name: 'App',
  data () {
    return {
      loginInput: {
        matricula: '',
        senha: ''
      }
    }
  },
  created () {
    Cookie.remove('login_token')
    Cookie.remove('perfil_usuario')
  },
  methods: {
    submit () {
      var formData = new FormData()
      formData.append('matricula', this.loginInput.matricula)
      formData.append('senha', this.loginInput.senha)
      http.post('ad', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(response => {
          Cookie.set('login_token', response.data.token)
          const crypto = require('crypto')
          const alg = 'aes-256-ctr'
          const pwd = 'abcdabcd'
          // eslint-disable-next-line node/no-deprecated-api
          const cipher = crypto.createCipher(alg, pwd)
          const crypted = cipher.update(response.data.perfil, 'utf8', 'hex')

          Cookie.set('perfil_usuario', crypted)
          window.location.href = variavel.href = 'home'
        })
        .catch(erro => {
          document.getElementById('validacaoCampos').classList.remove('none')
          console.log(this.loginInput.senha)
          console.log('Dados incorretos. Por favor, tente novamente.')
        })
    }
  }
}
</script>

<style>
body {
  background-color: #090b2e !important;
}

.container {
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
  background-image: url("../../assets/imgs/ICONE_SIS.png");
  background-repeat: no-repeat;
  background-size: contain;
  height: 100vh;
}

.logo-sis {
  width: 50%;
}
.logo-sis img {
  height: 100%;
}

.form-login {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.formulario {
  height: 80%;
  width: 90%;
  background-color: rgba(235, 235, 235, 0.9);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

h2 {
  font-size: 35px;
  color: #090b2e;
}

h3 {
  font-size: 18px;
  margin-bottom: 80px;
  color: #090b2e;
}

.input {
  height: 40px;
  width: 90%;
  max-width: 440px;
  padding: 15px;
  margin-bottom: 15px;
  font-size: 22px;
  border: 1px solid #bcb3b3;
  border-radius: 5px;
}

.formulario a {
  font-weight: bold;
  color: #090b2e;
}

.submit {
  margin-top: 80px;
  background-color: #090b2e;
  color: white;
  font-weight: bold;
  font-size: 20px;
  border: none;
  transition: all linear 0.2s;
  width: 100%;
  max-width: 250px;
  height: 40px;
  border-radius: 5px;
}

.submit:hover {
  background-color: #1d2276;
  cursor: pointer;
}

@media (max-width: 900px) {
  .container {
    justify-content: center;
    align-items: center;
  }

  .form-login {
    width: 80%;
    height: 90%;
  }
}

@media (max-width: 420px) {
  .container {
    background-position: center;
  }

  .form-login {
    width: 95%;
    height: 90%;
  }

  h2 {
    font-size: 30px;
  }

  h3 {
    font-size: 15px;
  }
}
.none{
    display: none !important;
  }

#validacaoCampos{
  color: red !important;
  font-weight: bold !important;
}
</style>
