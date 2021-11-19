<template>
  <Header />
  <main>
    <div class="container-fluid px-5">
      <!-- Título da Página -->
      <div class="row justify-content-evenly">
        <div class="col-lg-b6 mb-2 mt-2">
          <h1 class="mt-3 mb-3">Busca por processos seletivos:</h1>
        </div>
        <div class="col-lg-6"></div>
      </div>
      <div class="row justify-content-evenly">
        <div class="col-lg-6">
          <!-- Input para filtragem na tabela -->
          <div class="search-input">
            <div class="col-xl-8">
              <input
                type="text"
                class="form-control mb-3"
                id="filtrar-tabela"
                placeholder="Processo seletivo Java"
                @input="filtraDados"
              />
            </div>
          </div>
        </div>
        <div class="col-lg-6">
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
            <!--  -->
            <table
              class="
                table table-bordered
                mb-10
              "
            >
              <tbody class="processosSeletivos">
                <tr
                  class="processo"
                  v-for="processo in processo"
                  :key="processo"
                >
                  <th class="font-weight-normal" scope="row">
                    {{ processo.id }}
                  </th>
                  <td class="info-nome">{{ processo.nome }}</td>
                  <td class="aprovado" v-if="processo.status == 'APROVADO_2_FASE'">APROVADO</td>
                  <td class="reprovado" v-if="processo.status == 'REPROVADO_2_FASE'">
                    REPROVADO
                  </td>
                  <td class="sem-status" v-if="processo.status == 'SEM_STATUS'">SEM STATUS</td>
                  <td class="stand" v-if="processo.status == 'STANDBY'">STANDBY</td>
                  <td>
                    <img
                      src="../../assets/imgs/manage_accounts_white_24dp.svg"
                      alt=""
                    />
                  </td>
                  <td>
                    <img
                      src="../../assets/imgs/account_circle_white_24dp.svg"
                      alt=""
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="row empty"></div>
      <div class="mt-10"></div>
      <div class="row justify-content-between">
        <!-- Botão de busca -->
        <div class="col-xl-4"></div>
        <!-- Botão de cadastro de nova vaga -->
        <div class="col-xl-4">
          <button
            class="button-footer mb-3 mt-3 submit"
            id="cadastrar"
            type="submit"
          >
            Cadastrar Nova Vaga
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
      responseStatus: '',
      processo: [
        {
          id: 1,
          nome: 'Priscila Estuani',
          status: 'APROVADO_2_FASE'
        },
        {
          id: 2,
          nome: 'Calopsita',
          status: 'REPROVADO_2_FASE'
        },
        {
          id: 3,
          nome: 'Nico Stepatt',
          status: 'SEM_STATUS'
        },
        {
          id: 4,
          nome: 'Gabriel Paulista',
          status: 'STANDBY'
        },
        {
          id: 1,
          nome: 'Priscila Estuani',
          status: 'APROVADO_2_FASE'
        },
        {
          id: 1,
          nome: 'Priscila Estuani',
          status: 'APROVADO_2_FASE'
        },
        {
          id: 1,
          nome: 'Priscila Estuani',
          status: 'APROVADO_2_FASE'
        },
        {
          id: 1,
          nome: 'Priscila Estuani',
          status: 'APROVADO_2_FASE'
        },
        {
          id: 1,
          nome: 'Priscila Estuani',
          status: 'APROVADO_2_FASE'
        },
        {
          id: 1,
          nome: 'Priscila Estuani',
          status: 'APROVADO_2_FASE'
        }
      ]
    }
  },
  beforeMount () {
    Funcoes.verificaToken()
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
  height: 59vh;
  overflow: auto;
}

.table-wrapper-scroll-y {
  display: block;
  height: 59vh;
}

/* Início das Cores de Status do Participante */

/* Estilo de fonte */

.aprovado,
.reprovado,
.stand,
.sem-status {
  font-weight: bold;

  font-size: 20px;
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
