<template>
  <Header link="../processo-seletivo-busca-por-vagas"/>

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
            <p id="nomeErro" class="mb-0 erro none">Por favor, preencha o campo nome</p>
          </div>
          <div>
            <label class="form-label mb-0 mt-3 titulo">Instrutor responsável</label>
            <select class="form-select" v-model="formacoes.nomeInstrutor" id="inputNomeInstrutor">
              <option selected value="0">Selecione um instrutor</option>
              <option v-for="instrutor in instrutores" :key="instrutor" v-bind:value="instrutor.nome">{{ instrutor.nome }}</option>
            </select>
            <p id="instrutorErro" class="mb-0 erro none">Por favor, preencha o campo instrutor</p>
<!--            <input list="listaInstrutores" id="inputInstrutores" class="form-control" placeholder="Intrutor responsável pela formação">-->
<!--              <datalist id="listaInstrutores">-->
<!--                <option v-for="instrutor in instrutores" :key="instrutor">{{ instrutor.nome }}</option>-->
<!--              </datalist>-->
          </div>
          <div>
            <label class="form-label mb-0 mt-3 titulo">Data início</label>
            <input type="date" name="dataInicio" class="form-control" v-model="formacoes.dataInicio" id="inputDataIni"/>
            <p id="dataIErro" class="mb-0 erro none">Por favor, preencha o campo data início</p>
          </div>
          <div>
            <label class="form-label mb-0 mt-3 titulo">Data término</label>
            <input type="date" name="dataTermino" class="form-control" v-model="formacoes.dataFim" id="inputDataFin"/>
            <p id="dataTErro" class="mt-0 erro none">Por favor, preencha o campo data término</p>
            <p id="dataErro" class="erro none">A data de término deve ser posterior a data de inicio</p>
          </div>
        </div>
        <div class="col-xl-4">
          <div>
            <label class="form-label mb-0 titulo">Quantidade de estagiários</label>
            <div class="input-group">
              <input type="number" class="form-control" placeholder="Número de estagiários" name="qtdEstagiarios" id="inputQtdEstagiarios" @input="escutaQuantidades" v-model="formacoes.qtdEstagiario"/>
            </div>
            <p id="estagiariosErro" class="mb-0 erro none">Por favor, preencha o campo quantidade de estágiarios</p>
          </div>
          <div>
            <label class="form-label mb-0 mt-3 titulo">Quantidade de trainees</label>
            <div class="input-group">
              <input type="number" class="form-control" placeholder="Número de trainees" name="qtdTrainees" id="inputQtdTrainees" @input="escutaQuantidades" v-model="formacoes.qtdTrainee"/>
            </div>
            <p id="traineesErro" class="mb-0 erro none">Por favor, preencha o campo quantidade de trainees</p>
          </div>
          <div>
            <label class="form-label mb-0 mt-3 titulo"
              >Quantidade de Aprendizes</label>
            <div class="input-group">
              <input type="number" class="form-control" placeholder="Número de aprendizes" name="qtdAprendizes" id="inputQtdAprendizes" @input="escutaQuantidades" v-model="formacoes.qtdAprendiz"/>
            </div>
            <p id="aprendizesErro" class="mb-0 erro none">Por favor, preencha o campo quantidade de aprendizes</p>
          </div>
          <fieldset disabled>
            <div>
              <label class="form-label mb-0 mt-3 titulo">Participantes totais</label>
              <input name="qtdTotal" type="text" class="form-control" id="inputQtdTotal" placeholder="Quantidade total" disabled readonly v-model="formacoes.qtdTotal"/>
            </div>
          </fieldset>
        </div>
        <!-- botao invisivel para abrir formulario -->
        <p id="verificaCampos" class="none" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="geraFormulario()"></p> 
        <div class="col-xl-2"></div>
      </div>
      <div class="row justify-content-evenly">
        <div class="col-xl-4 ">
          <div>
            <button type="button" class="mt-4 btn-confirmar btn" v-on:click="validaForm">CONFIRMAR</button>
          </div>
        </div>
        <div class="col-xl-4">
          <div>
            <button type="button" class="mt-4 btn btn-cancelar" v-if="tipo.tipoDaPagina == 'edicao' && formacoes.status != 'FINALIZADA'" v-on:click="criaFormacao()">FINALIZAR PROCESSO SELETIVO</button>
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
                <div class="alinharDiv">
                  <span class="informacoes-modal">Participantes Totais: {{ formacoesForm.qtdTotal }}</span>
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

   <!-- Modal de confirmação cadastro -->
  <p class="none" id="abreModalInvisivel" data-bs-toggle="modal" data-bs-target="#modalConfirmacao" ></p>
    <div class="modal fade mt-5"  id="modalConfirmacao" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-size">
            <div class="modal-content p-5 grey-background">
                <div class="row mb-5">
                    <div class="col">
                        <h3 class="modal-title fw-bold titulo text-center" id="exampleModalLabel">Cadastro efetuado com sucesso</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal de confirmação edição -->
  <p class="none" id="abreModalInvisivelEdicao" data-bs-toggle="modal" data-bs-target="#modalConfirmacaoEdicao" ></p>
    <div class="modal fade mt-5"  id="modalConfirmacaoEdicao" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-size">
            <div class="modal-content p-5 grey-background">
                <div class="row mb-5">
                    <div class="col">
                        <h3 class="modal-title fw-bold titulo text-center" id="exampleModalLabel">Alteração efetuada com sucesso</h3>
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
import { variavelBack } from '../../services/Variavel'
import { variavel } from '../../services/Variavel'

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
     abrirModal () {
      document.getElementById('abreModalInvisivel').click()
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
      this.formacoesForm.qtdTotal = document.querySelector('#inputQtdTotal').value
    },
    validaForm () {
      var nome = document.getElementById('inputNome').value
      var instrutor = document.getElementById('inputNomeInstrutor').value
      var dataInicio = document.getElementById('inputDataIni').value
      var dataTermino = document.getElementById('inputDataFin').value
      var qtdEstagiarios = document.getElementById('inputQtdEstagiarios').value
      var qtdTrainees = document.getElementById('inputQtdTrainees').value
      var qtdAprendizes = document.getElementById('inputQtdAprendizes').value
      let erro = 0
      if (nome == '') {
        document.querySelector('#nomeErro').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#nomeErro').classList.add('none')
      }
      if (instrutor == 0) {
        document.querySelector('#instrutorErro').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#instrutorErro').classList.add('none')
      }
      if (dataInicio == '') {
        document.querySelector('#dataIErro').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#dataIErro').classList.add('none')
      }
      if (dataTermino == '') {
        document.querySelector('#dataTErro').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#dataTErro').classList.add('none')
      }
      if (dataTermino < dataInicio) {
        document.querySelector('#dataErro').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#dataErro').classList.add('none')
      }
      if (qtdEstagiarios == '') {
        document.querySelector('#estagiariosErro').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#estagiariosErro').classList.add('none')
      }
      if (qtdTrainees == '') {
        document.querySelector('#traineesErro').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#traineesErro').classList.add('none')
      }
      if (qtdAprendizes == '') {
        document.querySelector('#aprendizesErro').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#aprendizesErro').classList.add('none')
      }
      if (erro == 1) {
        return false
      } else if (erro == 0) {
        document.getElementById('verificaCampos').click()
      }
    },
     criaFormacao () {
       const dadosUrl = this.pegaDadosUrl()
       var id = dadosUrl.id
       this.geraFormulario()
       this.formacoesForm.status = 'FINALIZADA'
       http
         .put(`processo-seletivo/${id}`, this.formacoesForm)
         .then(response => {
          this.abrirModalEdicao()
          setTimeout(function () {
                window.location.href = variavel.href = 'processo-seletivo-busca-por-vagas'
           }, 1521)
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
    abrirModal() {
      document.getElementById('abreModalInvisivel').click()
    },
    abrirModalEdicao() {
      document.getElementById('abreModalInvisivelEdicao').click()
    },
    getInstrutores () {
      http
        .get('instrutor/status/ATIVO')
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
      console.log(tipo)
      if (tipo == 'edicao') {
        this.formacoesForm.status = 'EM_ANDAMENTO'
        console.log(tipo)
        http
          .put(`processo-seletivo/${id}`, this.formacoesForm)
          .then(response => {
            this.abrirModalEdicao()
            setTimeout(function () {
               window.location.href = variavel.href = 'processo-seletivo-busca-por-vagas'
            }, 1521)
          })
          .catch(error => {
            console.log(error)
          })
      } else if (tipo == 'cadastro') {
        this.formacoesForm.status = 'EM_ANDAMENTO'
        http
          .post('processo-seletivo', this.formacoesForm)
          .then(response => {
            this.abrirModal()
            setTimeout(function () {
               window.location.href = variavel.href = 'processo-seletivo-busca-por-vagas'
            }, 1521)
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
.modal-size {
    width: 801px !important;
    max-width: 801px !important;
}
.btn-cancelar {
  background-color: #ffb700 !important;
  font-weight: bold !important;
  color: #fff !important;
  width: 100%;
}

.erro{
  color: red;
  font-weight: bold;
}

.none{
  display: none;
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
