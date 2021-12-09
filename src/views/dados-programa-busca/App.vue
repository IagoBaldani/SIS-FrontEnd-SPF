<template>
<div>
    <Header link="../informacoes-gerais-gerencial"/>
    <main>
        <div class="container-fluid">
            <div class="row justify-content-evenly mt-4 mb-3">
                <div class="titulo col-xl-4">
                    <h3 class="fw-bold">Busca por Formação:</h3>
                </div>
                <div class="col-xl-7 d-flex justify-content-center"></div>
            </div>
            <div class="row justify-content-evenly" id="programas">
                <div class="col-xl-4">
                    <form>
                        <div class="mb-3">
                            <input name="nome" type="text" class="form-control mt-4" placeholder="Nome"
                                   id="filtro-nome">
                        </div>
                        <div class="mb-3">
                            <select class="form-select mt-4" id="filtro-status">
                                <option disabled selected value="0">Status</option>
                                <option value="1">Em andamento</option>
                                <option value="2">Encerrado</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="col-xl-7">
                    <div class="aviso">
                        <h4 class="titulo fw-bold"> Não foi encontrado nenhum resultado com os parâmetros
                            informados </h4>
                        <button class="mt-3 form-control recarregar" onclick="window.location.reload()"> RECARREGAR LISTA
                        </button>
                    </div>
                    <div class="table-wrapper-scroll-y my-custom-scrollbar">
                        <table class="table table-bordered tabela mt-4 " id="tab">
                            <tbody align="center">
                            <tr class="programa" v-for="programa in programas" v-bind:key="programa">
                                <th scope="row" width="50">{{ programa.id }}</th>
                                <td id="info-nome"> {{ programa.nome }}</td>
                                <td>{{ programa.turma }}</td>
                                <td id="info-status" class="info-status"
                                    v-bind:class="(programa.status == 'ENCERRADO')?'encerrado':'em-andamento'">
                                    {{(programa.status == 'ENCERRADO')?'Encerrado':'Em andamento' }}
                                </td>
                                <td class="imagem rounded" width="50">
                                    <a :href="'/dados-programa-cadastro_edicao?id=' + programa.id + '&tipo=edicao'">
                                        <img src="@/assets/imgs/settings_white_24dp.svg"/>
                                    </a>
                                </td>
                                <td class="imagem-coluna rounded" width="50">
                                    <a :href="'/dados-programa-visualizacao?id=' + programa.id">
                                        <img src="@/assets/imgs/school_white_24dp.svg">
                                    </a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="row justify-content-evenly">
                <div class="col-xl-4">
                    <input value="BUSCAR" type="button" class="mt-5 form-control submit" @click="filtraDados"/>
                </div>
                <div class="col-xl-7 justify-content-end d-flex">
                    <a href="/dados-programa-processo-seletivo"
                       class="mt-5 form-control cadastro d-flex justify-content-center"> NOVO CADASTRO
                    </a>
                </div>
            </div>
        </div>
    </main>
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
      responseStatus: '',
      programas: []
    }
  },
  beforeMount () {
    Funcoes.verificaToken()
    this.getProgramas()
  },
  methods: {
    getProgramas () {
      http.get('programa')
        .then(response => {
          this.programas = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    filtraDados () {
      let dadosLinhas = this.pegaDados()
      let nomeProcurado = document.querySelector('#filtro-nome').value
      let statusProcurado = document.querySelector('#filtro-status').value
      let linhasNl = document.querySelectorAll('.programa')
      var linhas = Array.prototype.slice.call(linhasNl)
      const arrayBoolLinhas = this.verifica(dadosLinhas, nomeProcurado, statusProcurado)
      this.mudaVisibilidade(arrayBoolLinhas, linhas)
    },
    pegaDados () {
      let linhas = document.querySelectorAll('.programa')
      let arrayDadosDasLinhas = []
      linhas.forEach(linha => {
        let dadosLinha = []
        let nome = linha.querySelector('#info-nome').textContent
        let status = this.trataStatus(linha)
        dadosLinha.push(nome, status)
        arrayDadosDasLinhas.push(dadosLinha)
      })
      return arrayDadosDasLinhas
    },
    trataStatus (item) {
      let statusTxt = item.querySelector('#info-status').textContent
      let status = 0
      if (statusTxt === 'Em andamento') {
        status = 1
        return status
      } else if (statusTxt === 'Encerrado') {
        status = 2
        return status
      }
      return status
    },
    verifica (dadosLinhas, nomeProcurado, statusProcurado) {
      let arrayBoolLinhas = []
      let expressao = new RegExp(nomeProcurado, 'i')
      dadosLinhas.forEach(dadosLinha => {
        const boolLinha = []
        console.log(dadosLinha)
        if (expressao.test(dadosLinha[0]) || nomeProcurado == '') {
          boolLinha.push(true)
        } else {
          boolLinha.push(false)
        }
        if (statusProcurado == dadosLinha[1] || statusProcurado == 0) {
          boolLinha.push(true)
        } else {
          boolLinha.push(false)
        }
        arrayBoolLinhas.push(boolLinha)
      })
      return arrayBoolLinhas
    },
    mudaVisibilidade (arrayBoolLinhas, linhas) {
      let i
      var contador = 0
      let aviso = document.querySelector('.aviso')
      var qtdLinhas = linhas.length
      for (i = 0; i < linhas.length; i++) {
        if (arrayBoolLinhas[i][0] && arrayBoolLinhas[i][1]) {
          linhas[i].style.display = ''
        } else {
          linhas[i].style.display = 'none'
          contador++
        }
      }
      if (qtdLinhas === contador) {
        aviso.style.display = 'flex'
      } else {
        aviso.style.display = 'none'
      }
    },
    recarregaLista () {
      let linhas = document.querySelectorAll('.programa')
      let aviso = document.querySelector('.aviso')
      linhas.forEach(linha => {
        linha.style.display = ''
      })
      aviso.style.display = 'none'
    }
  }
}
</script>

<style>
body {
    background-color: #EBEBEB !important;
}
a{
    text-decoration: none !important;
}
.tabela{
    border: 1px solid #BCB3B3 !important;
    background-color: white;
}
.titulo{
    color: #090B2E;
}
.botao{
    background-color: #AB0045 !important;
    border-style: none !important;
    width: 26.9em !important;
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
}
.nome-participante{
    color: #737373;
}
.campo-tabela{
    color: #737373 !important;
}
.submit, .cadastro, .recarregar{
    color: white !important;
    font-weight: bold !important;
    border-radius: 5px !important;
}
.submit{
    background-color: #AB0045 !important;
}
.cadastro{
    background-color: #FFB700 !important;
    max-width: 575px !important;
}
.em-andamento{
    color: green;
    font-weight: bold;
}
.encerrado{
    color: darkred;
    font-weight: bold;
}
.imagem{
    background-color:  #AB0045 !important;
}
.imagem-coluna{
    background-color: #FFB700 !important;
}
.my-custom-scrollbar {
    position: relative;
    height: 59vh;
    overflow: auto;
}
.table-wrapper-scroll-y {
    display: block;
    height: 59vh;
}
.invisivel{
    display: none;
}
.aviso{
    display: none;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    padding: 2em;
    text-align: center;
    position: absolute;
    z-index: 100;
}
.recarregar{
    background-color: #090B2E !important;
    max-width: 50%;
    cursor: pointer !important;
    transition: all linear 0.3s !important;
}
.recarregar:hover{
    background-color: #141863 !important;
}
</style>