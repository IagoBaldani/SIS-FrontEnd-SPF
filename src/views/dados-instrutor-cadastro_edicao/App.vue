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
                            <input class="form-control" id="disabledTextInput" :placeholder="informacoes.nome" type="text" disabled/>
                        </div>
                       <div class="mb-3">
                            <label class="form-label fw-bold mb-0 titulo" for="inputContato">Contato</label>
                            <input class="form-control" id="disabledTextInput" :placeholder="informacoes.contato" type="tel" disabled/>
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-bold mb-0 titulo" for="inputContato">CPF</label>
                            <input class="form-control" id="disabledTextInput" :placeholder="informacoes.cpf" type="text" disabled/>
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-bold mb-0 titulo">Email corporativo</label>
                            <input class="form-control" id="disabledTextInput" :placeholder="informacoes.email" type="email" disabled/>
                        </div>
                </div>
                <div class="col-xl-4">

                </div>
                <div class="col-xl-2">
                  <div class=" text-center text-md-left">
                    <img src="@/assets/imgs/perfil.svg" class="rounded-circle" alt="">
                  </div>
                </div>
            </div>
            <div class="mt-5 row justify-content-evenly">
                <div class="col-xl-4">
                    <button type="button" class="btn submit form-control" @click="enviarDados">
                        CONFIRMAR
                    </button>
                </div>
                <div class="col-xl-4"></div>
                <div class="col-xl-2"></div>
            </div>
        </div>
    </main>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  name: 'App',
  components: {
    Header
  },
  data () {
    return {
      // Esses dados serão oriundos da API do PortalSIS
      informacoes: {
        nome: 'Kaiqui',
        cpf: '123123123',
        contato: '(11)99999-9999',
        email: 'kaiquilopes@sisconsultoria.com.br'
      }
    }
  },
  methods: {
    enviarDados () {
      // Pega os dados da API do PortalSIS, cria um objeto e envia os dados para nossa API
      alert('Instrutor cadastrado com sucesso!')
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
    console.log(this.pegaDadosUrl())
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
}

.subtitulo{
    color: #737373;
}

textarea{
    resize: none !important;
}

#disabledTextInput{
  background-color: #D3CACA;
  border: 1px solid #BCB3B3;
}

.download{
    transform: rotate(180deg) !important;
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
    min-height: 40vh;
    font-size: 21px;
}

.input-arquivo{
    display: none;
}

.modal-content{
    height: 80vh !important;
}

.erro{
    color: darkred;
    font-weight: bold;
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
