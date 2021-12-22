<template>
  <Header link="../dados-instrutor-busca"/>
  <main>
        <!-- ínicio do formulário -->
        <div class="container-fluid" id="instrutor">
            <div class="row mt-4 justify-content-evenly">
                <div class="div-titulo col-xl-4">
                    <h3 class="fw-bold titulo">Dados do instrutor:</h3>
                </div>
                <div class="col-xl-4"></div>
                <div class="col-xl-2 d-flex justify-content-center">
                    <h2 class="titulo secundario"> Status: <span v-bind:class="(instrutor.status == 'ATIVO')?'ativo':'inativo'"> {{(instrutor.status == 'ATIVO')?'Ativo':'Inativo'}}</span></h2>
                </div>
            </div>
            <fieldset disabled>
                <div class="row justify-content-evenly">
                    <div class="col-xl-4">
                        <div class="mb-3">
                            <label class="form-label fw-bold mb-0 titulo">Nome</label>
                            <input class="form-control disabledTextInput" v-bind:value="instrutor.nome" type="text" disabled>
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-bold mb-0 titulo">Telefone</label>
                            <input class="form-control disabledTextInput"  v-bind:value="instrutor.telefone" v-mask="['(##) # ####-####']" type="tel" disabled >
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-bold mb-0 titulo">CPF</label>
                            <input class="form-control disabledTextInput" v-bind:value="instrutor.cpf" disabled v-mask="['###.###.###-##']" type="text">
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-bold mb-0 titulo">Email corporativo</label>
                            <input class="form-control disabledTextInput" v-bind:value="instrutor.email" type="email" disabled>
                        </div>
                    </div>
                    <div class="col-xl-4">

                    </div>
                      <div class="col-xl-2">
                    </div>
                </div>
            </fieldset>
            <div class="mt-5 row justify-content-evenly">
                <div class="col-xl-4 ">
                    <button v-if="instrutor.status == 'ATIVO'" type="button" class="btn submit form-control" data-bs-toggle="modal"
                        data-bs-target="#exampleModal">
                        INATIVAR INSTRUTOR
                    </button>
                    <button v-else type="button" class="btn submit form-control" data-bs-toggle="modal"
                        data-bs-target="#exampleModal">
                        ATIVAR INSTRUTOR
                    </button>
                    <!--<button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">DESATIVAR PARTICIPANTE</button>-->
                </div>
                <div class="col-xl-4"></div>
                <div class="col-xl-2"></div>
            </div>
        </div>
        <!-- fim do formulário -->
    </main>

    <!-- modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-xl modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body d-flex justify-content-between">
                    <div>
                        <h1 v-if="instrutor.status == 'ATIVO'" class="modal-title form-label fw-bold mb-0 titulo"> Deseja inativar o
                            seguinte instrutor? </h1>

                        <h1 v-else class="modal-title form-label fw-bold mb-0 titulo"> Deseja ativar o
                            seguinte instrutor? </h1>
                    </div>
                    <div class="conteudomodal" id="instrutor-modal">
                        <h2 class="fw-bold subtitulo"> {{instrutor.nome}}</h2>
                    </div>
                </div>
                <div class="modal-footer border-0 justify-content-around">
                    <div>
                        <button type="button" class="btn submit-modal" @click= "alteraStatus">CONFIRMAR</button>
                    </div>
                    <div>
                        <button type="button" class="btn cancel-modal" data-bs-dismiss="modal">CANCELAR</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal de confirmação -->
    <p class="none" id="abreModalInvisivel" data-bs-toggle="modal" data-bs-target="#modalConfirmacao"></p>
    <div class="modal fade mt-5" id="modalConfirmacao" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
</template>

<script>
import Header from '@/components/Header.vue'
import Funcoes from '../../services/Funcoes'
import { http } from '../../services/Config'
import { mask } from 'vue-the-mask'
import { variavel } from '../../services/Variavel'

export default {
  directives: { mask },
  name: 'App',
  components: {
    Header
  },
  data () {
    return {
      responseStatus: '',
      instrutor: {}
    }
  },
  methods: {
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
    alteraStatus () {
      let cpf = this.instrutor.cpf
      http.put(`instrutor/status/altera/${cpf}`)
        .then(res => {
          this.instrutor = res.data
          this.abrirModal()
          setTimeout(function () {
            window.location.href = variavel.href = 'dados-instrutor-busca'
          }, 1521)
        })
        .catch(erro => {
          console.log(`Erro: ${erro}`)
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
    }
  },
  beforeMount () {
    Funcoes.verificaToken()
    const dadosUrl = this.pegaDadosUrl()
    this.getInstrutor(dadosUrl.id)
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

.ativo, .inativo{
    margin-left: 1em;
}

.ativo{
    color: green;
}
.inativo{
    color: darkred;
}

.form-control{
    color: #737373 !important;
}

.subtitulo{
    color: #737373;
}

.disabledTextInput{
    background-color: #D3CACA !important;
    border: 1px solid #BCB3B3 !important;
}

textarea{
    resize: none !important;
}

.modal-body, .modal-header, .modal-footer {
    text-align: center;
    background-color: #EBEBEB
}

.modal-body{
    min-height: 55vh;
    flex-direction: column;
}

.submit-modal, .cancel-modal{
    color: white !important;
    font-weight: bold !important;
    border-radius: 5px !important;
    width: 350px;
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
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 40vh;
}

.rounded-circle{
  width:150px;
}

</style>
