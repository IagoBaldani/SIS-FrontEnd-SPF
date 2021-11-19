<template>
  <Header />
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
            <span
              v-bind:class="
                programa.status == 'Em andamento' ? 'ativo' : 'inativo'
              "
              >{{ programa.status }}</span
            >
          </h2>
        </div>
      </div>
      <div class="row d-flex justify-content-evenly">
        <div class="col-xl-4">
          <fieldset disabled>
            <div class="mb-3">
              <label for="nome" class="form-label fw-bold mb-0 titulo"
                >Nome</label
              >
              <input
                name="nome"
                type="text"
                class="form-control"
                id="disabledTextInput"
                v-bind:value="programa.nome"
              />
            </div>
            <div class="mb-3">
              <label
                for="inicio-do-programa"
                class="form-label fw-bold mb-0 titulo"
                >Início do Programa</label
              >
              <input
                name="inicio-do-programa"
                type="text"
                class="form-control"
                id="disabledTextInput"
                v-bind:value="programa.inicio"
              />
            </div>
            <div class="mb-3">
              <label
                for="termino-do-programa"
                class="form-label fw-bold mb-0 titulo"
                >Término do Programa</label
              >
              <input
                name="termino-do-programa"
                type="text"
                class="form-control"
                id="disabledTextInput"
                v-bind:value="programa.fim"
              />
            </div>
            <div class="mb-3">
              <label for="coordenador" class="form-label fw-bold mb-0 titulo"
                >Coordenador</label
              >
              <input
                name="coordenador"
                type="text"
                class="form-control"
                id="disabledTextInput"
                v-bind:value="programa.coordenador"
              />
            </div>
            <div class="mb-3">
              <label for="turma" class="form-label fw-bold mb-0 titulo"
                >Turma</label
              >
              <input
                name="turma"
                type="text"
                class="form-control"
                id="disabledTextInput"
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
            value="ENCERRAR FORMAÇÃO"
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
              Deseja encerrar a seguinte formação?
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
            <button type="button" class="btn submit-modal">CONFIRMAR</button>
          </div>
          <div>
            <button
              type="button"
              class="btn cancel-modal"
              data-bs-dismiss="modal"
            >
              CANCELAR
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Funcoes from '../../services/Funcoes'
import Cookie from 'js-cookie'

let config = {
  headers: {
    Authorization: `Bearer ${Cookie.get('login_token')}`
  }
}

export default {
  name: 'App',
  components: {
    Header
  },
  data () {
    return {
      responseStatus: '',
      programa: {
        nome: 'Java',
        inicio: '20/07/2021',
        fim: '12/12/2021',
        coordenador: 'Kaiqui Lopes',
        turma: 'Turma I 2021',
        status: 'Em andamento'
      }
    }
  },
  beforeMount () {
    Funcoes.verificaToken()
    console.log(this.pegaDadosUrl())
  },
  methods: {
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

#disabledTextInput {
  background-color: #d3caca;
  border: 1px solid #bcb3b3;
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

.modal-content {
  height: 80vh !important;
}
</style>
