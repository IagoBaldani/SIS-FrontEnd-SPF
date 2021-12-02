<template>
  <Header />
  <div class="container">
    <div class="row g-2 g-lg-3">
      <div class="col-xl-4">
        <div>
          <a class="btn mt-4" id="botaoFolha" role="button">FOLHA</a>
          <a
            class="btn mt-4"
            id="botaoInstrutor"
            href="/investimento-instrutor"
            role="button"
            >INSTRUTOR</a
          >
        </div>
      </div>
      <div class="col-xl-8">
        <form class="formulario row g-3">
          <div class="formacoes col-xl-3">
            <select
              class="filtro-programa form-select mt-4"
              id="validationDefault04"
              required
            >
              <option selected disabled value="">Formação</option>
              <option>Java</option>
              <option>Cobol</option>
              <option>.Net</option>
              <option>Mobile</option>
              <option>Mainframe</option>
              <option>Infraestrutura</option>
            </select>
          </div>
          <div class="col-xl-3">
            <select
              class="filtro-turma turmas form-select mt-4"
              id="validationDefault04"
              required
            >
              <option selected disabled value="">Turmas</option>
              <option>Turma I</option>
              <option>Turma II</option>
              <option>Turma III</option>
            </select>
          </div>
          <div class="col-xl-2">
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
            <th>Data início programa</th>
            <th>Data fim programa</th>
          </tr>
        </thead>
        <tbody align="center">
          <tr
            id="participante"
            v-for="participante in participantes"
            v-bind:key="participante"
            class="participantes"
          >
            <td>{{ participante.nomeParticipante }}</td>
            <td>{{ participante.nomeFormacao }}</td>
            <td>{{ participante.nomeTurma }}</td>
            <td>R$
              {{
                participante.bolsaAux +
                  participante.beneficios +
                  participante.convenio +
                  participante.horaExtra +
                  participante.beneficioLegislacao +
                  participante.remuneracaoEsporadica +
                  participante.remuneracaoExtra +
                  participante.alura
              }},00
            </td>
            <td>{{ formataDataParaMostrar(participante.dataInicio) }}</td>
            <td>{{ formataDataParaMostrar(participante.dataFim) }}</td>
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
    <div class="container overflow-hidden">
      <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
        <div class="botõesfinais col-xl-5">
          <div data-bs-toggle="modal" data-bs-target="#exampleModal">
            <button
              id="botaoAdicionarManualmente"
              type="button"
              class="btn-lg"
              v-on:click="mostrarParticipantes()"
            >
              ADICIONAR MANUALMENTE
            </button>
          </div>
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
        <form>
          <div class="container-fluid ms-2">
            <div class="modalBody" id="fontModal">
              <label class="modalconteudo">Nome</label>
              <div class="input-group input-group-lg">
                <select
                  class="form-select nomeModal"
                  aria-label="Default select example"
                  id="nomeModal"
                >
                  <option
                    :value="cpfParticipante.cpfParticipante"
                    v-for="cpfParticipante in cpfParticipantes"
                    :key="cpfParticipante.cpfParticipante"
                    >{{ cpfParticipante.nomeCandidato }}</option
                  >
                </select>
              </div>
              <label class="modalconteudo">Mês e ano</label>
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
                  <label class="modalconteudo">Remuneração</label>
                  <div class="input-group input-group-lg">
                    <input
                      @input="escutaQuantidades"
                      id="remuneracaoModal"
                      type="number"
                      class="form-control"
                      placeholder="R$"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-lg"
                    />
                  </div>
                </div>
                <div class="modalitens col-xl-6">
                  <label class="modalconteudo">Encargos</label>
                  <div class="input-group input-group-lg">
                    <input
                      @input="escutaQuantidades"
                      id="encargosModal"
                      type="number"
                      class="form-control"
                      placeholder="R$"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-lg"
                    />
                  </div>
                </div>
              </div>
              <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
                <div class="modalitens col-xl-6">
                  <label class="modalconteudo">Benefícios</label>
                  <div class="input-group input-group-lg">
                    <input
                      id="beneficiosModal"
                      @input="escutaQuantidades"
                      type="number"
                      class="form-control"
                      placeholder="R$"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-lg"
                    />
                  </div>
                </div>
                <div class="modalitens col-xl-6">
                  <label class="modalconteudo">Total</label>
                  <div class="input-group input-group-lg">
                    <input
                      id="inputQtdTotal"
                      disabled
                      type="number"
                      class="form-control"
                      placeholder="R$"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-lg"
                    />
                  </div>
                </div>
                <div class="modalitens col-xl-12">
                  <label class="modalconteudo">Descrição do Investimento</label>
                  <div class="input-group input-group-lg">
                    <input
                      id="descricaoModal"
                      type="text"
                      class="form-control"
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
                  id="confirmar"
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                  v-on:click="inserirInvestimento()"
                >
                  CONFIRMAR
                </button>
              </div>
              <div class="col-xl-5"></div>
            </div>
          </div>
        </form>
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
      participantes: [],
      cpfParticipantes: [],
      programaProcurado: '',
      turmaProcurada: '',
      form: {
        cpf: '',
        mesAno: '',
        remuneracao: '',
        encargos: '',
        beneficios: '',
        descricao: ''
      },
      qtdTotal: {
        qtdTotal: ''
      },
      qtdSalario: {
        qtdSalario: ''
      }
    }
  },
  beforeMount () {
    Funcoes.verificaToken()
  },
  methods: {
    filtrarDados () {
      this.programaProcurado = document.querySelector('.filtro-programa').value
      this.turmaProcurada = document.querySelector('.filtro-turma').value
      
      http
        .get(
          'investimento-folha/' +
            this.programaProcurado +
            '/' +
            this.turmaProcurada
        )
        .then(response => {
          (this.participantes = response.data)
          this.pegarSalario()
        })
      this.mudaVisibilidade()
    },

    mostrarParticipantes () {
      http
        .get(
          `investimento-folha/participantes/${this.programaProcurado}/${this.turmaProcurada}`
        )
        .then(response => (this.cpfParticipantes = response.data))
    },

    inserirInvestimento () {
      this.form.cpf = document.getElementById('nomeModal').value
      this.form.mesAno = document.querySelector('#mesAnoModal').value
      this.form.remuneracao = document.querySelector('#remuneracaoModal').value
      this.form.encargos = document.querySelector('#encargosModal').value
      this.form.beneficios = document.querySelector('#beneficiosModal').value
      this.form.descricao = document.querySelector('#descricaoModal').value
      http.post('/investimento-folha', this.form).then(response => {
      })
    },

    pegarSalario () {
      let salario = 0
      this.participantes.forEach(participante => {
        salario = salario + participante.bolsaAux + participante.beneficios + participante.convenio +
        participante.horaExtra +
        participante.beneficioLegislacao +
        participante.remuneracaoEsporadica +
        participante.remuneracaoExtra +
        participante.alura
      })
      document.querySelector('#salarioTotal').textContent = 'R$ ' + salario + ',00'
    },

    escutaQuantidades () {
      let remuneracao = document.querySelector('#remuneracaoModal').value
      let encargos = document.querySelector('#encargosModal').value
      let beneficios = document.querySelector('#beneficiosModal').value
      this.carregaQuantidade(remuneracao, encargos, beneficios)
    },

    carregaQuantidade (remun, encarg, benef) {
      remun = parseInt(remun)
      encarg = parseInt(encarg)
      benef = parseInt(benef)

      if (isNaN(remun)) {
        remun = 0
      }
      if (isNaN(encarg)) {
        encarg = 0
      }
      if (isNaN(benef)) {
        benef = 0
      }
      let qtdTotal = 0
      qtdTotal += remun + encarg + benef
      let elQtdTotal = document.querySelector('#inputQtdTotal')
      elQtdTotal.value = qtdTotal
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

#botaoFolha {
  background: #ab0045;
  font-weight: bold;
  width: 180px;
  color: #ffffff;
}

#botaoInstrutor {
  background: #ffb600;
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

#salarioTotal {
  font-weight: 500;
}

.formacao,
.turma {
  margin-top: 22px;
}

.extremo {
  display: none;
}

.mensagem {
  margin-top: 120px;
  color: #090b2e;
  font-size: x-large;
  font-weight: bold;
  text-align: center;
}

.botaoConfirmar {
  margin-left: 40px;
  background: #090b2e;
  color: white;
  width: 160px;
}

.botaoOrdenar {
  background: #090b2e;
  color: white;
}

#filtro-nome {
  height: 38px;
}

#botaoSelecionar {
  height: 38px;
  width: 60px;
  border: none;
}

#lupa {
  width: 100%;
}

#tabela {
  margin-top: 30px;
}

.table {
  width: 95%;
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

.aviso {
  display: none;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  position: relative;
  margin-bottom: 400px;
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

.modalconteudo {
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
  .botõesfinais {
    width: auto;
  }
  .conteudodescrição {
    width: 100%;
  }
}
</style>
