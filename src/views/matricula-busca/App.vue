<template>
  <Header link="../home"/>
  <main>
    <div class="container-fluid px-5">
      <!-- Título da Página -->
      <div class="row justify-content-evenly">
        <div class="col-lg-b6 mb-2 mt-2 d-flex justify-content-between">
          <h1 class="mt-3 mb-3 spc">Busca por matricula:</h1>
        </div>
        <div class="col-lg-6"></div>
      </div>
      <div class="row justify-content-evenly">
        <div class="col-lg-5">
          <!-- Input para filtragem na tabela -->
          <div class="search-input">
            <div class="col-xl-9">
              <input type="text" class="form-control mb-3" id="filtrar-tabela" placeholder="Matricula" @input="filtraDados"/>
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
          <div class="search-table table-wrapper-scroll-y my-custom-scrollbar" id="listaMatriculas">
            <table
              class="
                table table-bordered
                mb-10
              "
            >
              <tbody class="processosSeletivos">
                <tr
                  class="matricula"
                  v-for="(matricula, index) in matriculas"
                  :key="matricula"
                >
                  <th class="font-weight-normal" scope="row">
                    {{ ++index }}
                  </th>
                  <td class="info-matricula">{{ matricula.matricula }}</td>
                  <td class="info-primeiro-acesso">{{ matricula.dataPrimeiroAcesso }}</td>
                  <td class="info-acesso" v-if="matricula.perfil == 'ROLE_ADMINISTRADOR'">Nível 1 - Administrador</td>
                  <td class="info-acesso" v-else-if="matricula.perfil == 'ROLE_USUARIO'">Nível 2 - Usuário</td>
                  <td><a data-bs-toggle="modal" data-bs-target="#exampleModal" @click="defineFormMatricula(matricula.matricula)" title="Excluir matricula">
                      <img src="../../assets/imgs/delete_white_24dp.svg" alt=""/>
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
            <a :href="'/matricula-cadastro'">
              Cadastrar nova matricula
            </a>
          </button>
        </div>
      </div>
    </div>
    <!-- Modal de confirmação -->
    <p class="none" id="abreModalInvisivel" data-bs-toggle="modal" data-bs-target="#modalAcesso" ></p>
    <div class="modal fade mt-5"  id="modalAcesso" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-size">
        <div class="modal-content p-5 grey-background">
          <div class="row mb-5">
            <div class="col">
              <h3 class="modal-title fw-bold titulo text-center" id="exampleModalLabel">Nivel de acesso insuficiente</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-xl modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header border-0">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body d-flex justify-content-between">
            <div>
              <h1 class="modal-title form-label fw-bold mb-0 titulo"> Deseja excluir a seguinte matricula? </h1>
            </div>
            <div class="conteudomodal d-flex flex-column justify-content-center mt-5">
              <div class="mt-5">
                <p class="titulo fw-bold fs-3">Matricula: <span class="titulo"> {{formMatricula}} </span></p>
              </div>
            </div>
            <div class="modal-footer border-0 justify-content-around">
              <div>
                <button @click="deletar(formMatricula)" type="button" class="btn submit-modal">CONFIRMAR</button>
              </div>
              <div>
                <button type="button" class="btn cancel-modal" data-bs-dismiss="modal">CANCELAR</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal de confirmação exclusão-->
    <p class="none" id="abreModalConfirmacao" data-bs-toggle="modal" data-bs-target="#modalConfirmacao" ></p>
    <div class="modal fade mt-5"  id="modalConfirmacao" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-size">
        <div class="modal-content p-5 grey-background">
          <div class="row mb-5">
            <div class="col">
              <h3 class="modal-title fw-bold titulo text-center" id="exampleModalLabelConfirmacao">Matricula excluida com sucesso!</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Header from '@/components/Header.vue'
import { http } from '@/services/Config'
import VerificaPerfil from '@/services/VerificaPerfil'

export default {
  name: 'App',
  components: {
    Header
  },
  data () {
    return {
      matriculas: [],
      formMatricula: ''
    }
  },
  beforeMount () {
    this.getMatricula()
  },
  mounted () {
    if (!VerificaPerfil.verificaPerfil()) {
      document.querySelector('#listaMatriculas').classList.add('none')
      this.abrirModal()
      document.querySelector('#abreModalInvisivel').classList.remove('none')
      setTimeout(function () {
        location.href = '/home'
      }, 1500)
    }
  },
  methods: {
    filtraDados () {
      var aviso = document.querySelector('.aviso')
      aviso.classList.add('invisivel')
      var campoFiltro = document.querySelector('#filtrar-tabela')
      var listaDeValores = []
      var processos = document.querySelectorAll('.matricula')
      if (campoFiltro.value.length >= 0) {
        for (var i = 0; i < processos.length; i++) {
          var processo = processos[i]
          var tdNome = processo.querySelector('.info-matricula')
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
    getMatricula () {
      http
        .get('matricula')
        .then(response => {
          this.matriculas = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    deletar (variavel) {
      http
        .delete(`matricula/${variavel}`)
        .then(response => {
          this.getMatricula()
          document.getElementById('abreModalConfirmacao').click()
          setTimeout(function () {
            location.href = '/matricula-busca'
          }, 1500)
        })
        .catch(error => {
          console.log(error)
        })
    },
    abrirModal () {
      document.getElementById('abreModalInvisivel').click()
    },
    defineFormMatricula (matricula) {
      this.formMatricula = matricula
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
.none {
  display: none !important;
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
  text-align: center;
  font-weight: 700;
}
/* Table - Coluna2  */
.search-table tbody > tr > td:nth-child(4) {
  font-weight: 700;
  text-align: center;
}
/* Table - Coluna3  */
.search-table tbody > tr > td:nth-child(5) {
  background-color: var(--color-magenta-principal);
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
}
a:hover{
  color: white;
  cursor: pointer;
}
#buscar {
  background-color: var(--color-magenta-principal);
}
#cadastrar {
  background-color: var(--color-yellow-principal) !important;
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
.conteudomodal {
  display: flex;
  justify-content: center;
  /*min-height: 40vh;*/
  font-size: 21px;
}
.modal-body, .modal-header, .modal-footer {
  text-align: center;
  background-color: #EBEBEB
}
.modal-body{
  /*min-height: 55vh;*/
  flex-direction: column;
}
.submit-modal, .cancel-modal{
  color: white !important;
  font-weight: bold !important;
  border-radius: 5px !important;
  width: 350px;
  font-size: 25px !important;
}
.submit, .submit-modal{
  color: white !important;
  font-weight: bold !important;
  background-color: #AB0045 !important;
}
.cancel, .cancel-modal{
  color: white !important;
  font-weight: bold !important;
  background-color: #FFB700 !important;
}
.none{
  display: none !important;
}
</style>
