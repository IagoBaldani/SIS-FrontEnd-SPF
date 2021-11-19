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
              "
            >
              <tbody class="processosSeletivos">
                <tr
                  class="processo"
                  v-for="processo in processosSeletivos"
                  :key="processo"
                >
                  <th class="font-weight-normal" scope="row">
                    {{ processo.id }}
                  </th>
                  <td class="info-nome">{{ processo.processo }}</td>
                  <td class="em-andamento" v-if="processo.status == 'EM_ANDAMENTO'">Em andamento</td>
                  <td class="finalizado" v-if="processo.status == 'FINALIZADO'">
                    Finalizado
                  </td>
                  <td>
                    <a
                      href="http://localhost:8080/processo-seletivo-dados-da-vaga-visualizacao"
                    >
                      <img
                        src="../../assets/imgs/visibility_white_24dp.svg"
                        alt=""
                      />
                    </a>
                  </td>
                  <td>
                    <img
                      src="../../assets/imgs/settings_white_24dp.svg"
                      alt=""
                    />
                  </td>
                  <td><img src="../../assets/imgs/Pattern.svg" alt="" /></td>
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
            class="button-footer mb-3 mt-5  submit"
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
      processosSeletivos: [
        {
          id: 1,
          processo: 'Processo Seletivo Java',
          status: 'EM_ANDAMENTO'
        },
        {
          id: 2,
          processo: 'Processo Seletivo Python',
          status: 'FINALIZADO'
        },
        {
          id: 3,
          processo: 'Processo Seletivo Spring',
          status: 'FINALIZADO'
        },
        {
          id: 4,
          processo: 'Processo Seletivo Mainframe',
          status: 'FINALIZADO'
        },
        {
          id: 5,
          processo: 'Processo Seletivo Mobile',
          status: 'EM_ANDAMENTO'
        },
        {
          id: 6,
          processo: 'Processo Seletivo JavaScript',
          status: 'FINALIZADO'
        },
        {
          id: 7,
          processo: 'Processo Seletivo React Native',
          status: 'EM_ANDAMENTO'
        },
        {
          id: 8,
          processo: 'Processo Seletivo COBOL',
          status: 'EM_ANDAMENTO'
        },
        {
          id: 9,
          processo: 'Processo Seletivo React Native',
          status: 'EM_ANDAMENTO'
        },
        {
          id: 10,
          processo: 'Processo Seletivo React Native',
          status: 'FINALIZADO'
        },
        {
          id: 11,
          processo: 'Processo Seletivo React Native',
          status: 'EM_ANDAMENTO'
        },
        {
          id: 12,
          processo: 'Processo Seletivo React Native',
          status: 'FINALIZADO'
        },
        {
          id: 13,
          processo: 'Processo Seletivo React Native',
          status: 'EM_ANDAMENTO'
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

/* Title */

.container-fluid h1 {
  font-weight: 700;
  font-size: 30px;
}

/* Scroll */
.my-custom-scrollbar {
position: relative;
height: 59vh;
overflow: auto;
}

.table-wrapper-scroll-y {
display: block;
height: 59vh;
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
  text-align: center;
  font-weight: 700;
}

/* Table - Coluna1  */
.search-table tbody > tr > td:nth-child(4) {
  background-color: var(--color-blue-principal);
  font-weight: 700;
  text-align: center;
}

/* Table - Coluna2  */
.search-table tbody > tr > td:nth-child(5) {
  background-color: var(--color-magenta-principal);
  font-weight: 700;
  text-align: center;
}

/* Table - Coluna3  */
.search-table tbody > tr > td:nth-child(6) {
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

/* Status do Programa */

.em-andamento {
  color: var(--color-green-progress) !important;
}

.finalizado {
  color: var(--color-red-progress) !important;
}

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
  background-color: #090b2e;
  cursor: pointer !important;
  color: var(--color-white-default) !important;
  transition: all linear 0.3s !important;
}

.recarregar:hover {
  background-color: #141863 !important;
}

</style>
