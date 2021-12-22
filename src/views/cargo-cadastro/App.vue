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
                        <input class="form-control" v-bind:value="cargos.cargo" type="text" name="cargo" id="inputCargo"/>
                        <p id="erroCargo" class="erro none">Por favor, selecione um cargo</p>
                        <p id="erroCargoCadastrado" class="erro none">Este cargo já está cadastrada, por favor insira outro</p>
                    </div>
                    <div>
                        <label for="bolsaAuxilio" class="form-label mb-0 mt-3 titulo">Bolsa auxílio</label>
                        <input type="text" name="bolsaAuxilio" class="form-control" v-money="money" v-bind:value="cargos.bolsa" id="inputBolsaAuxilio"/>
                        <p id="erroBolsa" class="erro none">Por favor, preencha este campo</p>
                        <p id="erroBolsaQuantidade" class="erro none">Por favor, coloque um valor maior ou igual a 0</p>
                    </div>
                    <div>
                        <label for="beneficios" class="form-label mb-0 mt-3 titulo">Benefícios</label>
                        <input type="text" name="beneficios" v-money="money" class="form-control" v-bind:value="cargos.beneficio" id="inputBeneficios" />
                        <p id="erroBeneficios" class="erro none">Por favor, preencha este campo</p>
                        <p id="erroBeneficiosQuantidade" class="erro none">Por favor, coloque um valor maior ou igual a 0</p>
                    </div>
                    <div>
                        <label for="convenio" class="form-label mb-0 mt-3 titulo">Convênio</label>
                        <input type="text" class="form-control" v-money="money" name="convenio" v-bind:value="cargos.convenio" id="inputConvenio"/>
                        <p id="erroConvenio" class="erro none">Por favor, preencha este campo</p>
                        <p id="erroConvenioQuantidade" class="erro none">Por favor, coloque um valor maior ou igual a 0</p>
                    </div>
                    <div class="mb-5">
                        <label for="horaExtra" class="form-label mb-0 mt-3 titulo">Hora extra</label>
                        <input type="text" class="form-control" v-money="money" name="horaExtra" v-bind:value="cargos.horaExtra" id="inputHoraExtra" />
                        <p id="erroHoraExtra" class="erro none">Por favor, preencha este campo</p>
                        <p id="erroHoraExtraQuantidade" class="erro none">Por favor, coloque um valor maior ou igual a 0</p>
                    </div>
                </div>
                <div class="col-xl-4">
                    <div>
                        <label for="beneficioLegislacao" class="form-label mb-0 titulo">Benefício legislação</label>
                        <input type="text" class="form-control" v-money="money" name="beneficioLegislacao" v-bind:value="cargos.beneficioLegislacao" id="inputBeneficioLegislacao" />
                        <p id="erroBeneficioLegislacao" class="erro none">Por favor, preencha este campo</p>
                        <p id="erroBeneficioLegislacaoQuantidade" class="erro none">Por favor, coloque um valor maior ou igual a 0</p>
                    </div>
                    <div>
                        <label for="remuneracaoEsporadica" class="form-label mb-0 mt-3 titulo">Remuneração esporádica</label>
                        <input name="remuneracaoEsporadica" type="text" class="form-control" v-money="money" v-bind:value="cargos.remunEsporadica" id="inputRemuneracaoEsporadica" />
                        <p id="erroRemuneracaoEsporadica" class="erro none">Por favor, preencha este campo </p>
                        <p id="erroRemuneracaoEsporadicaQuantidade" class="erro none">Por favor, coloque um valor maior ou igual a 0</p>
                    </div>
                    <div>
                        <label for="remuneracaoExtra" class="form-label mb-0 mt-3 titulo">Remuneração extra</label>
                        <input name="remuneracaoExtra" type="text" class="form-control" v-money="money" v-bind:value="cargos.remunExtra" id="inputRemuneracaoExtra">
                        <p id="erroRemuneracaoExtra" class="erro none">Por favor, preencha este campo</p>
                        <p id="erroRemuneracaoExtraQuantidade" class="erro none">Por favor, coloque um valor maior ou igual a 0</p>
                    </div>
                    <div>
                        <label class="form-label mb-0 mt-3 titulo">Alura</label>
                        <input name="alura" type="text" class="form-control" v-money="money" v-bind:value="cargos.alura" id="inputAlura">
                        <p id="erroAlura" class="erro none">Por favor, preencha este campo</p>
                        <p id="erroAluraQuantidade" class="erro none">Por favor, coloque um valor maior ou igual a 0</p>
                    </div>
                </div>
                <div class="col-xl-2"></div>
            </div>
            <div class="row justify-content-evenly">
                <div class="col-xl-4">
                    <div>
                        <button type="button" class="btn-confirmar btn"  v-on:click="validaCampos()">CONFIRMAR</button>
                        <p data-bs-toggle="modal" data-bs-target="#exampleModal" class="none" id="abreModal"></p>
                        <p id="formDados" @click="registrarDados()"></p>
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
                  <span id="cargoModal" class="informacoes-modal"></span>
                </div>
                <div class="alinharDiv">
                  <span id="bolsaModal" class="informacoes-modal"></span>
                </div>
                <div class="alinharDiv">
                  <span id="beneficioModal" class="informacoes-modal"></span>
                </div>
                <div class="alinharDiv">
                  <span id="convenioModal" class="informacoes-modal"></span>
                </div>
                <div class="alinharDiv">
                  <span id="horaExtraModal" class="informacoes-modal"></span>
                </div>
                <div class="alinharDiv">
                  <span id="beneficioLegislacaoModal" class="informacoes-modal"></span>
                </div>
                <div class="alinharDiv">
                  <span id="remunEsporadicaModal" class="informacoes-modal"></span>
                </div>
                <div class="alinharDiv">
                  <span id="remunExtraModal" class="informacoes-modal"></span>
                </div>
                <div class="alinharDiv">
                  <span id="aluraModal" class="informacoes-modal"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer border-0 justify-content-around">
          <div>
            <button id="botaoModal" type="button" class="btn" @click="processarDados">CONFIRMAR</button>
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
        suffix: '',
        precision: 2
      },
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
      this.cargos.cargo = document.querySelector('#inputCargo').value
      this.cargos.bolsa = document.querySelector('#inputBolsaAuxilio').value.replace('R$ ', '').replace('.', '').replace(',', '.')
      this.cargos.beneficio = document.querySelector('#inputBeneficios').value.replace('R$ ', '').replace('.', '').replace(',', '.')
      this.cargos.convenio = document.querySelector('#inputConvenio').value.replace('R$ ', '').replace('.', '').replace(',', '.')
      this.cargos.horaExtra = document.querySelector('#inputHoraExtra').value.replace('R$ ', '').replace('.', '').replace(',', '.')
      this.cargos.beneficioLegislacao = document.querySelector('#inputBeneficioLegislacao').value.replace('R$ ', '').replace('.', '').replace(',', '.')
      this.cargos.remunEsporadica = document.querySelector('#inputRemuneracaoEsporadica').value.replace('R$ ', '').replace('.', '').replace(',', '.')
      this.cargos.remunExtra = document.querySelector('#inputRemuneracaoExtra').value.replace('R$ ', '').replace('.', '').replace(',', '.')
      this.cargos.alura = document.querySelector('#inputAlura').value.replace('R$ ', '').replace('.', '').replace(',', '.')

      document.querySelector('#cargoModal').innerText = 'Cargo: ' + this.cargos.cargo
      document.querySelector('#bolsaModal').innerText = ('Bolsa auxílio: R$ ' + this.cargos.bolsa).replace('.',',')
      document.querySelector('#beneficioModal').innerText = ('Benefícios: R$ ' + this.cargos.beneficio).replace('.',',')
      document.querySelector('#convenioModal').innerText = ('Convenio: R$ ' + this.cargos.convenio).replace('.',',')
      document.querySelector('#horaExtraModal').innerText = ('Hora extra: R$ ' + this.cargos.horaExtra).replace('.',',')
      document.querySelector('#beneficioLegislacaoModal').innerText = ('Benefício Legislação: R$ ' + this.cargos.beneficioLegislacao).replace('.',',')
      document.querySelector('#remunEsporadicaModal').innerText = ('Remuneração esporádica: R$ ' + this.cargos.remunEsporadica).replace('.',',')
      document.querySelector('#remunExtraModal').innerText = ('Remuneração extra: R$ ' + this.cargos.remunExtra).replace('.',',')
      document.querySelector('#aluraModal').innerText = ('Alura: R$ ' + this.cargos.alura).replace('.',',')
    },
    abrirModal () {
      document.getElementById('abreModalInvisivel').click()
    },
    abrirModalCadastro () {
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
        this.cargosCadastrados = response.data
      })
    },
    processarDados () {
      let dados = this.pegaDadosUrl()
      if (dados.tipo == 'cadastro') {
        http
          .post('remuneracao', this.cargos)
          .then(response => {
            this.abrirModalCadastro()
            setTimeout(function () {
              window.location.href = variavel.href = 'cargo-listar'
            }, 1521)
          })
          .catch(error => {
            console.log(error)
          })
      } else if (dados.tipo == 'edicao') {
        http
          .put(`remuneracao/${dados.id}`, this.cargos)
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
      let bolsaAux = document.querySelector('#inputBolsaAuxilio').value
      let beneficios = document.querySelector('#inputBeneficios').value
      let convenio = document.querySelector('#inputConvenio').value
      let horaExtra = document.querySelector('#inputHoraExtra').value
      let beneficioLegislacao = document.querySelector('#inputBeneficioLegislacao').value
      let remuneracaoEsporadica = document.querySelector('#inputRemuneracaoEsporadica').value
      let remuneracaoExtra = document.querySelector('#inputRemuneracaoExtra').value
      let alura = document.querySelector('#inputAlura').value
      let erro = 0
      if (cargoDigitado == '') {
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
      if (bolsaAux == '') {
        document.querySelector('#erroBolsa').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroBolsa').classList.add('none')
      }
      if (bolsaAux < 0) {
        document.querySelector('#erroBolsaQuantidade').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroBolsaQuantidade').classList.add('none')
      }
      if (beneficios == '') {
        document.querySelector('#erroBeneficios').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroBeneficios').classList.add('none')
      }
      if (beneficios < 0) {
        document.querySelector('#erroBeneficiosQuantidade').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroBeneficiosQuantidade').classList.add('none')
      }
      if (convenio == '') {
        document.querySelector('#erroConvenio').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroConvenio').classList.add('none')
      }
      if (convenio < 0) {
        document.querySelector('#erroConvenioQuantidade').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroConvenioQuantidade').classList.add('none')
      }
      if (horaExtra == '') {
        document.querySelector('#erroHoraExtra').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroHoraExtra').classList.add('none')
      }
      if (horaExtra < 0) {
        document.querySelector('#erroHoraExtraQuantidade').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroHoraExtraQuantidade').classList.add('none')
      }
      if (beneficioLegislacao == '') {
        document.querySelector('#erroBeneficioLegislacao').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroBeneficioLegislacao').classList.add('none')
      }
      if (beneficioLegislacao < 0) {
        document.querySelector('#erroBeneficioLegislacaoQuantidade').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroBeneficioLegislacaoQuantidade').classList.add('none')
      }
      if (remuneracaoEsporadica == '') {
        document.querySelector('#erroRemuneracaoEsporadica').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroRemuneracaoEsporadica').classList.add('none')
      }
      if (remuneracaoEsporadica < 0) {
        document.querySelector('#erroRemuneracaoEsporadicaQuantidade').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroRemuneracaoEsporadicaQuantidade').classList.add('none')
      }
      if (remuneracaoExtra == '') {
        document.querySelector('#erroRemuneracaoExtra').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroRemuneracaoExtra').classList.add('none')
      }
      if (remuneracaoExtra < 0) {
        document.querySelector('#erroRemuneracaoExtraQuantidade').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroRemuneracaoExtraQuantidade').classList.add('none')
      }
      if (alura == '') {
        document.querySelector('#erroAlura').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroAlura').classList.add('none')
      }
      if (alura < 0) {
        document.querySelector('#erroAluraQUantidade').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroAluraQUantidade').classList.add('none')
      }
      if (erro == 1) {
        return false
      }
      document.querySelector('#erroCargoCadastrado').classList.add('none')
      document.querySelector('#formDados').click()
      document.querySelector('#abreModal').click()
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

#botaoModal {
  background-color: #ab0045;
  color: white !important;
  font-weight: bold !important;
  border-radius: 5px !important;
  width: 350px;
  height: 50px;
  font-size: 25px !important;
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
