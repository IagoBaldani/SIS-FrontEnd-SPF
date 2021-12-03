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
            <input name="nome" type="text" class="form-control mt-4" placeholder="Nome do participante" id="filtro-nome">
          </div>
          <div class="mb-3">
            <select class="form-select mt-4" id="filtro-programa">
              <option disabled selected value="0">Programa de Formação</option>
              <option id="programa" v-bind:value="programa.nomePrograma" v-for="programa in programas" v-bind:key="programa">{{programa.nomePrograma}}</option>
            </select>
          </div>
          <div class="mb-3">
            <select class="form-select mt-4" id="filtro-turmas" v-on:click="getTurmas()">
              <option disabled selected value="0">Turmas</option>
              <option id="turma" v-for="turma in turmas" v-bind:key="turma.id" v-bind:value="turma.nomeTurma">{{turma.nomeTurma}}</option>
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
              <tr class="nome" id="participante" v-for="participante in participantes" v-bind:key="participante">
                <th scope="row" width="50">{{participante.cpf}}</th>
                <td id="info-nome">{{participante.nome}}</td>
                <td id="info-programa">{{participante.programa}}</td>
                <td id="info-status"
                    v-bind:class="(participante.statusAtivo == 'ATIVO')?'ativo':'inativo'">
                  {{(participante.statusAtivo == 'ATIVO')?'Ativo':'Inativo'}}</td>
                <td class="imagem rounded" width="50">
                  <a :href="'/dados-participante-cadastro_edicao?id=' + participante.cpf ">
                    <img src="@/assets/imgs/manage_accounts_white_24dp.svg" alt="Imagem" />
                  </a>
                </td>
                <td class="imagem-coluna rounded" width="50">
                  <a :href="'/dados-participante-visualizacao?id=' + participante.cpf">
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
          <a href="/dados-candidato-participante-elegibilidade"
             class="mt-5 form-control cadastro d-flex justify-content-center">SELEÇÃO PARA NOVO CADASTRO </a>
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
      responseStatus: '',
      participantes: [],
      programas: [],
      turmas: []
    }
  },
  beforeMount () {
    Funcoes.verificaToken()
    this.getParticipantes()
    this.getProgramas()
  },
  methods: {
    getParticipantes () {
      http.get('participante')
        .then(response => {
          (this.participantes = response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    filtraDados () {
      let programaProcurado = document.querySelector('#filtro-programa').value
      let nomeProcurado = document.querySelector('#filtro-nome').value
      let turmaProcurada = document.querySelector('#filtro-turmas').value
      console.log(nomeProcurado)
      if (nomeProcurado == '' && programaProcurado == '0' && turmaProcurada == '0') {
        http.get('participante')
          .then(response => {
            console.log(this.participantes = response.data)
          })
          .catch(error => {
            console.log(error)
          })
      }
      if (nomeProcurado == '') {
        http.get(`participante/0/${programaProcurado}/${turmaProcurada}`)
          .then(response => {
            this.participantes = response.data
          })
      } else {
        http.get(`participante/${nomeProcurado}/${programaProcurado}/${turmaProcurada}`)
          .then(response => {
            this.participantes = response.data
          })
      }
    },
    getTurmas () {
      let turmas = document.querySelector('#filtro-programa').value
      console.log(turmas)
      http.get(`relatorios/turmas/${turmas}`)
        .then(response => {
          this.turmas = response.data
        })
    },
    getProgramas () {
      http.get('relatorios/formacoes')
        .then(response => {
          this.programas = response.data
        })
        .catch(error => {
          console.log(error)
        })
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