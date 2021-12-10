<template>
    <Header link="../login"/>
    <main>
        <!-- ínicio do formulário -->
        <div class="container-fluid" id="instrutor">
            <div class="row mt-4 justify-content-evenly">
                <div class="div-titulo col-xl-4">
                    <h3 class="fw-bold titulo">Arquivos do participante: </h3>
                </div>
                <div class="col-xl-4"></div>
                <h2>Se você viu isso, parabens, você é programador</h2>
                <div class="col-xl-2"></div>
            </div>
            <form method="POST" :action="variavelBack + `arquivos/id`">
              <div class="row justify-content-evenly">
                  <div class="col-xl-4">
                    <div class="mb-3">
                      <label class="form-label fw-bold mb-0 titulo">TCE</label><br>
                      <label for='selecao-tce'  class="form-control envio-arquivo">
                        <img src="@/assets/imgs/file_download_black_24dp.svg" alt="">
                        tce.xlsx
                      </label>
                      <input class="input-arquivo" id='selecao-tce' type='file' accept=".xlsx">
                    </div>
                    <div class="mb-3">
                      <label class="form-label fw-bold mb-0 titulo">DISC</label><br>
                      <label for='selecao-disc'  class="form-control envio-arquivo">
                        <img src="@/assets/imgs/file_download_black_24dp.svg" alt=""> disc.pdf
                      </label>
                      <input class="input-arquivo" id='selecao-disc' type='file' accept=".pdf">
                    </div>
                  </div>
                  <div class="col-xl-4">
                  </div>
                  <div class="col-xl-2">
                  </div>
              </div>
              <div class="mt-5 row justify-content-evenly">
                  <div class="col-xl-4">
                      <input type="submit" class="btn submit form-control" value="CONFIRMAR">
                  </div>
                  <div class="col-xl-4"></div>
                  <div class="col-xl-2"></div>
              </div>
            </form>
        </div>
    </main>
</template>

<script>
import Header from '@/components/Header.vue'
import axios from 'axios'
import Cookie from 'js-cookie'
import Funcoes from '../../services/Funcoes'
import { variavelBack} from '../../services/VariavelBack'

let config = {
  headers: {
    Authorization: `Bearer ${Cookie.get('login_token')}`
  }
}

export default {
  name: 'App',
  components: {
    Header
  },
  data () {
    return {
      responseStatus: '',
      id: ''
    }
  },
  beforeMount () {
    Funcoes.verificaToken()
    const dadosUrl = this.pegaDadosUrl()

    this.id = dadosUrl.id
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
