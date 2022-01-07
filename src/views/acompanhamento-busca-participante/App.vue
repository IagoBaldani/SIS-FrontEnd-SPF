<template>
    <Header link="../home"/>
    <main>
        <!--Escrita de busca por participantes-->
        <div class="container-fluid">
            <div class="row justify-content-evenly mt-5 mb-3">
                <div class="titulo col-lg-4">
                    <h3 class="fw-bold titulo">Busca por participantes:</h3>
                </div>
                <div class="col-lg-7"></div>
            </div>
            <!--ComboBox de Programa de formação-->
            <div class="row justify-content-evenly mb-5">
                <form class="col-lg-4 d-flex flex-column justify-content-between">
                        <select class="form-select" id="filtro-programa" required>
                            <option value="0" disabled hidden selected >Programa de formação</option>
                            <option :value="''">Todos</option>
                            <option :value="programa.nome" v-for="programa in programas" v-bind:key="programa">{{programa.nome}}</option>
                        </select>
                    <button @click="filtraDados()" type="button" value="BUSCAR" class="btn w-100 fs-5 mt-3 btn-primary botao">BUSCAR</button>
                </form>

                <!--scroll(barra de rolagem) e a tabela de busca de participantes-->
                <div class="col-lg-7" id="participantes">
                    <div class="aviso">
                        <h4 class="titulo fw-bold"> Não foi encontrado nenhum resultado com os parâmetros informados </h4>
                        <button onclick="window.location.reload()" class="mt-3 form-control recarregar">RECARREGAR LISTA</button>
                    </div>
                    <div class="scroll-tabela">
                        <table class="table mb-0 table-bordered tabela">
                            <tbody>
                                <tr id="participante" v-for="(participante, index) in participantes" v-bind:key="participante">
                                    <th scope="row" class="titulo" id="info-id">{{++index}}</th>
                                    <td id="info-nome">{{participante.nome}}</td>
                                    <td id="info-programa">{{participante.programa}}</td>
                                    <td id="logoBoneco"><a title="Selecionar participante" :href="'../acompanhamento-gerencial?id=' + participante.cpf"><img src="@/assets/imgs/account_circle_white_24dp.svg" alt="Detalhes do participante"></a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </main>
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
      participantes: [],
      programas: []
    }
  },
  beforeMount () {
    this.getParticipantes()
    this.getFormacoes()
    Funcoes.verificaToken()
  },

  methods: {
    // retorna os participantes ativos
    getParticipantes () {
      http
        .get('participante/ativos')
        .then((response) => {
          this.participantes = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // é usada para retornar as formações ativas.
    getFormacoes () {
      http
        .get('programa/buscar-processo')
        .then((response) => {
          this.programas = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // é usada para pegar os dados da URl para serem usados nas requisições GET.
    pegaDados () {
      let linhas = document.querySelectorAll('#participante')
      let arrayDadosDasLinhas = []

      linhas.forEach(linha => {
        let dadosLinha = []
        let nome = linha.querySelector('#info-nome').textContent

        let programa = linha.querySelector('#info-programa').textContent

        dadosLinha.push(nome, programa)
        arrayDadosDasLinhas.push(dadosLinha)
      })
      return arrayDadosDasLinhas
    },
    verifica (dadosLinhas, programaProcurado) {
      let arrayBoolLinhas = []

      dadosLinhas.forEach(dadosLinha => {
        let boolLinha = []

        // Verificando se o programa procurado consta na tabela
        if (programaProcurado == dadosLinha[1] || programaProcurado == 0) {
          boolLinha.push(true)
        } else {
          boolLinha.push(false)
        }

        arrayBoolLinhas.push(boolLinha)
      })

      return arrayBoolLinhas
    },
    // Deixa invisível os participantes que não foram selecionados.
    mudaVisibilidade (arrayBoolLinhas, linhas) {
      let i
      var contador = 0
      let aviso = document.querySelector('.aviso')
      var qtdLinhas = linhas.length

      for (i = 0; i < linhas.length; i++) {
        if (arrayBoolLinhas[i][0]) {
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
    // Filtra os participantes de acordo com a formação
    filtraDados () {
      const dadosLinhas = this.pegaDados()

      let programaProcurado = document.querySelector('#filtro-programa').value
      let linhasNl = document.querySelectorAll('#participante')

      var linhasArray = Array.prototype.slice.call(linhasNl)

      let arrayBoolLinhas = this.verifica(dadosLinhas, programaProcurado)

      this.mudaVisibilidade(arrayBoolLinhas, linhasArray)
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

<style scoped>

.participantes  {
    color: #090B2E ;
    padding: 1.1em;
    margin-left: 15px;
    margin-top: 12px;
    font-size: 20px;
}
h2 {
    font-weight: bold;
    font-style: normal;
}

/*Tabela de programa de formação(Combobox)*/
.comboBox   {
    background-color: #FFFFFF;
    border-radius: 5px;
    display: inline-block;
}
.imgs{
    margin-left: 200px;
}

.programa-form{
    background-color: #737373;
}

/*Imagem da seta azul na tabela de Programa de formação */
#logoSeta {
    background-color: #090B2E;
    height: 50px;
    width: 50px;
    left: 426px;
    top: 222px;
    border-radius: 3px;

}

/*Tabela de acompanhmento*/
.tabela{
    border: 1px solid #c2bcbc !important;
    background-color: #FFFFFF;
}

#logoBoneco {
    background-color: #FFB700;
    width: 20px;
    cursor: pointer;
}

th {
    font-weight: bold;
    font-style: normal;
    width: 40px;
    text-align: center;
}

td {
    color: #737373;
    font-style: normal;
}

.busca-formação{
    height:200px;
}

.scroll-tabela{
    overflow-y: scroll;
    max-height:340px;
}

/*Botão de buscar*/
.botao {
    font-weight: bold !important;
    background-color: #AB0045 !important;
    border-style: none;
    transition: 300ms;
}

.botao:hover{
    background-color: #9a0045 !important;
}

.titulo{
    color: #090B2E;
}

.recarregar{
    color: white !important;
    font-weight: bold !important;
    border-radius: 5px !important;
    background-color: #090B2E !important;
    max-width: 50%;
    cursor: pointer !important;
    transition: all linear 0.3s !important;
}

.recarregar:hover{
    background-color: #141863 !important;
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
