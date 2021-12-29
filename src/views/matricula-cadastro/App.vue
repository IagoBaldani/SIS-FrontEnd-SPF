<template>
    <Header link="../dados-programa-busca"/>
    <main>
        <div class="container-fluid">
            <div class="row mt-4 justify-content-evenly">
                <div class="div-titulo col-xl-4">
                    <h3 class="fw-bold titulo">Cadastrar matricula:</h3>
                </div>
                <div class="col-xl-4"></div>
                <div class="col-xl-2"></div>
            </div>
                <div class="row d-flex justify-content-evenly">
                    <div class="col-xl-4">
                        <div class="mb-3">
                            <label for="matricula" class="form-label fw-bold mb-0 titulo">Matricula:</label>
                            <input type="text" class="form-control" id="matricula" placeholder="Digite a matricula desejada"/>
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-bold mb-0 titulo">Nivel de Acesso</label>
                            <select class="form-select">
                              <option selected>Selecione o nível de acesso da nova matricula</option>
                              <option value="1">Nível 1 - Total acesso ao sistema</option>
                              <option value="2">Nível 2 - Apenas visualização</option>
                              <option value="2">Nível 2 - Apenas visualização</option>
                            </select>
                        </div>
                  </div>
                  <div class="col-xl-4"></div>
                  <div class="col-xl-2"></div>
                </div>
        </div>
    </main>
</template>

<script>
import Header from '@/components/Header.vue'
import Funcoes from '../../services/Funcoes'
import { http } from '../../services/Config'
import { mask } from 'vue-the-mask'

export default {
  directives: { mask },
  name: 'App',
  components: {
    Header
  },
  data () {
    return {}
  },
  beforeMount () {
    Funcoes.verificaToken()
  },
  mounted () {
    this.getInstrutor()
  },
  methods: {}
}

</script>

<style>
body {
    background-color: #ebebeb !important;
}

.titulo {
    color: #090B2E;
}

textarea {
    resize: none !important;
}
</style>
