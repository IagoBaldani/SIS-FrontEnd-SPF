<template>
    <Header/>
    <main>
        <div class="container-fluid">
            <div class="row justify-content-evenly mt-5 mb-3">
                <div class="titulo col-lg-4">
                    <h3 class="fw-bold titulo">Registrar horas de acesso:</h3>
                </div>
                <div class="col-lg-7 d-flex justify-content-center fw-bold titulo">
                    <div class="col-lg-7 d-flex justify-content-center align-items-center">
                        <div class="d-block justify-content-center">
                            <h3 class="fw-bold text-center titulo">Participante selecionado:</h3>
                            <h4 class="fw-bold grey-font text-center nome-participante">{{participante.nome}}</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row justify-content-evenly">
                <div class="col-lg-4">
                    <form>
                        <div class="mb-3">
                            <label for="qtdHoras" class="form-label fw-bold mb-0 titulo">Quantidade de Horas</label>
                            <input name="qtdHoras" v-model="form.qtdHoras" type="number" required class="form-control campo">
                        </div>
                        <div class="mb-3">
                            <label for="mAvaliado" class="form-label fw-bold mb-0 titulo">Mês avaliado</label>
                            <input name="mAvaliado" v-model="form.mesAvaliado" type="number" required class="form-control campo">
                        </div>
                        <div class="mb-3">
                            <label for="sAvaliada" class="form-label fw-bold mb-0 titulo">Semana avaliada</label>
                            <input name="sAvaliada"  v-model="form.semanaAvaliada" type="number" required class="form-control campo">
                        </div>
                        <div class="mb-3">
                            <label for="dtRegistro" class="form-label fw-bold mb-0 titulo">Data do Registro</label>
                            <input name="dtRegistro"  v-model="form.dataRegistro" type="date" required class="form-control campo">
                        </div>
                        <div class="mb-3">
                            <label for="hMinima" class="form-label fw-bold mb-0 titulo">Horas mínimas semanais</label>
                            <input name="hMinima" v-model="form.hrMinSemana" type="number" required class="form-control campo">
                        </div>
                        <button type="button" @click="postForm()" class="btn btn-primary mt-2 fw-bold w-100 botao">REGISTRAR</button>
                        <p class="none h4 mt-3" id="aguarde">Enviando formulário, aguarde...</p>
                        <p class="none h4 enviado mt-3" id="enviado">Formulário enviado</p>
                        <p class="erro h4 none mt-3" id="preencha">Preencha todos os campos!</p>
                    </form>
                </div>
                <div  class="col-lg-7">
                    <div style="overflow-y: scroll; max-height:335px;">
                        <table class="table table-bordered table-fixed tabela">
                            <thead >
                                <tr>
                                    <th scope="col" class="text-center th-id titulo">Nº</th>
                                    <th scope="col" class="text-center th-ms titulo">Mês/Semana</th>
                                    <th scope="col" colspan="2" class="text-center titulo">Data do Registro</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(registro, index ) in registros" :key="registro"  >
                                    <th scope="row" class=" text-center titulo" id="info-id">{{++index}}</th>
                                    <td class="text-center campo-tabela">{{registro.mesAvaliado}}/{{registro.semanaAvaliada}}</td>
                                    <td class="text-center campo-tabela">{{this.formataDataParaMostrar(registro.dataRegistro)}}</td>
                                    <td @click="carregaModal(registro, index)"
                                        id="olho" class="td-button"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"><img
                                        src="@/assets/imgs/visibility_white_24dp.svg" /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog dialogoModal">
            <div class="modal-content p-5 conteudoModal" >
                <div class="row mb-5">
                    <div class="col">
                        <h2 class="modal-title fw-bold titulo" id="exampleModalLabel">Registro do acompanhamento: {{indiceModal}}</h2>
                    </div>
                </div>
                <div class="row mb-5">
                    <div class="col-lg-6">
                        <div class="mb-4">
                            <h3 class="fw-bold titulo">Mês do registro:</h3>
                            <p class="">{{registroModal.mesAvaliado}}</p>
                        </div>
                        <div class="mb-4">
                            <h3 class="fw-bold titulo">Semana do registro:</h3>
                            <p class="">{{registroModal.semanaAvaliada}}</p>
                        </div>
                        <div class="mb-4">
                            <h3 class="fw-bold titulo">Horas Semanais:</h3>
                            <p class="">{{registroModal.hrMinSemana}}</p>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="mb-4">
                            <h3 class="fw-bold titulo">Data do registro:</h3>
                            <p class="">{{this.formataDataParaMostrar(registroModal.dataRegistro)}}</p>
                        </div>
                        <div class="mb-4">
                            <h3 class="fw-bold titulo">Quantidade de horas totais:</h3>
                            <p class="">{{registroModal.qtdHoras}}</p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-6">
                        <div>
                            <button type="submit" class="btn btn-primary mt-2 w-100 fw-bold botao" data-bs-toggle="modal" data-bs-target="#exampleModal1">DELETAR REGISTRO</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog dialogoModal">
            <div class="modal-content p-5 conteudoModal">
                <div class="row mb-5">
                    <div class="col">
                        <h2 class="modal-title fw-bold titulo text-center" id="exampleModalLabel">Deseja deletar registro de acompanhamento?</h2>
                    </div>
                </div>
                <div class="row mb-5">
                    <div class="col-lg-6">
                        <div class="mb-4">
                            <h4 class="titulo fw-bold">Mês do registro:</h4>
                            <p class="">{{registroModal.mesAvaliado}}</p>
                        </div>
                        <div class="mb-4">
                            <h4 class=" titulo fw-bold">Semana do registro:</h4>
                            <p class="">{{registroModal.semanaAvaliada}}</p>
                        </div>
                        <div class="mb-4">
                            <h4 class=" titulo fw-bold">Horas Semanais:</h4>
                            <p class="">{{registroModal.hrMinSemana}}</p>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="mb-4">
                            <h4 class="fw-bold titulo">Data do registro:</h4>
                            <p class="">{{this.formataDataParaMostrar(registroModal.dataRegistro)}}</p>
                        </div>
                        <div class="mb-4">
                            <h3 class="fw-bold titulo">Quantidade de horas totais:</h3>
                            <p class="">{{registroModal.qtdHoras}}</p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-6">
                        <div>
                            <button type="submit"  @click="deleteById()" class="btn btn-primary mt-2 fw-bold w-100 botao" data-bs-dismiss="modal" >CONFIRMAR</button>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div>
                            <button type="submit" class="btn btn-primary mt-2 fw-bold w-100 botaocanc" data-bs-dismiss="modal" >CANCELAR</button>
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

export default {
  name: 'App',
  components: {
    Header
  },
  data () {
    return {
      registros: [],
      participante: {},
      id: {},
      registroModal: '',
      form: {
        qtdHoras: '',
        mesAvaliado: '',
        semanaAvaliada: '',
        dataRegistro: '',
        hrMinSemana: ''
      },
      indiceModal: {}
    } 
  },
  
  beforeMount () {
    this.id = this.pegaDadosUrl().id
    this.getParticipanteNome()
    this.getAlura()
    Funcoes.verificaToken()
  },

  methods: {
    getParticipanteNome () {
      http
        .get(`gerencial/${this.id}`)
        .then((response) => {
          this.participante = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    
    postForm () { 
      let campos = document.querySelectorAll('input')
      let campoVazio = 0
      campos.forEach(element => {
        if (!element.value) {
          campoVazio = 1
        }
      })
      if (campoVazio == 0) {
        document.querySelector('#preencha').classList.add('none')
        document.querySelector('#aguarde').classList.remove('none')
        http
          .post(`alura/novo/${this.id}`, this.form)
          .then((response) => {
            this.form = {}
            this.getAlura()
            document.querySelector('#aguarde').classList.add('none')
            document.querySelector('#enviado').classList.remove('none')
            setTimeout(function () {
              document.querySelector('#enviado').classList.add('none')
            }, 2000)
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        document.querySelector('#preencha').classList.remove('none')
      }
    },

    deleteById () {
      http
        .delete(`alura/deletar/${this.registroModal.codigoAlura}`)
        .then((response) => {
          this.getAlura()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getAlura () {
      http
        .get(`alura/${this.id}`)
        .then((response) => {
          this.registros = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },

    formataDataParaMostrar (data) {
      const dataPreForm = new Date(data)
      const dataFormatada = `${dataPreForm.getUTCDate()}/${dataPreForm.getUTCMonth() + 1}/${dataPreForm.getUTCFullYear()}`

      return dataFormatada
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
    carregaModal (registro, index) {
      this.registroModal = registro
      this.indiceModal = index
    }
  }
}
</script>

<style scoped>
body {
  background-color: #ebebeb !important;
}

.tabela{
    border: 1px solid #BCB3B3 !important;
    background-color: white;
    overflow-y: auto;
}

.titulo{
    color: #090B2E;
}

.botao{
    background-color: #AB0045 !important;
    border-style: none !important;
    border-radius: 2px !important;
}

.botaocanc{
    background-color: #FFB700 !important;
    border-style: none !important;
    border-radius: 2px !important;
}

.campo{
    border-radius: 2px !important;
    background-color: white !important;
    color: #737373 !important;
}

.th-id{
    width: 2em !important;
}

.th-ms{
    width: 15em !important;
}

.td-button{
    width: 1.5em !important;
    background-color: #FFB700 !important;
    cursor: pointer
}

.nome-participante{
    color: #737373;
}
.campo-tabela{
    color: #737373 !important;
}

.button{
    border-style: none;
    background-color: #FFB700 ;
}

.botao:hover{
    transition: 0.3s ease-in-out !important;
    background-color: #9a0045 !important;
}

.conteudoModal{
    background-color: #EBEBEB !important;
}

.dialogoModal{
    width: 1080px !important;
    max-width: 1080px !important;
}

.overflowT{
    position: sticky;
    top: 0;
    background-color: white;
}

.botaocanc:hover{
    transition: 0.3s ease-in-out !important;
    background-color: #dd9700 !important;
}

.none {
    display: none;
}

.erro {
  color: red;
}

.enviado {
  color: green
}
</style>
