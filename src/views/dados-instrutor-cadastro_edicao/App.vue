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
                            <input class="form-control"
                                   required
                                   placeholder="Nome"
                                   type="text"
                                   v-model="modelNome"
                            />
                        </div>
                       <div class="mb-3">
                            <label class="form-label fw-bold mb-0 titulo" for="inputContato">Contato</label>
                            <input class="form-control" id="inputContato" required placeholder="(xx) xxxxx-xxxx" type="tel" v-model="modelContato" />
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-bold mb-0 titulo" for="inputContato">CPF</label>
                            <input class="form-control" id="inputCpf" required placeholder="xxx.xxx.xxx-xx" type="text" v-model="modelCpf"  />
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-bold mb-0 titulo">Email
                                corporativo</label>
                            <input class="form-control" id="inputEmail" placeholder="seunome@sisconsultoria.com.br"
                                type="email" required v-model="modelEmail"/>
                        </div>
                </div>
                <div class="col-xl-4">

                </div>
                <div class="col-xl-2">
                    <form>
                        <div class=" text-center text-md-left">
                          <img src="@/assets/imgs/perfil.svg" class="rounded-circle" alt="">
                        </div>
                        <label for='selecao-arquivo'  class="editar btn submit form-control mt-4"> EDITAR </label>
                        <input class="input-arquivo" id="selecao-arquivo" type="file"/>
                    </form>
                </div>
            </div>
            <div class="mt-5 row justify-content-evenly">
                <div class="col-xl-4">
                    <button type="button" class="btn submit form-control" data-bs-toggle="modal"
                        data-bs-target="#exampleModal" @click.prevent="enviarDados">
                        CONFIRMAR
                    </button>
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
                        <h1 class="modal-title form-label fw-bold mb-0 titulo"> Deseja confirmar os seguintes dados?
                        </h1>
                    </div>
                    <div class="conteudomodal d-flex flex-column justify-content-center mb-0" id="instrutor-modal">
                        <div class="mt-3">
                            <ul class="fw-bold subtitulo text-start">Informações gerais:
                                <li>Nome: <span class="titulo"> {{ informacoes.nome }} </span> </li>
                                <li>Contato: <span class="titulo"> {{ informacoes.contato }} </span></li>
                                <li>CPF: <span class="titulo"> {{ informacoes.cpf }} </span></li>
                              <li>Email: <span class="titulo"> {{ informacoes.email }} </span></li>
                            </ul>
                        </div>
                        </div>
                        <div class="mt-3 modal-footer border-0 justify-content-around">
                            <div>
                                <button type="button" class="btn submit-modal">CONFIRMAR</button>
                            </div>
                            <div>
                                <button type="button" class="btn cancel-modal" data-bs-dismiss="modal">CANCELAR</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>-
    </div>
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
      informacoes: {
        nome: '',
        cpf: '',
        contato: '',
        email: ''
      }
    }
  },
  methods: {
    enviarDados () {
      this.informacoes.nome = this.modelNome
      this.informacoes.contato = this.modelContato
      this.informacoes.cpf = this.modelCpf
      this.informacoes.email = this.modelEmail
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
