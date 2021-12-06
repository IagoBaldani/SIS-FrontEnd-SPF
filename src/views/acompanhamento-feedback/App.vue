<template>
    <Header/>
    <main>
        <div class="container-fluid">
            <div class="row justify-content-evenly mt-5 mb-3">
                <div class="titulo col-lg-4">
                    <h3 class="fw-bold">Registrar Feedback:</h3>
                </div>
                <div class="col-lg-7 d-flex justify-content-center align-items-center">
                    <div class="d-block justify-content-center">
                        <h4 class="fw-bold text-center titulo">Participante selecionado:</h4>
                        <h4 class="fw-bold text-center nomeCol">{{participante.nome}}</h4>
                    </div>
                </div>

            </div>
            <div class="row justify-content-evenly">

                <div class="col-lg-4">
                    <form>
                        <div class="mb-3">
                            <p for="anotacao" class="form-label fw-bold mb-0 titulo">Data do Feedback</p>
                            <input v-model="form.data" type="date" class="form-control" id="anotacao"
                                placeholder="Digite a data do feedback">
                        </div>
                        <div class="mb-3">
                            <label for="anotacoes" class="form-label mb-0 fw-bold titulo">Anotações</label>
                            <textarea v-model="form.anotacoes" rows="8" class="form-control mb-3" id="anotacoes"></textarea>
                        </div>
                        <div class="input-group">
                            <!--<input class="input-file" type="file">-->
                             <input type="file" class="form-control" id="disc" 
                             accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
                        </div>
                        <button class="btn-registrar mt-4 " type="button" @click="postForm()" >REGISTRAR</button>
                        <p class="none h4 mt-3" id="aguarde">Enviando formulário, aguarde...</p>
                        <p class="none h4 enviado mt-3" id="enviado">Formulário enviado</p>
                        <p class="erro h4 none mt-3" id="preencha">Preencha todos os campos!</p>
                    </form>
                </div>
                <div class="col-lg-7">
                    <div class="master-table">

                        <table class="table table-bordered tabela">

                            <tbody>
                                <tr v-for="(feedback, index) in feedbacks" :key="feedback">
                                    <td scope="row">{{++index}}</td>
                                    <td>{{feedback.anotacao}}</td>
                                    <td @click="carregaModal(feedback, index)" id="tdcomlink" data-bs-toggle="modal" data-bs-target="#anotmodal" for="imglogo">
                                        <img class="imgicon" name="imglogo" src="@/assets/imgs/visibility_white_24dp.svg"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <!--Primeiro Modal -->

        <div class="modal fade " id="anotmodal">

            <div class="modal-dialog" role="document">

                <div class="modal-content p-5">
                    <div class="row mb-5">
                        <div class="col">
                            <h2 class="modal-title fw-bold titulo" id="exampleModalLabel">Feedback: {{indiceModal}}</h2>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-lg-6">
                            <h4 class="fw-bold titulo">Data do Feedback:</h4>
                            <p class="nomeCol">{{formataDataParaMostrar(feedbackModal.data)}}</p>
                            <h4 class="fw-bold titulo">Anotações do feedback</h4>
                            <textarea v-model="feedbackModal.anotacao" disabled class="mb-2 textarea disabled nomeCol" rows="6"></textarea>
                        </div>
                        <div class="col-lg-6" >
                            <h4 class="fw-bold titulo mb-3" >Download DISC:</h4>
                            <a v-on:click="download()" id="oioi" class="btn-registrar pointer" > DOWNLOAD</a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-6">
                            <button class="btn-registrar mt-5" data-bs-toggle="modal"
                                data-bs-target="#exmodal">DELETAR FEEDBACK</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--Segundo Modal -->

        <div class="modal fade " id="exmodal">

            <div class="modal-dialog" role="document">

                <div class="modal-content p-5">
                    <div class="row mb-5">
                        <div class="col">
                            <h2 class="modal-title fw-bold titulo text-center" id="exampleModalLabel">Deseja deletar registro do feedback?</h2>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-lg-6">
                            <h4 class="fw-bold titulo">Data do Feedback:</h4>
                            <p class="nomeCol">{{formataDataParaMostrar(feedbackModal.data)}}</p>
                            <h4 class="fw-bold titulo">Anotações do feedback</h4>
                            <textarea v-model="feedbackModal.anotacao" class="mb-2 textarea disabled nomeCol" rows="6"></textarea>
                        </div>
                    </div>
                     <div class="row">
                        <div class="col-lg-6">
                            <div>
                                 <button type="submit" class="btn btn-primary mt-2 fw-bold botao" data-bs-toggle="modal"
                                data-bs-target="#exmodal" @click="deleteById()" >CONFIRMAR</button>
                             </div>
                        </div>
                        <div class="col-lg-6">
                            <div>
                                <button type="submit" class="btn btn-primary mt-2 fw-bold botaocanc" data-bs-toggle="modal"
                                data-bs-target="#exmodal">CANCELAR</button>
                            </div>
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

export default {
  name: 'App',
  components: {
    Header
  },
  data () {
    return {
      feedbacks: [], // Array de feedback, que é populado com o getFeedback.
      feedbackModal: '', // objeto que é usado para popular os campos do modal.
      participante: {}, // objeto para salvar as informações do participante.
      form: {
        data: '',
        anotacoes: '',
        disc: {}
      },
      id: {},     
      indiceModal: {}
    }
  },

  beforeMount () {
    this.id = this.pegaDadosUrl().id
    this.getParticipanteNome()
    this.getFeedback()
    Funcoes.verificaToken()
  },

  methods: {
    getParticipanteNome () {
      http
        .get(`participante/${this.id}`)
        .then((response) => {
          this.participante = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // metodo para retornar os feedbacks.
    getFeedback () {
      http
        .get(`feedback/${this.id}`)
        .then((response) => {
          this.feedbacks = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    //  metodo para enviar o post com o form
    postForm () {
      let campos = document.querySelectorAll('input')
      let campoVazio = 0
      campos.forEach(element => {
        if (!element.value) {
          campoVazio = 1
        }
      })
      if (this.form.anotacoes == '') campoVazio = 1
      if (campoVazio == 0) {
        document.querySelector('#preencha').classList.add('none')
        document.querySelector('#aguarde').classList.remove('none')
        var formData = new FormData()
        var disc = document.getElementById('disc').files[0]
        formData.append('data', this.form.data)
        formData.append('anotacoes', this.form.anotacoes)
        formData.append('disc', disc)
        http
          .post(`feedback/novo/${this.id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data' 
            }
          })
          .then((response) => {
            this.getFeedback()
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
    // método para deletar o o feedback.
    deleteById () {
      http  
        .delete(`/feedback/deletar/${this.feedbackModal.id}`)
        .then((response) => {
          this.getFeedback()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // endereço da API para fazer donwload  do arquivo
    download () {
      location.href = `http://localhost:8081/api/feedback/download/${this.feedbackModal.id}`
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
    // função para carregar o modal com as informações seleciondas
    carregaModal (feedback, index) {
      this.feedbackModal = feedback
      this.indiceModal = index
    },
    // formata data para exibir corretamente no formato dd/MM/yyyy
    formataDataParaMostrar (data) {
      const dataPreForm = new Date(data)
      const dataFormatada = `${dataPreForm.getUTCDate()}/${dataPreForm.getUTCMonth() + 1}/${dataPreForm.getUTCFullYear()}`
      return dataFormatada
    }
  }
}

</script>

<style scoped>

body{
    background-color: #EBEBEB !important;
}
.h4{
    color:  #737373;
}

.perfil-img {
    height: 80px;
    border-radius: 50%;
    margin-left: 20px;
}

.container{
    width: 100%;
    height: 100%;
    display: flex;
    padding: 1.5em;
}
/*inputs*/
.input-file{
    width:100%;
    background-color: white;
}

textarea fieldset {
    width:100%;

}

/*Style table*/

.master-table {
    overflow-y: scroll;
    width: 100%;
    height:68.5%;
}
.tabela {
    border: 1px solid #BCB3B3 !important;
    text-align: center;
    color: #737373;
    font-family: 'Montserrat', sans-serif;
    background-color: white;
    font-weight: normal;
}
table tbody td:first-child {
    width: 5%;
    font-weight:bolder ;
}

table tbody td:nth-child(2){
    max-width: 200px;
    white-space: nowrap;
    overflow:hidden;
    text-overflow: ellipsis;
}

#tdcomlink {
    background-color: #FFB700;
    width:5%;
}

#tdcomlink:hover{
    cursor: pointer;
}

/*Style Modal*/

div.modal-dialog {
    max-width:960px;
    font-family: 'Montserrat', sans-serif;
}

div.modal-content {
    background-color: #EBEBEB;
}
div.modal-content.row {
    align-items: flex-end;
    justify-content: space-between;
}

div#esp {
    margin-top: 271px;
    margin-left: 147px;
}
textarea  {
    width:100%;

}
#msgdel {
    text-align: center;
    font-size: 40px;
    font-weight: bolder;
}
/*Buttons*/
.btn-registrar{
    margin-bottom: 0;
    width:100%;
    padding: 5px 5px;
    background-color: #AB0045;
    color: white;
    border-radius: 3px;
    font-family: 'Montserrat', sans-serif;
    font-weight: bolder;
    border-style: none;
    font-size: 20px;

}

.btn-registrar:hover{
    background-color: #9a0045;
    transition: 300ms;
}

.btn-registrar.btn-cancelar{
    background-color:#FFB600!important;
    align-items: flex-end;
}

.btn-cancelar:hover{
    background-color: #dd9700 !important;
    transition: 300ms!important;
}
.disc{
    width:100%;
}
.imgicon{
    /* height:80%;
    width:80%; */
    background-color: #FFB700;
}

.divimg{
    background-color: darkblue;
}

#btn-anot-modal{
    width: 100%;
}

.titulo{
    color: #090B2E;
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

.nomeCol{
    color: #737373;
}

.textarea{
    resize: none;
    border: none !important;
    border-style: none !important;
    background-color: #EBEBEB;
}

.botao{
    background-color: #AB0045 !important;
    border-style: none !important;
    width: 25.9em !important;
    border-radius: 2px !important;
}

.botaocanc{
    background-color: #FFB700 !important;
    border-style: none !important;
    width: 25.9em !important;
    border-radius: 2px !important;
}

.pointer {
  cursor: pointer;
  background-color: #FFB700 !important
}
</style>
