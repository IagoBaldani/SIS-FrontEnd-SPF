<template>
  <Header />
  <main>
    <!-- ínicio do formulário -->
  <form>
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
          <fieldset>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo">Nome</label>
              <input id="participanteNome"
                class="form-control disabledTextInput"
                v-bind:value="participante.nome"
                type="text" 
              />
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo">CPF</label>
              <input id="participanteCpf" disabled
                class="form-control disabledTextInput"
                v-bind:value="participante.cpf"
                type="text"
              />
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo">Contato</label>
              <input id="participanteTelefone"
                class="form-control disabledTextInput"
                v-bind:value="participante.telefone"
                type="tel"
              />
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo">Email corporativo</label>
              <input required  v-bind:value="participante.email" class="form-control" type="email" id="participanteEmail">
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo"
                >Fonte recrutamento</label
              >
              <input id="participanteFonteRecrutamento"
                class="form-control disabledTextInput"
                v-bind:value="participante.fonteRecrutamento"
                type="text"
              />
            </div>
            <!-- <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo"
                >Nota na prova de lógica</label
              >
              <input disabled
                class="form-control disabledTextInput"
                v-bind:value="participante.testeLogico"
                type="number"
                min="0"
                max="10"
            </div> --> 
            <div class="mb-3">
                            <label class="form-label fw-bold h5 titulo">TCE</label>
                            <input id="file" @change="formatoUpload()" class="none"  type="file" accept="application/pdf"/>
                            <label for="file" class="btn-file d-flex justify-content-between">
                                <div class="w-100">
                                    <img src="@/assets/imgs/upload.svg" class="upload-img"/>
                                    <div class= "d-inline-block w-75">
                                        <p id="nome-arquivo" class="ellipsis-overflow mb-0 ">Faça upload do TCE</p>
                                    </div>
                                </div>
                            </label>
                        </div>
                        <!-- <label class="form-label fw-bold h5 titulo mb-2">DISC</label>
                        <div class="input-group">
                            
                             <input type="file" class="form-control mb-3" id="fileDisc" 
                             accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
                        </div> -->
            <!-- <div class="mb-3"> 
              <label class="form-label fw-bold mb-0 titulo">TCE</label><br />
              <a href="#"
                ><img
                  src="@/assets/imgs/file_download_black_24dp.svg"
                  alt=""
                />tce.xls</a
              >
            </div>  -->
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo"
                >Instituição de Ensino</label
              >
              <input id="participanteNomeFaculdade"
                class="form-control disabledTextInput"
                v-bind:value="participante.nmFaculdade"
                type="text"
              />
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo">Curso</label>
              <input id="participanteCurso"
                class="form-control disabledTextInput"
                v-bind:value="participante.curso"
                type="text"
              />
            </div>
        <div class="col-xl-4">
         <button 
            type="button"
            class="btn submit form-control"
            v-on:click="processaRequisicoes()"
            id="ativarParticipante">
              SALVAR
          </button>
        </div>
        <div class="col-xl-2"></div>
          </fieldset>
        </div>
        <div class="col-xl-4">
          <fieldset >
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo"
                >Término da graduação</label
              >
              <input id="participanteDataFimGraduacao"
                class="form-control disabledTextInput"
                v-bind:value="participante.dataFimGraduacao"
                type="date"
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
              />
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo">Observação</label>
              <textarea id="participanteObservacao"
                class="form-control disabledTextInput"
                cols="20"
                rows="10"
                v-bind:value="participante.observacao"
              ></textarea>
            </div>
          </fieldset>
        </div>
        <div class="col-xl-2">
          <fieldset >
            <div class="text-center text-md-left">
            </div>
          </fieldset>
        </div>
      </div>
    </div>  
  </form>  
    <!-- fim do formulário -->
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
      participante: {},
      id: '',
      cpfFormatado: '',
      atualizaStatusForm: {
        nome: '',
        cpf: '',
        telefone: '',
        fonteRecrutamento: '',
        nmFaculdade: '',
        curso: '',
        dataFimGraduacao: '',
        observacao: '',
        email: ''
      },
      todasFormacoes: [],
      turmasProgramaCandidato: []
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
          console.log(this.participante = response.data)
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
    formataDataParaEnviar (data) {
      const dataPreForm = new Date(data)
      const dataFormatada = `${dataPreForm.getUTCFullYear()}-${dataPreForm.getUTCMonth() + 1}-${dataPreForm.getUTCDate()}`
      return dataFormatada
    },
    processaRequisicoes () {
      var formData = new FormData() 
      var comprovanteRematricula = document.getElementById('file').files[0] 
      this.atualizaStatusForm.nome = document.getElementById('participanteNome').value
      this.atualizaStatusForm.cpf = this.participante.cpf
      this.atualizaStatusForm.telefone = document.getElementById('participanteTelefone').value
      this.atualizaStatusForm.fonteRecrutamento = document.getElementById('participanteFonteRecrutamento').value
      this.atualizaStatusForm.nmFaculdade = document.getElementById('participanteNomeFaculdade').value
      this.atualizaStatusForm.curso = document.getElementById('participanteCurso').value
      this.atualizaStatusForm.dataFimGraduacao = document.getElementById('participanteDataFimGraduacao').value
      this.atualizaStatusForm.observacao = document.getElementById('participanteObservacao').value
      this.atualizaStatusForm.email = document.getElementById('participanteEmail').value
      formData.append('nome', this.atualizaStatusForm.nome)
      formData.append('cpf', this.atualizaStatusForm.cpf)
      formData.append('telefone', this.atualizaStatusForm.telefone)
      formData.append('fonteRecrutamento', this.atualizaStatusForm.fonteRecrutamento)
      formData.append('nmFaculdade', this.atualizaStatusForm.nmFaculdade)
      formData.append('curso', this.atualizaStatusForm.curso)
      formData.append('dataFimGraduacao', this.atualizaStatusForm.dataFimGraduacao)
      formData.append('observacao', this.atualizaStatusForm.observacao)
      formData.append('email', this.atualizaStatusForm.email)
      formData.append('tce', comprovanteRematricula)     
      http
        .put('participante/atualizaParticipante', formData, {
          headers: {
            'Content-Type': 'multipart/form-data' 
          }
        })
        .then(response => {
          window.location.href = 'http://localhost:8080/dados-participante-busca'
        })
        .catch(error => {
          console.log(error)
        })
    },
    formataCpfparaMostrar (cpf) {
      return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    },
    formatoUpload () {
      var texto = document.querySelector('#nome-arquivo')
      let file = document.getElementById('file')
      if (file.files.length == 0) {
        texto.textContent = 'Faça upload do comprovante'
      } else {
        texto.textContent = file.files[0].name
      }
    }
    // validaEmail (email) {
    //   var regex = (/^([a-zA-Z0-9_.+-])+\'@'(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/)
    //   return regex.test(email)
    // }
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
  width: 100% !important;
  height: 50px !important;
}

.inativo {
  color: darkred;
}

.subtitulo {
  color: #737373;
}

/* .disabledTextInput {
  background-color: #d3caca !important;
  border: 1px solid #bcb3b3 !important;
} */

.form-control {
  color: #737373 !important;
}

textarea {
  resize: none !important;
  height: 200px !important;
}

.download {
  transform: rotate(180deg) !important;
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
.btnSalvar{
  height: 49px;
  width: 100% !important;
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

.upload-img {
    vertical-align: top; padding-top: 3px; margin-right: 1em;
    width: 13px
}

.none {
    display: none;
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

@media (max-width: 1200px) {
  .rounded-circle {
    margin-bottom: 3em;
  }
}
</style>
