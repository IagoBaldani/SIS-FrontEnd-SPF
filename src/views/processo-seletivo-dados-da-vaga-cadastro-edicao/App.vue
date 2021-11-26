<template>
  <Header />

  <main>
    <div class="container-fluid">
      <div class="row justify-content-evenly">
        <h3 class="titulo col-xl-4 mt-5">Dados da vaga:</h3>
        <div class="col-xl-4"></div>
        <div class="col-xl-2"></div>
      </div>
      <div class="row justify-content-evenly">
        <div class="col-xl-4">
          <div>
            <label class="form-label mb-0 titulo">Nome</label>
            <input class="form-control" type="text" placeholder="Digite uma turma de Formação" v-model="formacoes.nome" id="inputNome"/>
          </div>
          <div>
            <label class="form-label mb-0 mt-3 titulo">Instrutor responsável</label>
            <select class="form-select" v-model="formacoes.nomeInstrutor" id="inputNomeInstrutor">
              <option selected>Selecione um instrutor</option>
              <option v-for="instrutor in instrutores" :key="instrutor" v-bind:value="instrutor.nome">{{ instrutor.nome }}</option>
            </select>
<!--            <input list="listaInstrutores" id="inputInstrutores" class="form-control" placeholder="Intrutor responsável pela formação">-->
<!--              <datalist id="listaInstrutores">-->
<!--                <option v-for="instrutor in instrutores" :key="instrutor">{{ instrutor.nome }}</option>-->
<!--              </datalist>-->
          </div>
          <div>
            <label class="form-label mb-0 mt-3 titulo">Data início</label>
            <input type="date" name="dataInicio" class="form-control" v-model="formacoes.dataInicio" id="inputDataIni"/>
          </div>
          <div>
            <label class="form-label mb-0 mt-3 titulo">Data término</label>
            <input type="date" name="dataTermino" class="form-control mb-5" v-model="formacoes.dataFim" id="inputDataFin"/>
          </div>
        </div>
        <div class="col-xl-4">
          <div>
            <label class="form-label mb-0 titulo">Quantidade de estagiários</label>
            <div class="input-group">
              <input type="number" class="form-control" placeholder="Número de estagiários" name="qtdEstagiarios" id="inputQtdEstagiarios" @input="escutaQuantidades" v-model="formacoes.qtdEstagiario"/>
            </div>
          </div>
          <div>
            <label class="form-label mb-0 mt-3 titulo">Quantidade de trainees</label>
            <div class="input-group">
              <input type="number" class="form-control" placeholder="Número de trainees" name="qtdTrainees" id="inputQtdTrainees" @input="escutaQuantidades" v-model="formacoes.qtdTrainee"/>
            </div>
          </div>
          <div>
            <label class="form-label mb-0 mt-3 titulo"
              >Quantidade de Aprendizes</label>
            <div class="input-group">
              <input type="number" class="form-control" placeholder="Número de aprendizes" name="qtdAprendizes" id="inputQtdAprendizes" @input="escutaQuantidades" v-model="formacoes.qtdAprendiz"/>
            </div>
          </div>
          <fieldset disabled>
            <div>
              <label class="form-label mb-0 mt-3 titulo">Participantes totais</label>
              <input name="qtdTotal" type="text" class="form-control" id="inputQtdTotal" placeholder="Quantidade total" disabled readonly v-model="formacoes.qtdTotal"/>
            </div>
          </fieldset>
        </div>
        <div class="col-xl-2"></div>
      </div>
      <div class="row justify-content-evenly">
        <div class="col-xl-4 ">
          <div>
            <button type="button" class="btn-confirmar btn" data-bs-toggle="modal" data-bs-target="#exampleModal" @click.prevent="geraFormulario">CONFIRMAR</button>
          </div>
        </div>
        <div class="col-xl-4">
          <div>
            <button type="button" class="btn btn-cancelar" v-if="tipo.tipoDaPagina == 'edicao' && formacoes.status != 'FINALIZADA'" @click="criaFormacao()">FINALIZAR PROCESSO SELETIVO</button>
          </div>
        </div>
        <div class="col-xl-2"></div>
      </div>
    </div>
  </main>

  <!-- modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-xl modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header border-0">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body d-flex justify-content-between">
          <div>
            <h1 class="modal-title form-label fw-bold mb-0 titulo">Deseja confirmar os seguintes dados?</h1>
          </div>
          <div class="conteudomodalCadastroEdicao">
            <div class="row">
              <div class="col">
                <div class="alinharDiv">
                  <span class="informacoes-modal">Nome: {{ formacoesForm.nome }}</span>
                </div>
                <div class="alinharDiv">
                  <span class="informacoes-modal">Instrutor: {{ formacoesForm.nomeInstrutor }}</span>
                </div>
                <div class="alinharDiv">
                  <span class="informacoes-modal">Data início: {{ dataFormatada.dataIniFormatada }} </span>
                </div>
                <div class="alinharDiv">
                  <span class="informacoes-modal">Data término: {{ dataFormatada.dataFinFormatada }}</span>
                </div>
                <div class="alinharDiv">
                  <span class="informacoes-modal">Quantidade de estagiários: {{ formacoesForm.qtdEstagiario }}</span>
                </div>
                <div class="alinharDiv">
                  <span class="informacoes-modal">Quantidade de trainees: {{ formacoesForm.qtdTrainees }}</span>
                </div>
                <div class="alinharDiv">
                  <span class="informacoes-modal">Quantidade de aprendizes: {{ formacoesForm.qtdAprendizes }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer border-0 justify-content-around">
          <div>
            <button type="button" class="btn submit" @click="enviaDados">CONFIRMAR</button>
          </div>
          <div>
            <button type="button" class="btn cancel" data-bs-dismiss="modal">CANCELAR</button>
          </div>
        </div>
      </div>
    </div>
  </div>
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
      formacoes: {
        nome: '',
        nomeInstrutor: '',
        dataInicio: '',
        dataFim: '',
        qtdEstagiario: '',
        qtdAprendiz: '',
        qtdTrainees: '',
        status: ''
      },
      formacoesForm: {
        nome: '',
        nomeInstrutor: '',
        dataInicio: '',
        dataFim: '',
        qtdEstagiario: '',
        qtdAprendiz: '',
        qtdTrainees: '',
        status: ''
      },
      dataFormatada: {
        dataIniFormatada: '',
        dataFinFormatada: ''
      },
      tipo: {
        tipoDaPagina: ''
      },
      instrutores: {},
      qtdTotal: {
        qtdTotal: ''
      }
    }
  },
  beforeMount () {
    Funcoes.verificaToken()

    this.getInstrutores()

    const dadosUrl = this.pegaDadosUrl()
    let id = dadosUrl.id
    let tipo = dadosUrl.tipo

    if (tipo == 'edicao') {
      this.getProcesso(id)
      this.formacoes.qtdTotal = this.formacoes.qtdTrainee + this.formacoes.qtdEstagiario + this.formacoes.qtdAprendiz
      this.tipo.tipoDaPagina = 'edicao'
    }
  },
  methods: {
    escutaQuantidades () {
      let qtdAprendizes = document.querySelector('#inputQtdAprendizes').value
      let qtdEstagiarios = document.querySelector('#inputQtdEstagiarios').value
      let qtdTrainees = document.querySelector('#inputQtdTrainees').value
      this.carregaQuantidade(qtdEstagiarios, qtdTrainees, qtdAprendizes)
    },
    carregaQuantidade (qtdE, qtdT, qtdA) {
      qtdA = parseInt(qtdA)
      qtdT = parseInt(qtdT)
      qtdE = parseInt(qtdE)

      if (isNaN(qtdE)) {
        qtdE = 0
      }
      if (isNaN(qtdT)) {
        qtdT = 0
      }
      if (isNaN(qtdA)) {
        qtdA = 0
      }

      let qtdTotal = 0
      qtdTotal += qtdE + qtdT + qtdA
      let elQtdTotal = document.querySelector('#inputQtdTotal')
      elQtdTotal.value = qtdTotal
    },
    geraFormulario () {
      this.formacoesForm.nome = document.querySelector('#inputNome').value
      this.formacoesForm.nomeInstrutor = document.querySelector('#inputNomeInstrutor').value
      this.formacoesForm.dataInicio = document.querySelector('#inputDataIni').value
      this.formacoesForm.dataFim = document.querySelector('#inputDataFin').value
      this.dataFormatada.dataIniFormatada = formataDataParaExibicao(document.querySelector('#inputDataIni').value)
      this.dataFormatada.dataFinFormatada = formataDataParaExibicao(document.querySelector('#inputDataFin').value)
      this.formacoesForm.qtdEstagiario = document.querySelector('#inputQtdEstagiarios').value
      this.formacoesForm.qtdAprendizes = document.querySelector('#inputQtdAprendizes').value
      this.formacoesForm.qtdTrainees = document.querySelector('#inputQtdTrainees').value
    },
    criaFormacao () {
      const dadosUrl = this.pegaDadosUrl()
      var id = dadosUrl.id

      this.geraFormulario()
      this.formacoesForm.status = 'FINALIZADA'

      http
        .put(`processo-seletivo/${id}`, this.formacoesForm)
        .then(response => {
          window.location.href = 'http://localhost:8080/processo-seletivo-busca-por-vagas'
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
    getProcesso (id) {
      http
        .get(`processo-seletivo/${id}`)
        .then(response => {
          this.formacoes = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    getInstrutores () {
      http
        .get('instrutor')
        .then(response => {
          this.instrutores = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    enviaDados () {
      const dadosUrl = this.pegaDadosUrl()
      var tipo = dadosUrl.tipo
      var id = dadosUrl.id

      if (tipo == 'edicao') {
        this.formacoesForm.status = 'EM_ANDAMENTO'
        http
          .put(`processo-seletivo/${id}`, this.formacoesForm)
          .then(response => {
            window.location.href = 'http://localhost:8080/processo-seletivo-busca-por-vagas'
          })
          .catch(error => {
            console.log(error)
          })
      } else if (tipo == 'cadastro') {
        this.formacoesForm.status = 'EM_ANDAMENTO'
        http
          .post('processo-seletivo', this.formacoesForm)
          .then(response => {
            window.location.href = 'http://localhost:8080/processo-seletivo-busca-por-vagas'
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  }
}
function formataDataParaExibicao (data) {
  const dataPreForm = new Date(data)
  const dataFormatada = `${dataPreForm.getUTCDate()}/${dataPreForm.getUTCMonth() + 1}/${dataPreForm.getUTCFullYear()}`
  return dataFormatada
}
</script>

<style>
body{
  background-color: #ebebeb;
}
.titulo {
  color: #090b2e;
  font-weight: bold;
}

#disabledTextInput {
  background-color: #d3caca;
  border: 1px solid #bcb3b3;
}

.aprovado::placeholder {
  color: #19b200 !important;
}

textarea {
  resize: none !important;
}

.download {
  transform: rotate(180deg) !important;
}

.subtitulo {
  color: #090b2e;
  font-weight: bold;
  font-size: large;
}

.btn-confirmar {
  background-color: #ab0045 !important;
  font-weight: bold !important;
  color: #fff !important;
  width: 100%;
}

.btn-cancelar {
  background-color: #ffb700 !important;
  font-weight: bold !important;
  color: #fff !important;
  width: 100%;
}

@media screen and (min-width: 992px) {
  .empty {
    height: 200px;
  }
}

/*Modal*/
.modal-body,
.modal-header,
.modal-footer {
  text-align: center;
  background-color: #ebebeb;
}

.modal-body {
  min-height: 55vh;
  flex-direction: column;
}

.submit,
.cancel {
  color: white !important;
  font-weight: bold !important;
  border-radius: 5px !important;
  width: 350px;
  height: 50px;
  font-size: 25px !important;
}

.submit {
  background-color: #ab0045 !important;
}

.cancel {
  background-color: #ffb700 !important;
}

.conteudomodal {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 40vh;
}

.conteudomodalCadastroEdicao {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 80px;
}

.alinharDiv {
  text-align: start;
}

.informacoes-modal {
  color: #737373 !important;
  font-size: 1.25rem;
}
</style>
