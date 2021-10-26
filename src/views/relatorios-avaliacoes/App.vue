<template>
  <div class="background">
    <Header/>
    <main>
      <div class="container" id="relatorio">
        <!-- Informações do programa e turma selecionados -->
        <section class="informacoes-relatorio">
          <div>
            <div class="tipo-relatorio">
              <p>Relatório - Avaliações:</p>
            </div>
            <!--Trocar o java pelo programa selecionado!-->
            <div class="tipo-relatorio">
              <p>Programa de Formação selecionado: <span id="programa">{{ relatorio.programaDeFormacao }}</span></p>
            </div>
            <!--Trocar o Java 01 pela turma selecionada!-->
            <div class="tipo-relatorio">
              <p>Turma: <span id="turma">{{ relatorio.turma }}</span></p>
            </div>
          </div>
        </section>
        <!-- Cards com as estatísticas sobre o programa selecionado -->
        <section class="cards">
          <div class="row">
            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-5" id="coluna">
              <div class="card mb-4" id="card-grande">
                <div class="card-body">
                  <h1 class="card-title" id="titulo-nota-tecnica">{{ relatorio.notaMediaAvaliacaoTecnica }}</h1>
                  <p class="card-text" id="texto-nota-tecnica">Nota máedia da avaliação técnica.</p>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-5" id="coluna">
              <div class="nota-media-comportamental">
                <div class="card mb-4" id="card-grande">
                  <div class="card-body">
                    <h1 class="card-title" id="titulo-nota-comportamental">
                      {{ relatorio.notaMediaAvaliacaoComportamental }}</h1>
                    <p class="card-text" id="texto-nota-comportamental">Nota média da avaliação comportamental.</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-4" id="coluna">
              <div class="nota-media-praticas-ageis">
                <div class="card mb-4" id="card-pequeno">
                  <div class="card-body">
                    <h1 class="card-title" id="titulo-nota-praticas-ageis">
                      {{ relatorio.notaMediaAvaliacaoPraticasAgeis }}</h1>
                    <p class="card-text" id="texto-praticas-ageis">Nota média da avaliação do Módulo Práticas Ágeis.</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-4" id="coluna">
              <div class="nota-media-lideranca">
                <div class="card mb-4" id="card-pequeno">
                  <div class="card-body">
                    <h1 class="card-title" id="titulo-nota-lideranca">{{ relatorio.notaMediaAvaliacaoLideranca }}</h1>
                    <p class="card-text" id="texto-lideranca">Nota média da avaliação do Módulo Liderança.</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-4" id="coluna">
              <div class="nota-media-negocio">
                <div class="card mb-3" id="card-pequeno">
                  <div class="card-body">
                    <h1 class="card-title" id="titulo-nota-negocio">{{ relatorio.notaMediaAvaliacaoNegocio }}</h1>
                    <p class="card-text" id="texto-negocio">Nota média da avaliação do Módulo Negócio.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xl-3 col-lg-3" id="coluna">
              <div class="ultimo-ciclo">
                <div class="card mb-4" id="card-grande">
                  <div class="card-body">
                    <h1 class="card-title" id="titulo-ultimo-ciclo">{{ relatorio.ultimoCicloRegistrado }}</h1>
                    <p class="card-text" id="texto-ultimo-cliclo">Último ciclo de avaliações registrado.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <!-- Botões para gerar o relatório em pdf ou excel -->
        <section class="buttons">
          <div class="d-flex justify-content-between">
            <button type="button" class="btn btn-danger"
                    onclick="location.href = 'http://localhost:8080/api/relatorio-alura/pdf'" id="btn-pdf">GERAR PDF
            </button>
            <button type="button" class="btn btn-warning"
                    onclick="location.href = 'http://localhost:8080/api/relatorio-alura/xlsx'" id="btn-xlsx">GERAR XLSX
            </button>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Funcoes from '../../services/Funcoes'
import Cookie from 'js-cookie'
// import axios from 'axios'

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
      relatorio: {}
    }
  // },
  // created () {
  //   this.getRelatorio()
  // },
  // methods: {
    // getRelatorio () {
    //   axios.get('http://localhost:8080/api/relatorio-avaliacao')
    //     // eslint-disable-next-line no-return-assign
    //     .then(response => this.relatorio = response.data)
    // }
  },
  beforeMount () {
    Funcoes.verificaToken()
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
  margin: 0;
  padding: 0;
  text-decoration: none;
}

.background {
  background-color: #EBEBEB;
}

/* Header */
.header {
  background-color: #090B2E;
  height: 75px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.btn-header {
  height: 75px;
  width: 75px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.disabled {
  display: none !important;
}

.btn-header img, .logo img {
  height: 50px;
}

.home.btn-header {
  background-color: #FFB700;
}

.rollback.btn-header {
  background-color: #AB0045;
}

.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.5em;
}

/* Informações do tipo de relatório */
.tipo-relatorio {
  display: inline-block;
  font-weight: bold;
  font-size: 20px;
  color: #090B2E;
  padding-left: 50px;
}

#programa, #turma {
  color: #9e9d9d;
}

/* Cards */
/* Tamanho / Posição */
#card-grande {
  width: 19.7rem;
  height: 11rem;
  padding: 5px;
  box-shadow: 4px 4px 4px #ccc;
}

#card-pequeno {
  width: 13rem;
  height: 11rem;
  padding: 5px;
  box-shadow: 4px 4px 4px #ccc;
}

#titulo-nota-tecnica {
  font-weight: 700;
  font-size: 70px;
  color: #AB0045;
}

/* Titulo dos cards */
#titulo-nota-comportamental {
  font-weight: 700;
  font-size: 70px;
  color: #FFB700;
}

#titulo-nota-lideranca {
  font-weight: 700;
  font-size: 40px;
  color: #AB0045;
  padding-bottom: 10px;
}

#titulo-nota-praticas-ageis {
  font-weight: 700;
  font-size: 40px;
  color: #090B2E;
  padding-bottom: 5px;
}

#titulo-nota-negocio {
  font-weight: 700;
  font-size: 40px;
  color: #FFB700;
  padding-bottom: 5px;
}

#titulo-ultimo-ciclo {
  font-weight: 700;
  font-size: 70px;
  color: #090B2E;
  padding-bottom: 5px;
}

/* Texto dos cards */
#texto-praticas-ageis, #texto-lideranca, #texto-negocio {
  font-size: 15px;
}

#text-ultimo-cliclo {
  padding-bottom: 5px;
}

/* Botões gerar pdf e xlsx */
#btn-pdf {
  width: 300px;
  font-weight: bold;
}

#btn-xlsx {
  width: 300px;
  font-weight: bold;
  color: white;
}

/* Responsividade */
@media (max-width: 1399px) {
  /* Cards */
  /* Tamanho / Posição */
  #card-grande {
    width: 17rem;
    height: 11rem;
    padding: 5px;
  }

  #card-pequeno {
    width: 11rem;
    height: 11rem;
    padding: 5px;
  }
}

@media (max-width: 1199px) {
  /* Informações do tipo de relatório */
  .tipo-relatorio {
    font-size: 18px;
  }

  /* Cards */
  /* Tamanho / Posição */
  #card-grande {
    width: 14rem;
    height: 11rem;
    padding: 5px;
  }

  #card-pequeno {
    width: 9rem;
    height: 11rem;
    padding: 5px;
  }

  #coluna {
    margin-right: 0px;
  }

  /* Titulo dos cards */
  #titulo-nota-tecnica, #titulo-nota-comportamental, #titulo-ultimo-ciclo {
    font-size: 60px;
  }

  #titulo-nota-lideranca, #titulo-nota-praticas-ageis, #titulo-nota-negocio {
    font-size: 25px;
  }

  /* Texto dos cards */
  #texto-praticas-ageis, #texto-lideranca, #texto-negocio {
    font-size: 15px;
  }

  #texto-nota-tecnica, #texto-nota-comportamental {
    font-size: 15px;
  }
}

@media (max-width: 991px) {
  /* Informações do tipo de relatório */
  .tipo-relatorio {
    font-size: 13px;
  }

  /* Cards */
  /* Tamanho / Posição */
  #card-grande {
    width: 10.5rem;
    height: 11rem;
    padding: 5px;
  }

  #card-pequeno {
    width: 7rem;
    height: 11rem;
    padding: 5px;
  }

  /* Titulo dos cards */
  #titulo-nota-tecnica, #titulo-nota-comportamental, #titulo-ultimo-ciclo {
    font-size: 50px;
  }

  #titulo-nota-lideranca, #titulo-nota-praticas-ageis, #titulo-nota-negocio {
    font-size: 24px;
  }

  /* Texto dos cards */
  #texto-praticas-ageis, #texto-lideranca, #texto-negocio {
    font-size: 12px;
  }

}

@media (max-width: 767px) {
  /* Informações do tipo de relatório */
  .tipo-relatorio {
    font-size: 15px;
  }

  /* Cards */
  /* Tamanho / Posição */
  #card-grande {
    width: 13rem;
    height: 12rem;
    padding: 5px;
  }

  #card-pequeno {
    width: 10rem;
    height: 11rem;
    padding: 5px;
  }

  /* Titulo dos cards */
  #titulo-nota-tecnica, #titulo-nota-comportamental, #titulo-ultimo-ciclo {
    font-size: 60px;
  }

  #titulo-nota-lideranca, #titulo-nota-praticas-ageis, #titulo-nota-negocio {
    font-size: 30px;
  }

  /* Texto dos cards */
  #texto-praticas-ageis, #texto-lideranca, #texto-negocio {
    font-size: 14px;
  }

  /* Botões gerar pdf e xlsx */
  #btn-pdf {
    width: 300px;
    font-weight: bold;
    margin-right: 15px;
  }

  #btn-xlsx {
    width: 300px;
    font-weight: bold;
    color: white;
  }
}

@media (max-width: 575px) {
  /* Informações do tipo de relatório */
  .tipo-relatorio {
    font-size: 16px;
  }

  /* Cards */
  /* Tamanho / Posição */
  #card-grande {
    width: 12rem;
    height: 12rem;
    padding: 5px;
  }

  #card-pequeno {
    width: 8rem;
    height: 11rem;
    padding: 5px;
  }

  .nota-media-comportamental {
    position: relative;
    left: 215px;
    bottom: 215px;
  }

  .nota-media-praticas-ageis {
    position: relative;
    bottom: 220px;
  }

  .nota-media-lideranca {
    position: relative;
    left: 140px;
    bottom: 420px;
  }

  .nota-media-negocio {
    position: relative;
    left: 280px;
    bottom: 620px;
  }

  .ultimo-ciclo {
    position: relative;
    bottom: 615px;
  }

  /* Texto dos cards */
  #texto-praticas-ageis, #texto-lideranca, #texto-negocio {
    font-size: 13px;
  }

  /* Botões gerar pdf e xlsx */
  #btn-pdf {
    position: relative;
    bottom: 615px;
    width: 300px;
    font-weight: bold;
    margin-right: 15px;
  }

  #btn-xlsx {
    position: relative;
    bottom: 615px;
    width: 300px;
    font-weight: bold;
    color: white;
  }
}
</style>
