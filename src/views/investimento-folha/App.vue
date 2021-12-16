<template>
  <Header link="../home"/>
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
              <option id="programa" v-bind:value="programa.nomePrograma" v-for="programa in programas" v-bind:key="programa">{{programa.nomePrograma}}</option>
            </select>
          </div>
          <div class="col-xl-3">
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
          <div class="col-xl-2">
            <button
              class="botaoConfirmar btn btn-primary mt-4"
              type="button"
              v-on:click="validaForm()"
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
          <div >
            <button
              id="botaoAdicionarManualmente"
              data-bs-toggle="modal" data-bs-target="#exampleModal"
              type="button"
              class="btn-lg btnAdicionar none"
              v-on:click="mostrarParticipantes()"
            >
              ADICIONAR SALÁRIO
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
                  <option selected disabled>Participante</option>
                  <option
                    :value="cpfParticipante.cpfParticipante"
                    v-for="cpfParticipante in cpfParticipantes"
                    :key="cpfParticipante.cpfParticipante"
                    >{{ cpfParticipante.nomeCandidato }}</option
                  >
                </select>
              </div>
              <p id="erroNome" class="erro none">Por favor selecione um participante</p>
              <label class="modalconteudo">Data</label>
              <div class="input-group input-group-lg">
                <input
                  id="mesAnoModal"
                  type="date"
                  class="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-lg"
                />
              </div>
              <p id="erroData" class="erro none">O campo data não pode ser vazio</p>
              <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
                <div class="modalitens col-xl-6">
                  <label class="modalconteudo">Remuneração</label>
                  <div class="input-group input-group-lg">
                    <input
                      @change="escutaQuantidades"
                      v-money="money"
                      id="remuneracaoModal"
                      class="form-control"
                    />
                  </div>
                  <p id="erroRemun" class="erro none">O campo remuneração não pode ser vazio</p>
                  <p id="erroRemunQuantidade" class="erro none">Valor alto demais!</p>
                </div>
                <div class="modalitens col-xl-6">
                  <label class="modalconteudo">Encargos</label>
                  <div class="input-group input-group-lg">
                    <input
                      @change="escutaQuantidades"
                      id="encargosModal"
                      class="form-control"
                      v-money="money"
                    />
                  </div>
                  <p id="erroEncargos" class="erro none">Por favor digite um valor válido, se for o caso digite 0</p>
                  <p id="erroEncargosQuantidade" class="erro none">Valor alto demais!</p>
                </div>
              </div>
              <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
                <div class="modalitens col-xl-6">
                  <label class="modalconteudo">Benefícios</label>
                  <div class="input-group input-group-lg">
                    <input
                      id="beneficiosModal"
                      @change="escutaQuantidades"
                      type="text"
                      class="form-control"
                      v-money="money"
                    />
                  </div>
                  <p id="erroBeneficios" class="erro none">Por favor digite um valor válido, se for o caso digite 0</p>
                  <p id="erroBeneficiosQuantidade" class="erro none">Valor alto demais!</p>
                </div>
                <div class="modalitens col-xl-6">
                  <label class="modalconteudo">Total</label>
                  <div class="input-group input-group-lg">
                    <input
                      id="inputQtdTotal"
                      :value="qtdTotal.toFixed(2)"
                      v-money="money"
                      disabled
                      type="text"
                      class="form-control"
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
                  <p id="erroObservacao" class="erro none">Por favor, preencha este campo</p>
                </div>
              </div>
            </div>
            <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3 modal-footer">
              <div class="row-xl-5">
                <button
                  id="confirmar"
                  type="button"
                  class="btn btn-secondary"
                  v-on:click="validaFormModal()"
                >
                  CONFIRMAR
                </button>
                <button type="button" id="fechaModal" data-bs-dismiss="modal" class="none"></button>
              </div>
              <div class="col-xl-5"></div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- Modal de confirmação -->
    <p class="none" id="abreModalInvisivel" data-bs-toggle="modal" data-bs-target="#modalConfirmacao" ></p>
    <div class="modal fade mt-5"  id="modalConfirmacao" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-size">
            <div class="modal-content p-5 grey-background">
                <div class="row mb-5">
                    <div class="col">
                        <h3 class="modal-title fw-bold titulo text-center" id="exampleModalLabel">Inserção efetuada com sucesso</h3>
                        <h4 class="mt-4 modal-title fw-bold titulo text-center" id="redirecionar">Redirecionando...</h4>
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
import { variavel } from '../../services/Variavel'
import { mask } from 'vue-the-mask'
import { VMoney } from 'v-money'

export default {
  name: 'App',
  directives: { mask, money: VMoney },
  components: {
    Header
  },
  data () {
    return {
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2
      },
      participantes: [],
      cpfParticipantes: [],
      programas: [],
      turmas: [],
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
      qtdTotal: 0,

      qtdSalario: {
        qtdSalario: ''
      }
    }
  },
  beforeMount () {
    Funcoes.verificaToken()
    this.getProgramas()
  },
  methods: {
    filtrarDados () {
      console.log('Entrei aqui')
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
          this.mudaVisibilidade()
        })
    },
    validaForm () {
      this.programaProcurado = document.querySelector('.filtro-programa').value
      this.turmaProcurada = document.querySelector('.filtro-turma').value
      let erro = 0
      if (this.programaProcurado == '') {
        console.log('Erro programa')
        erro = 1
      } else {
        erro = 0
      }
      if (this.turmaProcurada == '') {
        console.log('Erro turma')
        erro = 1
      } else {
        erro = 0
      }
      if (erro == 1) {
        return false
      } else {
        this.filtrarDados()
      }
    },
    abrirModal () {
      document.getElementById('abreModalInvisivel').click()
    },
    validaFormModal () {
      var participante = document.querySelector('#nomeModal').value
      var dataLancamento = document.querySelector('#mesAnoModal').value
      var remuneracao = document.querySelector('#remuneracaoModal').value
      var encargos = document.querySelector('#encargosModal').value
      var beneficios = document.querySelector('#beneficiosModal').value
      var observacao = document.querySelector('#descricaoModal').value
      let erro = 0
      if (participante == 'Participante') {
        document.querySelector('#erroNome').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroNome').classList.add('none')
      }
      if (dataLancamento == '') {
        document.querySelector('#erroData').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroData').classList.add('none')
      }
      if (remuneracao == '') {
        document.querySelector('#erroRemun').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroRemun').classList.add('none')
      }
      if (remuneracao > 10000) {
        document.querySelector('#erroRemunQuantidade').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroRemunQuantidade').classList.add('none')
      }
      if (encargos == '') {
        document.querySelector('#erroEncargos').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroEncargos').classList.add('none')
      }
      if (encargos > 10000) {
        document.querySelector('#erroEncargosQuantidade').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroEncargosQuantidade').classList.add('none')
      }
      if (beneficios == '') {
        document.querySelector('#erroBeneficios').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroBeneficios').classList.add('none')
      }
      if (beneficios > 10000) {
        document.querySelector('#erroBeneficiosQuantidade').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroBeneficiosQuantidade').classList.add('none')
      }
      if (observacao == '') {
        document.querySelector('#erroObservacao').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroObservacao').classList.add('none')
      }
      if (erro == 1) {
        return false
      } else {
        this.inserirInvestimento()
        document.getElementById('fechaModal').click()
      }
    },
    mostrarParticipantes () {
      http
        .get(
          `investimento-folha/participantes/${this.programaProcurado}/${this.turmaProcurada}`
        )
        .then(response => (this.cpfParticipantes = response.data))
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
    inserirInvestimento () {
      this.form.cpf = document.getElementById('nomeModal').value
      this.form.mesAno = document.querySelector('#mesAnoModal').value
      this.form.remuneracao = document.querySelector('#remuneracaoModal').value.replace('R$ ', '').replace('.', '').replace(',', '.')
      this.form.encargos = document.querySelector('#encargosModal').value.replace('R$ ', '').replace('.', '').replace(',', '.')
      this.form.beneficios = document.querySelector('#beneficiosModal').value.replace('R$ ', '').replace('.', '').replace(',', '.')
      this.form.descricao = document.querySelector('#descricaoModal').value
      console.log(this.form)
      http.post('/investimento-folha', this.form).then(response => {
        this.abrirModal()
        setTimeout(function () {
          window.location.href = variavel.href = 'investimento-folha'
        }, 1500)
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
      let remuneracao = document.querySelector('#remuneracaoModal').value.replace('R$ ', '').replace('.', '').replace(',', '.')
      let encargos = document.querySelector('#encargosModal').value.replace('R$ ', '').replace('.', '').replace(',', '.')
      let beneficios = document.querySelector('#beneficiosModal').value.replace('R$ ', '').replace('.', '').replace(',', '.')
      this.carregaQuantidade(remuneracao, encargos, beneficios)
    },
    carregaQuantidade (remun, encarg, benef) {
      remun = parseFloat(remun)
      encarg = parseFloat(encarg)
      benef = parseFloat(benef)

      if (isNaN(remun)) {
        remun = 0
      }
      if (isNaN(encarg)) {
        encarg = 0
      }
      if (isNaN(benef)) {
        benef = 0
      }
      this.qtdTotal = remun + encarg + benef
    },

    mudaVisibilidade () {
      let mensagem = document.querySelector('.mensagem')
      let extremo = document.querySelector('.extremo')
      let botao = document.querySelector('#botaoAdicionarManualmente')

      mensagem.style.display = 'none'
      botao.style.display = 'flex'
      extremo.style.display = 'flex'
    },

    formataDataParaMostrar (data) {
      const dataPreForm = new Date(data)
      const dataFormatada = `${dataPreForm.getUTCDate()}/${dataPreForm.getUTCMonth() + 1}/${dataPreForm.getUTCFullYear()}`
      return dataFormatada
    },

    mostrarBtnAdicionar () {
      let btnAdicionar = document.querySelector('.btnAdicionar')

      btnAdicionar.style.display = 'flex'
    }
  }
}
</script>

<style>
body {
  background: #ebebeb;
}

.erro {
  color: red;
  font-weight: bold;
}

.none {
  display: none;
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

.none {
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

#redirecionar {
  font-family: Montserrat;
  font-size: 30px;
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

  .btnAdicionar {
    display: none;
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
