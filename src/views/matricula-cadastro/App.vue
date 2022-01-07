<template>
    <Header link="../matricula-busca"/>
    <main>
        <div class="container-fluid">
            <div class="row mt-4 justify-content-evenly">
                <div class="div-titulo col-xl-4">
                    <h3 class="fw-bold titulo">Cadastrar matricula:</h3>
                </div>
                <div class="col-xl-4"></div>
                <div class="col-xl-2"></div>
            </div>
                <div class="row d-flex justify-content-evenly">
                    <div class="col-xl-4">
                        <div class="mb-3">
                            <label for="inputMatricula" class="form-label fw-bold mb-0 titulo">Matricula:</label>
                            <input type="text" class="form-control" id="inputMatricula" placeholder="Digite a matricula desejada"/>
                          <p class="verificacao none" id="verificaMatricula">Porfavor preencha o campo matricula</p>
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-bold mb-0 titulo">Nível de Acesso</label>
                            <select class="form-select" id="inputPerfil">
                              <option value="0" selected>Selecione um nível de acesso</option>
                              <option value="ROLE_ADMINISTRADOR">Nivel 1 - Administrador</option>
                              <option value="ROLE_USUARIO">Nivel 2 - Usuário</option>
                            </select>
                          <p class="verificacao none" id="verificaPerfil">Escolha um nível de acesso</p>
                        </div>
                      <div>
                        <button type="button" class="mt-5 form-control submit" @click="verificacao()"> CADASTRAR </button>
                        <button class="none" data-bs-toggle="modal" data-bs-target="#exampleModal" id="modalDeConfirmacao"></button>
                      </div>
                  </div>
                  <div class="col-xl-4"></div>
                  <div class="col-xl-2"></div>
                </div>
        </div>
      <!-- modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-xl modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header border-0">
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body d-flex justify-content-between">
              <div>
                <h1 class="modal-title form-label fw-bold mb-0 titulo"> Deseja permitir a seguinte matricula? </h1>
              </div>
              <div class="conteudomodal d-flex flex-column justify-content-center mb-5">
                <div class="">
                  <p class="fw-bold subtitulo text-start ms-5">Informações gerais:</p> <br>
                  <p class="text-start subtitulo fw-bold ms-5">Matricula: <span class="titulo text-start"> {{matriculaForm.matricula}} </span></p>
                  <p class="text-start subtitulo fw-bold ms-5" v-if="matriculaForm.perfil == 'ROLE_ADMINISTRADOR'">Perfil de acesso: <span class="titulo"> Nivel 1 - Administrador </span></p>
                  <p class="text-start subtitulo fw-bold ms-5" v-if="matriculaForm.perfil == 'ROLE_USUARIO'">Perfil de acesso: <span class="titulo"> Nivel 2 - Usuário </span></p>
                </div>
              </div>
              <div class="modal-footer border-0 justify-content-around">
                <div>
                  <button v-on:click="enviarDados()" type="button" class="btn submit-modal">CONFIRMAR</button>
                </div>
                <div>
                  <button type="button" class="btn cancel-modal" data-bs-dismiss="modal">CANCELAR</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal de autorização -->
      <p class="none" id="abreModalInvisivel" data-bs-toggle="modal" data-bs-target="#modalAcesso" ></p>
      <div class="modal fade mt-5"  id="modalAcesso" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-size">
          <div class="modal-content p-5 grey-background">
            <div class="row mb-5">
              <div class="col">
                <h3 class="modal-title fw-bold titulo text-center" id="exampleModalLabel">Nivel de acesso insuficiente</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal de confirmação -->
      <p class="none" id="abreModalConfirmacao" data-bs-toggle="modal" data-bs-target="#modalConfirmacao" ></p>
      <div class="modal fade mt-5"  id="modalConfirmacao" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-size">
          <div class="modal-content p-5 grey-background">
            <div class="row mb-5">
              <div class="col">
                <h3 class="modal-title fw-bold titulo text-center" id="exampleModalLabelConfirmacao">Cadastro efetuado com sucesso</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
</template>

<script>
import Header from '@/components/Header.vue'
import Funcoes from '../../services/Funcoes'
import { http } from '../../services/Config'
import { mask } from 'vue-the-mask'
import VerificaPerfil from '@/services/VerificaPerfil'

export default {
  directives: { mask },
  name: 'App',
  components: {
    Header
  },
  data () {
    return {
      matriculaForm: {
        matricula: '',
        perfil: ''
      }
    }
  },
  beforeMount () {
    Funcoes.verificaToken()
  },
  mounted () {
    if (!VerificaPerfil.verificaPerfil()) {
      this.abrirModal()
      setTimeout(function () {
        location.href = '/home'
      }, 1500)
    }
  },
  methods: {
    abrirModal () {
      document.getElementById('abreModalInvisivel').click()
    },
    preencherFormulario () {
      this.matriculaForm.matricula = document.querySelector('#inputMatricula').value
      this.matriculaForm.perfil = document.querySelector('#inputPerfil').value
    },
    enviarDados () {
      http
        .post('matricula', this.matriculaForm)
        .then(response => {
          document.getElementById('abreModalConfirmacao').click()
          setTimeout(function () {
            location.href = '/matricula-busca'
          }, 1500)
        })
        .catch(error => console.log(error))
    },
    verificacao () {
      let matricula = document.getElementById('inputMatricula').value
      let perfil = document.getElementById('inputPerfil').value
      let erro = 0

      if (matricula == '') {
        document.querySelector('#verificaMatricula').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#verificaMatricula').classList.add('none')
      }
      if (perfil == 0) {
        document.querySelector('#verificaPerfil').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#verificaPerfil').classList.add('none')
      }

      if (erro == 1) {
        return false
      } else {
        this.preencherFormulario()
        document.getElementById('modalDeConfirmacao').click()
      }
    }
  }
}

</script>

<style>
body {
    background-color: #ebebeb !important;
}

.titulo {
    color: #090B2E;
}

.submit{
  background-color: #AB0045 !important;
  color: white !important;
  font-weight: bold;
}
.conteudomodal {
  display: flex;
  justify-content: center;
  min-height: 40vh;
  font-size: 21px;
}
.modal-body, .modal-header, .modal-footer {
  text-align: center;
  background-color: #EBEBEB
}
.modal-body{
  min-height: 55vh;
  flex-direction: column;
}
.submit-modal, .cancel-modal{
  color: white !important;
  font-weight: bold !important;
  border-radius: 5px !important;
  width: 350px;
  font-size: 25px !important;
}
.submit, .submit-modal{
  color: white !important;
  font-weight: bold !important;
  background-color: #AB0045 !important;
}
.cancel, .cancel-modal{
  color: white !important;
  font-weight: bold !important;
  background-color: #FFB700 !important;
}
.verificacao{
  color: red;
}
.none{
  display: none !important;
}
textarea {
    resize: none !important;
}
</style>
