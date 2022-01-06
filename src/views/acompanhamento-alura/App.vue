<template>
    <Header :link="`../acompanhamento-gerencial?id=${this.id}`"/>
    <main>
        <div class="container-fluid">
            <div class="row justify-content-evenly mt-5 mb-3">
                <div class="col-lg-12 d-flex justify-content-center fw-bold titulo">
                    <div class="col-lg-7 d-flex justify-content-center align-items-center">
                        <div class="d-block justify-content-center">
                            <h3 class="fw-bold text-center titulo">Participante selecionado:</h3>
                            <h4 class="fw-bold grey-font text-center nome-participante">{{participante.nome}}</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row justify-content-evenly">
                <div class="col-lg-1"></div>
                    <div  class="col-lg-10">
                        <div style="overflow-y: scroll; max-height:335px;">
                            <table class="table table-bordered table-fixed tabela">
                                <thead >
                                    <tr>
                                        <th scope="col" class="text-center th-id titulo">Semana</th>
                                        <th scope="col" class="text-center th-ms titulo">Horas registradas</th>
                                        <th scope="col" class="text-center titulo">Horas Minímas</th>
                                       <th scope="col" colspan="2" class="text-center titulo">Data de registro</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(registro, index ) in registros" :key="registro"  >
                                        <th scope="row" class=" text-center titulo" id="info-id">{{++index}}</th>
                                        <td class="text-center campo-tabela">{{registro.qtdHoras}}</td>
                                      <td class="text-center campo-tabela">{{registro.hrMinSemana}}</td>
                                      <td class="text-center campo-tabela">{{this.formataDataParaMostrar(registro.dataRegistro)}}</td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                  <tr>
                                    <th scope="col" colspan="4" class="text-start titulo">Horas Totais: {{this.calculaHorasTotais()}}</th>
                                  </tr>
                                </tfoot>
                            </table>
                        </div>
                  </div>
              <div class="col-lg-1"></div>
            </div>
        </div>
    </main>
</template>

<script>
import Header from '@/components/Header.vue'
import Funcoes from '../../services/Funcoes'
import { http } from '../../services/Config'
import { variavel } from '../../services/Variavel'

export default {
  name: 'App',
  components: {
    Header
  },
  data () {
    return {
      registros: [], // Lista de registro obtidos para popular a tabela.
      participante: {}, // Informações do participante
      id: {} // cpf do participante
    }
  },

  beforeMount () {
    this.id = this.pegaDadosUrl().id
    this.getParticipanteNome()
    this.getAlura()
    Funcoes.verificaToken()
  },

  methods: {
    // faz o get no back-end e retorna as informações do participante
    getParticipanteNome () {
      http
        .get(`participante/${this.id}`)
        .then((response) => {
          this.participante = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // requisição do tipo get para popular a tabela com os dados.
    getAlura () {
      http
        .get(`alura/${this.id}`)
        .then((response) => {
          this.registros = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    formataDataParaMostrar (data) {
      const dataPreForm = new Date(data)
      const dataFormatada = `${dataPreForm.getUTCDate()}/${dataPreForm.getUTCMonth() + 1}/${dataPreForm.getUTCFullYear()}`

      return dataFormatada
    },
    // função para pegar os dados da URL
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
    calculaHorasTotais () {
      let aux = 0
      for (var i = 0; i < this.registros.length; i++) {
        aux += this.registros[i].qtdHoras
      }
      return aux
    }
  }
}
</script>

<style scoped>
body {
  background-color: #ebebeb !important;
}

.tabela{
    border: 1px solid #BCB3B3 !important;
    background-color: white;
    overflow-y: auto;
}

.titulo{
    color: #090B2E;
}

.botao{
    background-color: #AB0045 !important;
    border-style: none !important;
    border-radius: 2px !important;
}

.botaocanc{
    background-color: #FFB700 !important;
    border-style: none !important;
    border-radius: 2px !important;
}

.campo{
    border-radius: 2px !important;
    background-color: white !important;
    color: #737373 !important;
}

.th-id{
    width: 2em !important;
}

.th-ms{
    width: 15em !important;
}

.td-button{
    width: 1.5em !important;
    background-color: #FFB700 !important;
    cursor: pointer
}

.nome-participante{
    color: #737373;
}
.campo-tabela{
    color: #737373 !important;
}

.button{
    border-style: none;
    background-color: #FFB700 ;
}

.botao:hover{
    transition: 0.3s ease-in-out !important;
    background-color: #9a0045 !important;
}

.conteudoModal{
    background-color: #EBEBEB !important;
}

.dialogoModal{
    width: 1080px !important;
    max-width: 1080px !important;
}

.overflowT{
    position: sticky;
    top: 0;
    background-color: white;
}

.botaocanc:hover{
    transition: 0.3s ease-in-out !important;
    background-color: #dd9700 !important;
}

.none {
    display: none;
}

.erro {
  color: red;
  font-weight: bold;
}

.enviado {
  color: green
}
</style>
