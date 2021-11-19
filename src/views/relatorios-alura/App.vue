<template>
  <div class="background">
    <Header />
    <main>
        <div class="container" id="relatorio">
            <!-- Informações do programa e turma selecionados -->
            <section class="informacoes-relatorio">
              <div>
                <div class="tipo-relatorio">
                  <p>Relatório - Alura:</p>
                </div>
                <!--Trocar o java pelo programa selecionado!-->
                <div class="tipo-relatorio">
                  <p>Programa de Formação selecionado: <span id="programa">{{relatorio.programaDeFormacao}}</span></p>
                </div>
                <!--Trocar o Java 01 pela turma selecionada!-->
                <div class="tipo-relatorio">
                  <p>Turma: <span id="turma">{{relatorio.turma}}</span></p>
                </div>
              </div>
            </section>
            <!-- Cards com as estatísticas sobre o programa selecionado -->
            <section class="cards">
              <div class="row">
                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6" id="coluna">
                  <div id="media-hora">
                    <div class="card mb-4" id="card-grande">
                      <div class="card-body">
                        <h1 class="card-title" id="titulo-media-hora">{{relatorio.mediaDeHorasDosParticipantes}}</h1>
                        <p class="card-text">Media de horas por participante.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6" id="coluna">
                  <div id="maior-hora">
                    <div class="card mb-4" id="card-grande" @mouseover="mostrarFuncionarioMaiorQntHoras = true" @mouseleave="mostrarFuncionarioMaiorQntHoras = false">
                      <div class="card-body">
                        <h1 class="card-title" id="titulo-maior-hora">{{relatorio.maiorQuantidadeDeHorasDosParticipantes}}</h1>
                        <p class="card-text">Maior quantidade de horas por participante.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6" id="coluna">
                  <div id="menor-hora">
                    <div class="card mb-4" id="card-grande" @mouseover="mostrarFuncionarioMenorQntHoras = true" @mouseleave="mostrarFuncionarioMenorQntHoras = false">
                      <div class="card-body">
                        <h1 class="card-title" id="titulo-menor-hora">{{relatorio.menorQuantidadeDeHorasDosParticipantes}}</h1>
                        <p class="card-text">Menor quantidade de horas por participante.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6" id="coluna">
                  <div id="ultimo-registro">
                    <div class="card mb-4" id="card-grande">
                      <div class="card-body">
                        <h1 class="card-title" id="titulo-ultimo-registro">{{relatorio.dataUltimoRegistro}}</h1>
                        <p class="card-text" id="texto-ultimo-registro">Data do último registro.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Cards sobre funcionario referente a determinada estatística -->
                <!-- Só aparecerá com o hover nas estatísticas de maior e menor horas de curso -->
                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6" id="coluna">
                  <div id="funcionario-maior-hora">
                    <div class="card mb-4" id="card-grande" v-show="mostrarFuncionarioMaiorQntHoras">
                      <div class="card-body">
                      <h6 class="card-title" id="nome-funcionario">{{relatorio.nomeFuncionarioComMaiorQuantidadeHoras}}</h6>
                      <p class="card-text" id="cargo">{{relatorio.cargoFuncionarioComMaiorQuantidadeHoras}}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6" id="coluna">
                  <div id="funcionario-menor-hora">
                    <div class="card mb-4" id="card-grande" v-show="mostrarFuncionarioMenorQntHoras">
                      
                      <div class="card-body">
                      <h6 class="card-title" id="nome-funcionario">{{relatorio.nomeFuncionarioComMenorQuantidadeHoras}}</h6>
                      <p class="card-text" id="cargo">{{relatorio.cargoFuncionarioComMenorQuantidadeHoras}}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <!-- Botões para gerar o relatório em pdf ou excel -->
            <section class="buttons">
              <div class="d-flex justify-content-between">
                <button type="button" class="btn btn-danger" v-on:click="downloadRelatorioPDF()" id="btn-pdf">GERAR PDF</button>
                <button type="button" class="btn btn-warning" v-on:click="downloadRelatorioXLSX()" id="btn-xlsx">GERAR XLSX</button>
              </div>
            </section>
          </div>
    </main>
  </div>
</template>

<script>
import Header from "@/components/Header.vue"
import { http } from '../../services/config'
import  Funcoes from '../../services/Funcoes'

export default {
  name: "App",
  components: {
    Header,
  },
  data(){
    return {
      relatorio: {},
      mostrarFuncionarioMaiorQntHoras: false,
			mostrarFuncionarioMenorQntHoras: false,
      parametrosUrl:{}
    };
  },

  beforeMount(){
    Funcoes.verificaToken();
  },

  created(){
    this.getParams();
    this.getRelatorio();
  },
  methods: {
    getParams() {
      var query = location.search.slice(1);
      var partes = query.split('&');
      var data = {};
      partes.forEach(function (parte) {
        var chaveValor = parte.split('=');
        var chave = chaveValor[0];
        var valor = chaveValor[1];
        data[chave] = valor;
      });
    this.parametrosUrl = data;
    console.log(this.parametrosUrl);
    },

    getRelatorio() {
      http.get('relatorio-alura/formacao=' + this.parametrosUrl.formacao + '/turma=' + this.parametrosUrl.turma + '/escopo=' + this.parametrosUrl.escopo)
      .then(res => this.relatorio = res.data);
    },

    downloadRelatorioPDF(){
      location.href = 'http://localhost:8081/api/relatorio-alura/formacao=' + this.parametrosUrl.formacao + '/turma=' + this.parametrosUrl.turma + '/pdf'
    },

    downloadRelatorioXLSX(){
      location.href = 'http://localhost:8081/api/relatorio-alura/formacao=' + this.parametrosUrl.formacao + '/turma=' + this.parametrosUrl.turma + '/xlsx'
    }
  },
};
</script>

<style>
*{
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
    margin: 0;
    padding: 0;
    text-decoration: none;
}

.background{
    background-color: #EBEBEB;
}

/* Header */
.header{
    background-color: #090B2E;
    height: 75px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.btn-header{
    height: 75px;
    width: 75px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.disabled{
    display: none !important; 
}

.btn-header img, .logo img{
    height: 50px;
}

.home.btn-header{
    background-color: #FFB700;
}

.rollback.btn-header{
    background-color: #AB0045;
}

.container{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 1.5em;
}

/* Informações do tipo de relatório */
.tipo-relatorio{
    display: inline-block;
    font-weight: bold;
    font-size: 20px;
    color: #090B2E;
    padding-left: 50px;
}

#programa, #turma{
    color: #9e9d9d;
}

/* Cards */
/* Tamanho / Posição */
#card-grande {
    width: 20rem;
    height: 11rem;
    padding: 5px;
    box-shadow: 4px 4px 4px #ccc;
}

#coluna{
    margin-right: 15px;
}

/* Títulos dos cards */
#titulo-media-hora{
    font-weight: 700;
    font-size: 70px;
    color: #AB0045;
}

#titulo-maior-hora{
    font-weight: 700;
    font-size: 70px;
    color: #FFB700;
}

#titulo-menor-hora{
    font-weight: 700;
    font-size: 70px;
    color: #090B2E;
}

#titulo-ultimo-registro{
    font-weight: 700;
    font-size: 40px;
    color: #AB0045;
    padding-bottom: 10px;
}

/* Texto dos cards */
#texto-ultimo-registro{
    padding-top: 30px;
}

/* Cards de hover */
.card-image{
    padding-top: 5px;
    align-self: center;
    width: 70px;
    height: 70px;
}

.card-body{
    text-align: center;
    color: #090B2E;
}

#nome-funcionario{
    padding-top: 15px;
    font-weight: bold;
    font-size: 26px;
}

#cargo {
    font-size: 22px;
}

.card-text{
    font-weight: 500;
}

/* Botões gerar pdf e xlsx */
#btn-pdf{
    width: 300px;
    font-weight: bold;
}

#btn-xlsx{
    width: 300px;
    font-weight: bold;
    color: white;
}

/* Responsividade */
@media(max-width:1399px){
  /* Cards */
    /* Tamanho / Posição */
    #card-grande {
        width: 17rem;
        height: 11rem;
        padding: 5px;
    }
}
@media(max-width: 1199px){
    /* Informações do tipo de relatório */
    .tipo-relatorio{
        font-size: 18px;
    }

    /* Cards */
    /* Posição */
    #coluna{
        margin-right: 60px;
    }
}

@media(max-width: 991px){
    .container{
        justify-content: center;
    }
    /* Informações do tipo de relatório */
    .tipo-relatorio{
        padding-left: 0px;
        padding-right: 7px;
        font-size: 17px;
    }

    /* Cards */
    /* Tamanho / Posição */
    #card-grande{
        width: 14rem;
        align-self: initial;
    }

    #coluna{
        margin-right: 60px;
    }

    /* Títulos dos cards */
    #titulo-media-hora, #titulo-maior-hora, #titulo-menor-hora{
        font-size: 60px;
    }

    #titulo-ultimo-registro{
        font-size: 30px;
    }

    /* Texto dos cards */
    .card-text{
        font-size: 15px;
    }

    #nome-funcionario{
        font-size: 23px;
        padding-bottom: 5px;
    }

    #cargo {
      font-size: 19px;
    }

    #ultimo-registro{
      position: relative;
      left: 235px;
      bottom: 400px;
    }

    #maior-hora{
      position: relative;
      top: 200px;
    }

    #funcionario-menor-hora{
      position: relative;
      bottom: 200px;
    }

    #btn-pdf{
      position: absolute;
      left: 49px;
      top: 800px;
    }

    #btn-xlsx{
      position: absolute;
      left: 400px;
      top: 800px;
    }
}

@media(max-width: 767px){
    /* Cards */
    /* Tamanho / Posição */
    #card-grande{
        width: 12rem;
        align-self: initial;
    }

    #ultimo-registro{
        position: relative;
        left: 220px;
        bottom: 600px;
    }

    #maior-hora{
      position: relative;
      top: 0px;
    }

    #menor-hora{
        position: relative;
        left: 220px;
        bottom: 200px;
    }

    #funcionario-maior-hora{
        position: relative;
        bottom: 400px;
    }

    #funcionario-menor-hora{
        position: relative;
        bottom: 400px;
        left: 220px;
    }

    /* Títulos dos cards */
    #titulo-media-hora, #titulo-maior-hora, #titulo-menor-hora{
        font-size: 50px;
    }

    #titulo-ultimo-registro{
        font-size: 25px;
    }

    /* Botões gerar pdf e xlsx */
    #btn-pdf{
        position: absolute;
        margin-right: 15px;
        top: 850px;
        width: 193px;
    }

    #btn-xlsx{
        position: absolute;
        top: 850px;
        left: 330px;
        width: 193px;
    }
}

@media(max-width: 575px){
    /* Botões gerar pdf e xlsx */
    #btn-pdf{
        position: absolute;
        margin-right: 15px;
        top: 850px;
        width: 193px;
    }

    #btn-xlsx{
        position: absolute;
        top: 850px;
        left: 250px;
        width: 193px;
    }
}
</style>