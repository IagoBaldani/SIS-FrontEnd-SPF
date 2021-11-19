<template>
    <Header/>
    <main>
        <!-- ínicio do formulário -->
        <div class="container-fluid" id="instrutor">
            <div class="row mt-4 justify-content-evenly">
                <div class="div-titulo col-xl-4">
                    <h3 class="fw-bold titulo">Dados do instrutor: </h3>
                </div>
                <div class="col-xl-4"></div>
                <div class="col-xl-2"></div>
            </div>
            <div class="row justify-content-evenly">
                <div class="col-xl-4">
                        <div class="mb-3">
                            <label class="form-label fw-bold mb-0 titulo">Nome</label>
                            <input class="form-control" id="inputNome"  placeholder="Nome" v-model="instrutorForm.nome" type="text" />
                        </div>
                       <div class="mb-3">
                            <label class="form-label fw-bold mb-0 titulo">Contato</label>
                            <input class="form-control" id="inputTelefone" placeholder="(xx)xxxxx-xxxx" v-model="instrutorForm.telefone" type="tel" />
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-bold mb-0 titulo">CPF</label>
                            <input class="form-control" id="inputCpf" placeholder="xxx.xxx.xxx-xx" v-model="instrutorForm.cpf" type="text" />
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-bold mb-0 titulo">Email corporativo</label>
                            <input class="form-control" id="inputEmail" placeholder="nome@email.com" v-model="instrutorForm.email" type="email" />
                        </div>
                </div>
                <div class="col-xl-4">

                </div>
                <div class="col-xl-2">
                </div>
            </div>
            <div class="mt-3 row justify-content-evenly" >
                <div class="col-xl-4">
                   <div for="exampleModal" class="confirmar">
                     <div
                        type="button"
                        class="bt"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                    <button type="button" class="btn submit form-control" >
                        CONFIRMAR
                    </button>
                     </div>
                   </div>
                </div>
                <div class="col-xl-4"></div>
                <div class="col-xl-2"></div>
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
              <h1 class="modal-title form-label fw-bold mb-0 titulo" v-if="instrutorForm.id == ''">
                Deseja confirmar o cadastro?
              </h1>
              <h1 class="modal-title form-label fw-bold mb-0 titulo" v-else>
                Deseja confirmar a edição do instrutor?
              </h1>
            </div>
            <div class="conteudomodal">
              <div class="col-xl-5 mb-3">
                <h2 class="nome">Nome: {{ instrutorForm.nome }}</h2>
                <h2 class="nome">Contato: {{ instrutorForm.telefone }}</h2>
                <h2 class="nome">Cpf: {{ instrutorForm.cpf }}</h2>
                <h2 class="nome">Email corporativo: {{ instrutorForm.email }}</h2>
                
              </div>
              <div class="col-xl-2"></div>
              <div class="col-xl-5 mt-5"></div>
            </div>
          </div>
          <div class="modal-footer border-0 justify-content-around">
            <div>
              <button type="button" class="btn submit-modal" @click="postForm">CONFIRMAR</button>
            </div>
            <div>
              <button type="button" class="btn cancel-modal" data-bs-dismiss="modal">CANCELAR</button>
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
      responseStatus: '',
      instrutor: {},
      instrutorForm: {
        nome: '',
        status: '',
        cpf: '',
        telefone: ''
      }
    }
  },
  beforeMount () {
    Funcoes.verificaToken()
    const dadosUrl = this.pegaDadosUrl()

    if (dadosUrl.tipo == 'edicao') {
      this.getInstrutor(dadosUrl.id)
    } 
  },
  methods: {
    enviarDados () {
      this.instrutorForm.nome = document.querySelector('#inputNome').value
      this.instrutorForm.status = 'ATIVO'
      this.instrutorForm.cpf = document.querySelector('#inputCpf').value
      this.instrutorForm.telefone = document.querySelector('#inputTelefone').value
      this.instrutorForm.email = document.querySelector('#inputEmail').value
    },
    getInstrutor (cpf) {
      http.get(`instrutor/${cpf}`)
        .then(res => {
          this.instrutor = res.data
        })
        .catch(erro => {
          alert(`Erro: ${erro}`)
        })
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
    processaRequisicoes () {
    const dados = this.pegaDadosUrl()
    let cpf = dados.cpf
    let tipo = dados.tipo

    if (tipo == 'edicao') {
      http
        .put(`instrutor/${cpf}`, this.instrutorForm)
        .then(response => {
          window.location.href = 'http://localhost:8080/dados-instrutor-busca'
        })
        .catch(error => {
          alert(error)
        })
    } else if (tipo == 'cadastro') {
      http
        .post('instrutor', this.instrutorForm)
        .then(response => {
          window.location.href = 'http://localhost:8080/dados-instrutor-busca'
        })
        .catch(error => {
          alert(error)
        })
    }
  },
  postForm () {
    http.post('instrutor', this.instrutorForm)
      .then(res => {
        window.location.href = 'http://localhost:8080/dados-instrutor-busca'
      })
      .catch(erro => {
        alert(`Erro: ${erro}`)
      })
   }
  }
  
</script>

<style>
*{
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
    margin: 0;
    padding: 0;
    text-decoration: none;
}

body{
    background-color: #EBEBEB !important;
}
.titulo{
    color: #090B2E;
    font-weight: bold;
}

.secundario{
  font-size: 20px;
}

.subtitulo{
    color: #737373;
}

textarea{
    resize: none !important;
}

.disabledTextInput{
  background-color: #D3CACA !important;
  border: 1px solid #BCB3B3 !important;
}

.modal {
  display: none;
}

button .largura {
  width: 100% !important;
}

.modal-body, .modal-header, .modal-footer {
    text-align: center;
    background-color: var(--color-background-screen);
}

.modal-title {
  margin-left: 75px;
}

.modal-body{
  min-height: 55vh;
  flex-direction: column;
  width: 100%;
}

.submit-modal, .cancel-modal{
    color: white !important;
    font-weight: bold !important;
    border-radius: 5px !important;
    width: 350px;
    height: 50px;
    font-size: 25px !important;
}

.submit, .submit-modal{
    color: white !important;
    font-weight: bold !important;
    background-color: #AB0045 !important;
}

.cancel, .cancel-modal{
    color: white !important;
    font-weight: bold !important;
    background-color: #FFB700 !important;
}

.conteudomodal {
  display: block;
  text-align: left;
  margin-left: 100px;
  color: var(--color-blue-footer) !important;
}

.input-arquivo{
    display: none;
}

.modal-content{
    height: 80vh !important;
}

.ativo, .inativo{
  margin-left: 1em;
}

.ativo{
  color: green;
}
.inativo{
  color: darkred;
}

.rounded-circle{
  width:150px;
}

@media (max-width: 1200px) {
    .editar{
        margin-bottom: 3em;
    }
}

</style>
