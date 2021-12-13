<template>
  <Header link="../processo-seletivo-busca-por-vagas"/>
  <main>
    <div class="container-fluid px-5">
      <!-- Título da Página -->
      <div class="row justify-content-evenly">
        <div class="col-lg-b6 mb-2 mt-2">
          <h1 class="mt-3 mb-3">Busca por candidato:</h1>
        </div>
        <div class="col-lg-6"></div>
      </div>
      <div class="row justify-content-evenly">
        <div class="col-lg-5">
          <!-- Input para filtragem na tabela -->
          <div class="search-input">
            <div class="col-xl-9">
              <input
                type="text"
                class="form-control mb-3"
                id="filtrar-tabela"
                placeholder="Candidato"
                @input="filtraDados"
              />
            </div>
          </div>
        </div>
        <div class="col-lg-7">
          <!-- Tabela dinâmica atualizada automaticamente usando o VueJS -->
          <div class="aviso mb-10 invisivel">
            <h4 class="titulo fw-bold">
              Não foi encontrado nenhum resultado com os parâmetros informados
            </h4>
            <button
              class="mt-3 form-control recarregar"
              onclick="window.location.reload()"
            >
              RECARREGAR LISTA
            </button>
          </div>
          <div class="search-table table-wrapper-scroll-y my-custom-scrollbar">
            <table
              class="
                table table-bordered
                mb-10
              "
            >
              <tbody class="processosSeletivos">
                <tr
                  class="processo"
                  v-for="(candidato, index) in candidatos"
                  :key="candidato"
                >
                  <th class="font-weight-normal" scope="row">
                    {{ ++index }}
                  </th>
                  <td class="info-nome">{{ candidato.nome }}</td>
                  <td class="aprovado" v-if="candidato.status == 'APROVADO_2_FASE'">Aprovado</td>
                  <td class="aprovado" v-if="candidato.status == 'APROVADO_1_FASE'">Aprovado 1ª fase</td>
                  <td class="reprovado" v-if="candidato.status == 'REPROVADO_1_FASE'">Reprovado 1ª fase</td>
                  <td class="reprovado" v-if="candidato.status == 'REPROVADO_2_FASE'">Reprovado</td>
                  <td class="sem-status" v-if="candidato.status == 'SEM_STATUS'">Sem Status</td>
                  <td class="stand" v-if="candidato.status == 'STANDBY'">Standby</td>
                  <td>
                    <a :href="'/processo-seletivo-dados-do-candidato-visualizacao?id=' + candidato.id
                     + '&tipo=edicao' + '&statusProcesso=' + this.statusProcesso + '&idProcesso='
                     + this.idProcessoSeletivo + '&statusParticipante' + candidato.status" 
                    >
                      <img
                        src="../../assets/imgs/account_circle_white_24dp.svg"
                        alt=""
                      />
                    </a>
                  </td>
                  <td>
                    <a :href="'/processo-seletivo-dados-do-candidato-cadastro-edicao?id=' + candidato.id 
                      + '&tipo=edicao' + '&statusProcesso=' + this.statusProcesso + '&idProcesso=' 
                      + this.idProcessoSeletivo + '&statusParticipante=' + candidato.status" >
                      <img
                        src="../../assets/imgs/manage_accounts_white_24dp.svg"
                        alt=""
                      />
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="mt-10"></div>
      <div class="row justify-content-between">
        <!-- Botão de busca -->
        <div class="col-xl-4"></div>
        <!-- Botão de cadastro de nova vaga -->
        <div class="col-xl-4">
          <button
            class="button-footer mt-5 submit"
            id="cadastrar"
            type="button">
            <a :href="'/processo-seletivo-dados-do-candidato-cadastro-edicao?tipo=cadastro' + '&statusProcesso=' + this.statusProcesso + '&idProcesso=' 
                      + this.idProcessoSeletivo"
            >
              Cadastrar novo candidato
            </a>
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Header from '@/components/Header.vue'
import Funcoes from '../../services/Funcoes'
import { http } from '@/services/Config'
export default {
  name: 'App',
  components: {
    Header
  },
  data () {
    return {
      candidatos: [],
      statusProcesso: '',
      idProcessoSeletivo: ''
    }
  },
  beforeMount () {
    Funcoes.verificaToken()
    const dadosUrl = this.pegaDadosUrl()
    let idProcesso = dadosUrl.id
    this.idProcessoSeletivo = idProcesso
    this.statusProcesso = dadosUrl.status
    console.log(this.statusProcesso)
    if (idProcesso != null && idProcesso != '') {
      this.getListaDaFormacao(idProcesso)
    } else {
      this.getLista()
    }
  },
  beforeUpdate () {
    if(this.statusProcesso == 'FINALIZADA'){
       document.querySelector('#cadastrar').classList.add('invisivel')
     } 
  },
  methods: {
    filtraDados () {
      var aviso = document.querySelector('.aviso')
      aviso.classList.add('invisivel')
      var campoFiltro = document.querySelector('#filtrar-tabela')
      var listaDeValores = []
      console.log(campoFiltro.value)
      var processos = document.querySelectorAll('.processo')
      if (campoFiltro.value.length >= 0) {
        for (var i = 0; i < processos.length; i++) {
          var processo = processos[i]
          var tdNome = processo.querySelector('.info-nome')
          var nome = tdNome.textContent
          var expressao = new RegExp(campoFiltro.value, 'i')
          if (!expressao.test(nome)) {
            processo.classList.add('invisivel')
            aviso.classList.remove('invisivel')
          } else {
            processo.classList.remove('invisivel')
            aviso.classList.add('invisivel')
            listaDeValores.push(i)
          }
          console.log(listaDeValores)
          if (!listaDeValores.length == 0) {
            aviso.classList.add('invisivel')
          } else {
            aviso.classList.remove('invisivel')
          }
        }
      } else {
        for (var j = 0; j < processos.length; j++) {
          var processo2 = processos[j]
          processo2.classList.remove('invisivel')
          aviso.classList.remove('invisivel')
        }
      }
    },
    getLista () {
      http
        .get('candidato/lista')
        .then(response => {
          this.candidatos = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
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
    getListaDaFormacao (idProcesso) {
      http
        .get(`candidato/lista-do-processo/${idProcesso}`)
        .then(response => {
          this.candidatos = response.data
        })
        .catch(error => {
          console.log(error)
        })
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
:root {
  /* Cores principais - Botões e telas */
  --color-background-screen: #ebebeb;
  --color-yellow-principal: #ffb700;
  --color-blue-principal: #090b2e;
  --color-magenta-principal: #ab0045;
  --color-background-form-input: #d3caca;
  /* Cores da barra de progresso da busca de vagas */
  --color-green-progress: #19b200;
  --color-yellow-progress: yellow;
  --color-red-progress: red;
  /* Cores de fonte */
  --color-gray-font: #737373;
  /* Cores default */
  --color-white-default: #ffffff;
  --color-black-default: #000000;
}
/* Restart da página, removendo as bordas default do navegador */
body {
  background-color: var(--color-background-screen) !important;
}
.title h1 {
  font-weight: 700;
}
.header {
  background-color: var(--color-blue-principal);
  height: 75px;
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
  display: none;
}
.btn-header img,
.logo img {
  height: 50px;
}
.home.btn-header {
  background-color: var(--color-yellow-principal);
}
.divBtn {
  display: none;

}
.rollback.btn-header {
  background-color: var(--color-magenta-principal);
}
.container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 1.5em;
}
/* Title */
.container-fluid h1 {
  font-weight: 700;
  font-size: 30px;
}
/* Input de busca */
.search-input input {
  border-radius: 3px;
}
/* Table - Coluna Índice */
.search-table tbody > tr > th {
  font-weight: 500;
  color: var(--color-gray-font);
  font-size: 20px;
  text-align: center;
}
/* Table - Coluna Processo Seletivo Java */
.search-table tbody > tr > td:nth-child(2) {
  font-weight: 500;
  font-size: 20px;
}
/* Table - Coluna em Andamento */
.search-table tbody > tr > td:nth-child(3) {
  color: var(--color-green-progress);
  text-align: center;
  font-weight: 700;
}
/* Table - Coluna2  */
.search-table tbody > tr > td:nth-child(4) {
  background-color: var(--color-magenta-principal);
  font-weight: 700;
  text-align: center;
}
/* Table - Coluna3  */
.search-table tbody > tr > td:nth-child(5) {
  background-color: var(--color-yellow-principal);
  font-weight: 700;
  text-align: center;
}
.search-table tbody > tr > td {
  color: var(--color-gray-font);
}
/* Table */
.table {
  background-color: var(--color-white-default);
}
.my-custom-scrollbar {
  position: relative;
  height: 55vh;
  overflow: auto;
}
.table-wrapper-scroll-y {
  display: block;
  height: 55vh;
}
/* Início das Cores de Status do Participante */
/* Estilo de fonte */
.aprovado,
.reprovado,
.stand,
.sem-status {
  font-weight: 700;
}
/* Aprovado - Verde */
.aprovado {
  color: var(--color-green-progress) !important;
}
/* Reprovado - Vermelho */
.reprovado {
  color: var(--color-red-progress) !important;
}
/* Em standby - Azul */
.stand {
  color: blue !important;
}
/* Sem status - Cinza */
.sem-status {
  color: var(--color-without-status-progress) !important;
}
/* Final das Cores de Status do Participante */
/* Button do rodapé */
.button-footer {
  width: 100%;
  height: 50px;
  font-size: 22px;
  text-transform: uppercase;
  color: var(--color-white-default);
  border: none !important;
  border-radius: 3px;
  font-weight: 700;
}
.button-footer:hover {
  background-color: var(--color-yellow-principal);
  transition: 0.5s, 0.5s;
}
a{
  color: white;
  text-decoration: none;
}
a:hover{
  color: white;
}
#buscar {
  background-color: var(--color-magenta-principal);
}
#cadastrar {
  background-color: var(--color-yellow-principal);
}
.btn {
  margin-top: 150px;
  display: grid;
  grid-template-columns: repeat(autofit, minmax(150px, 1fr));
  gap: 1000px !important;
}
/* Parte de deixar o menu invisivel */
.invisivel {
  display: none;
}
.aviso {
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 2em;
  margin-top: 50px;
  text-align: center;
}
.recarregar {
  background-color: #090b2e !important;
  cursor: pointer !important;
  color: var(--color-white-default) !important;
  transition: all linear 0.3s !important;
}
.recarregar:hover {
  background-color: #141863 !important;
}
@media screen and (min-width: 974px) {
  .empty {
    height: 120px;
  }
}
</style>