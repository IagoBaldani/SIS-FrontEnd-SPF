<template>
    <Header link="../dados-instrutor-busca"/>
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
                            <input class="form-control" id="inputNome"  placeholder="Nome" v-model="instrutor.nome" type="text" />
                            <p id="erroNome" class="none erro">Por favor, preencha este campo</p>
                        </div>
                       <div class="mb-3">
                            <label class="form-label fw-bold mb-0 titulo">Contato</label>
                            <input class="form-control" id="inputTelefone" placeholder="(xx)xxxxx-xxxx" v-mask="['(##) # ####-####']" v-model="instrutor.telefone" type="tel" />
                            <p id="erroContato" class="none erro">Por favor, preencha este campo</p>
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-bold mb-0 titulo">CPF</label>
                            <input class="form-control" id="inputCpf" placeholder="xxx.xxx.xxx-xx" v-mask="['###.###.###-##']" disabled v-model="instrutor.cpf" type="text" />
                            <p id="erroCpf" class="none erro">Por favor, preencha este campo</p>
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-bold mb-0 titulo">Email corporativo</label>
                            <input class="form-control" id="inputEmail" placeholder="nome@email.com" v-model="instrutor.email" type="email" />
                            <p id="erroEmail" class="none erro">Por favor, preencha este campo</p>
                            <p id="erroEmailInvalido" class="none erro">Por favor, insira um e-mail válido</p>
                        </div>
                </div>
                <div class="col-xl-4">
                  <p id="invisivel" data-bs-toggle="modal"
                    data-bs-target="#exampleModal" @click="enviarDados()"></p>
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
                        @click.prevent="enviarDados()"
                        
                      >
                    <button type="button" v-on:click="validaForm()" class="btn submit form-control" >
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
              <button type="button" class="btn submit-modal" @click="processaRequisicoes()">CONFIRMAR</button>
            </div>
            <div>
              <button type="button" class="btn cancel-modal" data-bs-dismiss="modal">CANCELAR</button>
            </div>
          </div>
        </div>
      </div>
    </div>

     <!-- Modal de confirmação -->
  <p class="none" id="abreModalInvisivel" data-bs-toggle="modal" data-bs-target="#modalConfirmacao" ></p>
    <div class="modal fade mt-5"  id="modalConfirmacao" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-size">
            <div class="modal-content p-5 grey-background">
                <div class="row mb-5">
                    <div class="col">
                        <h3 class="modal-title fw-bold titulo text-center" id="exampleModalLabel">Alteração Efetuada com sucesso</h3>
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
import { mask } from 'vue-the-mask'

export default {
  directives: { mask },
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
        telefone: '',
        status: ''
      },
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
    }
  },
  beforeMount () {
    Funcoes.verificaToken()

    const dadosUrl = this.pegaDadosUrl()
    let id = dadosUrl.id
    let tipo = dadosUrl.tipo

    if (tipo == 'edicao') {
      this.getInstrutor(dadosUrl.id)
    }
  },
  methods: {
    enviarDados () {
      this.instrutorForm.nome = document.querySelector('#inputNome').value
      this.instrutorForm.cpf = document.getElementById('inputCpf').value
      this.instrutorForm.telefone = document.querySelector('#inputTelefone').value
      this.instrutorForm.email = document.querySelector('#inputEmail').value
    },
    getInstrutor (cpf) {
      http.get(`instrutor/${cpf}`)
        .then(res => {
          this.instrutor = res.data
        })
        .catch(erro => {
          console.log(`Erro: ${erro}`)
        })
    },
    abrirModal () {
      document.getElementById('abreModalInvisivel').click()
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
    validaForm () {
      var nome = document.getElementById('inputNome').value
      var contato = document.getElementById('inputTelefone').value
      var email = document.getElementById('inputEmail').value
      let erro = 0
      if (nome == '') {
        document.querySelector('#erroNome').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroNome').classList.add('none')
      }
      if (contato == '') {
        document.querySelector('#erroContato').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroContato').classList.add('none')
      }
      if (email == '') {
        document.querySelector('#erroEmail').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroEmail').classList.add('none')
      }
      if (!this.reg.test(email)) {
        erro = 1
        document.querySelector('#erroEmailInvalido').classList.remove('none')
      } else {
        document.querySelector('#erroEmailInvalido').classList.add('none')
      }
      if (erro == 1) {
        return false
      } else {
        document.getElementById('invisivel').click()
      }
    },
    processaRequisicoes () {
      const dados = this.pegaDadosUrl()
      let cpf = dados.id
      let tipo = dados.tipo
      this.instrutorForm.status = this.instrutor.status
      if (tipo == 'edicao') {
        console.log(this.instrutorForm.cpf)
        http
          .put(`instrutor/altera/${cpf}`, this.instrutorForm)
          .then(response => {
            this.abrirModal()
            setTimeout(function () {
              window.location.href = 'http://localhost:8080/dados-instrutor-busca'
            }, 1521)
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        http
          .post('instrutor', this.instrutorForm)
          .then(response => {
            this.abrirModal()
             setTimeout(function () {
            window.location.href = 'http://localhost:8080/dados-instrutor-busca'
          },1521)
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
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

.erro {
  color: red;
  font-weight: bold;
}

.none {
  display: none;
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
.modal-size {
    height:25px  !important;
    width: 801px !important;
    max-width: 801px !important;
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
