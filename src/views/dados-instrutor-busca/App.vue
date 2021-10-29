<template>
  <div>
    <Header />
    <main>
      <div class="container-fluid">
        <div class="row justify-content-evenly mt-4 mb-3">
          <div class="titulo col-xl-4">
            <h3 class="fw-bold">Busca por instrutor:</h3>
          </div>
          <div class="col-xl-7 d-flex justify-content-center"></div>
        </div>
        <div class="row justify-content-evenly">
          <div class="col-xl-4">
            <div class="mb-3">
              <input
                name="filtro"
                type="text"
                class="form-control mt-4"
                id="filtro-nome"
                placeholder="Nome"
              />
            </div>
            <div class="mb-3">
              <select class="form-select mt-4" id="filtro-status">
                <option disabled selected value="0">Status</option>
                <option value="1">Ativo</option>
                <option value="2">Inativo</option>
              </select>
            </div>
          </div>
          <div class="col-xl-7" id="instrutores">
            <div class="aviso">
              <h4 class="titulo fw-bold">
                Não foi encontrado nenhum resultado com os parâmetros informados
              </h4>
              <button
                class="mt-3 form-control recarregar"
                @click="recarregaLista"
              >
                RECARREGAR LISTA
              </button>
            </div>
            <div class="table-wrapper-scroll-y my-custom-scrollbar">
              <table class="table table-bordered tabela mt-4">
                <tbody align="center">
                  <tr id="instrutor" v-for="instrutor in instrutores" :key="instrutor">
                    <th scope="row" width="50">{{ instrutor.cpf }}</th>
                    <td id="info-nome">{{ instrutor.nome }}</td>
                    <td id="info-status" v-bind:class="instrutor.status == 'ATIVO' ? 'ativo' : 'inativo'">
                      {{ (instrutor.status == 'ATIVO'?'Ativo':'Inativo')}}
                    </td>
                    <td class="imagem-coluna rounded" width="50">
                      <a :href="'/dados-instrutor-visualizacao?id=' + instrutor.cpf">
                        <img src="@/assets/imgs/account_circle_white_24dp.svg" />
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
            <button value="BUSCAR" type="button" class="mt-5 form-control submit" @click="filtraDados">
              BUSCAR
            </button>
          </div>
          <div class="col-xl-7 justify-content-end d-flex">
            <a
              href="/dados-instrutor-selecao-cadastro"
              class="mt-5 form-control cadastro d-flex justify-content-center"
            >
              SELEÇÃO PARA NOVO CADASTRO
            </a>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import axios from 'axios'
import Funcoes from '../../services/Funcoes'
import Cookie from 'js-cookie'

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
      instrutores: []
    }
  },
  methods: {
    getInstrutor () {
      axios.get('http://localhost:8081/api/instrutor', config)
        .then(res => {
          this.instrutores = res.data
        })
        .catch(erro => {
          alert(`Erro na requisição (${erro})`)
        })
    },
    filtraDados () {
      const dadosLinhas = this.pegaDados()

      let nomeProcurado = document.querySelector('#filtro-nome').value
      let statusProcurado = document.querySelector('#filtro-status').value
      let linhasN1 = document.querySelectorAll('#instrutor')

      var linhasArray = Array.prototype.slice.call(linhasN1)

      let arrayBoolLinhas = this.verifica(
        dadosLinhas,
        nomeProcurado,
        statusProcurado
      )

      this.mudaVisibilidade(arrayBoolLinhas, linhasArray)
    },

    pegaDados () {
      let linhas = document.querySelectorAll('#instrutor')
      let arrayDadosDasLinhas = []

      linhas.forEach((linha) => {
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

      if (statusTxt == 'Ativo') {
        return (status = 1)
      } else if (statusTxt == 'Inativo') {
        return (status = 2)
      }

      return status
    },

    verifica (dadosLinhas, nomeProcurado, statusProcurado) {
      let arrayBoolLinhas = []
      let expressao = new RegExp(nomeProcurado, 'i')

      dadosLinhas.forEach((dadosLinha) => {
        let boolLinha = []

        // Verificando se o nome procurado consta na tabela
        if (expressao.test(dadosLinha[0]) || nomeProcurado == '') {
          boolLinha.push(true)
        } else {
          boolLinha.push(false)
        }

        // Verificando se o status procurado consta na tabela
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
      console.log(linhas)

      for (i = 0; i < linhas.length; i++) {
        if (arrayBoolLinhas[i][0] && arrayBoolLinhas[i][1]) {
          linhas[i].style.display = ''
        } else {
          linhas[i].style.display = 'none'
          contador++
        }
      }

      if (qtdLinhas == contador) {
        aviso.style.display = 'flex'
      } else {
        aviso.style.display = 'none'
      }
    },

    recarregaLista () {
      let linhas = document.querySelectorAll('#instrutor')
      let aviso = document.querySelector('.aviso')

      linhas.forEach((linha) => {
        linha.style.display = ''
      })

      aviso.style.display = 'none'
    }
  },
  beforeMount () {
    Funcoes.verificaToken()

    this.getInstrutor()
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
  margin: 0;
  padding: 0;
  text-decoration: none;
}

body {
  background-color: #ebebeb !important;
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
    max-width: 432px !important;

}

.ativo{
    color: green;
    font-weight: bold;
}

.inativo{
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

.aviso{
    display: none ;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    padding: 2em;
    text-align: center;
    position: absolute;
    z-index: 100;
}

.recarregar:hover{
    background-color: #141863 !important;
}

.recarregar{
    background-color: #090B2E !important;
    max-width: 50%;
    cursor: pointer !important;
    transition: all linear 0.3s !important;
}
/* Filtrar tabela */

.invisivel{
    display: none;
}
</style>
