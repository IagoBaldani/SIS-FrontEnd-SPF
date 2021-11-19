<template>
  <Header />
  <main>
    <div class="container-fluid">
      <div class="row justify-content-evenly">
        <div class="col-xl-4">
          <h1 class="dadosCandidato mt-4 mb-4">Dados do Candidato:</h1>
        </div>
        <div class="col-xl-4"></div>
      </div>
      <div class="row justify-content-evenly">
        <div class="col-md-4">
          <div class="mb-3">
            <label class="label-form">Nome</label>
            <input
              type="text"
              class="form-control"
              id="inputNome"
              placeholder="Nome"
              v-model="candidato.nome"
            />
          </div>

          <div class="mb-3">
            <label class="label-form">Contato</label>
            <input
              type="tel"
              class="form-control"
              id="inputContato"
              placeholder="(xx) xxxxx-xxxx"
              v-model="candidato.telefone"
            />
          </div>

          <div class="mb-3">
            <label class="label-form" >Fonte de recrutamento</label>
            <input
              type="text"
              class="form-control"
              id="inputFonteDeRecrutamento"
              placeholder="Fonte de recrutamento"
              v-model="candidato.fonteRecrutamento"
            />
          </div>

          <div class="mb-3">
            <label class="label-form">Data agendamento</label>
            <input
              type="date"
              class="form-control"
              id="inputDataAgendamento"
              placeholder="2021/02/15"
              v-model="candidato.dataAgendamento"
            />
          </div>

          <div class="mb-3">
            <label class="label-form">Curso</label>
            <input
              type="text"
              class="form-control"
              id="inputCurso"
              placeholder="Curso"
              v-model="candidato.curso"
            />
          </div>
          <div class="mt-0">
            <label class="label-form titulo mb-0">Resultado 1ª fase</label>
            <select class="form-select" v-model="candidato.status" id="status">
              <option value="SEM_STATUS" selected>Sem status</option>
              <option value="APROVADO_1_FASE" class="aprovado">Aprovado 1ª fase</option>
              <option value="REPROVADO_1_FASE" class="reprovado">Reprovado 1ª fase</option>
              <option value="APROVADO_2_FASE" class="aprovado">Aprovado 2ª fase</option>
              <option value="REPROVADO_2_FASE" class="reprovado">Reprovado 2ª fase</option>
              <option value="STANDBY" class="standby">Stand By</option>
            </select>
          </div>
        </div>
        <div class="col-md-4">
          <div class="mb-3">
            <label class="label-form">Prova prática</label>
            <input type="text" class="form-control" id="inputProvaPratica" placeholder="Prova prática" v-model="candidato.testeLogico"/>
          </div>

          <div class="mb-3">
            <label class="label-form">DISC</label>
            <input type="text" class="form-control" id="inputDisc" placeholder="DISC" v-model="candidato.notaDisc"/>
          </div>

          <div class="mb-3">
            <label class="label-form mb-0 titulo">Currículo candidato</label><br>
              <input type="file" class="form-control">
          </div>

          <div class="mb-3">
            <label class="label-form">Observações Entrevista</label>
            <textarea rows="5" class="form-control" id="inputObservacao" v-model="candidato.observacao"></textarea>
          </div>
        </div>
      </div>
      <div class="row justify-content-evenly mt-4">
        <div class="col-md-4">
          <div class="mb-2">
            <div for="exampleModal" class="confirmar">
              <div
                type="button"
                @onclick="acao()"
                @click.prevent="enviarDados()"
                class="bt"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <button type="button" class="btn-confirmar bt-footer largura">
                  CONFIRMAR
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
        </div>
      </div>
    </div>

    <!-- Modal -->

    <div
      class="modal"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-xl modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body d-flex justify-content-between">
            <div>
              <h1 class="modal-title form-label fw-bold mb-0 titulo" v-if="candidatoForm.id == ''">
                Deseja confirmar o cadastro?
              </h1>
              <h1 class="modal-title form-label fw-bold mb-0 titulo" v-else>
                Deseja confirmar a edição do participante?
              </h1>
            </div>
            <div class="conteudomodal">
              <div class="col-xl-5 mb-3">
                <h2 class="nome">Nome: {{ candidatoForm.nome }}</h2>
                <h2 class="nome">Contato: {{ candidatoForm.telefone }}</h2>
                <h2 class="nome">Candidato: {{ candidatoForm.fonteRecrutamento }}</h2>
                <h2 class="nome">Data Agendamento: {{ candidatoForm.dataAgendamento }}</h2>
                <h2 class="nome">Curso: {{ candidatoForm.curso }}</h2>
                <h2 class="nome">Currículo:</h2>
                <h2 class="nome">Observação: {{ candidatoForm.observacao }}</h2>
                <h2 class="nome">Status: {{ candidatoForm.status }}</h2>
              </div>
              <div class="col-xl-2"></div>
              <div class="col-xl-5 mt-5"></div>
            </div>
          </div>
          <div class="modal-footer border-0 justify-content-around">
            <div>
              <button type="button" class="btn submit" @click="processaRequisicoes">CONFIRMAR</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Header from '@/components/Header.vue'
import Funcoes from '@/services/Funcoes'
import { http } from '@/services/config'

export default {
  name: 'App',
  components: {
    Header
  },

  data () {
    return {
      candidato: {},
      candidatoForm: {
        id: '',
        nome: '',
        telefone: '',
        fonteRecrutamento: '',
        dataAgendamento: '',
        curso: '',
        testeLogico: '',
        notaDisc: '',
        observacao: '',
        status: ''
      }
    }
  },
  beforeMount () {
    Funcoes.verificaToken()

    const dadosUrl = this.pegaDadosUrl()
    let id = dadosUrl.id
    let tipo = dadosUrl.tipo

    if (tipo == 'edicao') {
      this.getCandidato(id)
    }
  },
  methods: {
    acao () {
      let modal = document.querySelector('.modal')
      let buttonClose = document.querySelector('.cancel')

      modal.style.display = 'block'

      buttonClose.addEventListener('click', () => {
        modal.removeAttribute('style')
      })
    },
    enviarDados () {
      this.candidatoForm.id = this.candidato.id
      this.candidatoForm.nome = document.querySelector('#inputNome').value
      this.candidatoForm.telefone = document.querySelector('#inputContato').value
      this.candidatoForm.fonteRecrutamento = document.querySelector('#inputFonteDeRecrutamento').value
      this.candidatoForm.dataAgendamento = document.querySelector('#inputDataAgendamento').value
      this.candidatoForm.curso = document.querySelector('#inputCurso').value
      this.candidatoForm.testeLogico = document.querySelector('#inputProvaPratica').value
      this.candidatoForm.notaDisc = document.querySelector('#inputDisc').value
      this.candidatoForm.observacao = document.querySelector('#inputObservacao').value
      this.candidatoForm.status = document.querySelector('#status').value
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
    getCandidato (id) {
      http
        .get(`candidato/${id}`)
        .then(response => {
          this.candidato = response.data
        })
        .catch(error => {
          alert(error)
        })
    },
    processaRequisicoes () {
      const dados = this.pegaDadosUrl()
      let id = dados.id
      let tipo = dados.tipo

      if (tipo == 'edicao') {
        http
          .put(`candidato/${id}`, this.candidatoForm)
          .then(response => {
            alert('Candidato atualizado com sucesso')
            window.location.href = 'http://localhost:8080/processo-seletivo-busca-por-candidato'
          })
          .catch(error => {
            alert(error)
          })
      } else if (tipo == 'cadastro') {
        http
          .post('candidato', this.candidatoForm)
          .then(response => {
            alert('Candidato criado com sucesso')
            window.location.href = 'http://localhost:8080/processo-seletivo-busca-por-candidato'
          })
          .catch(error => {
            alert(error)
          })
      }
    }
  }
}
function formataDataParaExibicao (data) {
  const dataPreForm = new Date(data)
  const dataFormatada = `${dataPreForm.getUTCDate()}/${dataPreForm.getUTCMonth() + 1}/${dataPreForm.getUTCFullYear()}`
  return dataFormatada
}
</script>

<style>
/* Chamada root */
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

  /* Cor base rodapé */
  --color-blue-footer: #00f;

  /* Cores de fonte */
  --color-gray-font: #737373;

  /* Cores default */
  --color-white-default: #ffffff;
  --color-black-default: #000000;
}

/* Restart da página*/
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

/* Tudo relacionado ao header */

.btn-header img,
.logo img {
  height: 50px;
}

/* Final do Header */
/* ------------------------------------------------------------ */

/* Main */

/* Titulo da página */
.dadosCandidato {
  font-weight: 700;
  width: 100%;
  font-size: 30px;
}

/* Labels de todos os inputs */
.label-form {
  font-weight: 700;
  font-size: 18px;
}

/* Textarea de mensagem */
#observacao {
  width: 100%;
  resize: none;
}

/* Início da chamada dos botões do rodapé */
.btn-confirmar,
.btn-status {
  height: 50px !important;
  width: 100%;

  border: none !important;

  font-size: 22px;

  text-align: center !important;
  font-weight: bold !important;
  color: var(--color-white-default);
  line-height: 30px;

  border-radius: 3px;
  white-space: normal !important;
}

.btn-confirmar {
  background: var(--color-magenta-principal);
}

.btn-status {
  background: var(--color-yellow-principal);
}

/* Final da chamada dos botões do rodapé */

/* Chamada dos campos disabled */
#disc,
#prova {
  background-color: var(--color-background-form-input);
}

/* Início da chamada do modal */

.modal {
  display: none;
}

button .largura {
  width: 100% !important;
}

.modal-body,
.modal-header,
.modal-footer {
  text-align: center;
  background-color: var(--color-background-screen);
}

.modal-title {
  margin-left: 75px;
}

.modal-body {
  min-height: 55vh;
  flex-direction: column;
  width: 100%;
}

.submit,
.cancel {
  color: white !important;
  font-weight: bold !important;
  border-radius: 5px !important;
  width: 350px;
  height: 50px;
  font-size: 25px !important;
}

.submit {
  background-color: var(--color-magenta-principal) !important;
}

.cancel {
  background-color: var(--color-yellow-principal) !important;
}

.conteudomodal {
  display: block;
  text-align: left;
  margin-left: 100px;
  color: var(--color-blue-footer) !important;
}

.btn.submit.form-control {
  font-size: 22px !important;
}

.nome {
  color: var(--color-gray-font);
  font-size: 24px;
}
.download{
    transform: rotate(180deg) !important;
}
textarea {
  resize: none;
}
.aprovado{
  color: #19B200 !important;
}

.reprovado{
  color: red !important;
}

.standby{
  color: blue !important;
}
</style>
