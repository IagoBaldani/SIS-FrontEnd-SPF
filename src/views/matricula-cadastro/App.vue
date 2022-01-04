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
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-bold mb-0 titulo">Nivel de Acesso</label>
                            <select class="form-select" id="inputPerfil">
                              <option value="ROLE_ADMINISTRADOR">Nivel 1 - Administrador</option>
                              <option value="ROLE_USUARIO">Nivel 2 - Usuário</option>
                            </select>
                        </div>
                      <div>
                        <button class="mt-5 form-control submit" data-bs-toggle="modal" data-bs-target="#exampleModal"> CADASTRAR </button>
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
                  <ul class="fw-bold subtitulo text-start">Informações gerais:
                    <li>Matricula: <span class="titulo"> {{matriculaForm.matricula}} </span></li>
                    <li>Perfil de acesso: <span class="titulo"> {{matriculaForm.perfil}} </span></li>
                  </ul>
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
      document.querySelector('#abreModalInvisivel').classList.remove('none')
      setTimeout(function () {
        location.href = '/home'
      }, 1500)
    }
  },
  methods: {
    abrirModal () {
      document.getElementById('abreModalInvisivel').click()
    },
    enviarDados () {
      this.matriculaForm.matricula = document.querySelector('#inputMatricula').value
      this.matriculaForm.perfil = document.querySelector('#inputPerfil').value

      http
        .post('matricula', this.matriculaForm)
        .then(response => console.log('criado'))
        .catch(error => console.log(error))
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

textarea {
    resize: none !important;
}
</style>
