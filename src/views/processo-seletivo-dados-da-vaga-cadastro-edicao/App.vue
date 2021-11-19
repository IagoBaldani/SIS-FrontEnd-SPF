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
            <label for="formacao" class="form-label mb-0 titulo"
              >Formação</label
            >
            <input
              class="form-control"
              type="text"
              placeholder="Digite uma turma de Formação"
              v-bind:value="formacoes.formacao"
              id="inputFormacao"
            />
          </div>
          <div>
            <label for="dataInicio" class="form-label mb-0 mt-3 titulo"
              >Data início</label
            >
            <input type="date" name="dataInicio" class="form-control" v-bind:value="formacoes.dataIni" id="inputDataIni"/>
          </div>
          <div>
            <label for="dataTermino" class="form-label mb-0 mt-3 titulo"
              >Data término</label
            >
            <input type="date" name="dataTermino" class="form-control" v-bind:value="formacoes.dataFin" id="inputDataFin"/>
          </div>
          <div>
            <label for="qtdEstagiarios" class="form-label mb-0 mt-3 titulo"
              >Quantidade de estagiários</label
            >
            <div class="input-group">
              <input
                type="number"
                class="form-control"
                placeholder="Número de estagiários"
                name="qtdEstagiarios"
                id="inputQtdEstagiarios"
                @input="escutaQuantidades"
                v-bind:value="formacoes.qtdEstagiario"
              />
            </div>
          </div>
          <div>
            <label for="qtdTrainees" class="form-label mb-0 mt-3 titulo"
              >Quantidade de trainees</label
            >
            <div class="input-group mb-5">
              <input
                type="number"
                class="form-control"
                placeholder="Número de trainees"
                name="qtdTrainees"
                id="inputQtdTrainees"
                @input="escutaQuantidades"
                v-bind:value="formacoes.qtdTrainee"
              />
            </div>
          </div>
        </div>
        <div class="col-xl-4">
          <div>
            <label for="qtdAprendizes" class="form-label mb-0 titulo"
              >Quantidade de Aprendizes</label
            >
            <div class="input-group">
              <input
                type="number"
                class="form-control"
                placeholder="Número de aprendizes"
                name="qtdAprendizes"
                id="inputQtdAprendizes" @input="escutaQuantidades"
                v-bind:value="formacoes.qtdAprendiz"
              />
            </div>
          </div>
          <fieldset disabled>
            <div>
              <label for="qtdTotal" class="form-label mb-0 mt-3 titulo"
                >Participantes totais</label
              >
              <input
                name="qtdTotal"
                type="text"
                class="form-control"
                id="inputQtdTotal"
                placeholder="Quantidade total"
                disabled readonly
                v-bind:value="formacoes.qtdTotal"
              />
            </div>
          </fieldset>
        </div>
        <div class="col-xl-2"></div>
      </div>
      <div class="row justify-content-evenly">
        <div class="col-xl-4 mt-4">
          <div>
            <button
              type="button"
              class="btn-confirmar btn"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              @click.prevent="enviarDados"
            >
              CONFIRMAR
            </button>
          </div>
        </div>
        <div class="col-xl-4"></div>
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
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body d-flex justify-content-between">
          <div>
            <h1 class="modal-title form-label fw-bold mb-0 titulo">
              Deseja confirmar os seguintes dados?
            </h1>
          </div>
          <div class="conteudomodalCadastroEdicao">
            <div class="row">
              <div class="col">
                <div class="alinharDiv">
                  <span class="informacoes-modal">Formação: {{ formacoes.formacao }}</span>
                </div>
                <div class="alinharDiv">
                  <span class="informacoes-modal">Data início: {{ formacoes.dataIni }} </span>
                </div>
                <div class="alinharDiv">
                  <span class="informacoes-modal">Data término: {{ formacoes.dataFin }}</span>
                </div>
                <div class="alinharDiv">
                  <span class="informacoes-modal"
                    >Quantidade de estagiários: {{ formacoes.qtdEstagiario }}</span
                  >
                </div>
                <div class="alinharDiv">
                  <span class="informacoes-modal">Quantidade de trainees: {{ formacoes.qtdTrainee }}</span>
                </div>
                <div class="alinharDiv">
                  <span class="informacoes-modal"
                    >Quantidade de aprendizes: {{ formacoes.qtdAprendiz }}</span
                  >
                </div>
                <div class="alinharDiv">
                  <span class="informacoes-modal">Participantes totais: {{ formacoes.qtdTotal }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer border-0 justify-content-around">
          <div>
            <button type="button" class="btn submit">CONFIRMAR</button>
          </div>
          <div>
            <button type="button" class="btn cancel" data-bs-dismiss="modal">
              CANCELAR
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Funcoes from '../../services/Funcoes';
export default {
  name: "App",
  components: {
    Header,
  },
  data() {
    return {
      formacoes: {
        formacao: '',
        dataIni: '',
        dataFin: '',
        qtdEstagiario: '',
        qtdAprendiz: '',
        qtdTrainee: '',
        qtdTotal: ''
      }
    };
  },
  beforeMount () {
    Funcoes.verificaToken()
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
  enviarDados(){
    this.formacoes.formacao = document.querySelector('#inputFormacao').value
    this.formacoes.dataIni = formataDataParaExibicao(document.querySelector('#inputDataIni').value);
    this.formacoes.dataFin = formataDataParaExibicao(document.querySelector('#inputDataFin').value);
    this.formacoes.qtdEstagiario = document.querySelector('#inputQtdEstagiarios').value
    this.formacoes.qtdAprendiz = document.querySelector('#inputQtdAprendizes').value
    this.formacoes.qtdTrainee = document.querySelector('#inputQtdTrainees').value
    this.formacoes.qtdTotal = document.querySelector('#inputQtdTotal').value
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
