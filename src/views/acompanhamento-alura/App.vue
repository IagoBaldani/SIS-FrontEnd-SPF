<template>
    <Header/>
    <main>
        <div class="container-fluid">
            <div class="row justify-content-evenly mt-5 mb-3">
                <div class="titulo col-lg-4">
                    <h3 class="fw-bold titulo">Registrar horas de acesso:</h3>
                </div>
                <div class="col-lg-7 d-flex justify-content-center fw-bold titulo">
                    <div class="col-lg-7 d-flex justify-content-center align-items-center">
                        <div class="d-block justify-content-center">
                            <h3 class="fw-bold text-center titulo">Participante selecionado:</h3>
                            <h4 class="fw-bold grey-font text-center nome-participante">{{participante.nome}}</h4>
                        </div>
                        <img src="@/assets/imgs/perfil.svg" class="rounded-circle" width="70" height="70" alt="Perfil" />
                    </div>
                </div>
            </div>
            <div class="row justify-content-evenly">
                <div class="col-lg-4">
                    <form>
                        <div class="mb-3">
                            <label for="qtdHoras" class="form-label fw-bold mb-0 titulo">Quantidade de Horas</label>
                            <input name="qtdHoras" type="number" required class="form-control campo" placeholder="60">
                        </div>
                        <div class="mb-3">
                            <label for="mAvaliado" class="form-label fw-bold mb-0 titulo">Mês avaliado</label>
                            <input name="mAvaliado" type="number" required class="form-control campo" placeholder="1">
                        </div>
                        <div class="mb-3">
                            <label for="sAvaliada" class="form-label fw-bold mb-0 titulo">Semana avaliada</label>
                            <input name="sAvaliada" type="number" required class="form-control campo" placeholder="1">
                        </div>
                        <div class="mb-3">
                            <label for="dtRegistro" class="form-label fw-bold mb-0 titulo">Data do Registro</label>
                            <input name="dtRegistro" type="date" required class="form-control campo">
                        </div>
                        <div class="mb-3">
                            <label for="hMinima" class="form-label fw-bold mb-0 titulo">Horas mínimas semanais</label>
                            <input name="hMinima" type="number" required class="form-control campo" placeholder="30">
                        </div>
                        <button type="submit" class="btn btn-primary mt-2 fw-bold w-100 botao">REGISTRAR</button>
                    </form>
                </div>
                <div  class="col-lg-7">
                    <div style="overflow-y: scroll; max-height:335px;">
                        <table class="table table-bordered table-fixed tabela">
                            <thead >
                                <tr>
                                    <th scope="col" class="text-center th-id titulo">Nº</th>
                                    <th scope="col" class="text-center th-ms titulo">Mês/Semana</th>
                                    <th scope="col" colspan="2" class="text-center titulo">Data do Registro</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="registro in registros" v-bind:key="registro">
                                    <th scope="row" class=" text-center titulo" id="info-id">{{registro.codigoAlura}}</th>
                                    <td class="text-center campo-tabela">{{registro.mesAvaliado}}/{{registro.semanaAvaliada}}</td>
                                    <td class="text-center campo-tabela">{{registro.dataRegistro}}</td>
                                    <td @click="carregaModal(registro)"
                                        id="olho" class="td-button"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"><img
                                        src="@/assets/imgs/visibility_white_24dp.svg" /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog dialogoModal">
            <div class="modal-content p-5 conteudoModal" >
                <div class="row mb-5">
                    <div class="col">
                        <h2 class="modal-title fw-bold titulo" id="exampleModalLabel">Registro do acompanhamento: {{registroModal.id}}</h2>
                    </div>
                </div>
                <div class="row mb-5">
                    <div class="col-lg-6">
                        <div class="mb-4">
                            <h3 class="fw-bold titulo">Mês do registro:</h3>
                            <p class="">{{registroModal.mesAvaliado}}</p>
                        </div>
                        <div class="mb-4">
                            <h3 class="fw-bold titulo">Semana do registro:</h3>
                            <p class="">{{registroModal.semanaAvaliada}}</p>
                        </div>
                        <div class="mb-4">
                            <h3 class="fw-bold titulo">Horas Semanais:</h3>
                            <p class="">{{registroModal.hrMinSemana}}</p>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="mb-4">
                            <h3 class="fw-bold titulo">Data do registro:</h3>
                            <p class="">{{registroModal.dataRegistro}}</p>
                        </div>
                        <div class="mb-4">
                            <h3 class="fw-bold titulo">Quantidade de horas totais:</h3>
                            <p class="">{{registroModal.qtdHoras}}</p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-6">
                        <div>
                            <button type="submit" class="btn btn-primary mt-2 w-100 fw-bold botao" data-bs-toggle="modal" data-bs-target="#exampleModal1">DELETAR REGISTRO</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog dialogoModal">
            <div class="modal-content p-5 conteudoModal">
                <div class="row mb-5">
                    <div class="col">
                        <h2 class="modal-title fw-bold titulo text-center" id="exampleModalLabel">Deseja deletar registro de acompanhamento?</h2>
                    </div>
                </div>
                <div class="row mb-5">
                    <div class="col-lg-6">
                        <div class="mb-4">
                            <h4 class="titulo fw-bold">Mês do registro:</h4>
                            <p class="">{{registroModal.mesAvaliado}}</p>
                        </div>
                        <div class="mb-4">
                            <h4 class=" titulo fw-bold">Semana do registro:</h4>
                            <p class="">{{registroModal.semanaAvaliada}}</p>
                        </div>
                        <div class="mb-4">
                            <h4 class=" titulo fw-bold">Horas Semanais:</h4>
                            <p class="">{{registroModal.horasMinimas}}</p>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="mb-4">
                            <h4 class="fw-bold titulo">Data do registro:</h4>
                            <p class="">{{registroModal.dataReg}}</p>
                        </div>
                        <div class="mb-4">
                            <h3 class="fw-bold titulo">Quantidade de horas totais:</h3>
                            <p class="">{{registroModal.quantidadeDeHoras}}</p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-6">
                        <div>
                            <button type="submit" class="btn btn-primary mt-2 fw-bold w-100 botao">CONFIRMAR</button>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div>
                            <button type="submit" class="btn btn-primary mt-2 fw-bold w-100 botaocanc">CANCELAR</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    Header
  },
  data () {
    return {
      registros: [],
      participante: {},
      id: {},
      registroModal: ''
    }
  },
  
  beforeMount () {
    const dadosUrl = this.pegaDadosUrl()
    this.id = dadosUrl.id
    this.getParticipanteNome(dadosUrl.id)
    this.getAlura(dadosUrl.id)
  },

  methods: {
    getParticipanteNome (id) {
      axios
        .get(`http://localhost:8081/api/gerencial/${id}`)
        .then((response) => {
          this.participante = response.data
          console.log(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    },

    getAlura (id) {
      axios
        .get(`http://localhost:8081/api/alura/${id}`)
        .then((response) => {
          this.registros = response.data
          console.log(response.data)
        })
        .catch((error) => {
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
    carregaModal (registro) {
      this.registroModal = registro
    }
  }
}
</script>

<style scoped>
body {
  background-color: #ebebeb !important;
}

.tabela{
    border: 1px solid #BCB3B3 !important;
    background-color: white;
    overflow-y: auto;
}

.titulo{
    color: #090B2E;
}

.botao{
    background-color: #AB0045 !important;
    border-style: none !important;
    border-radius: 2px !important;
}

.botaocanc{
    background-color: #FFB700 !important;
    border-style: none !important;
    border-radius: 2px !important;
}

.campo{
    border-radius: 2px !important;
    background-color: white !important;
    color: #737373 !important;
}

.th-id{
    width: 2em !important;
}

.th-ms{
    width: 15em !important;
}

.td-button{
    width: 1.5em !important;
    background-color: #FFB700 !important;
    cursor: pointer
}

.nome-participante{
    color: #737373;
}
.campo-tabela{
    color: #737373 !important;
}

.button{
    border-style: none;
    background-color: #FFB700 ;
}

.botao:hover{
    transition: 0.3s ease-in-out !important;
    background-color: #9a0045 !important;
}

.conteudoModal{
    background-color: #EBEBEB !important;
}

.dialogoModal{
    width: 1080px !important;
    max-width: 1080px !important;
}

.overflowT{
    position: sticky;
    top: 0;
    background-color: white;
}

.botaocanc:hover{
    transition: 0.3s ease-in-out !important;
    background-color: #dd9700 !important;
}
</style>
