<template>
  <Header />
  <main>
    <!-- ínicio do formulário -->
    <div class="container-fluid" id="participante">
      <div class="row mt-4 justify-content-evenly">
        <div class="div-titulo col-xl-4">
          <h3 class="fw-bold titulo">Dados do participante:</h3>
        </div>
        <div class="col-xl-4"></div>
        <div class="col-xl-2 d-flex justify-content-center">
        </div>
      </div>
      <div class="row justify-content-evenly">
        <div class="col-xl-4">
          <fieldset disabled>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo">Nome</label>
              <input
                class="form-control disabledTextInput"
                v-bind:value="participante.nome"
                type="text"
              />
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo">CPF</label>
              <input id="cpfDoparticipante"
                class="form-control disabledTextInput"
                v-bind:value="formataCpfparaMostrar(participante.cpf)"
                v-mask="['###.###.###-##']"
                type="text"
              />
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo">Contato</label>
              <input
                class="form-control disabledTextInput"
                v-bind:value="formataTelefoneparaMostrar(participante.telefone)"
                type="tel"
                v-mask="['(##) # ####-####']"
                disabled
                readonly
              />
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo"
                >Fonte recrutamento</label
              >
              <input
                class="form-control disabledTextInput"
                v-bind:value="participante.fonteRecrutamento"
                type="text"
                disabled
                readonly
              />
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo"
                >Nota na prova de lógica</label
              >
              <input
                class="form-control disabledTextInput"
                v-bind:value="participante.testeLogico"
                type="number"
                min="0"
                max="10"
                disabled
                readonly
              />
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo"
                >Instituição de Ensino</label
              >
              <input
                class="form-control disabledTextInput"
                v-bind:value="participante.nmFaculdade"
                type="text"
                disabled
                readonly
              />
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo">Curso</label>
              <input
                class="form-control disabledTextInput"
                v-bind:value="participante.curso"
                type="text"
                disabled
                readonly
              />
            </div>
            <div class="mb-3">
                <label class="form-label mb-0 titulo">Donwload DISC</label><br>
                <p ><img  src="../../assets/imgs/file_upload_black_24dp.svg" class="download" v-on:click="downloadDisc()">DISC</p>
            </div>
            <div class="mb-3">
                <label class="form-label mb-0 titulo">Donwload TCE</label><br>
                <p><img  src="../../assets/imgs/file_upload_black_24dp.svg" class="download"  v-on:click="downloadTce()">TCE</p>
            </div>
          </fieldset>
        </div>
        <div class="col-xl-4">
          <fieldset disabled>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo"
                >Término da graduação</label
              >
              <input
                class="form-control disabledTextInput"
                v-bind:value="formataDataParaMostrar(participante.dataFimGraduacao)"
                type="text"
                disabled
                readonly
              />
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo">Cargo</label>
              <input
                class="form-control disabledTextInput"
                v-bind:value="participante.cargo"
                type="text"
                disabled
                readonly
              />
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo">Salário</label>
              <input
                class="form-control disabledTextInput"
                v-bind:value="participante.bolsa"
                type="number"
              />
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo"
                >Programa de Formação - Turma</label
              >
              <input
                class="form-control disabledTextInput"
                v-bind:value="
                  participante.turma
                "
                type="text"
                disabled
                readonly
              />
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo"
                >Coordenador Técnico</label
              >
              <input
                class="form-control disabledTextInput"
                v-bind:value="participante.nomeInstrutor"
                type="text"
                disabled
                readonly
              />
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo"
                >Início do programa</label
              >
              <input
                class="form-control disabledTextInput"
                v-bind:value="formataDataParaMostrar(participante.iniPrograma)"
                type="text"
                disabled
                readonly
              />
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo"
                >Término do programa</label
              >
              <input
                class="form-control disabledTextInput"
                v-bind:value="formataDataParaMostrar(participante.fimPrograma)"
                type="text"
                disabled
                readonly
              />
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo">Observação</label>
              <textarea
                class="form-control disabledTextInput"
                cols="20"
                rows="10"
                v-bind:value="participante.observacao"
              ></textarea>
            </div>
          </fieldset>
        </div>
        <div class="col-xl-2">
          <fieldset disabled>
            <div class="text-center text-md-left">
            </div>
          </fieldset>
        </div>
      </div>
      <div class="row justify-content-evenly">
        <div class="col-xl-4">
            <button v-if="participante.statusAtivo == 'ATIVO'"
              type="button"
              class="btn submit form-control"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal">
              DESATIVAR PARTICIPANTE
            </button>
          <button v-else
            type="button"
            class="btn submit form-control"
            data-bs-toggle="modal"
            data-bs-target="#exampleModalAtivar"
            id="ativarParticipante">
            ATIVAR PARTICIPANTE
          </button>
        </div>
        <div class="col-xl-4"></div>
        <div class="col-xl-2"></div>
      </div>
    </div>
    <!-- fim do formulário -->
  </main>
  <!-- MODAL PARA DESATIVAR -->
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
              Deseja confirmar a desativação do seguinte participante?
            </h1>
          </div>
          <div class="conteudomodal" id="participante-modal">
            <h2 class="fw-bold subtitulo">{{ participante.nome }}</h2>
          </div>
        </div>
        <div class="modal-footer border-0 justify-content-around">
          <div>
            <button type="button" class="btn submit-modal" v-on:click="processaRequisicoes(this.participante.statusAtivo)">CONFIRMAR</button>
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
  <!-- MODAL PARA ATIVAR PARTICIPANTE -->
   <div
    class="modal fade"
    id="exampleModalAtivar"
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
              Deseja confirmar a ativação do seguinte participante?
            </h1>
          </div>
          <div class="conteudomodal" id="participante-modal">
            <h2 class="fw-bold subtitulo">{{ participante.nome }}</h2>
          </div>
        </div>
        <div class="modal-footer border-0 justify-content-around">
          <div>
            <button type="button" class="btn submit-modal" v-on:click="processaRequisicoes(this.participante.statusAtivo)">CONFIRMAR</button>
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
import { http } from '../../services/Config'
import { mask } from 'vue-the-mask'

export default {
  directives: { mask },
  name: 'App',
  components: {
    Header
  },
  data () {
    return {
      participante: {},
      id: '',
      atualizaStatusForm: {
        statusAtivo: '',
        cpf: ''
      }
    }
  },
  beforeMount () {
    Funcoes.verificaToken()
    const dadosUrl = this.pegaDadosUrl()
    this.id = dadosUrl.id
    var cpf = dadosUrl.id
    this.getCargo(cpf)
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
    },
    getCargo (cpf) {
      http.get(`participante/completo/${cpf}`)
        .then(response => {
          (this.participante = response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    formataDataParaMostrar (data) {
      const dataPreForm = new Date(data)
      const dataFormatada = `${dataPreForm.getUTCDate()}/${dataPreForm.getUTCMonth() + 1}/${dataPreForm.getUTCFullYear()}`
      return dataFormatada
    },
    downloadTce () {
      location.href = `http://localhost:8081/api/participante/downloadTce/${this.participante.cpf}`
    },
    downloadDisc () {
      location.href = `http://localhost:8081/api/participante/downloadDisc/${this.participante.cpf}`
    },
    formataCpfparaMostrar (cpf) {
      return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    },
    formataTelefoneparaMostrar (telefone) {
      return telefone.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4')
    },
    processaRequisicoes (statusAtivo) {
      this.atualizaStatusForm.cpf = this.participante.cpf
      this.atualizaStatusForm.statusAtivo = this.participante.statusAtivo
      if (statusAtivo == 'ATIVO') {
        this.atualizaStatusForm.statusAtivo = 'INATIVO'
      } else if (statusAtivo == 'INATIVO') {
        this.atualizaStatusForm.statusAtivo = 'ATIVO'
      }
      http
        .put('participante/atualizaStatus', this.atualizaStatusForm)
        .then(response => {
          window.location.href = 'http://localhost:8080/dados-participante-busca'
        })
        .catch(error => {
          console.log(error)
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

#ativarParticipante {
  background-color: #ffb700 !important;
  
}

.inativo {
  color: darkred;
}

.subtitulo {
  color: #737373;
}

.pointer{
  cursor: pointer;
}

.disabledTextInput {
  background-color: #d3caca !important;
  border: 1px solid #bcb3b3 !important;
}

.form-control {
  color: #737373 !important;
}

textarea {
  resize: none !important;
  height: 200px !important;
}

.download {
  transform: rotate(180deg) !important;
  cursor:pointer !important;
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
}

.rounded-circle {
  width: 150px;
}
.btn-registrar{
    margin-bottom: 0;
    width:100%;
    padding: 5px 5px;
    background-color: #ffb700 !important;
    color: white;
    border-radius: 3px;
    font-family: 'Montserrat', sans-serif;
    font-weight: bolder;
    border-style: none;
    font-size: 20px;

}
.btn-registrar:hover{
    background-color: #634700;
    transition: 300ms;
     color: white;
}
@media (max-width: 1200px) {
  .rounded-circle {
    margin-bottom: 3em;
  }
}
</style>
