<template>
  <Header/>
<main>
  <div class="container-fluid" >
                <div class="row mt-5 justify-content-evenly">
                    <div class="div-titulo col-lg-4">
                        <h3 class="titulo">Dados do cargo:</h3>
                    </div>
                    <div class="col-lg-4"></div>
                    <div class="col-lg-2"></div>
                </div>
                <div class="row justify-content-evenly" id="candidato">
                    <div class="col-lg-4">
                        <fieldset disabled>
                            <div class="mb-3">
                                <label for="cargo" class="form-label mb-0 titulo">Cargo</label>
                                <input name="cargo" type="text" class="form-control disabledTextInput" v-bind:placeholder="cargos.cargo">
                            </div>
                            <div class="mb-3">
                              <label for="beneficios" class="form-label mb-0 titulo">Benefícios</label>
                              <input name="beneficios" type="text" class="form-control disabledTextInput" v-bind:placeholder="cargos.beneficio">
                            </div>
                            <div class="mb-3">
                                <label for="bolsaAuxilio" class="form-label mb-0 titulo">Bolsa auxílio</label>
                                <input name="bolsaAuxilio" type="text" class="form-control disabledTextInput" v-bind:placeholder="cargos.bolsa">
                            </div>
                            <div class="mb-3">
                                <label for="convenio" class="form-label mb-0 titulo">Convênio</label>
                                <input name="convenio" type="text" class="form-control disabledTextInput" v-bind:placeholder="cargos.convenio">
                            </div>
                            <div class="mb-3">
                                <label for="horaExtra" class="form-label mb-0 titulo">Hora Extra</label>
                                <input name="horaExtra" type="text" class="form-control disabledTextInput"  v-bind:placeholder="cargos.horaExtra">
                            </div>
                            <div class="mb-3">
                                <label for="beneficioLegislacao" class="form-label mb-0 titulo">Benefício legislação</label>
                                <input name="beneficioLegislacao" type="text" class="form-control disabledTextInput" v-bind:placeholder="cargos.beneficioLegislacao">
                            </div>

                        </fieldset>
                    </div>
                    <div class="col-lg-4">
                        <fieldset disabled>
                            <div class="mb-3">
                              <label for="remuneracaoEsporadica" class="form-label mb-0 titulo">Remuneração esporádica</label>
                              <input name="remuneracaoEsporadica" type="text" class="form-control disabledTextInput" v-bind:placeholder="cargos.remunEsporadica">
                            </div>
                            <div class="mb-3">
                                <label for="remuneracaoExtra" class="form-label mb-0 titulo">Remuneração extra</label>
                                <input name="remuneracaoExtra" type="text" class="form-control disabledTextInput" v-bind:placeholder="cargos.remunExtra">
                            </div>
                            <div class="mb-3">
                                <label for="alura" class="form-label mb-0 titulo">Alura</label>
                                <input name="alura" type="text" class="form-control disabledTextInput" v-bind:placeholder="cargos.alura">
                            </div>
                        </fieldset>
                    </div>
                    <div class="col-lg-2">
                    </div>
                </div>
            </div>
        </main>
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
      cargos: {}
    }
  },
  beforeMount () {
    Funcoes.verificaToken()
    const dadosUrl = this.pegaDadosUrl()
    var id = dadosUrl.id
    this.getCargo(id)
  },
  methods: {
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
          alert(error)
        })
    }
  }
}
</script>

<style>
body{
    background: #ebebeb;
}
.titulo{
    color: #090B2E;
    font-weight: bold;
}

.disabledTextInput{
    background-color: #D3CACA !important;
    border: 1px solid #BCB3B3 !important;
}

textarea{
    resize: none !important;
}
</style>
