<template>
  <Header link="../relatorios-gerencial"/>

  <main>

    <div class="container" id="relatorio">
      <!-- Informações do programa de formação turma e programa selecionados -->
      <div class="relatorio-programa-selecionado">
        <h2 class="txtRelatorio">Relatório Investimento</h2>
        <h2 class="txtFormacao">Programa de formação selecionado:<span class="buscaFormacao">{{relatorio.formacao}}</span></h2>
        <h2 class="txtTurma">Turma: <span class="buscaTurma">{{relatorio.turma}}</span></h2>
      </div>

      <!-- Cards Superiores da pagina ou antes do filtro -->
      <section >
        <div class="card-left-superior" >
          <div class="card" style="height: auto; width: 100%">
            <div class="card-body">
              <h3 id="txt-saida-card-left" class="card-title" >R$ {{formatPrice(relatorio.investParticipantes)}}</h3>
              <h6>Investimento em total com participantes</h6>
            </div>
          </div>
        </div>

        <div class="card-central-superior" >
          <div class="card" style="height: auto; width: 100%">
            <div class="card-body">
              <h3 id="txt-saida-card-central" class="card-title">R$ {{formatPrice(relatorio.investInstrutores)}}</h3>
              <h6>Investimento total com instrutores</h6>
            </div>
          </div>
        </div>

        <div class="card-right-superior" >
          <div class="card" style="height: auto; width: 100%">
            <div class="card-body">
              <h3 id="txt-saida-card-right" class="card-title">R$ {{formatPrice(relatorio.investTotal)}}</h3>
              <h6 id="txt-cards-valor-total">Investimento total com o programa</h6>
            </div>
          </div>
        </div>
      </section>

        <!-- Filtro Mês e ano -->
        <form action="" >
          <div class="filtro">
            <label class="selecioneData">Selecione dia, mês e ano</label>
            <input type="date" id="dataInicial" name="dataInicial" ref="dataInicial"/>
            <label class="labelData">até</label>
            <input type="date" id="dataFinal" name="dataFinal" ref="dataFinal"/>
            <p id="dataInicioSelect" class="erro none"> Por favor selecione uma data de início válida </p>
            <p id="dataFinalSelect" class="erro none"> Por favor selecione uma data de término válida </p>
            <p id="dataInvalida" class="erro none"> A data de término deve ser posterior a data de inicio </p>
            <!-- Botão consultar data -->
            <input id="bottonConsultaData" type="button" class="btn btn-primary btn-lg"  v-on:click="validaSelectData()" value="CONSULTAR">
          </div>
       </form>

      <!-- Cards inferiores -->
      <div id="relatorioPeriodo">
        <section>
          <div class="card-left-inferior" id="dataSelecionada">
            <div class="card" style="height: 100%; width: 100%">
              <div class="card-body">
                <h3 id="txt-saida-card-left" class="card-title">R$ {{formatPrice(relatorioPeriodo.investParticipantesPeriodoSelecionado)}}</h3>
                <h6>Investimento total em participantes no periodo</h6>
              </div>
            </div>
          </div>

          <div class="card-central-inferior" id="dataSelecionada">
            <div class="card">
              <div class="card-body" style="height: 100%; width: 100%">
                <h3 id="txt-saida-card-central" class="card-title">R$ {{formatPrice(relatorioPeriodo.investInstrutoresPeriodoSelecionado)}}</h3>
                <h6>Investimento total em instrutores no periodo</h6>
              </div>
            </div>
          </div>

          <div class="card-right-inferior" id="dataSelecionada">
            <div class="card" style="height: auto; width: 100%">
              <div class="card-body">
                <h3 id="txt-saida-card-right" class="card-title">R$ {{formatPrice(relatorioPeriodo.investTotalPeriodoSelecionado)}}</h3>
                <h6 id="txt-cards-valor-total">Investimento total do periodo</h6>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Botões gerar relatorio PDF e XLSX -->
      <div class="botao">
        <div class="botao-div01">
          <button
            id="botao_pdf"
            type="button"
            class="btn btn-primary btn-lg none"
            v-on:click="downloadRelatorioPDF()">GERAR PDF
          </button>
        </div>

        <div class="botao-div02">
          <button
            id="botao_xlsx"
            type="button"
            class="btn btn-primary btn-lg none"
            v-on:click="downloadRelatorioXLSX()">GERAR XLSX
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Header from '@/components/Header.vue'
import { http } from '../../services/Config'
import Funcoes from '../../services/Funcoes'
import { variavelBack} from '../../services/VariavelBack'

export default {
  name: 'App',
  components: {
    Header
  },
  data () {
    return {
      relatorio: {},
      parametrosUrl: {},
      relatorioPeriodo: {},
      dataInicial: '',
      dataFinal: ''
    }
  },
  beforeMount () {
    Funcoes.verificaToken()
  },
  created () {
    this.getParams()
    this.getInvestimentos()
  },
  methods: {
    getParams () {
      var query = location.search.slice(1)
      var partes = query.split('&')
      var data = {}
      partes.forEach(function (parte) {
        var chaveValor = parte.split('=')
        var chave = chaveValor[0]
        var valor = chaveValor[1]
        data[chave] = valor
      })

      this.parametrosUrl = data
    },
    
    getInvestimentos () {
      http
        .get('investimentos/investimentosPrograma/' + this.parametrosUrl.formacao + '/' + this.parametrosUrl.turma)
        .then(response => (this.relatorio = response.data))
    },

    selecionarData () {
      this.dataInicial = this.$refs.dataInicial.value
      this.dataFinal = this.$refs.dataFinal.value

      http
        .get('investimentos/investimentoPeriodoSelecionado/' + this.parametrosUrl.formacao + '/' + this.parametrosUrl.turma + '/' + this.dataInicial + '/' + this.dataFinal)
        .then(response => {
          this.relatorioPeriodo = response.data
          document.querySelector('#botao_pdf').classList.remove('none')
          document.querySelector('#botao_xlsx').classList.remove('none')
        })
    },

    validaSelectData () {
      this.dataInicial = this.$refs.dataInicial.value
      this.dataFinal = this.$refs.dataFinal.value
      let erro = 0
      if (this.dataInicial == '') {
        document.querySelector('#dataInicioSelect').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#dataInicioSelect').classList.add('none')
        erro = 0
      }
      if (this.dataFinal == '') {
        document.querySelector('#dataFinalSelect').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#dataFinalSelect').classList.add('none')
        erro = 0
      }
      if (this.dataFinal < this.dataInicial && this.dataInicial != '' && this.dataFinal != '') {
        erro = 1
        document.querySelector('#dataInvalida').classList.remove('none')
      } else {
        erro = 0
        document.querySelector('#dataInvalida').classList.add('none')
      }
      if (erro == 1) {
        return false
      } else {
        this.selecionarData()
      }
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    downloadRelatorioPDF () {
      location.href = variavelBack +  'investimentos/' + this.parametrosUrl.formacao + '/' + this.parametrosUrl.turma + '/' + this.dataInicial + '/' + this.dataFinal + '/pdf'
    },

    downloadRelatorioXLSX () {
      location.href = variavelBack + 'investimentos/' + this.parametrosUrl.formacao + '/' + this.parametrosUrl.turma + '/' + this.dataInicial + '/' + this.dataFinal + '/xlsx'
    }
  }
}
</script>

<style>
/*configurações gerais da pagina*/
* {
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
  margin: 0;
  padding: 0;
  text-decoration: none;
}

html {
  /* para cada 1rem considera 10px */
  font-size: 70%;
  overflow-x: hidden;
}

body {
  background-color: #ebebeb !important;
  
}

.none {
  display: none;
}

.erro {
  color: red;
  font-size: 18px;
  padding-left: 32px;
  font-weight: bold;
}

/* Relatório - Investimento */
/*Configuração info programa de formação cabecalho*/
.txtRelatorio,
.txtFormacao,
.txtTurma,
.buscaFormacao,
.buscaTurma {
  font-weight: bold;
  font-size: 2.3rem !important;
  line-height: 2rem;
  margin-left: 15%;
  font-weight: 900;
}

/* Programa Selecionado */
.buscaFormacao {
  color: #737373;
}

/* Turma selecionada */
.buscaTurma {
  color: #737373;
}

/* card central superior */
.card-left-superior,
.card-central-superior,
.card-right-superior,
.card-left-inferior,
.card-central-inferior,
.card-right-inferior {
  border: 1px solid #bcb3b3;
  min-height: 275px !important;
  box-shadow: 4px 4px 4px #ccc;
  border-radius: 5px;
}

main .card-body {
  min-height: 275px !important;
}

/* configurações dados contidos nos Cards inferior e superior */
h3 {
  font-weight: 900;
  margin: 30px 30px 10px 0;
}

#txt-saida-card-left {
  font-size: 35px !important;
  color: #ab0045;
}

#txt-saida-card-central {
  font-size: 35px !important;
  color: #ffb600;
}

#txt-saida-card-right {
  font-size: 35px !important;
  color: #090b2e;
}

h6 {
  margin-top: 130px;
  color: #737373;
  width: 100%;
  font-weight: 700;
  line-height: 22px;
}

/* Configurações Filtro Select */
.selecioneData,
.labelData,
#bottonConsultaData {
  display: inline;
  font-weight: 700;
  font-size: 2rem;
}

#dataInicial,
#dataFinal {
  border-radius: 3px;
  background-color: #ffffff;

}

#bottonConsultaData {
  background-color: #ffffff;
  margin-left: 5%;
  width: 465;
  color: #090b2e;
  height: 4rem;
  border-radius: 7px;
  border: none;
}

/* Configurações botões pdf e xlsx */
#botao_pdf,
#botao_xlsx {
  width: 100%;
  height: 4.6rem;
  border-radius: 7px;
  font-weight: bold;
  font-size: 1.9rem;
  border: none;
}

.botao {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#botao_pdf {
  background: #ab0045;
 
}

#botao_xlsx {
  background: #ffb600;

}

/* Efeito botões relatorio e Filtro*/
#botao_pdf:hover,
#botao_xlsx:hover {
  transform: translate(2px, 5px);
  box-shadow: 1px 6px 15px rgba(0, 0, 0, 0.6);
  transition: 0.3s;
}

#dataInicial:hover,
#dataFinal:hover {
  transform: scale(1.01);
  box-shadow: 1px 5px 15px rgba(0, 0, 0, 0.6);
  transition: 00.3s;
}

#bottonConsultaData:hover {
  background-color: #090b2e;
  color: #ffffff;
}

/*Layout Responsivo*/
/* media queries */
@media (min-width: 320px) {
  html,
  body {
    overflow-x: hidden;
  }

  .header {
    max-height: 60px;
  }

  .home,
  .btn-header img,
  .rollback {
    max-height: 60px;
  }

  .logo img {
    max-height: 60px;
  }

  /*Informações uteis pós cabeçalho*/
  .txtRelatorio,
  .txtFormacao,
  .txtTurma,
  .buscaFormacao,
  .buscaTurma {
    font-size: 1.4rem !important;
    margin-left: 8%;
    line-height: 25px;
    text-align: center;
  }

  .txtRelatorio {
    margin-top: 20px;
  }

  .txtFormacao {
    display: block;
    width: 70%;
    margin-top: 8px;
    margin-left: 19%;
  }

  .txtTurma,
  .buscaTurma {
    margin-top: 10px;
  }

  /*Cards*/
  h3 {
    font-size: 3.4rem !important ;
    position: relative;
    top: 30px;
    font-weight: 600 !important;
  }

  h6 {
    font-size: 1.5rem !important;
    position: relative;
    bottom: 20px;
    max-width: 90%;
  }

  .card-left-superior,
  .card-central-superior,
  .card-right-superior,
  .card-left-inferior,
  .card-central-inferior,
  .card-right-inferior {
    width: 93%;
    height: 10%;
    margin-left: 10px;
    margin-top: 10%;
  }

  /*Filtro de data*/
  #dataInicial,
  #dataFinal,
  .selecioneData,
  .labelData,
  #bottonConsultaData {
    display: block;
    font-size: 1.5rem;
    margin-top: 10%;
    text-align: center;
  }

  #dataInicial,
  #dataFinal {
    margin-left: 22%;
  }

  .selecioneData {
    margin-top: 16%;
  }

  #bottonConsultaData {
    margin-left: 29%;
  }

  /*Botões de relatorio*/
  #botao_pdf,
  #botao_xlsx {
    font-size: 1.3rem;
    width: 150px !important;
    height: 8vh;
  }

  .botao-div01,
  .botao-div02 {
    padding: 0 !important;
    margin: 10px 5px !important;
  }
}

@media (min-width: 425px) {
  body {
    overflow-x: hidden !important;
  }

  /*Informações uteis pós cabeçalho*/
  .txtRelatorio,
  .txtFormacao,
  .txtTurma,
  .buscaFormacao,
  .buscaTurma {
    font-size: 2rem !important;
    line-height: 40px;
    margin-left: 0%;
  }

  .txtFormacao {
    margin-top: 5.2%;
    margin-left: 14%;
  }

  .buscaFormacao {
    margin-left: 1vmax;
  }

  .txtTurma {
    margin-top: 5.2%;
  }

  /*Cards*/
  h3 {
    font-size: 4.5rem !important;
    margin-left: 3vh;
  }

  h6 {
    font-size: 1.7rem !important;
    margin-left: 3vh;
  }

  .card-left-superior,
  .card-central-superior,
  .card-right-superior,
  .card-left-inferior,
  .card-central-inferior,
  .card-right-inferior {
    margin-left: 3.6%;
  }

  /*Filtro de data*/
  #dataInicial,
  #dataFinal,
  .selecioneData,
  .labelData,
  #bottonConsultaData {
    font-size: 2rem;
  }
  #dataInicial,
  #dataFinal{
      margin-left: 92px;
  }
  #bottonConsultaData {
    margin-left: 30%;
  }

  #botao_pdf,
  #botao_xlsx {
    width: 170px !important;
  }
}

/*Config Filtro de data*/
@media (min-width: 500px) {
  #dataInicial,
  #dataFinal {
    margin-left: 27%;
  }
}

/*Config Filtro de data*/
@media (min-width: 580px) {
  #dataInicial,
  #dataFinal {
    margin-left: 30%;
  }
  #bottonConsultaData {
    margin-left: 36.5%;
  }
}

/*Config Filtro de data*/
@media (min-width: 680px) {
  #dataInicial,
  #dataFinal,
  .selecioneData,
  .labelData,
  #bottonConsultaData {
    margin-top: 4%;
  }

  #dataInicial,
  #dataFinal {
    margin-left: 30%;
  }

  #bottonConsultaData {
    margin-left: 190px;
  }
}

@media (min-width: 768px) {
  /*Informações úteis pós cabeçalho*/
  .txtFormacao,
  .txtTurma {
    margin-top: 0%;
  }

  .buscaFormacao {
    margin-left: 5%;
  }

  .buscaTurma {
    margin-left: 3%;
  }

  /*Cards*/
  h3 {
    font-size: 3.8rem !important;
  }

  #txt-saida-card-right {
    font-size: 5.4rem !important;
  }

  #txt-cards-valor-total {
    font-size: 2rem !important;
  }

  /*Layout Cards*/
  .card-left-superior,
  .card-central-superior,
  .card-left-inferior,
  .card-central-inferior {
    display: inline-flex;
    width: 44.5%;
    margin-top: 6%;
  }

  .card-right-superior,
  .card-right-inferior {
    margin-top: 5%;
  }

  #dataInicial,
  #dataFinal {
    margin-left: 240px;
  }

  #bottonConsultaData {
    margin-left: 271px;
  }

  #botao_pdf,
  #botao_xlsx {
    width: 300px !important;
    margin: 10px 10px;
  }
}

@media (min-width: 865px) {
  #dataInicial,
  #dataFinal {
    margin-left: 240px;
  }
}

@media (min-width: 992px){
  #dataInicial,
  #dataFinal {
    margin-left: 360px;
  }
  #bottonConsultaData {
    margin-left: 390px;
  }
}

@media (min-width: 1024px) {
  .header {
    max-height: 75px;
  }

  .home,
  .btn-header img,
  .rollback {
    max-height: 75px;
  }

  .logo img {
    max-height: 75px;
  }

  .txtRelatorio,
  .txtFormacao,
  .txtTurma,
  .buscaFormacao,
  .buscaTurma {
    display: inline-table;
    width: auto;
    margin-top: 18px;
    font-size: 1.92rem !important;
  }

  .txtRelatorio {
    margin-left: 1.8%;
    margin-top: 7px;
  }

  .txtFormacao {
    display: inline;
    margin-left: 3%;
  }

  .buscaFormacao {
    margin-left: 1%;
  }

  .txtTurma {
    display: inline;
    margin-left: 3%;
  }

  .buscaTurma {
    margin-left: 1%;
  }

  /*Cards*/
  h3 {
    font-size: 3.8rem !important;
    font-weight: bold !important;
  }

  #txt-saida-card-right {
    font-size: 35px !important;
  }

  #txt-cards-valor-total {
    font-size: 1.6rem !important;
    text-align: justify;
  }

  h6{
      font-size: 1.6rem !important;
    
  }

  .card-left-superior,
  .card-central-superior,
  .card-right-superior,
  .card-left-inferior,
  .card-central-inferior,
  .card-right-inferior {
    margin-top: 3%;
    display: inline-block;
    width: 30.5%;
    margin-left: 2%;
  }

  .card-left-superior {
    height: auto;
  }

  .selecioneData {
    margin-bottom: 2%;
  }

  .selecioneData,
  #dataInicial,
  #dataFinal,
  .labelData,
  #bottonConsultaData {
    display: flex;
    margin-left: 2.5%;
  }

  #dataInicial,
  #dataFinal,
  .labelData,
  #bottonConsultaData {
    display: inline-table;
    margin-top: 1%;
    margin-bottom: 2%;

  }

  #bottonConsultaData {
    display: grid;
    width: 320px;
    font-size: 2rem !important;
    margin-top: 25px;
    margin-left: 145px;
  }

  #botao_pdf,
  #botao_xlsx {
    margin-left: 1%;
    width: 450px !important;
    height: 50px;
    font-size: 1.8rem !important;
    margin: 20px 5px 5px 0px;
  }
}
</style>