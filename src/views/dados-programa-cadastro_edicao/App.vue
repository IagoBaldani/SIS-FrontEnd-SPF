<template>
    <Header/>
    <main>
        <div class="container-fluid">
            <div class="row mt-4 justify-content-evenly">
                <div class="div-titulo col-xl-4">
                    <h3 class="fw-bold titulo">Dados da Formação:</h3>
                </div>
                <div class="col-xl-4"></div>
                <div class="col-xl-2"></div>
            </div>
            <div class="row d-flex justify-content-evenly">
                <div class="col-xl-4">
                    <div class="mb-3">
                        <label for="nome" class="form-label fw-bold mb-0 titulo">Nome</label>
                        <input
                            type="text"
                            class="form-control"
                            id="nome"
                            disabled
                            :value="programa.nome"
                        />
                    </div>
                    <div class="mb-3">
                        <label for="inicio" class="form-label fw-bold mb-0 titulo">Início do Programa</label>
                        <input
                            class="form-control"
                            type="date"
                            id="inicio"
                            required
                            :value="programa.inicio"
                            
                        />
                    </div>
                    <div class="mb-3">
                        <label for="termino" class="form-label fw-bold mb-0 titulo">Término do Programa</label>
                        <input
                            type="date"
                            class="form-control"
                            id="termino"
                            required
                            :value="programa.termino"
                            
                        />
                    </div>
                    <div class="mb-3 mt-3">
                        <label class="form-label fw-bold mb-0 titulo">Instrutor</label>
                        <select class="form-select" id="instrutores" v-model="programa.nomeCoordenador">
                            <option
                                id="coordenador"
                                v-for="instrutor in instrutores"
                                v-bind:value="instrutor.nome"
                                v-bind:key="instrutor.cpf"
                            >
                                {{ instrutor.nome }}
                            </option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="turma" class="form-label fw-bold mb-0 titulo">Turma</label>
                        <input
                            type="text"
                            class="form-control"
                            id="turma"
                            required
                            :value="programa.turma"
                        />
                    </div>
                </div>
                <div class="col-xl-4"></div>
                <div class="col-xl-2"></div>
                </div>
                <div class="row d-flex justify-content-evenly">
                    <div class="col-xl-4">
                        <input
                            value="CONFIRMAR"
                            type="button"
                            name="botao-ok"
                            class="mt-5 form-control submit"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            v-on:click="enviarDados"/>
                    </div>
                    <div class="col-xl-4"></div>
                    <div class="col-xl-2"></div>
                </div>
        </div>
    </main>

    <!-- Modal   -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-xl modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body d-flex justify-content-between">
                    <div>
                        <h1 class="modal-title form-label fw-bold mb-0 titulo">
                            Deseja confirmar os seguintes dados?
                        </h1>
                    </div>
                    <div class="conteudomodal d-flex flex-column justify-content-center mb-0">
                        <div class="mt-3">
                            <ul class="fw-bold subtitulo text-start">
                                Informações gerais:
                                <li>Nome: <span class="titulo"> {{ this.programaForm.nome }} </span></li>
                                <li>Início do Programa: <span class="titulo">{{ this.formataDataParaExibicao(programaForm.dataInicio)}}</span></li>
                                <li>Término do Programa: <span class="titulo">{{ this.formataDataParaExibicao(programaForm.dataFim)}}</span></li>
                                <li>Instrutor: <span class="titulo">{{ programaForm.instrutor }}</span></li>
                                <li>Turma: <span class="titulo">{{ programaForm.turma }}</span></li>
                            </ul>
                        </div>
                        <div class="mt-3 modal-footer border-0 justify-content-around">
                            <div>
                                <button type="button" class="btn submit-modal" v-on:click="putPrograma()">
                                    CONFIRMAR
                                </button>
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
      id: '',
      responseStatus: '',
      instrutores: [],
      programa: {},
      programaForm: {
        id: '',
        nome: '',
        dataInicio: '',
        dataFim: '',
        instrutor: '',
        turma: ''
      }
    }
  },
  beforeMount () {
    Funcoes.verificaToken()
    const dadosUrl = this.pegaDadosUrl()
    this.id = dadosUrl.id
    this.programaForm.id = dadosUrl.id
  },
  mounted () {
    this.getInstrutor()
    this.getPrograma()
  },
  methods: {
    putPrograma () {
      console.log(this.programaForm)
      http.put('programa', this.programaForm)
        .then(response => {
          if (response.status == 200) {
            window.location.href = '/dados-programa-busca'
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    getInstrutor () {
      http.get('instrutor/status/ATIVO')
        .then(response => {
          this.instrutores = response.data
          console.log(this.instrutores[0].nome)
        })
        .catch(error => {
          console.log(error)
        })
    },

    getPrograma () {
      http.get(`programa/${this.id}`)
        .then(response => {
          console.log(this.programa = response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    enviarDados () {
      this.programaForm.nome = document.getElementById('nome').value
      this.programaForm.dataInicio = document.getElementById('inicio').value
      this.programaForm.dataFim = document.getElementById('termino').value
      this.programaForm.instrutor = document.getElementById('instrutores').value
      this.programaForm.turma = document.getElementById('turma').value
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

.subtitulo {
    color: #737373;
}

#disabledTextInput {
    background-color: #D3CACA;
    border: 1px solid #BCB3B3;
}

#formulario-principal {
    text-align: left;
}

textarea {
    resize: none !important;
}

.cadastro {
    background-color: #FFB700 !important;
    color: white !important;
    font-weight: bold !important;
    border-radius: 5px !important;
    max-width: 575px !important;

}

.status-encerrado, .erro{
    color: darkred;
    font-weight: bold;
}

.status-andamento {
    color: green;
    font-weight: bold;
}

.imagem {
    background-color: #AB0045 !important;
}

.imagem-coluna {
    background-color: #FFB700 !important;
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

.modal-body, .modal-header, .modal-footer {
    text-align: center;
    background-color: #EBEBEB
}

.modal-body {
    min-height: 55vh;
    flex-direction: column;
}

.submit-modal, .cancel-modal {
    color: white !important;
    font-weight: bold !important;
    border-radius: 5px !important;
    width: 350px;
    font-size: 25px !important;
}

.submit, .submit-modal {
    color: white !important;
    font-weight: bold !important;
    background-color: #AB0045 !important;
}

.cancel, .cancel-modal {
    color: white !important;
    font-weight: bold !important;
    background-color: #FFB700 !important;
}

.conteudomodal {
    display: flex;
    justify-content: center;
    min-height: 40vh;
    font-size: 21px;
}

.modal-content {
    height: 80vh !important;
}

</style>
