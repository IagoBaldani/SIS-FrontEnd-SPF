<template>
  <Header link="../dados-programa-busca"/>
  <main>
    <div class="container-fluid">
      <div class="row mt-4 justify-content-evenly">
        <div class="div-titulo col-xl-4">
          <h3 class="fw-bold titulo">Dados da Formação:</h3>
        </div>
        <div class="col-xl-4"></div>
        <div class="col-xl-2 d-flex justify-content-center">
          <h2 class="titulo secundario">
            Status:
            <span v-bind:class="programa.status == 'EM_ANDAMENTO' ? 'ativo' : 'inativo'">
              {{ programa.status == 'EM_ANDAMENTO' ? 'Em andamento' : 'Inativo' }}
            </span>
          </h2>
        </div>
      </div>
      <div class="row d-flex justify-content-evenly">
        <div class="col-xl-4">
          <fieldset disabled>
            <div class="mb-3">
              <label for="nome" class="form-label fw-bold mb-0 titulo">Nome</label>
              <input
                name="nome"
                type="text"
                class="form-control disabledTextInput"
                v-bind:value="programa.nome"
              />
            </div>
            <div class="mb-3">
              <label for="inicio-do-programa" class="form-label fw-bold mb-0 titulo">
                Início do Programa
              </label>
              <input
                name="inicio-do-programa"
                type="text"
                class="form-control disabledTextInput"
                v-bind:value="this.formataDataParaExibicao(programa.inicio)"
              />
            </div>
            <div class="mb-3">
              <label for="termino-do-programa" class="form-label fw-bold mb-0 titulo">
                Término do Programa
              </label>
              <input
                name="termino-do-programa"
                type="text"
                class="form-control disabledTextInput"
                v-bind:value="this.formataDataParaExibicao(programa.termino)"
              />
            </div>
            <div class="mb-3">
              <label for="coordenador" class="form-label fw-bold mb-0 titulo">
                Coordenador
              </label>
              <input
                name="coordenador"
                type="text"
                class="form-control disabledTextInput"
                v-bind:value="programa.nomeCoordenador"
              />
            </div>
            <div class="mb-3">
              <label for="turma" class="form-label fw-bold mb-0 titulo">
                Turma
              </label>
              <input
                name="turma"
                type="text"
                class="form-control disabledTextInput"
                v-bind:value="programa.turma"
              />
            </div>
          </fieldset>
        </div>
        <div class="col-xl-4"></div>
        <div class="col-xl-2"></div>
      </div>
      <div class="row d-flex justify-content-evenly">
        <div class="col-xl-4">
          <input
            type="button"
            name="botao-ok"
            :value="(programa.status == 'EM_ANDAMENTO')?'ENCERRAR FORMAÇÃO':'ATIVAR FORMAÇÃO'"
            class="mt-5 form-control submit"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          />
        </div>
        <div class="col-xl-4"></div>
        <div class="col-xl-2"></div>
      </div>
    </div>
  </main>
  <!-- modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-xl modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header border-0">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body d-flex justify-content-between">
          <div>
            <h1 class="modal-title form-label fw-bold mb-0 titulo">
              {{ (programa.status == 'EM_ANDAMENTO')?'Deseja encerrar a seguinte formação ?':'Deseja ativar a seguinte formação ?' }}
            </h1>
          </div>
          <div class="conteudomodal">
            <h2 class="fw-bold subtitulo">
              {{ programa.nome }} - {{ programa.turma }}
            </h2>
          </div>
        </div>
        <div class="modal-footer border-0 justify-content-around">
          <div>
            <button type="button" class="btn submit-modal" @click="alteraStatus">CONFIRMAR</button>
          </div>
          <div>
            <button type="button" class="btn cancel-modal" data-bs-dismiss="modal">
              CANCELAR
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal de confirmação -->
    <p class="none" id="abreModalInvisivel" data-bs-toggle="modal" data-bs-target="#modalConfirmacao" ></p>
    <div class="modal fade mt-5"  id="modalConfirmacao" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-size">
            <div class="modal-content p-5 grey-background">
                <div class="row mb-5">
                    <div class="col">
                        <h3 class="modal-title fw-bold titulo text-center" id="exampleModalLabel">Alteração efetuada com sucesso</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Funcoes from '../../services/Funcoes'
import { http } from '../../services/Config'
import { variavel } from '../../services/Variavel'

export default {
  name: 'App',
  components: {
    Header
  },
  data () {
    return {
      responseStatus: '',
      programa: {},
      id: this.pegaDadosUrl().id
    }
  },
  beforeMount () {
    Funcoes.verificaToken()
    this.getPrograma()
  },
  methods: {
    getPrograma () {
      http.get(`programa/${this.id}`)
        .then(response => {
          this.programa = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    abrirModal () {
      document.getElementById('abreModalInvisivel').click()
    },
    pegaDadosUrl () {
      var query = location.search.slice(1)
      var partes = query.split('&')
      var data = {}

      partes.forEach(function (parte) {
        var chaveValor = parte.split('=')
        var chave = chaveValor[0]
        var valor = chaveValor[1]
        data[chave] = valor
      })

      return data
    },
    formataDataParaExibicao (data) {
      const dataPreForm = new Date(data)
      const dataFormatada = `${dataPreForm.getUTCDate()}/${dataPreForm.getUTCMonth() + 1}/${dataPreForm.getUTCFullYear()}`

      return dataFormatada
    },
    alteraStatus () {
      http.put(`programa/altera-status/${this.id}`, null)
        .then(response => {
          if (response.status == '200') {
            this.abrirModal()
            setTimeout(function () {
              window.location.href = variavel.href = 'dados-programa-busca'
            }, 1500) 
          } 
        })
    }
  }
}
</script>

<style>
body {
  background-color: #ebebeb !important;
}

.titulo {
  color: #090b2e;
  font-weight: bold;
}

.secundario {
  font-size: 20px;
}

.ativo,
.inativo {
  margin-left: 1em;
}

.ativo {
  color: green;
}
.inativo {
  color: darkred;
}

.form-control {
  color: #737373 !important;
}

.subtitulo {
  color: #737373;
}

.disabledTextInput {
  background-color: #d3caca !important;
  border: 1px solid #bcb3b3 !important;
}

#formulario-principal {
  text-align: left;
}

textarea {
  resize: none !important;
}

.cadastro {
  background-color: #ffb700 !important;
  color: white !important;
  font-weight: bold !important;
  border-radius: 5px !important;
  max-width: 575px !important;
}

.status-encerrado {
  color: darkred;
  font-weight: bold;
}

.status-andamento {
  color: green;
  font-weight: bold;
}

.imagem {
  background-color: #ab0045 !important;
}

.imagem-coluna {
  background-color: #ffb700 !important;
}

.my-custom-scrollbar {
  position: relative;
  height: 59vh;
  overflow: auto;
}

.table-wrapper-scroll-y {
  display: block;
  height: 59vh;
}

.modal-body,
.modal-header,
.modal-footer {
  text-align: center;
  background-color: #ebebeb;
}

.modal-body {
  min-height: 55vh;
  flex-direction: column;
}

.submit-modal,
.cancel-modal {
  color: white !important;
  font-weight: bold !important;
  border-radius: 5px !important;
  width: 350px;
  font-size: 25px !important;
}

.submit,
.submit-modal {
  color: white !important;
  font-weight: bold !important;
  background-color: #ab0045 !important;
}

.cancel,
.cancel-modal {
  color: white !important;
  font-weight: bold !important;
  background-color: #ffb700 !important;
}

.conteudomodal {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 40vh;
  font-size: 21px;
}

</style>
