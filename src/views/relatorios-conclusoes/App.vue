<template>
  <Header />
  <main>
    <div id="relatorio">
      <!-- divisão criada para titulo e cards -->
      <div class="titulo">
          <h2>Relatorio - Conclusões:</h2>
          <!-- h2 é o titulo da tela -->
          <h3>Programa de formação selecionado: <span class="programaSelecionado">{{relatorio.programadeformacao}}</span></h3>
          <!-- h3 e h4 ficam juntos, sendo o programa selecionado-->
          <h5>Turma:</h5>
          <h6 class="turmaSelecionado">{{relatorio.turma}}</h6>
          <!-- h5 e h6 devem ficar juntos, sendo a turma selecionada -->
        </div>

      <div class="container-fluid">
        <!-- cards criados -->
        <div class="cards partAtivos">
          <div class="partAtiv">
            <!-- card de participantes ativos -->
            <h2 id="part-ativos">{{relatorio.participantesAtivos}}</h2>
            <p class="descricao">
              Participantes ativos em todos os programas de formação.
            </p>
          </div>
          <div class="partEfetivados ">
            <!-- card de participantes efetivados -->
            <h2 id="part-efetivados">{{relatorio.participantesEfetivados}}</h2>
            <p class="descricao">Participantes efetivados na empresa.</p>
          </div>
          <div class="dataConclusão ">
            <!-- card da data de conclusão -->
            <h2 id="data-conclusão">{{relatorio.dataConclusao}}</h2>
            <p class="descricao">
              Data do ultimo ciclo de conclusões (não efetivados).
            </p>
          </div>
        </div>
        <!-- divisão de botões -->
        <div class="buttons">
          <input v-on:click="downloadRelatorioPDF()" type="button" value="GERAR PDF" class="gerar-pdf" />
          <!-- botão para gerar pdf da pag -->
          <input v-on:click="downloadRelatorioXLSX()" type="button" value="GERAR XLSX" class="gerar-xlsx" />
          <!-- botão para gerar xlsx da pag -->
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Header from '@/components/Header.vue'
import { http } from '../../services/Config'
import  Funcoes from '../../services/Funcoes'

export default {
  name: "App",
  components: {
    Header,
  },
  data(){
    return{
      relatorio: {},
      parametrosUrl: {}
    }
  },
  beforeMount(){
    Funcoes.verificaToken();
  },

  created(){
    this.getParams();
    this.getInfo();
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
    },

    getInfo(){
      http.get('conclusoes/formacao=' + this.parametrosUrl.formacao + '/turma=' + this.parametrosUrl.turma + '/escopo=' + this.parametrosUrl.escopo)
      .then(response => this.relatorio = response.data)
    },

    downloadRelatorioPDF(){
      location.href = 'http://192.168.30.162:8081/api/conclusoes/formacao=' + this.parametrosUrl.formacao + '/turma=' + this.parametrosUrl.turma + '/pdf'
    },

    downloadRelatorioXLSX(){
      location.href = 'http://192.168.30.162:8081/api/conclusoes/formacao=' + this.parametrosUrl.formacao + '/turma=' + this.parametrosUrl.turma + '/xlsx'
    }
  }
};
</script>

<style>
body {
  overflow-x: hidden;
}

/* titulo definindo parte superior abaixo do cabeçalho ---------------*/
/* definindo tamanho, cor e as margens */
.titulo {
  width: 100%;
  padding: 1em;
  margin: 5px;
  margin-left: 5px;
  color: #090b2e;
  text-align: center;
}

/* titulos divididos por Paragrafos ---------------------*/
/* definindo tamanho e margem do card */
.titulo h2 {
  margin: 5px;
  font-size: 23px;
  font-family: Montserrat;
  display: inline-block;
  font-weight: bold;
  font-style: normal;
}
/* definindo tamanho e margem do card */
.titulo h3 {
  margin: 5px;
  font-size: 23px;
  font-family: Montserrat;
  display: inline-block;
  font-weight: bold;
  font-style: normal;
}
/* definindo tamanho e margem do card */
.titulo h4 {
  margin: 5px;
  font-size: 23px;
  font-family: Montserrat;
  display: inline-block;
  font-weight: bold;
  font-style: normal;
}
/* definindo tamanho e margem do card */
.titulo h5 {
  margin: 5px;
  font-size: 23px;
  font-family: Montserrat;
  display: inline-block;
  font-weight: bold;
  font-style: normal;
}
/* definindo tamanho e margem do card */
.titulo h6 {
  margin: 5px;
  font-size: 23px;
  font-family: Montserrat;
  display: inline-block;
  font-weight: bold;
  font-style: normal;
}
/*-------------------------------------*/

/* trocando cor da turma selecionada e o programa selecionado */
.programaSelecionado,
.turmaSelecionado {
  color: grey;
}

/* parte dos cards -----------------------*/
.partAtivos {
  display: flex;
  justify-content: space-evenly;
}

.partAtiv,.partEfetivados,
.dataConclusão {
  width: 28%;
  padding: 0rem 1rem;
  border: 1px solid #CCC;
  border-radius: 5px;
  box-shadow: 4px 4px 4px #ccc;
} 

/* alinhando conteudo de participantes ativos no programa */
.partAtivos p {
  color: grey;
  margin-left: 10px;
  margin-top: 10px;
}

/* definindo fonte e tamanho do conteudo do card de participantes ativos no programa */
#part-ativos {
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 57px;
  line-height: 110px;
  margin-left: 10px;
  color: #ab0045;
}

/* definindo fonte e tamanho do conteudo do card de participantes efetivados no programa */
#part-efetivados {
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 57px;
  line-height: 110px;
  margin-left: 10px;
  color: #ffb600;
}

/* alinhando conteudo de participantes efetivados no programa */
.partEfetivados p {
  color: grey;
  margin-left: 10px;
  margin-top: 10px;
}

/* definindo fonte e tamanho do conteudo do card da data de conclusão do programa */
#data-conclusão {
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 47px;
  line-height: 110px;
  margin-left: 10px;
  color: #090b2e;
}

/* alinhando conteudo da data de conclusão do programa */
.dataConclusão p {
  color: grey;
  margin-left: 10px;
  margin-top: 10px;
}

/* parte do estilo dos botões (tamanho, cor e margem) dos botões --------------------------*/
/* tamanho */
.buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 10rem;
}

.gerar-pdf {
  width: 350px;
  height: 45px;
}

.gerar-xlsx {
  width: 350px;
  height: 45px;
}

/* cor e estilo */
.gerar-pdf {
  background-color: #ab0045;
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: 900;
}

.gerar-xlsx {
  background-color: #ffb600;
  color: white;
  border: none;
  border-radius: 5px;
  margin-left: 30%;
  font-weight: 900;
}
/* ------------------------------------------ */

/* animação quando cursor do mouse passar nos botões --------------------------*/
.gerar-pdf:hover {
  transform: scale(1.1);
  transition: 0.5s;
}

.gerar-xlsx:hover {
  transform: scale(1.1);
  transition: 0.5s;
}

/* Reponsividade da tela --------------------------------------*/

@media (min-width: 1024px) {
  .partAtiv,.partEfetivados,
  .dataConclusão {
    max-width: 28%;
  }
}

@media (max-width: 768px) {
  .partAtiv,.partEfetivados,
  .dataConclusão {
    width: 32%;
    padding: 0 0;
  }

  #part-ativos,#part-efetivados {
    font-size: 50px;
  }

   #data-conclusão {
     font-size: 40px;
   }

  .buttons {
    display: flex;
    justify-content: space-evenly;
    margin: 8rem 1rem 3rem 1rem;
  }

  .titulo h2, .titulo h3, .titulo h4,
   .titulo h5, .titulo h6 {
    font-size: 20px;
  }
}

@media (max-width: 430px) {
  .partAtivos {
    display: flex;
    flex-direction: column;
  }

  .partAtiv,.partEfetivados,
  .dataConclusão {
    width: 100%;
    margin-bottom: 1rem; 
  }

  .buttons {
    display: flex;
    justify-content: space-evenly;
    margin-top: 4rem;
  }


  .gerar-pdf, .gerar-xlsx {
    min-width: 45%;
    margin: 10px;
  }

  .titulo {
    width: 100% !important;
    color: #090b2e;
  }
}
</style>