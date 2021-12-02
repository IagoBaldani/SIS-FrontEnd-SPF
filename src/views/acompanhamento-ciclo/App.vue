<template>
    <Header/>
    <main>
        <div class="container-fluid">

            <!-- LINHA SUPERIOR DA PÁG. (TÍTULO E PARTICIPANTE)-->
            <div class="row justify-content-evenly mt-5 mb-3">
                <div class="titulo col-lg-4">
                    <h3 class="fw-bold titulo">Registrar conclusão de ciclo:</h3>
                </div>
                <div class="col-lg-7 d-flex justify-content-center align-items-center">
                    <div class="d-block justify-content-center">
                        <h4 class="fw-bold text-center titulo">Participante selecionado:</h4>
                        <h4 class="fw-bold grey-font text-center">{{ participante.nome }}</h4>
                    </div>
                </div>
            </div>
            <!-- LINHA DE BAIXO (FORMULÁRIO, TABELA E BOTÕES) -->
            <div class="row justify-content-evenly">
                <div class="col-lg-4">
                    <form>
                        <fieldset class="mb-3">
                            <legend class="form-label fw-bold h5 titulo">Resultado (Reajuste salarial)</legend>
                            <div class="radio-item">
                                <input type="radio"  name="reajuste" value="REAJUSTE_SALARIO" id="sim" class="me-2 " v-model="form.resultado">
                                <label for="sim"  class="me-5">Sim</label>
                            </div>
                            <div class="radio-item">
                                <input type="radio" checked name="reajuste" value="NAO_REAJUSTE_SALARIO" id="nao" v-model="form.resultado" class="me-2">
                                <label for="nao" class="option">Não</label>
                            </div>
                        </fieldset>
                        <div class="mb-3">
                            <label for="data-alteracao" class="form-label fw-bold h5 titulo">Data da alteração</label>
                            <input type="date" class="form-control" id="data-alteracao" v-model="form.dataAlteracao">
                        </div>
                        <div class="mb-3">
                            <label for="cargo" class="form-label fw-bold h5 titulo">Cargo</label>
                            <select class="form-select" id="filtro-programa" v-model="form.cargo">
                                <!--<option value="0" id="cargo" selected disabled>Selecione o Cargo</option>-->
                                <option :value="cargo.cargo" v-for="cargo in cargos" :key="cargo.id">{{ cargo.cargo }}</option>
                            </select>
                        </div>

                        <div class="mb-3">
                            <label class="form-label fw-bold h5 titulo">Comprovante de rematrícula/conclusão</label>
                            <input id="file" @change="formatoUpload()" class="none"  type="file" accept="application/pdf"/>
                            <label for="file" class="btn-file d-flex justify-content-between">
                                <div class="w-100">
                                    <img src="@/assets/imgs/upload.svg" class="upload-img"/>
                                    <div class= "d-inline-block w-75">
                                        <p id="nome-arquivo" class="ellipsis-overflow mb-0 titulo">Faça upload do comprovante</p>
                                    </div>
                                </div>
                                <div id="btn-close" class="clear-file none">X</div>
                            </label>

                        </div>
                        <button type="button" @click="postForm()"
                            class="btn btn-danger sis-red-btn mt-5 mb-5 fw-bold fs-5 w-100">REGISTRAR</button>
                        <p class="none h4" id="aguarde">Enviando formulário, aguarde...</p>
                        <p class="none h4 enviado" id="enviado">Formulário enviado</p>
                        <p class="erro h4 none" id="preencha">Preencha todos os campos!</p>
                    </form>
                </div>
                <div class="col-lg-7 d-flex flex-column align-items-end mb-3 div-tabela justify-content-between">

                    <table class="table table-bordered tabela">
                        <thead>
                            <tr>
                                <th scope="col" class="w-10 titulo">N°</th>
                                <th scope="col" class="w-25 titulo">Data do registro</th>
                                <th scope="col" colspan="2" class="titulo">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(conclusao, index) in conclusoes" v-bind:key="conclusao">
                                <th scope="row" class="titulo">{{++index}}</th>
                                <td>{{formataDataParaMostrar(conclusao.dataRegistro)}}</td>
                                <td>{{conclusao.status}}</td>
                                <td @click="carregaModal(conclusao, index)" class="eye" width="37px" data-bs-toggle="modal" data-bs-target="#modalCiclo">
                                    <img src="@/assets/imgs/visibility_white_24dp.svg" class="eye-img">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <a :href="'../acompanhamento-ciclo-final?id=' + id" class="w-50">
                    <button type="button" class="btn btn-warning sis-yellow-btn fw-bold fs-5 w-100">REGISTRAR ÚLTIMO
                        CICLO</button></a>
                </div>
            </div>
        </div>
    </main>

    <!--  MODAL  -->

    <div class="modal fade" id="modalCiclo" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-size">
            <div class="modal-content p-5 grey-background">
                <div class="row mb-5">
                    <div class="col">
                        <h2 class="modal-title fw-bold titulo " id="exampleModalLabel">Conclusão de ciclo: {{ indiceModal }}</h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-7">
                        <div class="mb-4">
                            <h4 class="fw-bold titulo">Reajuste salarial:</h4>
                            <p class="grey-font h4">{{(conclusaoModal.resultado == 'REAJUSTE_SALARIO') ? 'Sim' : 'Não'}}</p>
                        </div>
                        <div class="mb-4">
                            <h4 class="fw-bold titulo">Comprovante de rematrícula/conclusão:</h4>
                            <p  class="grey-font h4 text-decoration-underline pointer" @click="download()">comprovante.pdf</p>
                        </div>
                        <div class="mb-4" v-if="conclusaoModal.status == 'PROGRESSIVA'" >
                            <h4 class="fw-bold titulo">Cargo:</h4>
                            <p class="grey-font h4">{{conclusaoModal.cargoPrograma}}</p>
                        </div>
                    </div>
                    <div class="col-lg-5">
                        <div class="mb-4">
                            <h4 class="fw-bold titulo">Status:</h4>
                            <p class="grey-font h4">{{(conclusaoModal.status == 'PROGRESSIVA') ? 'Progressiva' : 'Final'}}</p>
                        </div>
                        <div class="mb-4">
                            <h4 class="fw-bold titulo">Data da alteração:</h4>
                            <p class="grey-font h4">{{formataDataParaMostrar(conclusaoModal.dataRegistro)}}</p>
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
      conclusoes: [], // Array de conclusão, usado para receber as informações do getConclusoes 
      cargos: [], //  popula o comboBox para selecionar o cargo do participante
      conclusaoModal: '', // objeto usado para popular o modal com as informações selecionadas
      id: {}, 
      participante: {}, // objeto para salvar as informações do participante.

      form: { // objeto para usar no Body para enviar as requisições. 
        resultado: 'NAO_REAJUSTE_SALARIO',
        dataAlteracao: '',
        cargo: '',
        comprovante: ''
      },
      indiceModal: {}
    }
  },

  beforeMount () {
    this.id = this.pegaDadosUrl().id
    this.getParticipanteNome()
    this.getCiclo()
    this.getCargos()
    Funcoes.verificaToken()
  },

  methods: {
    // faz o get no back-end para rertornar as informações do participante.
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
    // retorna os cargos adicionados no baanco de dados.
    getCargos () {
      http 
        .get('remuneracao/lista')
        .then((response) => {
          this.cargos = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // retorna os ciclos anteriores do participante caso exista
    getCiclo () {
      http
        .get(`ciclo/${this.id}`)
        .then((response) => {
          this.conclusoes = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // faz a requisição do tipo POST e envia o FormData no body.
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
        var formData = new FormData()
        var comprovanteRematricula = document.getElementById('file').files[0] 
        formData.append('resultado', this.form.resultado)
        formData.append('dataAlteracao', this.form.dataAlteracao)
        formData.append('cargo', this.form.cargo)
        formData.append('comprovante', comprovanteRematricula)
        http
          .post(`ciclo/registrocicloprogressivo/${this.id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data' // cabeçalho especifico para formulário que contém arquivos no body.
            }
          })
          .then((response) => {
            this.getCiclo()
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
    // carrega o modal com as informações dos ciclos, e cria a tabela com os indices corretos.
    carregaModal (conclusao, index) {
      this.conclusaoModal = conclusao
      this.indiceModal = index
    },
    // formata a data para exibir corretamente no formato dd/MM/yyyy
    formataDataParaMostrar (data) {
      const dataPreForm = new Date(data)
      const dataFormatada = `${dataPreForm.getUTCDate()}/${dataPreForm.getUTCMonth() + 1}/${dataPreForm.getUTCFullYear()}`

      return dataFormatada
    },
    // é usada para capturar as informações na url para ser passada nas requisições
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
    // captura o arquivo no input 
    formatoUpload () {
      var texto = document.querySelector('#nome-arquivo')
      let file = document.getElementById('file')
      if (file.files.length == 0) {
        texto.textContent = 'Faça upload do comprovante'
      } else {
        texto.textContent = file.files[0].name
      }
    },
    // Endereço da API para fazer download do arquivo.
    download () {
      location.href = `http://localhost:8081/api/ciclo/download/${this.conclusaoModal.id}`
    }
  }
}
</script>

<style scoped>
/* body{
    background-color: #EBEBEB !important;
} */

.grey-background {
    background-color: #EBEBEB;
}

.container{
    width: 100%;
    height: 100%;
    display: flex;
    padding: 1.5em;
}

.div-tabela {
    height: 425px;
}

.tabela{
    text-align: center;
    background-color: white;
    width: 100%;
    line-height: 1.3rem;
    color: #666666 !important;
    font-weight: 500;
    vertical-align: middle !important;
}

.tabela td, .tabela th {
    border: 1px solid #bcb3b3 !important;
}

.w-10 {
    width: 10%;
}

.w-50px {
    width: 50px;
}

/* main */

.perfil-img {
    height: 80px;
    border-radius: 50%;
    margin-left: 20px;
}

.grey-font {
    color:  #737373;
}

.radio-item {
  display: inline-block;
  position: relative;
  padding: 0 6px;

}

.radio-item input[type='radio'] {
  display: none;
}

.radio-item label {
  color: #090B2E;
  font-weight: normal;
}

.radio-item label:before {
  content: " ";
  display: inline-block;
  position: relative;
  top: 5px;
  margin: 0 5px 0 0;
  width: 20px;
  height: 20px;
  border-radius: 3px;
  border: 1px solid #666;
  background-color: white;
}

.radio-item label:hover {
    cursor: pointer;
}

.radio-item input[type=radio]:checked + label:after {
  border-radius: 0;
  width: 0;
  height: 0;
  position: absolute;
  top: -5px;
  left: 9px;
  content: "x";
  font-size: 25px;
  font-weight: 500;
  display: block;
}

.btn-file {
    background: #fff;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    color: #737373;
    font-weight: 400 !important;
    cursor: pointer;
    font-weight: bold;
    padding: .375rem .75rem;
    width: 100%;
    height: 38px;
}

.upload-img {
    vertical-align: top; padding-top: 3px; margin-right: 1em;
    width: 13px
}

.ellipsis-overflow {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.clear-file {
    width: 24px;
    text-align: right;
    font-weight: 500;
    border-radius: 50%;
    color: red;
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

.h-198px {
    height: 198px;
}

.sis-red-btn {
    background-color: #AB0045 !important;
    transition:  300ms;
}

.sis-red-btn:hover {
    background-color: #9a0045 !important;
}

.sis-yellow-btn {
    background-color: #FFB700 !important;
    transition: 300ms;
    color: white !important;
}

.sis-yellow-btn:hover {
    background-color: #DD9700 !important;
}

.relative {
    position: relative;
}

.eye {
    padding: 5px !important;
    background-color: #FFB700 !important;
    cursor: pointer;
}

.eye-img {
    width: 1.5em !important;
}

.modal-size {
    width: 1080px !important;
    max-width: 1080px !important;
}

.font-red {
    color: #dc3545;
}

.text-align-left {
    text-align: left;
}

.titulo{
    color: #090B2E;
}

.conteudoModal{
    background-color: #EBEBEB !important;
}

.pointer {
  cursor: pointer;
}
</style>
