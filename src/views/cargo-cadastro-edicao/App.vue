<template>
  <Header link="../cargo-listar"/>
      <main>
        <div class="container-fluid">
            <div class="row justify-content-evenly">
                <h3 class="titulo col-xl-4 mt-5">Cadastro cargo:</h3>
                <div class="col-xl-4"></div>
                <div class="col-xl-2"></div>
            </div>
            <div class="row justify-content-evenly">
                <div class="col-xl-4">
                    <div>
                        <label for="cargoInput" class="form-label mb-0 titulo">Cargo</label>
                        <input class="form-control" placeholder="Digite um cargo"  v-bind:value="cargos.cargo" type="text" name="cargo" id="inputCargo"/>
                        <p id="erroCargo" class="erro none">Por favor, selecione um cargo </p>
                        <p id="erroCargoCadastrado" class="erro none">Este cargo já está cadastrada, por favor insira outro</p>
                    </div>
                    <div>
                        <label for="bolsaAuxilio" class="form-label mb-0 mt-3 titulo">Bolsa auxílio</label>
                        <input type="number" name="bolsaAuxilio" class="form-control" v-bind:value="cargos.bolsa" placeholder="Valor bolsa auxílio" id="inputBolsaAuxilio"/>
                        <p id="erroBolsa" class="erro none">Por favor, coloque um valor válido maior ou igual a 0. </p>
                    </div>
                    <div>
                        <label for="beneficios" class="form-label mb-0 mt-3 titulo">Benefícios</label>
                        <input type="number" name="beneficios" class="form-control" v-bind:value="cargos.beneficio" placeholder="Valor Benefícios" id="inputBeneficios"/>
                        <p id="erroBeneficios" class="erro none">Por favor, coloque um valor válido maior ou igual a 0. </p>
                    </div>
                    <div>
                        <label for="convenio" class="form-label mb-0 mt-3 titulo">Convênio</label>
                        <input type="number" class="form-control" placeholder="Valor convênio" name="convenio" v-bind:value="cargos.convenio" id="inputConvenio"/>
                        <p id="erroConvenio" class="erro none">Por favor, coloque um valor válido maior ou igual a 0.</p>
                    </div>
                    <div class="mb-5">
                        <label for="horaExtra" class="form-label mb-0 mt-3 titulo">Hora extra</label>
                        <input type="number" class="form-control" placeholder="Valor da hora extra" name="horaExtra" v-bind:value="cargos.horaExtra" id="inputHoraExtra" />
                        <p id="erroHoraExtra" class="erro none">Por favor, coloque um valor válido maior ou igual a 0.</p>
                    </div>
                </div>
                <div class="col-xl-4">
                    <div>
                        <label for="beneficioLegislacao" class="form-label mb-0 titulo">Benefício legislação</label>
                        <input type="number" class="form-control" placeholder="Valor benefício legislação" name="beneficioLegislacao" v-bind:value="cargos.beneficioLegislacao" id="inputBeneficioLegislacao" />
                        <p id="erroBeneficioLegislacao" class="erro none">Por favor, coloque um valor válido maior ou igual a 0.</p>
                    </div>
                    <div>
                        <label for="remuneracaoEsporadica" class="form-label mb-0 mt-3 titulo">Remuneração esporádica</label>
                        <input name="remuneracaoEsporadica" type="number" class="form-control" placeholder="Valor remuneração esporadica" v-bind:value="cargos.remunEsporadica" id="inputRemuneracaoEsporadica" />
                        <p id="erroRemuneracaoEsporadica" class="erro none">Por favor, coloque um valor válido maior ou igual a 0. </p>
                    </div>
                    <div>
                        <label for="remuneracaoExtra" class="form-label mb-0 mt-3 titulo">Remuneração extra</label>
                        <input name="remuneracaoExtra" type="number" class="form-control" placeholder="Valor remuneração extra" v-bind:value="cargos.remunExtra" id="inputRemuneracaoExtra">
                        <p id="erroRemuneracaoExtra" class="erro none">Por favor, coloque um valor válido maior ou igual a 0.</p>
                    </div>
                    <div>
                        <label class="form-label mb-0 mt-3 titulo">Alura</label>
                        <input name="alura" type="number" class="form-control" placeholder="Valor Alura" v-bind:value="cargos.alura" id="inputAlura">
                        <p id="erroAlura" class="erro none">Por favor, coloque um valor válido maior ou igual a 0.</p>
                    </div>
                </div>
                <div class="col-xl-2"></div>
            </div>
            <div class="row justify-content-evenly">
                <div class="col-xl-4">
                    <div>
                        <button type="button" class="btn-confirmar btn"  @click.prevent="registrarDados">CONFIRMAR</button>
                        <p data-bs-toggle="modal" data-bs-target="#exampleModal" class="none" id="abreModal"></p>
                    </div>
                </div>
                <div class="col-xl-4"></div>
                <div class="col-xl-2"></div>
            </div>
        </div>
  
    <!--Model-->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                  <span class="informacoes-modal">Cargo: {{ cargoForm.cargo }}</span>
                </div>
                <div class="alinharDiv">
                  <span class="informacoes-modal">Bolsa auxílio: {{ cargoForm.bolsa }} </span>
                </div>
                <div class="alinharDiv">
                  <span class="informacoes-modal">Benefícios: {{ cargoForm.beneficio }}</span>
                </div>
                <div class="alinharDiv">
                  <span class="informacoes-modal">Convenio: {{ cargoForm.convenio }}</span>
                </div>
                <div class="alinharDiv">
                  <span class="informacoes-modal">Hora extra: {{ cargoForm.horaExtra }}</span>
                </div>
                <div class="alinharDiv">
                  <span class="informacoes-modal">Benefício Legislação: {{ cargoForm.beneficioLegislacao }}</span>
                </div>
                <div class="alinharDiv">
                  <span class="informacoes-modal">Remuneração esporádica: {{ cargoForm.remunEsporadica }}</span>
                </div>
                <div class="alinharDiv">
                  <span class="informacoes-modal">Remuneração extra: {{ cargoForm.remunExtra }}</span>
                </div>
                <div class="alinharDiv">
                  <span class="informacoes-modal">Alura: {{ cargoForm.alura }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer border-0 justify-content-around">
          <div>
            <button type="button" class="btn submit" @click="processarDados">CONFIRMAR</button>
          </div>
          <div>
            <button type="button" class="btn cancel" data-bs-dismiss="modal">CANCELAR</button>
          </div>
        </div>
      </div>
    </div>
  </div>
 <!-- Modal de confirmação edição -->
  <p class="none" id="abreModalInvisivel" data-bs-toggle="modal" data-bs-target="#modalConfirmacao" ></p>
    <div class="modal fade mt-5"  id="modalConfirmacao" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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

     <!-- Modal de confirmação cadastro -->
    <p class="none" id="abreModalInvisivelCadastro" data-bs-toggle="modal" data-bs-target="#modalConfirmacaoCadastro" ></p>
    <div class="modal fade mt-5"  id="modalConfirmacaoCadastro" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
  </main>
</template>

<script>
import Header from '@/components/Header.vue'
import Funcoes from '../../services/Funcoes'
import { http } from '@/services/Config'
import { variavel } from '../../services/Variavel'

export default {
  name: 'App',
  components: {
    Header
  },
  data () {
    return {
      cargos: {
        cargo: '',
        bolsa: '',
        beneficio: '',
        convenio: '',
        horaExtra: '',
        beneficioLegislacao: '',
        remunEsporadica: '',
        remunExtra: '',
        alura: ''
      },
      cargoForm: {
        cargo: '',
        bolsa: '',
        beneficio: '',
        convenio: '',
        horaExtra: '',
        beneficioLegislacao: '',
        remunEsporadica: '',
        remunExtra: '',
        alura: ''
      },
      cargosCadastrados: []
    }
  },
  beforeMount () {
    Funcoes.verificaToken()
    const dadosUrl = this.pegaDadosUrl()
    let id = dadosUrl.id
    let tipo = dadosUrl.tipo

    if (tipo == 'edicao') {
      this.getCargo(id)
    }
  },
  mounted () {
    this.getCargosCadastrados()
  },
  methods: {
    registrarDados () {
      this.cargoForm.cargo = document.querySelector('#inputCargo').value
      this.cargoForm.bolsa = document.querySelector('#inputBolsaAuxilio').value
      this.cargoForm.beneficio = document.querySelector('#inputBeneficios').value
      this.cargoForm.convenio = document.querySelector('#inputConvenio').value
      this.cargoForm.horaExtra = document.querySelector('#inputHoraExtra').value
      this.cargoForm.beneficioLegislacao = document.querySelector('#inputBeneficioLegislacao').value
      this.cargoForm.remunEsporadica = document.querySelector('#inputRemuneracaoEsporadica').value
      this.cargoForm.remunExtra = document.querySelector('#inputRemuneracaoExtra').value
      this.cargoForm.alura = document.querySelector('#inputAlura').value
      if (this.validaCampos()) {
        document.querySelector('#abreModal').click()
      }
    },
    abrirModal() {
        document.getElementById('abreModalInvisivel').click()
      },
    abrirModalCadastro() {
        document.getElementById('abreModalInvisivelCadastro').click()
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
    getCargo (id) {
      http
        .get(`remuneracao/${id}`)
        .then(response => {
          this.cargos = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    getCargosCadastrados () {
      http.get('remuneracao/lista').then(response => {
        console.log(this.cargosCadastrados = response.data)
      })
    },
    processarDados () {
      let dados = this.pegaDadosUrl()
      if (dados.tipo == 'cadastro') {
        http
          .post('remuneracao', this.cargoForm)
          .then(response => {
            this.abrirModalCadastro()
            setTimeout(function () {
            window.location.href = variavel.href = 'cargo-listar'
          },1521)
          })
          .catch(error => {
            console.log(error)
          })
      } else if (dados.tipo == 'edicao') {
        http
          .put(`remuneracao/${dados.id}`, this.cargoForm)
          .then(response => {
            this.abrirModal()
            setTimeout(function () {
              window.location.href = variavel.href = 'cargo-listar'
            }, 1521)
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    validaCampos () {
      let cargoDigitado = document.querySelector('#inputCargo').value
      let erro = 0
      let vazio = ''
      if (this.cargoForm.cargo == vazio) {
        document.querySelector('#erroCargo').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroCargo').classList.add('none')
      }
      this.cargosCadastrados.forEach(cargo => {
        if (cargoDigitado == cargo.cargo) {
          erro = 1
          document.querySelector('#erroCargoCadastrado').classList.remove('none')
          if (cargoDigitado == this.cargos.cargo) {
            erro = 0
            document.querySelector('#erroCargoCadastrado').classList.add('none')
          }
        }
      })
      if (this.cargoForm.bolsa == vazio || this.cargoForm.bolsa < 0) {
        document.querySelector('#erroBolsa').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroBolsa').classList.add('none')
      }
      if (this.cargoForm.beneficio == vazio || this.cargoForm.beneficio < 0) {
        document.querySelector('#erroBeneficios').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroBeneficios').classList.add('none')
      }
      if (this.cargoForm.convenio == vazio || this.cargoForm.convenio < 0) {
        document.querySelector('#erroConvenio').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroConvenio').classList.add('none')
      }
      if (this.cargoForm.horaExtra == vazio || this.cargoForm.horaExtra < 0) {
        document.querySelector('#erroHoraExtra').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroHoraExtra').classList.add('none')
      }
      if (this.cargoForm.beneficioLegislacao == vazio || this.cargoForm.beneficioLegislacao < 0) {
        document.querySelector('#erroBeneficioLegislacao').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroBeneficioLegislacao').classList.add('none')
      }
      if (this.cargoForm.remunEsporadica == vazio || this.cargoForm.remunEsporadica < 0) {
        document.querySelector('#erroRemuneracaoEsporadica').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroRemuneracaoEsporadica').classList.add('none')
      }
      if (this.cargoForm.remunExtra == vazio || this.cargoForm.remunExtra < 0) {
        document.querySelector('#erroRemuneracaoExtra').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroRemuneracaoExtra').classList.add('none')
      }
      if (this.cargoForm.alura == vazio || this.cargoForm.alura < 0) {
        document.querySelector('#erroAlura').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroAlura').classList.add('none')
      }
      if (erro == 1) {
        return false
      }
      document.querySelector('#erroCargoCadastrado').classList.add('none')
      return true
    }
  }
}
</script>

<style>
body{
  background: #ebebeb;
}
.titulo {
  color: #090b2e;
  font-weight: bold;
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
.none {
    display: none;
}

.erro {
  color: red;
  font-weight: bold;
}
</style>
