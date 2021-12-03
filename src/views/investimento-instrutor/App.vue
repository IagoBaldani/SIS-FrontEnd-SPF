<template>
  <Header />
  <div class="container">
    <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
      <div class="col-xl-4">
        <div>
          <a
            class="btn mt-4"
            id="botaoFolha"
            href="/investimento-folha"
            role="button"
            >FOLHA</a
          >
          <a class="btn mt-4" id="botaoInstrutor" role="button">INSTRUTOR</a>
        </div>
      </div>
      <div class="col-xl-8">
        <form class="formulario row g-3">
          <div class="formacoes col-md-3">
            <select
              class="filtro-programa form-select mt-4"
              id="validationDefault04"
              required
            >
              <option selected disabled value="">Formação</option>
              <option id="programa" v-bind:value="programa.nomePrograma" v-for="programa in programas" v-bind:key="programa">{{programa.nomePrograma}}</option>
            </select>
          </div>
          <div class="col-md-3">
            <select
              class="filtro-turma turmas form-select mt-4"
              id="validationDefault04"
              v-on:click="getTurmas()"
              required
            >
              <option selected disabled value="">Turmas</option>
              <option id="turma" v-bind:value="turma.id" v-for="turma in turmas" v-bind:key="turma.id">{{turma.nomeTurma}}</option>
            </select>
          </div>
          <div class="col-md-3">
            <button
              class="botaoConfirmar btn btn-primary mt-4"
              type="button"
              v-on:click="filtrarDados()"
            >
              Pesquisar
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="table-wrapper-scroll-y my-custom-scrollbar">
      <table class="table table-stripped mt-4">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Formação</th>
            <th>Turma</th>
            <th>Salario investido</th>
            <th>Data lançamento</th>
            <th>Data fim programa</th>
          </tr>
        </thead>
        <tbody align="center">
          <tr
            id="instrutores"
            v-for="instrutor in instrutores"
            v-bind:key="instrutor"
            class="participantes"
          >
            <td>{{ instrutor.nomeInstrutor }}</td>
            <td>{{ instrutor.nomePrograma }}</td>
            <td>{{ instrutor.nomeTurma }}</td>
            <td>R$ {{ instrutor.qtdHora * instrutor.vlrHora }},00</td>
            <td>{{ formataDataParaMostrar(instrutor.dataLancamento) }}</td>
            <td>{{ formataDataParaMostrar(instrutor.dataFim) }}</td>
          </tr>
        </tbody>
        <tfoot class="extremo">
          <tr>
            <th scope="row">TOTAL</th>
            <td id="salarioTotal"></td>
          </tr>
        </tfoot>
      </table>
      <div class="mensagem col-xl-12">
        Por favor, filtre os campos Formação e Turma para continuar
      </div>
    </div>
    <div class="container overflow-hidden botoes">
      <div class="teste row g-2 g-lg-3">
        <div
          class="botãoFinal col-xl-7"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <button
            id="botaoAdicionarManualmente"
            type="button"
            class="btn-lg"
            v-on:click="mostrarInstrutor()"
          >
            ADICIONAR MANUALMENTE
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-xl modal-dialog modal-dialog-centered">
      <div class="modal-content" id="modalinteiro">
        <div class="g-2 g-lg-3 modal-header">
          <h5 class="col-xl-11 modal-title" id="exampleModalLabel">
            Adicionar investimento Folha
          </h5>
          <button
            type="button"
            class="col-xl-1 btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="container-fluid ms-2">
          <div class="modalBody" id="fontModal">
            <label id="modalconteudo">Nome</label>
            <div class="input-group input-group-lg">
              <select
                class="form-select nomeModal"
                aria-label="Default select example"
                id="nomeModal"
              >
                <option
                  :value="cpfInstrutor.cpfInstrutor"
                  v-for="cpfInstrutor in cpfInstrutores"
                  :key="cpfInstrutor.cpfInstrutor"
                  >{{ cpfInstrutor.nomeInstrutor }}</option
                >
              </select>
            </div>
            <label id="modalconteudo">Mês e ano</label>
            <div class="input-group input-group-lg">
              <input
                id="mesAnoModal"
                type="date"
                class="form-control"
                placeholder="MM/YY"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-lg"
              />
            </div>
            <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
              <div class="modalitens col-xl-6">
                <label id="modalconteudo">Valor Hora</label>
                <div class="input-group input-group-lg">
                  <input
                    v-model="form.valorHora"
                    @input="escutaQuantidades"
                    id="valorHoraModal"
                    type="number"
                    class="form-control"
                    placeholder="R$"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-lg"
                  />
                </div>
              </div>
              <div class="modalitens col-xl-6">
                <label id="modalconteudo">Horas trabalhadas</label>
                <div class="input-group input-group-lg">
                  <input
                    v-model="form.horasTrabalhadas"
                    @input="escutaQuantidades"
                    id="horasTrabalhadasModal"
                    type="number"
                    class="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-lg"
                  />
                </div>
              </div>
            </div>
            <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
              <div class="modalitens col-xl-12">
                <label id="modalconteudo">Valor Total</label>
                <div class="input-group input-group-lg">
                  <input
                    id="inputQtdTotal"
                    readonly
                    v-model="form.qtdTotal"
                    disabled
                    type="number"
                    class="form-control"
                    placeholder="R$"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-lg"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3 modal-footer">
            <div class="row-xl-5">
              <button
                v-on:click="inserirInvestimento()"
                id="confirmar"
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                CONFIRMAR
              </button>
            </div>
            <div class="col-xl-5"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
      instrutores: [],
      cpfInstrutores: [],
      programaProcurado: '',
      programas: [],
      turmas: [],
      turmaProcurada: '',
      salarios: [],
      form: {
        cpf: '',
        mesAno: '',
        valorHora: '',
        horasTrabalhadas: ''
      },
      qtdTotal: {
        qtdTotal: ''
      }
    }
  },
  beforeMount () {
    Funcoes.verificaToken()
    this.getProgramas()
  },
  methods: {
    filtrarDados () {
      this.programaProcurado = document.querySelector('.filtro-programa').value
      this.turmaProcurada = document.querySelector('.filtro-turma').value
      this.mudaVisibilidade()
      http
        .get(
          'instrutor/buscar-instrutor/' +
            this.programaProcurado +
            '/' +
            this.turmaProcurada
        )
        .then(response => {
          (this.instrutores = response.data)
          this.pegarSalario()
        }) 
    },

    inserirInvestimento () {
      this.form.cpf = document.querySelector('#nomeModal').value
      this.form.mesAno = document.querySelector('#mesAnoModal').value
      this.form.valorHora = document.querySelector('#valorHoraModal').value
      this.form.horasTrabalhadas = document.querySelector(
        '#horasTrabalhadasModal'
      ).value
      http
        .post('/instrutor/salvar-invest', this.form)
        .then(response => console.log(response.data))
    },

    pegarSalario () {
      let salario = 0
      this.instrutores.forEach(instrutor => {
        salario = salario + (instrutor.qtdHora * instrutor.vlrHora)
      })
      document.querySelector('#salarioTotal').textContent = 'R$ ' + salario + ',00'
    },

    escutaQuantidades () {
      let valorHora = document.querySelector('#valorHoraModal').value
      let quantidadeHora = document.querySelector('#horasTrabalhadasModal')
        .value
      this.carregaQuantidade(valorHora, quantidadeHora)
    },

    carregaQuantidade (valor, quantidade) {
      valor = parseInt(valor)
      quantidade = parseInt(quantidade)

      if (isNaN(valor)) {
        valor = 0
      }
      if (isNaN(quantidade)) {
        quantidade = 0
      }

      let qtdTotal = 0
      qtdTotal = valor * quantidade
      let elQtdTotal = document.querySelector('#inputQtdTotal')
      elQtdTotal.value = qtdTotal
    },

    mostrarInstrutor () {
      http
        .get(
          `instrutor/instrutores/${this.programaProcurado}/${this.turmaProcurada}`
        )
        .then(response => console.log((this.cpfInstrutores = response.data)))
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
    getTurmas () {
      let turmas = document.querySelector('.filtro-programa').value
      console.log(turmas)
      http.get(`relatorios/turmas/${turmas}`)
        .then(response => {
          this.turmas = response.data
        })
    },
    mudaVisibilidade () {
      let mensagem = document.querySelector('.mensagem')
      let extremo = document.querySelector('.extremo')

      mensagem.style.display = 'none'
      extremo.style.display = 'flex'
    },

    formataDataParaMostrar (data) {
      const dataPreForm = new Date(data)
      const dataFormatada = `${dataPreForm.getUTCDate()}/${dataPreForm.getUTCMonth() + 1}/${dataPreForm.getUTCFullYear()}`
      return dataFormatada
    }
  }
}
</script>

<style>
body {
  background: #ebebeb;
}

.tela {
  background-color: #ebebeb;
}

[id^="info-"] {
  font-weight: 500; /*Seleciona todos os ID's que começam com "info-", ou o nome que você preferir*/
}

#imagem {
  width: 100%;
}

#botaoFolha {
  background: #ffb600;
  font-weight: bold;
  width: 180px;
  color: #ffffff;
}

#botaoInstrutor {
  background: #ab0045;
  font-weight: bold;
  width: 180px;
  margin-left: 30px;
  color: #ffffff;
}

#botaoSalarioPadrao {
  background: #ab0045;
  font-weight: bold;
  color: #ffffff;
  margin-left: 0%;
  border: none;
}

#botaoAdicionarManualmente {
  background: #ffb700;
  font-weight: bold;
  color: #ffffff;
  border: none;
}

#filtro-nome {
  height: 38px;
}

.table {
  width: 95%;
}

#botaoSelecionar {
  height: 38px;
  width: 60px;
  border: none;
}

.extremo {
  display: none;
}

#salarioTotal {
  font-weight: 500;
}

.botaoConfirmar {
  background: #090b2e;
  color: white;
  margin-left: 40px;
  width: 160px;
}

.mensagem {
  margin-top: 120px;
  color: #090b2e;
  font-size: x-large;
  font-weight: bold;
  text-align: center;
}

#tabela {
  margin-top: 30px;
}

.participantes {
  text-align: left;
  font-weight: 500;
}

#modalinteiro {
  background-color: #ebebeb;
}

.nomeModal {
  height: 55px;
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

.teste {
  margin-left: none;
}

.scrollbar-primary {
  scrollbar-color: #f5f5f5;
}

.botao {
  padding-bottom: 2%;
}

#formação {
  width: 180px;
  margin-right: 23px;
  margin-bottom: 50px;
  margin-left: 0px;
}

.invisivel {
  display: none;
}

#botaoSelecionar:hover {
  background-color: steelblue;
}

.recarregar {
  background-color: #090b2e !important;
  max-width: 50%;
  height: 40px;
  cursor: pointer !important;
  transition: all linear 0.3s !important;
  color: #ffffff;
}

.recarregar:hover {
  background-color: #141863 !important;
}

#investimentoFolha {
  width: 100%;
}

#modalconteudo {
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: center;
  margin-bottom: 12px;
  margin-top: 12px;
}

.conteudodescrição {
  margin-bottom: 40px;
}

#exampleModalLabel {
  font-family: Montserrat;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0em;
  font-weight: bold;
  text-align: center;
}

#confirmar {
  background: #ab0045;
  font-weight: bold;
  margin-top: 12px;
  width: 100%;
  border: none;
}

@media (max-width: 1400px) {
  #botaoFolha {
    width: 100%;
  }
  #botaoInstrutor {
    width: 100%;
    margin-left: 0px;
    margin-top: 10px;
  }

  .turmas {
    margin-left: 15px;
  }

  #botaoSalarioPadrao {
    width: max-content;
  }

  #botaoAdicionarManualmente {
    width: max-content;
    margin-left: 0px;
  }
}

@media (max-width: 1200px) {
  .modalitens,
  .botãoFinal {
    width: auto;
  }
  .conteudodescrição {
    width: 100%;
  }
}
</style>