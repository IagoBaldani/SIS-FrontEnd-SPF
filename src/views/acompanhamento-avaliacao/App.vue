<template>
    <Header/>
    <main>
        <div class="container-fluid">

            <!-- LINHA SUPERIOR DA PÁG. (TÍTULO E PARTICIPANTE)-->
            <div class="row justify-content-evenly mt-5 mb-3">
                <div class="titulo col-lg-4">
                    <h3 class="fw-bold">Registrar notas das avaliações:</h3>
                </div>
                <div class="col-lg-7 d-flex justify-content-center align-items-center">
                    <div class="d-block justify-content-center">
                        <h4 class="fw-bold text-center titulo">Participante selecionado:</h4>
                        <h4 class="fw-bold grey-font text-center">{{participante.nome}}</h4>
                    </div>
                </div>
            </div>

            <!-- LINHA DE BAIXO (FORMULÁRIO, TABELA E BOTÕES) -->
            <div class="row justify-content-evenly">
                <div class="col-lg-4">
                    <form>
                        <div class="mb-3">
                            <label for="tecnica" class="form-label fw-bold h5 titulo">Técnica</label>
                            <input type="number" class="form-control" id="tecnica" v-model="form.notaTecnica" step=".01" min="0" max="10">
                        </div>
                        <div class="mb-3">
                            <label for="praticas-ageis" class="form-label fw-bold h5 titulo">Módulo práticas ágeis</label>
                            <input type="number" class="form-control" id="praticas-ageis" v-model="form.notaPraticasAgeis" step=".01" min="0.00" max="10.00">
                        </div>
                        <div class="mb-3">
                            <label for="lideranca" class="form-label fw-bold h5 titulo">Módulo liderança</label>
                            <input type="number" class="form-control" id="lideranca" v-model="form.notaLideranca" step=".01" min="0" max="10">
                        </div>
                        <div class="mb-3">
                            <label for="negocios" class="form-label fw-bold h5 titulo">Módulo negócios</label>
                            <input type="number" class="form-control" id="negocios" v-model="form.notaNegocios" step=".01" min="0" max="10">
                        </div>
                        <div class="mb-3">
                            <label for="comportamental" class="form-label fw-bold h5 titulo" >Comportamental</label>
                            <div class="input-group mb-3">
                                <input type="number" disabled class="form-control" 
                                    id="comportamental" aria-label="Recipient's username" aria-describedby="basic-addon2" :value="getMedia().toFixed(2)">
                                <div class="input-group-append">
                                    <button class="btn btn-outline-secondary botao-adc" type="button" 
                                        data-bs-toggle="modal"
                                        data-bs-target="#modalComportamental">+</button>
                                </div>
                            </div>
                        </div>

                        <button type="button" 
                            class="btn btn-danger sis-red-btn mt-3 mb-1 fw-bold fs-5 w-100" @click="verificaForm()">REGISTRAR</button>
                        <p id="verificaCampos" class="none" @click="postForm()"></p>
                        <p class="none h4 mt-3" id="aguarde">Enviando formulário, aguarde...</p>
                        <p class="none h4 enviado mt-3" id="enviado">Formulário enviado</p>
                        <p class="erro h4 none mt-3" id="preencha">Preencha todos os campos!</p>
                    </form>
                </div>
                <div class="col-lg-7 d-flex flex-column align-items-end mb-3 div-tabela justify-content-between">

                    <table class="table table-bordered tabela">

                        <tbody>
                            <tr v-for="(avaliacao, index) in avaliacoes" v-bind:key="avaliacao">
                                <th scope="row" class="w-50px titulo">{{++index}}</th>
                                <td class="text-align-left">Técnica: {{avaliacao.notaTecnica}} | Ágeis {{avaliacao.notaPraticasAgeis}} | Liderança: {{avaliacao.notaLideranca}} | Negócios: {{avaliacao.notaNegocios}} | Comportamental: {{avaliacao.notaComportamental.media}}</td>
                                <td @click="carregaModal(avaliacao, index)" class="eye" width="37px" data-bs-toggle="modal" data-bs-target="#modalDeletar">
                                    <img src="@/assets/imgs/visibility_white_24dp.svg" class="eye-img">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </main>

    <!--  MODAIS  -->

    <div class="modal fade" id="modalDeletar" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-size">
            <div class="modal-content p-5 conteudoModal">
                <div class="row mb-5">
                    <div class="col">
                        <h2 class="modal-title fw-bold titulo" id="exampleModalLabel">Série de avaliações: {{indiceModal}}</h2>
                    </div>
                </div>
                <div class="row mb-5">
                    <div class="col-lg-6">
                        <div class="mb-4">
                            <h4 class="fw-bold titulo">Técnica:</h4>
                            <p class="grey-font h4">{{avaliacaoModal.notaTecnica}}</p>
                        </div>
                        <div class="mb-4">
                            <h4 class="fw-bold titulo">Comportamental:</h4>
                            <div>
                              <p class="grey-font h4 d-inline marginEye">{{modalDesempenho.media}}</p>
                              <button class="btn btn-outline-secondary botao-adc" type="button" 
                                        data-bs-toggle="modal"
                                        data-bs-target="#serievisu" @click="carregaModal(avaliacaoModal)"><img src="@/assets/imgs/visibility_white_24dp.svg"></button>
                            </div>
                        </div>
                      
                        <div class="mb-4">
                            <h4 class="fw-bold titulo">Módulo práticas ágeis:</h4>
                            <p class="grey-font h4">{{avaliacaoModal.notaPraticasAgeis}}</p>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="mb-4">
                            <h4 class="fw-bold titulo">Módulo liderança:</h4>
                            <p class="grey-font h4">{{avaliacaoModal.notaLideranca}}</p>
                        </div>
                        <div class="mb-4">
                            <h4 class="fw-bold titulo">Módulo negócios:</h4>
                            <p class="grey-font h4">{{avaliacaoModal.notaNegocios}}</p>
                        </div>
                    </div>
                </div>
                <div class="row mt-5">
                    <button type="submit" data-bs-toggle="modal" data-bs-target="#modalConfirme"
                            class="btn btn-danger sis-red-btn mt-3  fw-bold fs-5 w-50">DELETAR SÉRIE</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modalConfirme" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-size grey-background">
            <div class="modal-content p-5 conteudoModal ">
                <div class="row mb-5">
                    <div class="col d-flex justify-content-center">
                        <h2 class="modal-title fw-bold titulo" id="exampleModalLabel">Deseja deletar o registro de avaliações?</h2>
                    </div>
                </div>
                <div class="row mb-5">
                    <div class="col-lg-6">
                        <div class="mb-4">
                            <h4 class="fw-bold titulo">Técnica:</h4>
                            <p class="grey-font h4">{{avaliacaoModal.notaTecnica}}</p>
                        </div>
                        <div class="mb-4">
                            <h4 class="fw-bold titulo">Comportamental:</h4>
                            <p class="grey-font h4">{{modalDesempenho.media}}</p>
                        </div>
                        <div class="mb-4">
                            <h4 class="fw-bold titulo">Módulo práticas ágeis:</h4>
                            <p class="grey-font h4">{{avaliacaoModal.notaPraticasAgeis}}</p>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="mb-4">
                            <h4 class="fw-bold titulo">Módulo liderança:</h4>
                            <p class="grey-font h4">{{avaliacaoModal.notaLideranca}}</p>
                        </div>
                        <div class="mb-4">
                            <h4 class="fw-bold titulo">Módulo negócios:</h4>
                            <p class="grey-font h4">{{avaliacaoModal.notaNegocios}}</p>
                        </div>
                    </div>
                </div>
                <div class="row mt-5">
                    <div class="col-lg-6">
                        <button type="submit"
                            class="btn btn-danger sis-red-btn mt-3 fw-bold fs-5 w-100" @click="deleteById()" data-bs-dismiss="modal">CONFIRMAR</button>
                    </div>
                    <div class="col-lg-6">
                        <button type="submit" class="btn btn-warning sis-yellow-btn fw-bold fs-5 mt-3 w-100" data-bs-dismiss="modal">CANCELAR</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modalComportamental" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-size">
            <div class="modal-content p-5 conteudoModal scroll-modal">
                <div class="row mb-5">
                    <div class="col">
                        <h2 class="modal-title fw-bold titulo" id="exampleModalLabel">Teste de desempenho:</h2>
                    </div>
                </div>
                <div class="row mb-3">
                    <form class="col-lg-6">
                        <div class="comboBox w-100 mb-3" id="avaliacao-comportamental">
                            <label class="form-label fw-bold h5 titulo">Avaliação:</label>
                            <select class="form-select" id="inputModal" v-model="form.avaliacaoDesempenhoForm.avaliacao">
                                <option :value="'FORAM_SUPERADAS'">Foram superadas</option>
                                <option :value="'FORAM_ATENDIDAS_PLENAMENTE'">Foram atendidas plenamente</option>
                                <option :value="'FORAM_ATENDIDAS_PARCIALMENTE'">Foram atendidas parcialmente</option>
                                <option :value="'NAO_FORAM_ATENDIDAS'">Não foram atendidas</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="adaptacao" class="form-label fw-bold h5 titulo">Adaptação:</label>
                            <input type="number" class="form-control" id="adaptacao" step=".01" min="0" max="4"
                                v-model="form.avaliacaoDesempenhoForm.adaptacao">
                        </div>
                        <div class="mb-3">
                            <label for="tecnica" class="form-label fw-bold h5 titulo">Capacitação Técnica:</label>
                            <input type="number" class="form-control" id="tecnica" step=".01" min="0" max="4"
                                v-model="form.avaliacaoDesempenhoForm.capTecnica">
                        </div>
                        <div class="mb-3">
                            <label for="aprendizagem" class="form-label fw-bold h5 titulo">Aprendizagem prática:</label>
                            <input type="number" class="form-control" id="aprendizagem" step=".01" min="0" max="4"
                                v-model="form.avaliacaoDesempenhoForm.apPratica">
                        </div>
                        <div class="mb-3">
                            <label for="cooperacao" class="form-label fw-bold h5 titulo">Cooperação:</label>
                            <input type="number" class="form-control" id="cooperacao" step=".01" min="0" max="4"
                                v-model="form.avaliacaoDesempenhoForm.cooperacao">
                        </div>
                        <div class="mb-3">
                            <label for="disciplina" class="form-label fw-bold h5 titulo">Disciplina</label>
                            <input type="number" class="form-control" id="disciplina" step=".01" min="0" max="4"
                                v-model="form.avaliacaoDesempenhoForm.disciplina">
                        </div>
                        <div class="mb-3">
                            <label for="responsabilidade" class="form-label fw-bold h5 titulo">Responsabilidade:</label>
                            <input type="number" class="form-control" id="responsabilidade" step=".01" min="0" max="4"
                                v-model="form.avaliacaoDesempenhoForm.responsabilidade">
                        </div>
                    </form>
                    <form class="col-lg-6">
                        <div class="comboBox w-100 mb-3" id="parecer">
                            <label class="form-label fw-bold h5 titulo">Parecer:</label>
                            <select class="form-select" id="filtro-parecer" v-model="form.avaliacaoDesempenhoForm.parecer">
                                <option :value="'APROVADO'">Aprovado</option>
                                <option :value="'REPROVADO'">Reprovado</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="qualidade" class="form-label fw-bold h5 titulo">Qualidade:</label>
                            <input type="number" class="form-control" id="qualidade" step=".01" min="0" max="4"
                                v-model="form.avaliacaoDesempenhoForm.qualidade">
                        </div>
                        <div class="mb-3">
                            <label for="comunicabilidade" class="form-label fw-bold h5 titulo">Comunicabilidade:</label>
                            <input type="number" class="form-control" id="comunicabilidade" step=".01" min="0" max="4"
                                v-model="form.avaliacaoDesempenhoForm.comunicabilidade">
                        </div>
                        <div class="mb-3">
                            <label for="dedicacao" class="form-label fw-bold h5 titulo">Dedicação:</label>
                            <input type="number" class="form-control" id="dedicacao" step=".01" min="0" max="4"
                                v-model="form.avaliacaoDesempenhoForm.dedicacao">
                        </div>
                        <div class="mb-3">
                            <label for="iniciativa" class="form-label fw-bold h5 titulo">Iniciativa:</label>
                            <input type="number" class="form-control" id="iniciativa" step=".01" min="0" max="4"
                                v-model="form.avaliacaoDesempenhoForm.iniciativa">
                        </div>
                        <div class="mb-3">
                            <label for="organizacao" class="form-label fw-bold h5 titulo">Organização:</label>
                            <input type="number" class="form-control" id="organizacao" step=".01" min="0" max="4"
                                v-model="form.avaliacaoDesempenhoForm.organizacao">
                        </div>
                        <div class="mb-3">
                            <label for="sociabilidade" class="form-label fw-bold h5 titulo">Sociabilidade:</label>
                            <input type="number" class="form-control" id="sociabilidade" step=".01" min="0" max="4"
                                v-model="form.avaliacaoDesempenhoForm.sociabilidade">
                        </div>
                    </form>
                </div>
                <p class="erro h4 none mt-3" id="preenchaModal">Preencha todos os campos!</p>
                <div class="row d-flex">
                    <div class="col-lg-6">
                        <button  type="button" class="btn btn-danger sis-red-btn fw-bold fs-5 mt-3 w-100" @click="verificaFormModal()" >CONFIRMAR</button>
                        <p data-bs-toggle="modal" id="fechaModal" class="none"></p>
                    </div>
                    <div class="col-lg-6">
                        <button type="button" data-bs-toggle="modal" class="btn btn-warning sis-yellow-btn fw-bold fs-5 mt-3 w-100">CANCELAR</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

<!-- MODAL VISUALIZACAO-->
    <div class="modal fade" id="serievisu" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-size">
            <div class="modal-content p-5 conteudoModal scroll-modal">
                <div class="row mb-5">
                    <div class="col">
                        <h2 class="modal-title fw-bold titulo" id="exampleModalLabel">Teste de desempenho:</h2>
                    </div>
                </div>
                <div class="row mb-3">
                    <form class="col-lg-6">
                        <div class="comboBox w-100 mb-3" id="avaliacao-comportamental">
                            <label class="form-label fw-bold h5 titulo">Avaliação: {{modalDesempenho.avaliacao}}</label>
                        <!-- <label class="form-label fw-bold h5 titulo">Avaliação: {{modalDesempenho.avaliacao.replaceAll('_',' ').tolowerCase().toUpperCase(modalDesempenho.avaliacao[0])}}</label> -->
                        </div>
                        <div class="mb-3">
                            <label for="adaptacao" class="form-label fw-bold h5 titulo">Nota Adaptação: {{ modalDesempenho.adaptacao}}</label>
                        </div>
                        <div class="mb-3">
                            <label for="tecnica" class="form-label fw-bold h5 titulo">Nota Capacitação Técnica: {{ modalDesempenho.capTecnica }}</label>
                        </div>
                        <div class="mb-3">
                            <label for="aprendizagem" class="form-label fw-bold h5 titulo">Nota Aprendizagem Prática: {{modalDesempenho.apPratica}}</label>
                        </div>
                        <div class="mb-3">
                            <label for="cooperacao" class="form-label fw-bold h5 titulo">Cooperação: {{modalDesempenho.cooperacao}}</label>
                        </div>
                        <div class="mb-3">
                            <label for="disciplina" class="form-label fw-bold h5 titulo">Disciplina: {{modalDesempenho.disciplina}}</label>
                        </div>
                        <div class="mb-3">
                            <label for="responsabilidade" class="form-label fw-bold h5 titulo">Responsabilidade: {{modalDesempenho.responsabilidade}}</label>
                        </div>
                    </form>
                    <form class="col-lg-6">
                        <div class="comboBox w-100 mb-3" id="parecer">
                        <label class="form-label fw-bold h5 titulo">Parecer: {{modalDesempenho.parecer}} </label>
                        </div>
                        <div class="mb-3">
                            <label for="qualidade" class="form-label fw-bold h5 titulo">Qualidade: {{modalDesempenho.qualidade}}</label>
                        </div>
                        <div class="mb-3">
                            <label for="comunicabilidade" class="form-label fw-bold h5 titulo">Comunicabilidade: {{modalDesempenho.comunicabilidade}}</label>
                        </div>
                        <div class="mb-3">
                            <label for="dedicacao" class="form-label fw-bold h5 titulo">Dedicação: {{modalDesempenho.dedicacao}}</label>
                        </div>
                        <div class="mb-3">
                            <label for="iniciativa" class="form-label fw-bold h5 titulo">Iniciativa: {{modalDesempenho.iniciativa}}</label>
                        </div>
                        <div class="mb-3">
                            <label for="organizacao" class="form-label fw-bold h5 titulo">Organização: {{modalDesempenho.organizacao}}</label>
                        </div>
                        <div class="mb-3">
                            <label for="sociabilidade" class="form-label fw-bold h5 titulo">Sociabilidade: {{modalDesempenho.sociabilidade}}</label>
                        </div>
                    </form>
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
      avaliacoes: [], // Array de avaliações, que é populado com o getAvaliações.
      avaliacaoModal: '', // objeto que é usado para popular os campos do modal.
      participante: {}, // objeto para salvar as informações do participante.
      id: {},
      media: {}, // media das notas do modal, que origina a nota Comportamental.
      form: { // objeto para usar no Body para enviar as requisições. 
        notaTecnica: '',
        notaPraticasAgeis: '',
        notaLideranca: '',
        notaNegocios: '',
        avaliacaoDesempenhoForm: {
          avaliacao: '',
          parecer: '',
          adaptacao: '',
          qualidade: '',
          capTecnica: '',
          comunicabilidade: '',
          apPratica: '',
          dedicacao: '',
          cooperacao: '',
          iniciativa: '',
          disciplina: '',
          organizacao: '',
          responsabilidade: '',
          sociabilidade: ''
        }
      },
      indiceModal: {}, // função para gerar os indices no modal de acordo com a posição na tabela.
      modalDesempenho: {} // // é usado para mostrar o registro especifico que foi escolhido da tabela no modal.
    }
  },

  beforeMount () {
    Funcoes.verificaToken()
    this.id = this.pegaDadosUrl().id
    this.getParticipanteNome()
    this.getAvaliacao()
  },

  methods: {
    carregaModal (avaliacao, index) {
      this.avaliacaoModal = avaliacao
      this.indiceModal = index
      this.modalDesempenho = this.avaliacaoModal.notaComportamental
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
    // faz o get no back-end para rertornar as informações do participante.
    getParticipanteNome () {
      http
        .get(`participante/${this.id}`)
        .then((response) => {
          this.participante = response.data
          console.log(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // faz o get no back-end para exibir as notas anteriores do participante.
    getAvaliacao () {
      http
        .get(`avaliacao/${this.id}`)
        .then((response) => {
          this.avaliacoes = response.data
          console.log(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // requisição do tipo post para enviar as informações obtidas do formulário
    postForm () {
      http
        .post(`avaliacao/novo/${this.id}`, this.form)
        .then((response) => {
          this.getAvaliacao()
          document.querySelector('#aguarde').classList.add('none')
          document.querySelector('#enviado').classList.remove('none')
          setTimeout(function () {
            document.querySelector('#enviado').classList.add('none')
          }, 2000)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // Requisição para deletar um registro.
    deleteById () {
      http
        .delete(`avaliacao/deletar/${this.avaliacaoModal.id}`)
        .then((response) => {
          this.getAvaliacao()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // função para gerar a média dos campos do modal, para exibir a nota comportamental no formulario
    getMedia () {
      this.media = (this.form.avaliacaoDesempenhoForm.qualidade + 
        this.form.avaliacaoDesempenhoForm.adaptacao +
        this.form.avaliacaoDesempenhoForm.capTecnica +
        this.form.avaliacaoDesempenhoForm.comunicabilidade + 
        this.form.avaliacaoDesempenhoForm.apPratica +
        this.form.avaliacaoDesempenhoForm.dedicacao +
        this.form.avaliacaoDesempenhoForm.cooperacao +
        this.form.avaliacaoDesempenhoForm.iniciativa +
        this.form.avaliacaoDesempenhoForm.disciplina + 
        this.form.avaliacaoDesempenhoForm.organizacao +
        this.form.avaliacaoDesempenhoForm.responsabilidade +
        this.form.avaliacaoDesempenhoForm.sociabilidade) / 12
      return this.media
    },
    // verifica os campos do formulário, caso tenha algum vazio um paragrafo aparece para notificar.  
    verificaFormModal () {
      let campos = document.querySelectorAll('#modalComportamental input , #modalComportamental select') 
      let campoVazio = 0
      campos.forEach(element => {
        if (!element.value) {
          campoVazio = 1
        }
      })
      if (campoVazio == 0) {
        this.getMedia()
        document.querySelector('#preenchaModal').classList.add('none')
        document.getElementById('fechaModal').click()
      } else {
        document.querySelector('#preenchaModal').classList.remove('none')
      }  
    },
    // função para ver se existe campo vazio no formulário
    verificaForm () {
      let campos = document.querySelectorAll('input') 
      let campoVazio = 0
      campos.forEach(element => {
        if (!element.value) {
          campoVazio = 1
        }
      })
      if (campoVazio == 0) {
        document.querySelector('#preencha').classList.add('none')
        document.getElementById('verificaCampos').click()
      } else {
        document.querySelector('#preencha').classList.remove('none')
      }  
    }
  }
}
</script>

<style scoped>
/* body {
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

.botao-adc {
  font-size: 2em;
  line-height: .75!important;
  background: #FFB700;
  color: #444444
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

.scroll-modal {
    overflow-y: scroll;
    max-height: 500px;
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

.marginEye {
  margin-right: 157px;
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
