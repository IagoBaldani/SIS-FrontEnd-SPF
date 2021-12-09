<template>
  <Header link="../processo-seletivo-busca-por-vagas"/>
  <main>
    <div class="container-fluid">
      <div class="row justify-content-evenly">
        <div class="col-md-4">
          <h1 class="mt-3 f">Dados do Processo Seletivo</h1>
        </div>
        <div class="col-md-4"></div>
        <div class="col-md-2"></div>
      </div>
      <div class="row justify-content-evenly">
        <div class="col-md-4">
          <fieldset disabled>
            <div class="form-group mb-3">
              <label>Processo Seletivo</label>
              <input type="text" class="form-control" v-model="processoSeletivo.nome" disabled/>
            </div>

            <div class="form-group mb-3">
              <label>Data de início</label>
              <input type="text" class="form-control"  
              :value="formataDataParaMostrar(processoSeletivo.dataInicio)" disabled/>
            </div>

            <div class="form-group mb-3">
              <label>Data de término</label>
              <input type="text" class="form-control" :value="formataDataParaMostrar(processoSeletivo.dataFim)"/>
            </div>

            <div class="form-group mb-3">
              <label>Nome do Instrutor Responsável</label>
              <input type="text" class="form-control" v-model="processoSeletivo.nomeInstrutor" disabled/>
            </div>

            <div class="form-group mb-3">
              <label>Status do processo</label>
              <input type="text" class="form-control" v-bind:value="'Em andamento'" v-if="processoSeletivo.status == 'EM_ANDAMENTO'" disabled/>
              <input type="text" class="form-control" v-bind:value="'Finalizada'" v-else-if="processoSeletivo.status == 'FINALIZADA'" disabled/>
            </div>
          </fieldset>
        </div>
        <div class="col-md-4">
          <fieldset disabled>
            <div class="form-group mb-3">
              <label>Quantidade de Estagiários</label>
              <input type="text" class="form-control" v-model="processoSeletivo.qtdEstagiario" disabled/>
            </div>
            <div class="form-group mb-3">
              <label>Quantidade de Trainees</label>
              <input type="text" class="form-control" v-model="processoSeletivo.qtdTrainee" disabled/>
            </div>
            <div class="form-group mb-3">
              <label>Quantidade de Aprendizes</label>
              <input type="text" class="form-control" v-model="processoSeletivo.qtdAprendiz" disabled/>
            </div>
          </fieldset>
      </div>
  </div>
</div>
  </main>
</template>

<script>
import Header from '@/components/Header.vue'
import Funcoes from '../../services/Funcoes'
import { http } from '@/services/Config'

export default {
  name: 'App',
  components: {
    Header
  },
  data () {
    return {
      processoSeletivo: {}
    }
  },
  beforeMount () {
    Funcoes.verificaToken()

    const dadosUrl = this.pegaDadosUrl()
    let id = dadosUrl.id

    this.getProcessoSeletivo(id)
  },
  methods: {
    getProcessoSeletivo (id) {
      http
        .get(`processo-seletivo/${id}`)
        .then(response => {
          this.processoSeletivo = response.data
        })
        .catch(error => {
          console.log(error)
        })
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
    formataDataParaMostrar (data) {
      const dataPreForm = new Date(data)
      const dataFormatada = `${dataPreForm.getUTCDate()}/${dataPreForm.getUTCMonth() + 1}/${dataPreForm.getUTCFullYear()}`
      return dataFormatada
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
  margin: 0;
  padding: 0;
  text-decoration: none;
}

:root {
  /* Cores principais - Botões e telas */
  --color-background-screen: #ebebeb;
  --color-yellow-principal: #ffb700;
  --color-blue-principal: #090b2e;
  --color-magenta-principal: #ab0045;
  --color-background-form-input: #d3caca;

  /* Cores da barra de progresso da busca de vagas */
  --color-green-progress: #19b200;
  --color-yellow-progress: yellow;
  --color-red-progress: red;

  /* Cores de fonte */
  --color-gray-font: #737373;
  --color-white-default: #ffffff;
}

/* Restart da página, removendo as bordas default do navegador */
* {
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
  margin: 0;
  padding: 0;
  text-decoration: none;
  color: var(--color-blue-principal);
}

body {
  background-color: var(--color-background-screen) !important;
}

h1 {
  font-weight: 700;
  font-size: 1.7rem !important;
}

input {
  color: #737373 !important;
}

.header {
  background-color: var(--color-blue-principal);
  height: 4.688rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.btn-header {
  height: 4.688rem;
  width: 4.688rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.disabled {
  display: none;
}

.btn-header img,
.logo img {
  height: 3.125rem;
}

.home.btn-header {
  background-color: var(--color-yellow-principal);
}

.rollback.btn-header {
  background-color: var(--color-magenta-principal);
}

.container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 1.5em;
}

/* Title */

.container-fluid h1 {
  font-weight: 700;
  font-size: 1.875rem;
}

.form-data div > * {
  display: flex;
  flex-direction: column;
}

.form-data > div label {
  font-weight: 700;
  font-size: 1.25rem;
}

.form-group label {
  font-weight: bold;
}

.form-control {
  width: 100%;
  height: 3.125rem;
  background-color: var(--color-background-form-input) !important;
}

/* Button do rodapé */

.bt-disabled {
  background-color: var(--color-magenta-principal);
  width: 100%;
  height: 3.125rem;
  font-size: 1.188rem;
  text-transform: uppercase;
  border: none;
  color: var(--color-white-default);
  border-radius: 0.188rem;
  font-weight: 700;
}

.bt-disabled:hover {
  background-color: var(--color-yellow-principal);
  transition: 0.5s, 0.5s;
}

/* Modal */

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

.modal-body-group p {
  font-size: 1.4rem;
}

.submit,
.cancel {
  color: white !important;
  font-weight: bold !important;
  border-radius: 0.313rem !important;
  width: 400px;
  height: 3.125rem;
  font-size: 1.563rem !important;
}

.submit {
  background-color: var(--color-magenta-principal) !important;
  border: none !important;
}

.cancel {
  background-color: var(--color-yellow-principal) !important;
}

.conteudomodal {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 40vh;
}

.btn.submit.form-control {
  font-size: 1.375rem !important;
}
</style>
