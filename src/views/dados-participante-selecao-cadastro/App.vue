<template>
  <div>
    <Header />
    <main>
      <div class="container-fluid">
        <div class="row justify-content-evenly mt-4 mb-3">
          <div class="titulo col-xl-4">
            <h3 class="fw-bold">Seleção para participante:</h3>
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
              <input
                name="filtro"
                type="text"
                class="form-control mt-4"
                id="filtro-cargo"
                placeholder="Cargo"
              />
            </div>
          </div>
          <div class="col-xl-7" id="participantes">
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
                <tr id="participante" v-for="participante in participantes" :key="participante">
                  <th scope="row" width="50">{{ participante.cpf }}</th>
                  <td id="info-nome">{{ participante.nome }}</td>
                  <td id="info-cargo">{{ participante.cargo }}</td>
                  <td class="imagem-coluna rounded" width="50">
                    <a :href="'/dados-participante-cadastro_edicao?id=' + participante.cpf">
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
          <div class="col-xl-7"></div>
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
      participantes: []
    }
  },
  beforeMount () {
    Funcoes.verificaToken()

    this.getPartipantesApi()
  },
  methods: {
    getPartipantesApi () {
      http.get('mock/participante')
        .then(response => {
          this.participantes = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },

    filtraDados () {
      const dadosLinhas = this.pegaDados()

      let nomeProcurado = document.querySelector('#filtro-nome').value
      let cargoProcurado = document.querySelector('#filtro-cargo').value
      let linhasN1 = document.querySelectorAll('#participante')

      var linhasArray = Array.prototype.slice.call(linhasN1)

      let arrayBoolLinhas = this.verifica(
        dadosLinhas,
        nomeProcurado,
        cargoProcurado
      )

      this.mudaVisibilidade(arrayBoolLinhas, linhasArray)
    },

    pegaDados () {
      let linhas = document.querySelectorAll('#participante')
      let arrayDadosDasLinhas = []

      linhas.forEach((linha) => {
        let dadosLinha = []
        let nome = linha.querySelector('#info-nome').textContent
        let cargo = linha.querySelector('#info-cargo').textContent

        dadosLinha.push(nome, cargo)
        arrayDadosDasLinhas.push(dadosLinha)
      })

      return arrayDadosDasLinhas
    },

    verifica (dadosLinhas, nomeProcurado, cargoProcurado) {
      let arrayBoolLinhas = []
      let expressaoNome = new RegExp(nomeProcurado, 'i')
      let expressaoCargo = new RegExp(cargoProcurado, 'i')

      dadosLinhas.forEach((dadosLinha) => {
        let boolLinha = []

        // Verificando se o nome procurado consta na tabela
        if (expressaoNome.test(dadosLinha[0]) || nomeProcurado == '') {
          boolLinha.push(true)
        } else {
          boolLinha.push(false)
        }

        // Verificando se o cargo procurado consta na tabela
        if (expressaoCargo.test(dadosLinha[1]) || cargoProcurado == '') {
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

      if (qtdLinhas == contador) {
        aviso.style.display = 'flex'
      } else {
        aviso.style.display = 'none'
      }
    },

    recarregaLista () {
      let linhas = document.querySelectorAll('#participante')
      let aviso = document.querySelector('.aviso')

      linhas.forEach((linha) => {
        linha.style.display = ''
      })

      aviso.style.display = 'none'
    }
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
