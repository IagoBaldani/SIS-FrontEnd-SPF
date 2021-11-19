<template>
    <Header/>
    <main>
        <div class="container-fluid">
            <div class="row justify-content-evenly mt-5 mb-3">
                <div class="titulo col-lg-4">
                    <h3 class="fw-bold" @click="teste()">Registrar ciclo final:</h3>
                </div>
                <div class="col-lg-7 d-flex justify-content-center align-items-center">
                    <div class="d-block justify-content-center">
                        <h4 class="fw-bold text-center titulo">Participante selecionado:</h4>
                        <h4 class="fw-bold grey-font text-center">{{participante.nome}}</h4>
                    </div>
                </div>
            </div>
            <div class="row justify-content-evenly">
                <div class="col-lg-4">
                    <form>
                        <fieldset class="mb-3">
                            <legend class="form-label fw-bold h5 titulo">Resultado (Efetivado)</legend>
                            <div class="radio-item">
                                <input type="radio" name="reajuste" value="EFETIVADO" id="sim" class="me-2" v-model="form.resultado">
                                <label for="sim" class="me-5">Sim</label>
                            </div>
                            <div class="radio-item">
                                <input type="radio" name="reajuste" value="NAO_EFETIVADO" id="nao" class="me-2" v-model="form.resultado">
                                <label for="nao" class="option">Não</label>
                            </div>
                        </fieldset>
                        <div class="mb-3">
                            <label for="data-alteracao" class="form-label fw-bold h5 titulo">Data</label>
                            <input type="date" class="form-control" id="data-alteracao" v-model="form.dataAlteracao">
                        </div>
                        <div class="mb-3">
                            <label id="menes" for="cargo-efetivado" class="form-label fw-bold h5 titulo">Cargo efetivado</label>
                            <input type="text" class="form-control" id="cargo-efetivado" placeholder="Analista Desenvolvedor Java" v-model="form.cargoEfetivado">
                        </div>
                    </form>
                </div>
                <div class="col-lg-7 d-flex flex-column justify-content-between">
                    <form>
                        <div class="mb-3">
                            <label for="file" class="form-label fw-bold h5 titulo">Comprovante de rematrícula/conclusão</label>
                            <input id="file" @change="formatoUpload()" type="file" accept="application/pdf" class="none" />
                            <label for="file" class="btn-file d-flex justify-content-between">
                                <div class="w-100">
                                    <img src="@/assets/imgs/upload.svg"
                                    class="upload-img"/>
                                    <div class= "d-inline-block w-75" >
                                        <p id="nome-arquivo" class="ellipsis-overflow mb-0">Faça upload do comprovante</p>
                                    </div>
                                </div>
                                <div id="btn-close" class="clear-file none">X</div>
                            </label>
                        </div>
                        <div class="mb-3">
                            <label for="observacoes"  class="form-label fw-bold h5 titulo">Observações</label>
                            <textarea class="form-control h-113px" id="observacoes" v-model="form.campoObservacao" ></textarea>
                        </div>
                    </form>
                </div>
            </div>
            <div class="row justify-content-evenly">
                <div class="col-lg-4"></div>
                <div class="col-lg-7 d-flex justify-content-end">
                    <button type="submit" class="btn btn-danger sis-red-btn fw-bold fs-5 mt-3 w-50" @click="teste()">REGISTRAR</button>
                    <p id="abreModal" data-bs-toggle="modal" data-bs-target="#modalUltimoCiclo" class="none"></p>
                </div>
            </div>
            <div class="row justify-content-evenly">
                <div class="col-lg-4"></div>
                <div class="col-lg-7 d-flex justify-content-end">
                    <p class="erro h4 none mt-3" id="preencha">Preencha todos os campos!</p>
                </div>
            </div>
        </div>
    </main>

    <div class="modal fade" id="modalUltimoCiclo" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-size">
            <div class="modal-content p-5 grey-background">
                <div class="row mb-5">
                    <div class="col">
                        <h2 class="modal-title fw-bold titulo" id="exampleModalLabel">Deseja confirmar conclusão de ciclo?</h2>
                    </div>
                </div>
                <div class="row mb-5">
                    <div class="col-lg-7">
                        <div class="mb-4">
                            <h4 class="fw-bold titulo">Reajuste salarial</h4>
                            <p class="grey-font h4">{{ form.resultado }}</p>
                        </div>
                        <div class="mb-4">
                            <h4 class="fw-bold titulo">Data da alteração</h4>
                            <p class="grey-font h4">{{formataDataParaMostrar(form.dataAlteracao)}}</p>
                        </div>
                    </div>
                    <div class="col-lg-5">
                        <div class="mb-4">
                            <h4 class="fw-bold titulo">Comprovante de rematrícula/ conclusão</h4>
                            <p class="grey-font h4 text-decoration-underline" @click="download()">comprovante.pdf</p>
                        </div>
                    </div>
                </div>
                <div class="row mb-2 mt-5">
                    <div class="col-lg-12">
                        <h4 class="fw-bold font-red">Obs: Conclusões de ciclos não podem ser desfeitas</h4>
                    </div>
                </div>
                <div class="row d-flex">
                    <div class="col-lg-6">
                        <button @click="postForm()"  type="submit" class="btn btn-danger sis-red-btn fw-bold fs-5 mt-3 w-100">CONFIRMAR</button>
                    </div>
                    <div class="col-lg-6">
                        <button type="submit" data-bs-toggle="modal" class="btn btn-warning sis-yellow-btn fw-bold fs-5 mt-3 w-100">CANCELAR</button>
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
      participante: {},

      form: {
        resultado: '',
        dataAlteracao: '',
        cargoEfetivado: '',
        comprovante: '',
        campoObservacao: ''
      },
      id: {}
    }
  },

  beforeMount () {
    this.id = this.pegaDadosUrl().id
    this.getParticipanteNome()
    Funcoes.verificaToken()
  },

  methods: {
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

    postForm () {
      var formData = new FormData()
      var comprovanteRematricula = document.getElementById('file').files[0] 
      formData.append('resultado', this.form.resultado)
      formData.append('dataAlteracao', this.form.dataAlteracao)
      formData.append('cargoEfetivado', this.form.cargoEfetivado)
      formData.append('comprovante', comprovanteRematricula)
      formData.append('campoObservacao', this.form.campoObservacao)
      http
        .post(`ciclo/registrociclofinal/${this.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data' 
          }
        })
        .then((response) => {
          this.form = {}
        })
        .catch((error) => {
          console.log(error)
        })
      location.href = `../acompanhamento-ciclo/App.vue?id=${this.id}`  
    },

    carregaModal (conclusao) {
      this.conclusaoModal = conclusao
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

    formatoUpload () {
      var texto = document.querySelector('#nome-arquivo')
      let file = document.getElementById('file')
      if (file.files.length == 0) {
        texto.textContent = 'Faça upload do comprovante'
      } else {
        texto.textContent = file.files[0].name
      }
    },

    download () {
      location.href = `http://localhost:8081/api/ciclo/download/${this.conclusaoModal.id}`
    },

    teste () {
      let campos = document.querySelectorAll('input')
      let campoVazio = 0
      campos.forEach(element => {
        if (!element.value) {
          campoVazio = 1
        }
      })
      if (campoVazio == 0) {
        document.querySelector('#preencha').classList.add('none')
        document.getElementById('abreModal').click()
      } else {
        document.querySelector('#preencha').classList.remove('none')
      }     
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

.h-113px {
    height: 113px;
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
