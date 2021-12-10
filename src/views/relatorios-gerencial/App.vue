<template>
  <Header link="../home"/>
  <main id="mainModal">
    <!-- Início Select Relatório -->
    <section class="relatorio_main container">
      <form id="formSelect" action="" method="">
        <label class="relatorio_titulo"
          >Relatórios:

          <!-- Select Programa de formação -->
          <select
            name="formacao"
            required
            id="select1"
            class="form-select p-2 mb-3"
            aria-label="Default select example"
            v-on:click="totalFormacoes()"
          >
            <option name="formacao" value="null" class="relatorio_opcao" disabled selected>
              Programa de formação
            </option>
            <option
              ref="nomePrograma"
              class="relatorio_opcao"
              v-for="(formacao, id) in todasFormacoes"
              :key="id"
            >
              {{ formacao.nomePrograma }}
            </option>
          </select>
          <p id="progFormacao" class="erro none">Por favor, selecione um programa de formação</p>

          <!-- Select Turma -->
          <select
            name="turma"
            required
            id="select2"
            class="form-select p-2 mb-3"
            aria-label="Default select example"
            v-on:click="buscarTurmasDeUmaFormacao()"
          >
            <option class="relatorio_opcao" value="null" disabled selected>Turma</option>
            <option
              class="relatorio_opcao"
              v-for="(turma, id) in turmasPrograma"
              :key="id"
            >
              {{ turma.nomeTurma }}
            </option>
          </select>
          <p id="progTurma" class="erro none">Por favor, selecione uma turma</p>

          <!-- Select Escopo do relatório -->
          <select
            name="escopo"
            required
            id="select3"
            class="form-select p-2 mb-3"
            aria-label="Default select example"
          >
            <option class="relatorio_opcao" value="null" disabled selected>
              Escopo do relatório
            </option>
            <option class="relatorio_opcao">Alura</option>
            <option class="relatorio_opcao">Avaliações</option>
            <option class="relatorio_opcao">Conclusões</option>
            <option class="relatorio_opcao">Investimentos</option>
          </select>
          <p id="progEscopo" class="erro none">Por favor, selecione o escopo do relatório</p>
        </label>
        <!-- Select Botão -->
        <input
          v-on:click="validaForm()"
          id="botao"
          type="button"
          class="relatorio_button"
          value="BUSCAR"
        />
      </form>
    </section>
    <!-- Fim Select Relatório -->

    <!-- Início Dados Gerais -->
    <section class="dados_gerais-main container">
      <h3 class="dados_gerais-titulo">Dados gerais do sistema:</h3>

      <!-- Início Dados Gerais - Cards -->
      <div class="dados_gerais-divCard">
        <!-- Card - Participantes ativos -->
        <div class="card mb-2">
          <div class="card-body dados_gerais-card">
            <h3 class="dados_gerais-h3 dados_gerais-h3-1">
              {{ numeroTotalDeCadaLista[0] }}
            </h3>
            <img
              v-on:click="participantesAtivos()"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop1"
              class="dados_gerais-img"
              src="@/assets/imgs/visibility.svg"
            />
          </div>
          <div class="card-body">
            <p class="dados_gerais-param card-text">
              Participantes ativos de todos os programas de formação.
            </p>
          </div>
        </div>

        <!-- Card - Participantes efetivados -->
        <div class="card mb-2">
          <div class="card-body dados_gerais-card">
            <h3 class="dados_gerais-h3 dados_gerais-h3-2">
              {{ numeroTotalDeCadaLista[1] }}
            </h3>
            <img
              v-on:click="participantesEfetivados()"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop2"
              class="dados_gerais-img"
              src="@/assets/imgs/visiamarelo.svg"
            />
          </div>
          <div class="card-body">
            <p class="dados_gerais-param card-text">
              Participantes efetivados na empresa.
            </p>
          </div>
        </div>

        <!-- Card - Programas de formação em andamento -->
        <div class="card mb-2">
          <div class="card-body dados_gerais-card">
            <h3 class="dados_gerais-h3 dados_gerais-h3-3">
              {{ numeroTotalDeCadaLista[2] }}
            </h3>
            <img
              v-on:click="totalFormacoes()"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop3"
              class="dados_gerais-img"
              src="@/assets/imgs/visiazul.svg"
            />
          </div>
          <div class="card-body">
            <p class="dados_gerais-param card-text">
              Programas de formação em andamento.
            </p>
          </div>
        </div>
      </div>
      <!-- Fim Dados Gerais - Cards -->
    </section>
    <!-- Fim Dados Gerais -->

    <!-- Modal - Início Lista de participantes ativos -->
    <section
      class="modal fade"
      id="staticBackdrop1"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <!-- Modal - Início Header -->
          <div class="modal-header">
            <div>
              <h3 class="modal_titulo">
                Lista de participantes ativos de todos os programas de
                formações:
              </h3>

              <div class="modal-pesquisar form-floating mb-0">
                <input
                  type="text"
                  class="form-control"
                  v-on:input="filtroAtivos = $event.target.value"
                  id="floatingInput"
                  placeholder="name@example.com"
                />
                <label
                  class="modal_pesquisar-label"
                  for="floatingInput"
                  placeholder="Pesquisar participante"
                  >Pesquisar participante</label
                >
                <img class="modal_lupa" src="@/assets/imgs/lupa.svg" />
              </div>
            </div>
          </div>
          <!-- Modal - Fim Header -->

          <!-- Modal - Início Body -->
          <div class="modal-body">
            <!-- Modal - Início Cabeçalho da Tabela -->
            <div>
              <table class="table modal_table-head">
                <thead class="modal_table-thead">
                  <tr>
                    <th id="modal_table-th">Nome do participante</th>
                    <th id="modal_table-th-2">Programa de formação</th>
                  </tr>
                </thead>
              </table>
            </div>
            <!-- Modal - Fim Cabeçalho da Tabela -->

            <!-- Modal - Início Corpo da Tabela -->
            <div class="modal_table-scroll">
              <table
                class="modal_table-1 table table-bordered"
                id="participante"
              >
                <tbody>
                  <tr
                    v-for="(ativos, id) in participantesAtivosComFiltro"
                    :key="id"
                  >
                    <td class="modal_table-th-2col">
                      {{ ativos.nomeParticipante }}
                    </td>
                    <td class="modal_table-th-3col">
                      {{ ativos.nomePrograma }}
                    </td>
                    <td class="modal_table-imagem rounded">
                      <img src="@/assets/imgs/usuario.svg" alt="Imagem" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- Modal - Fim Corpo da Tabela -->
          </div>
          <!-- Modal - Fim Body -->

          <!-- Modal - Início Footer -->
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Fechar
            </button>
          </div>
          <!-- Modal - Fim Footer -->
        </div>
      </div>
    </section>
    <!-- Modal - Fim Lista de participantes ativos -->

    <!-- Modal - Início Listas de efetivados na empresa -->
    <section
      class="modal fade"
      id="staticBackdrop2"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <!-- Modal - Início Header -->
          <div class="modal-header">
            <div>
              <h3 class="modal_titulo">
                Lista de participantes efetivados na empresa:
              </h3>

              <div class="modal-pesquisar form-floating mb-0">
                <input
                  type="text"
                  class="form-control"
                  v-on:input="filtroEfetivados = $event.target.value"
                  id="floatingInput"
                  placeholder="name@example.com"
                />
                <label
                  class="modal_pesquisar-label"
                  for="floatingInput"
                  placeholder="Pesquisar participante"
                  >Pesquisar participante</label
                >
                <img class="modal_lupa" src="@/assets/imgs/lupa.svg" />
              </div>
            </div>
          </div>
          <!-- Modal - Fim Header -->

          <!-- Modal - Início Body -->
          <div class="modal-body">
            <!-- Modal - Início Cabeçalho da Tabela -->
            <div>
              <table class="table modal_table-head">
                <thead class="modal_table-thead">
                  <tr>
                    <th id="modal_table-th">Nome do participante</th>
                    <th id="modal_table-th-2">Programa de formação</th>
                  </tr>
                </thead>
              </table>
            </div>
            <!-- Modal - Fim Cabeçalho da Tabela -->

            <!-- Modal - Início Corpo da Tabela -->
            <div class="modal_table-scroll">
              <table class="modal_table-1 table table-bordered">
                <tbody>
                  <tr
                    v-for="(efetivados, id) in participantesEfetivadosComFiltro"
                    :key="id"
                  >
                    <td class="modal_table-th-2col">
                      {{ efetivados.nomeParticipante }}
                    </td>
                    <td class="modal_table-th-3col">
                      {{ efetivados.nomePrograma }}
                    </td>
                    <td class="modal_table-imagem rounded">
                      <img src="@/assets/imgs/usuario.svg" alt="Imagem" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- Modal - Fim Corpo da Tabela -->
          </div>
          <!-- Modal - Fim Body -->

          <!-- Modal - Início Footer -->
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Fechar
            </button>
          </div>
          <!-- Modal - Fim Footer -->
        </div>
      </div>
    </section>
    <!-- Modal - Fim Listas de efetivados na empresa -->

    <!-- Modal - Início Listas de formações em andamento -->
    <section
      class="modal fade"
      id="staticBackdrop3"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <!-- Modal - Início Header -->
          <div class="modal-header">
            <div>
              <h3 class="modal_titulo">Lista de formações em andamento:</h3>

              <div class="modal-pesquisar form-floating mb-0">
                <input
                  type="text"
                  class="form-control"
                  v-on:input="filtroFormacoes = $event.target.value"
                  id="floatingInput"
                  placeholder="name@example.com"
                />
                <label
                  class="modal_pesquisar-label"
                  for="floatingInput"
                  placeholder="Pesquisar participante"
                  >Pesquisar formação</label
                >
                <img class="modal_lupa" src="@/assets/imgs/lupa.svg" />
              </div>
            </div>
          </div>
          <!-- Modal - Fim Header -->

          <!-- Modal - Início Body -->
          <div class="modal-body">
            <!-- Modal - Início Cabeçalho da Tabela -->
            <div>
              <table class="table modal_table-head">
                <thead class="modal_table-thead">
                  <tr>
                    <th>Programa de formação</th>
                    <th>Nome da turma</th>
                  </tr>
                </thead>
              </table>
            </div>
            <!-- Modal - Fim Cabeçalho da Tabela -->

            <!-- Modal - Início Corpo da Tabela -->
            <div class="modal_table-scroll">
              <table class="modal_table-1 table table-bordered" id="formacoes">
                <tbody>
                  <tr
                    v-for="(formacoes, id) in formacoesComFiltro"
                    v-bind:key="id"
                  >
                    <td>{{ formacoes.nomePrograma }}</td>
                    <td>{{ formacoes.nomeTurma }}</td>
                    <td class="modal_table-imagem-forAndamento rounded">
                      <img src="@/assets/imgs/usuario.svg" alt="Imagem" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- Modal - Fim Corpo da Tabela -->
          </div>
          <!-- Modal - Fim Body -->

          <!-- Modal - Início Footer -->
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Fechar
            </button>
          </div>
          <!-- Modal - Fim Footer -->
        </div>
      </div>
    </section>
    <!-- Modal - Fim Listas de formações em andamento -->
  </main>
</template>

<script>
import Header from '@/components/Header.vue'
import { http } from '../../services/Config'
import Funcoes from '../../services/Funcoes'
import { variavel } from '../../services/Variavel'
export default {
  name: 'App',
  components: {
    Header
  },
  data () {
    return {
      numeroTotalDeCadaLista: [],
      ativosParticipantes: [],
      efetivadosParticipantes: [],
      formacoesTotal: [],
      turmasPrograma: [],
      todasFormacoes: [],
      listagem: [],
      filtroAtivos: '',
      filtroEfetivados: '',
      filtroFormacoes: '',
      nomePrograma: '',
      nomeTurma: '',
      erros: []
    }
  },
  beforeMount () {
    Funcoes.verificaToken()
  },

  mounted () {
    http.get('relatorios').then((response) => {
      this.numeroTotalDeCadaLista = response.data
    })
    http.get('relatorios/formacoes').then((response) => {
      this.todasFormacoes = response.data
    })
  },
  computed: {
    participantesAtivosComFiltro () {
      if (this.filtroAtivos) {
        let exp = new RegExp(this.filtroAtivos.trim(), 'i')
        return this.ativosParticipantes.filter((ativos) =>
          exp.test(ativos.nomeParticipante)
        )
      } else {
        return this.ativosParticipantes
      }
    },
    participantesEfetivadosComFiltro () {
      if (this.filtroEfetivados) {
        let exp = new RegExp(this.filtroEfetivados.trim(), 'i')
        return this.efetivadosParticipantes.filter((efetivados) =>
          exp.test(efetivados.nomeParticipante)
        )
      } else {
        return this.efetivadosParticipantes
      }
    },
    formacoesComFiltro () {
      if (this.filtroFormacoes) {
        let exp = new RegExp(this.filtroFormacoes.trim(), 'i')
        return this.formacoesTotal.filter((formacoes) =>
          exp.test(formacoes.nomePrograma)
        )
      } else {
        return this.formacoesTotal
      }
    }
  },
  methods: {
    redirecionamento: function () {
      var formacao = document.getElementById('select1').value
      var turma = document.getElementById('select2').value
      var escopo = document.getElementById('select3').value
      var formulario = document.getElementById('formSelect')
      if (escopo == 'Alura') {
        formulario.action = encodeURI( window.location.href =  variavel.href ='/relatorios-alura')
        formulario.submit()
      } else if (escopo == 'Avaliações') {
        formulario.action = encodeURI(
          window.location.href =  variavel.href ='relatorios-avaliacoes'
        )
        formulario.submit()
      } else if (escopo == 'Conclusões') {
        formulario.action = encodeURI(
          window.location.href =  variavel.href ='relatorios-conclusoes'
        )
        formulario.submit()
      } else if (escopo == 'Investimentos') {
        formulario.action = encodeURI(
          window.location.href =  variavel.href ='relatorios-investimentos'
        )
        formulario.submit()
      }
    },
    participantesAtivos: function () {
      http.get('relatorios/participantesAtivos').then((response) => {
        this.ativosParticipantes = response.data
      })
    },
    participantesEfetivados: function () {
      http.get('relatorios/participantesEfetivados').then((response) => {
        this.efetivadosParticipantes = response.data
      })
    },
    buscarTurmasDeUmaFormacao: function () {
      this.nomePrograma = document.querySelector('#select1').value
      http.get(`relatorios/turmas/${this.nomePrograma}`).then((response) => {
        this.turmasPrograma = response.data
      })
    },

    totalFormacoes: function () {
      http.get('relatorios/formacoesEmAndamento').then((response) => {
        console.log((this.formacoesTotal = response.data))
      })
    },
    validaForm () {
      var formacao = document.getElementById('select1').value
      var turma = document.getElementById('select2').value
      var escopo = document.getElementById('select3').value
      let erro = 0
      if (formacao == 'null') {
        document.querySelector('#progFormacao').classList.remove('none')
        erro = 1
      } else {
        erro = 0
        document.querySelector('#progFormacao').classList.add('none')
      }
      if (turma == 'null') {
        document.querySelector('#progTurma').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#progTurma').classList.add('none')
        erro = 0
      }
      if (escopo == 'null') {
        document.querySelector('#progEscopo').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#progEscopo').classList.add('none')
        erro = 0
      }
      if (erro > 0) {
        return false
      } else if (formacao != 'null' && turma != 'null' && escopo != 'null') { 
        this.redirecionamento()
      }
    }
  }
}
</script>

<style>
/* ---------- Classes dados_gerais ---------- */
main .dados_gerais-divCard {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.none {
  display: none;
}

.erro {
  color: red;
  font-weight: bold;
  font-size: 15px;
}

.dados_gerais-main .card {
  box-shadow: 4px 4px 4px #ccc;
  margin-bottom: 25px !important;
  height: 200px;
}

.dados_gerais-titulo {
  color: #090b2e;
  font-weight: bold;
  font-size: 1.4rem;
  margin-top: 2px;
  margin-bottom: 15px;
}

.dados_gerais-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dados_gerais-h3 {
  font-size: 4rem;
  margin-left: 10px;
  font-weight: bold;
}

.dados_gerais-h3-1 {
  color: #ab0045;
}

.dados_gerais-h3-2 {
  color: #ffb600;
}

.dados_gerais-h3-3 {
  color: #090b2e;
}

.dados_gerais-img {
  width: 50px;
  margin-right: 20px;
  cursor: pointer;
}

.dados_gerais-img:hover {
  width: 50px !important;
}

.dados_gerais-param {
  margin-left: 10px;
  color: #737373;
  font-size: 0.9rem;
}

main .card-body {
  flex: 1 1 auto;
  padding: 0rem 1rem;
}

/* ---------- Classes modal ---------- */
main .modal-body {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.modal_titulo {
  color: #090b2e;
  font-weight: bold;
  width: 80%;
  text-align: center;
  margin: 0 auto;
  padding-bottom: 20px;
}

.modal-pesquisar {
  font-size: 0.9rem;
  color: #737373;
  display: flex;
  justify-content: space-between;
}

.modal .modal-header {
  display: initial;
}

main .modal_table-head {
  margin-bottom: 0;
}

.modal .modal_table-1 {
  font-size: 0.8rem;
  color: #737373;
}

.modal_table-th-2col {
  width: 55%;
  color: #737373;
}

.modal_table-th-3col {
  width: 40%;
  color: #737373;
}

.modal_table-scroll {
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  max-height: 350px;
}

main .modal_table-imagem {
  padding: 0 !important;
  margin: 0;
}

main .modal_table-imagem img {
  width: 37px !important;
}

.modal .modal_table-imagem-forAndamento,
.modal_table-imagem-forAndamento img {
  width: 37px;
  padding: 0;
}

.modal_lupa {
  display: initial;
  position: absolute;
  right: 0;
  width: 40px;
}

/* ---------- Classes relatorio ---------- */
.relatorio_main label {
  min-width: 100% !important;
}

.relatorio_titulo {
  color: #090b2e;
  font-weight: bold;
  font-size: 1.4rem;
}

.relatorio_opcao1 {
  color: #737373;
}

.relatorio_opcao {
  font-size: 1rem;
  color: #737373;
}

.relatorio_button {
  width: 100%;
  padding: 7px;
  font-weight: bold;
  background-color: #ab0045;
  color: #fff;
  border: none;
}

/* ---------- @media dados_gerais ---------- */
@media (min-width: 425px) {
  main .dados_gerais-main {
    width: 100%;
  }

  main .dados_gerais-divCard {
    display: flex;
    flex-wrap: wrap;
  }

  .dados_gerais-divCard .card {
    width: 47%;
  }

  .dados_gerais-titulo {
    text-align: center;
  }

  .dados_gerais-img {
    width: 35px;
  }
}

@media (min-width: 768px) {
  main .dados_gerais-main {
    width: 100%;
    margin-top: 30px;
  }

  .dados_gerais-divCard .card {
    width: 31.3%;
  }

  .dados_gerais-img {
    width: 40px;
  }

  .dados_gerais-param {
    font-size: 0.8rem;
  }

  .dados_gerais-main .card {
    height: 180px;
  }

  .dados_gerais-img:hover {
    margin-bottom: 5px;
  }

  .dados_gerais-titulo {
    text-align: center;
  }
}

@media (min-width: 1024px) {
  main .dados_gerais-main {
    width: 55%;
    margin-top: 0;
  }

  .dados_gerais-divCard .card {
    width: 48%;
  }
}

/* ---------- @media modal ---------- */
@media (min-width: 320px) {
  .modal_lupa {
    margin: 2%;
  }
  .modal_titulo {
    font-size: 0.9rem;
  }
}

@media (min-width: 768px) {
  .modal_lupa {
    margin: 2%;
  }
  .modal_titulo {
    font-size: 1rem;
  }
}

@media (min-width: 1024px) {
  .modal_lupa {
    margin: 1%;
  }
  .modal_titulo {
    font-size: 1.2rem;
  }
}

/* ---------- @media relatorio ---------- */
@media (min-width: 320px) {
  .relatorio_button {
    margin-bottom: 20px;
  }
  main table th {
    font-size: 0.7rem;
  }
  main #modal_table-th-2 {
    padding-left: 5px;
  }
}

@media (min-width: 768px) {
  main .relatorio_main {
    width: 50%;
  }
  main #modal_table-th-2 {
    padding-left: 55px;
  }
  main table th {
    font-size: 0.8rem;
  }
}

@media (min-width: 1024px) {
  main {
    display: flex;
  }

  main .relatorio_main {
    width: 25%;
    min-width: 300px;
  }

  .relatorio_main .relatorio_button {
    margin-top: 210px;
  }
  main #modal_table-th-2 {
    padding-left: 130px;
  }

  main table th {
    font-size: 1.2rem;
  }
}
</style>