<template>
  <Header/>
  <main>
        <!-- ínicio do formulário -->
        <div class="container-fluid" id="instrutor">
            <div class="row mt-4 justify-content-evenly">
                <div class="div-titulo col-xl-4">
                    <h3 class="fw-bold titulo">Dados do instrutor:</h3>
                </div>
                <div class="col-xl-4"></div>
                <div class="col-xl-2 d-flex justify-content-center">
                    <h2 class="titulo secundario"> Status: <span v-bind:class="(instrutor.status == 'Ativo')?'ativo':'inativo'"> {{instrutor.status}} </span></h2>
                </div>
            </div>
            <fieldset disabled>
                <div class="row justify-content-evenly">
                    <div class="col-xl-4">
                        <div class="mb-3">
                            <label class="form-label fw-bold mb-0 titulo" for="inputName">Nome</label>
                            <input class="form-control" id="disabledTextInput"  v-bind:value="instrutor.nome" type="text">
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-bold mb-0 titulo" for="inputContato">Contato</label>
                            <input class="form-control" id="disabledTextInput" v-bind:value="instrutor.contato" type="tel" disabled readonly>
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-bold mb-0 titulo" for="inputContato">CPF</label>
                            <input class="form-control" id="disabledTextInput" v-bind:value="instrutor.cpf" type="text">
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-bold mb-0 titulo" for="inputNotaLogica">Email
                                corporativo</label>
                            <input class="form-control" id="disabledTextInput"
                            v-bind:value="instrutor.email" type="email">
                        </div>
                    </div>
                    <div class="col-xl-4">

                    </div>
                    <div class="col-xl-2">
                        <form>
                            <div class=" text-center text-md-left">
                               <img src="@/assets/imgs/perfil.svg" class="rounded-circle" alt="">
                            </div>
                        </form>
                    </div>
                </div>
            </fieldset>
            <div class="mt-5 row justify-content-evenly">
                <div class="col-xl-4 ">
                    <button type="button" class="btn submit form-control" data-bs-toggle="modal"
                        data-bs-target="#exampleModal">
                        DESATIVAR INSTRUTOR
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
                        <h1 class="modal-title form-label fw-bold mb-0 titulo"> Deseja confirmar a desativação do
                            seguinte instrutor? </h1>
                    </div>
                    <div class="conteudomodal" id="instrutor-modal">
                        <h2 class="fw-bold subtitulo"> {{instrutor.nome}}</h2>
                    </div>
                </div>
                <div class="modal-footer border-0 justify-content-around">
                    <div>
                        <button type="button" class="btn submit-modal">CONFIRMAR</button>
                    </div>
                    <div>
                        <button type="button" class="btn cancel-modal" data-bs-dismiss="modal">CANCELAR</button>
                    </div>
                </div>
            </div>
        </div>
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
      instrutor: {
        nome: 'Kaiqui Lopes',
        contato: '(11)99999-9999',
        cpf: '222.222.222-22',
        email: 'kaiquilopes@sisconsultoria.com.br',
        status: 'Ativo'
      }
    }
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

#disabledTextInput{
    background-color: #D3CACA;
    border: 1px solid #BCB3B3;
}

.aprovado::placeholder{
    color: #19B200 !important;
}

textarea{
    resize: none !important;
}

.download{
    transform: rotate(180deg) !important;
}

#disabledTextInput{
    background-color: #D3CACA;
    border: 1px solid #BCB3B3;
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
