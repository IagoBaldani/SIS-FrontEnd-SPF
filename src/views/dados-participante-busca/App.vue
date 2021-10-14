<template>
  <Header/>
  <main>
    <div class="container-fluid">
      <div class="row justify-content-evenly mt-4 mb-3">
        <div class="titulo col-xl-4">
          <h3 class="fw-bold">Busca por participante:</h3>
        </div>
        <div class="col-xl-7 d-flex justify-content-center"> </div>
      </div>
      <div class="row justify-content-evenly">
        <div class="col-xl-4">
          <div class="mb-3">
            <input name="nome" type="text" class="form-control mt-4" placeholder="Nome" id="filtro-nome">
          </div>
          <div class="mb-3">
            <select class="form-select mt-4" id="filtro-programa">
              <option disabled selected value="0">Programa de Formação</option>
              <option id="programa" v-bind:value="programa.id" v-for="programa in programas" v-bind:key="programa">{{programa.nome}}</option>
            </select>
          </div>
          <div class="mb-3">
            <select class="form-select mt-4" id="filtro-status">
              <option disabled selected value="0">Status</option>
              <option value="1">Ativo</option>
              <option value="2">Inativo</option>
            </select>
          </div>
        </div>
        <div class="col-xl-7" id="participantes">
          <div class="aviso">
            <h4 class="titulo fw-bold"> Não foi encontrado nenhum resultado com os parâmetros informados
            </h4>
            <button class="mt-3 form-control recarregar" @click="recarregaLista"> RECARREGAR
              LISTA</button>
          </div>
          <div class="table-wrapper-scroll-y my-custom-scrollbar">
            <table class="table table-bordered tabela mt-4 ">
              <tbody align="center">
              <tr id="participante" v-for="participante in participantes" v-bind:key="participante">
                <th scope="row" width="50">{{participante.id}}</th>
                <td id="info-nome">{{participante.nome}}</td>
                <td id="info-programa">{{participante.programa}}</td>
                <td id="info-status"
                    v-bind:class="(participante.status == 'Ativo')?'ativo':'inativo'">
                  {{participante.status}}</td>
                <td class="imagem rounded" width="50">
                  <a href="/dados-participante-cadastro_edicao">
                    <img src="@/assets/imgs/manage_accounts_white_24dp.svg" alt="Imagem" />
                  </a>
                </td>
                <td class="imagem-coluna rounded" width="50">
                  <a href="/dados-participante-visualizacao">
                    <img src="@/assets/imgs/account_circle_white_24dp.svg">
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
          <button class="mt-5 form-control submit" @click="filtraDados()">BUSCAR</button>
        </div>
        <div class="col-xl-7 justify-content-end d-flex">
          <a href="/dados-participante-cadastro_edicao"
             class="mt-5 form-control cadastro d-flex justify-content-center"> NOVO CADASTRO </a>
        </div>
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
      participantes: [
        {
          id: 1,
          nome: 'Kaiqui Lopes',
          programa: 'Java',
          status: 'Ativo'
        },
        {
          id: 2,
          nome: 'Iago Baldani',
          programa: 'Java',
          status: 'Ativo'
        },
        {
          id: 3,
          nome: 'Leticia Angulo',
          programa: 'Mainframe',
          status: 'Ativo'
        },
        {
          id: 4,
          nome: 'Geovanni Santos',
          programa: '.net',
          status: 'Inativo'
        },
        {
          id: 5,
          nome: 'Pedro Xavier',
          programa: 'Mainframe',
          status: 'Inativo'
        }
      ],
      programas: [
        {
          id: 1,
          nome: 'Java'
        },
        {
          id: 2,
          nome: 'Mainframe'
        },
        {
          id: 3,
          nome: '.net'
        }
      ]
    }
  },
  methods: {
    filtraDados () {
      const dadosLinhas = this.pegaDados()

      let nomeProcurado = document.querySelector('#filtro-nome').value
      let programaProcurado = document.querySelector('#filtro-programa').value
      let statusProcurado = document.querySelector('#filtro-status').value
      let linhasNl = document.querySelectorAll('#participante')

      var linhasArray = Array.prototype.slice.call(linhasNl)

      let arrayBoolLinhas = this.verifica(dadosLinhas, nomeProcurado, programaProcurado, statusProcurado)

      this.mudaVisibilidade(arrayBoolLinhas, linhasArray)
    },

    pegaDados () {
      let linhas = document.querySelectorAll('#participante')
      let programas = document.querySelectorAll('#programa')

      let arrayProgramas = []
      let arrayDadosDasLinhas = []

      programas.forEach(programa => {
        arrayProgramas.push(programa.textContent)
      })
      console.log(arrayProgramas)

      linhas.forEach(linha => {
        let dadosLinha = []
        let nome = linha.querySelector('#info-nome').textContent

        let programa = this.trataPrograma(linha, arrayProgramas)
        let status = this.trataStatus(linha)

        dadosLinha.push(nome, programa, status)
        arrayDadosDasLinhas.push(dadosLinha)
      })

      console.log(arrayDadosDasLinhas)
      return arrayDadosDasLinhas
    },

    trataStatus (linha) {
      let statusTxt = linha.querySelector('#info-status').textContent
      let status = 0

      if (statusTxt == 'Ativo') {
        status = 1
        return status
      } else if (statusTxt == 'Inativo') {
        status = 2
        return status
      }

      return status
    },

    trataPrograma (linha, arrayProgramas) {
      var programaTxt = linha.querySelector('#info-programa').textContent
      let programaNum = 0; let i = 0

      for (let i = 0; i < arrayProgramas.length; i++) {
        if (programaTxt == arrayProgramas[i]) {
          programaNum = i + 1
          return programaNum
        }
      }

      return programaNum
    },

    verifica (dadosLinhas, nomeProcurado, programaProcurado, statusProcurado) {
      let arrayBoolLinhas = []
      let expressao = new RegExp(nomeProcurado, 'i')

      dadosLinhas.forEach(dadosLinha => {
        let boolLinha = []

        // Verificando se o nome procurado consta na tabela
        if (expressao.test(dadosLinha[0]) || nomeProcurado == '') {
          boolLinha.push(true)
        } else {
          boolLinha.push(false)
        }

        // Verificando se o programa procurado consta na tabela
        if (programaProcurado == dadosLinha[1] || programaProcurado == 0) {
          boolLinha.push(true)
        } else {
          boolLinha.push(false)
        }

        // Verificando se o status procurado consta na tabela
        if (statusProcurado == dadosLinha[2] || statusProcurado == 0) {
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
        if (arrayBoolLinhas[i][0] && arrayBoolLinhas[i][1] && arrayBoolLinhas[i][2]) {
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

      linhas.forEach(linha => {
        linha.style.display = ''
      })

      aviso.style.display = 'none'
    }
  }
}
</script>

<style>

body{
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

.recarregar{
  background-color: #090B2E !important;
  max-width: 50%;
  cursor: pointer !important;
  transition: all linear 0.3s !important;
}

.recarregar:hover{
  background-color: #141863 !important;
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
  display: none;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 2em;
  text-align: center;
  position: absolute;
  z-index: 100;
}

</style>
