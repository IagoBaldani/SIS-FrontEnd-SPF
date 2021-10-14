<template>
  <Header />
  <main>
    <div class="container-fluid">
      <div class="row justify-content-evenly">
        <div class="col-md-4">
          <h1 class="mt-3 f">Dados da Vaga</h1>
        </div>
        <div class="col-md-4"></div>
        <div class="col-md-2"></div>
      </div>
      <div class="row justify-content-evenly">
        <div class="col-md-4">
          <fieldset disabled>
            <div class="form-group mb-3">
              <label for="course">Formação</label>
              <input
                type="text"
                class="form-control"
                v-bind:placeholder="candidato.formacao"
                disabled
              />
            </div>

            <div class="form-group mb-3">
              <label for="start-date">Data de início</label>
              <input
                type="text"
                class="form-control"
                v-bind:placeholder="candidato.dataInicio"
                disabled
              />
            </div>

            <div class="form-group mb-3">
              <label for="final-date">Data de término</label>
              <input
                type="text"
                class="form-control"
                v-bind:placeholder="candidato.dataTermino"
                disabled
              />
            </div>

            <div class="form-group mb-3">
              <label for="qtd-estagiarios">Quantidade de Estagiários</label>
              <input
                type="text"
                class="form-control"
                v-bind:placeholder="candidato.qtdEstagiarios"
                disabled
              />
            </div>

            <div class="form-group mb-3">
              <label for="qtd-trainees">Quantidade de Trainees</label>
              <input
                type="text"
                class="form-control"
                id="disabledTextInput"
                v-bind:placeholder="candidato.qtdTrainees"
                disabled
              />
            </div>
          </fieldset>
        </div>
        <div class="col-md-4">
          <fieldset disabled>
            <div class="form-group mb-3">
              <label for="qtd-trainees">Quantidade de Aprendizes</label>
              <input
                type="text"
                class="form-control"
                v-bind:placeholder="candidato.qtdAprendizes"
                disabled
              />
            </div>

            <div class="form-group mb-3">
              <label for="all-participators">Participantes Totais</label>
              <input
                type="text"
                class="form-control"
                v-bind:placeholder="candidato.participantesTotais"
                disabled
              />
            </div>
          </fieldset>
        </div>
        <div class="col-md-2"></div>
        <footer>
          <div class="row justify-content-evenly">
            <div class="content-center col-md-4">
              <button
                class="bt-disabled mt-5 mb-2"
                v-on:click="modal()"
                id="disabled"
                type="submit"
              >
                Desativar Processo
              </button>
            </div>
            <div class="col-md-4"></div>
            <div class="col-md-2"></div>
          </div>
        </footer>
      </div>
    </div>
    <div
      class="modal"
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
              id="cancelar"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body d-flex justify-content-between">
            <div>
              <h1 class="modal-title form-label fw-bold mb-0 titulo">
                Deseja confirmar a desativação?
              </h1>
            </div>
            <div class="conteudomodal">
              <div class="col-xl-5">
                <div class="modal-body-group">
                  <h2>Formação</h2>
                  <p>{{ candidato.formacao }}</p>
                </div>
                <div class="modal-body-group">
                  <h2>Data de início</h2>
                  <p>{{ candidato.dataInicio }}</p>
                </div>
              </div>
              <div class="col-xl-2"></div>
              <div class="col-xl-5 mt-5">
                <div class="modal-body-group">
                  <h2>Data do Término</h2>
                  <p>{{ candidato.dataTermino }}</p>
                </div>
                <div class="modal-body-group">
                  <h2>Quantidade de participantes</h2>
                  <p>{{ candidato.participantesTotais }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer border-0 justify-content-around">
            <div>
              <button type="button" class="btn submit">CONFIRMAR</button>
            </div>
            <div>
              <button type="button" class="btn cancel" data-bs-dismiss="modal">
                CANCELAR
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Header from '@/components/Header.vue'
export default {
  name: 'App',
  components: {
    Header
  },
  methods: {
    modal () {
      let btn = document.querySelector('#disabled')
      let modal = document.querySelector('.modal')
      let cancelar = document.querySelector('#cancelar')

      btn.addEventListener('click', () => {
        modal.style.display = 'flex'
      })

      cancelar.addEventListener('click', () => {
        modal.removeAttribute('style')
      })
    }
  },

  data () {
    return {
      candidato: {
        id: 1,
        formacao: 'Formação Java',
        dataInicio: 'dd/MM/yyyy',
        dataTermino: 'dd/MM/yyyy',
        qtdEstagiarios: 20,
        qtdTrainees: 30,
        qtdAprendizes: 5,
        participantesTotais: 55
      }
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
