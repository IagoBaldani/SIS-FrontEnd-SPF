<template>
        <main>
            <Header :link="`../processo-seletivo-busca-por-candidato?id=${this.idRetorno}`
              + `&status=${this.statusProcesso}`"   />
            <div class="container-fluid" >
                <div class="row mt-5 justify-content-evenly">
                    <div class="div-titulo col-lg-4">
                        <h3 class="titulo">Dados do candidato:</h3>
                    </div>
                    <div class="col-lg-4"></div>
                    <div class="col-lg-2"></div>
                </div>
                <div class="row justify-content-evenly" id="candidato">
                    <div class="col-lg-4">
                        <fieldset disabled>
                            <div class="mb-3">
                                <label class="form-label mb-0 titulo">Nome</label>
                                <input name="nome" type="text" class="form-control" id="disabledTextInput" v-bind:placeholder="candidato.nome">
                            </div>
                            <div class="mb-3">
                                <label class="form-label mb-0 titulo">Contato</label>
                                <input name="contato" type="text" class="form-control" id="disabledTextInput" v-bind:placeholder="candidato.telefone">
                            </div>
                             <div class="mb-3">
                                <label class="form-label mb-0 titulo">Email</label>
                                <input name="emailCandidato" type="text" class="form-control" id="disabledTextInput" v-bind:placeholder="candidato.email">
                            </div>
                            <div class="mb-3">
                                <label class="form-label mb-0 titulo">Fonte de Recrutamento</label>
                                <input name="fonteRecrutamento" type="text" class="form-control" id="disabledTextInput" v-bind:placeholder="candidato.fonteRecrutamento">
                            </div>
                            <div class="mb-3">
                             <label class="form-label mb-0 titulo">indicacao</label>
                                <input name="indicacao" type="text" class="form-control" id="disabledTextInput" v-bind:placeholder="candidato.indicacaoVaga">
                            </div>
                            <div class="mb-3">
                                <label class="form-label mb-0 titulo">Data de Contato</label>
                                <input name="dataAgendamento" type="text" class="form-control" id="disabledTextInput" v-bind:placeholder="formataDataParaMostrar(candidato.dataAgendamento)">
                            </div>
                             <div class="mb-3">
                                <label class="form-label mb-0 titulo">Endereço</label>
                                <input name="endereco" type="text" class="form-control" id="disabledTextInput" v-bind:placeholder="candidato.endereco">
                            </div>
                            <div class="mb-3">
                                <label class="form-label mb-0 titulo">Prova prática</label>
                                <input name="provaPratica" type="text" class="form-control" id="disabledTextInput" v-bind:placeholder="candidato.testeLogico">
                            </div>
                            <div class="mb-3">
                                <label class="form-label mb-0 titulo">Status</label>
                                <input name="status" type="text" class="form-control aprovado" id="disabledTextInput" placeholder="Aprovado na primeira fase" v-if="this.statusCandidato =='APROVADO_1_FASE'">
                                <input name="status" type="text" class="form-control aprovado" id="disabledTextInput" placeholder="Aprovado na segunda fase" v-else-if="this.statusCandidato=='APROVADO_2_FASE'">
                                <input name="status" type="text" class="form-control reprovado" id="disabledTextInput" placeholder="Reprovado na primeira fase" v-else-if="this.statusCandidato=='REPROVADO_1_FASE'">
                                <input name="status" type="text" class="form-control reprovado" id="disabledTextInput" placeholder="Reprovado na segunda fase" v-else-if="this.statusCandidato=='REPROVADO_2_FASE'">
                                <input name="status" type="text" class="form-control standby" id="disabledTextInput" placeholder="StandBy" v-else-if="this.statusCandidato=='STANDBY'">
                                <input name="status" type="text" class="form-control" id="disabledTextInput" placeholder="Sem status" v-else>
                            </div>
                        </fieldset>
                    </div>
                    <div class="col-lg-4">
                        <fieldset disabled>
                          <div class="mb-3">
                              <label class="form-label mb-0 titulo">Data de conclusão</label>
                              <input name="dataConclusao" type="text" class="form-control" id="disabledTextInput"  v-if="this.candidato.dataConclusao == null" placeholder="">
                              <input name="dataConclusao" type="text" class="form-control" id="disabledTextInput"  v-else-if="this.candidato.dataConclusao != null" v-bind:placeholder="formataDataParaMostrar(candidato.dataConclusao)">
                            </div>
                            <div class="mb-3">
                              <label class="form-label mb-0 titulo">Semestre Cursado</label>
                              <input name="semestreCursado" type="text" class="form-control" id="disabledTextInput" v-bind:placeholder="candidato.semestre">
                            </div>
                            <div class="mb-3">
                              <label class="form-label mb-0 titulo">Periodo Cursado</label>
                              <input name="peridodoCursado" type="text" class="form-control" id="disabledTextInput" v-bind:placeholder="candidato.periodoCurso">
                            </div>
                            <div class="mb-3">
                              <label class="form-label mb-0 titulo">Duração do Curso</label>
                              <input name="duracaoDoCursado" type="text" class="form-control" id="disabledTextInput" v-bind:placeholder="candidato.duracaoCurso">
                            </div>
                            <div class="mb-3">
                              <label class="form-label mb-0 titulo">Processo Seletivo</label>
                              <input name="processoSeletivo" type="text" class="form-control" id="disabledTextInput" v-bind:placeholder="candidato.processoSeletivo">
                            </div>

                            <div class="mb-3">
                                <label class="form-label mb-0 titulo ">Currículo candidato</label><br>
                                <p @click="downloadCurriculo"><img src="../../assets/imgs/file_upload_black_24dp.svg" class="download">curriculo.pdf</p>
                            </div>
                            <div class="mb-3">
                              <label class="form-label mb-0 titulo">Arquivo disc</label><br>
                              <p @click="downloadDisc"><img src="../../assets/imgs/file_upload_black_24dp.svg" class="download">disc.xlsx</p>
                            </div>
                            <div class="mb-3">
                                <label class="form-label mb-0 titulo">Observações</label>
                                <textarea name="observacoes" class="form-control" id="disabledTextInput" v-bind:placeholder="candidato.observacao" rows="5"></textarea>
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
import { variavelBack } from '../../services/VariavelBack'

export default {
  name: 'App',
  components: {
    Header
  },
  data () {
    return {
      candidato: {},
      id: {},
      statusProcesso: '',
      idRetorno: '',
      statusCandidato: ''
    }
  },
  beforeMount () {
    Funcoes.verificaToken()

    const dadosUrl = this.pegaDadosUrl()
    this.id = dadosUrl.id
    this.getCandidato(this.id)
    this.idRetorno = dadosUrl.idProcesso
    this.statusProcesso = dadosUrl.statusProcesso
    this.statusCandidato = dadosUrl.statusCandidato
  },
  methods: {
    getCandidato (id) {
      http
        .get(`candidato/${id}`)
        .then(response => {
          this.candidato = response.data
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
    downloadDisc () {
      window.location.href = variavelBack + `candidato/download-disc/${this.id}`
    },
    downloadCurriculo () {
      window.location.href = variavelBack + `candidato/download-curriculo/${this.id}`
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

body{
  background-color: #ebebeb;
}

.titulo{
    color: #090B2E;
    font-weight: bold;
}

#disabledTextInput{
    background-color: #D3CACA;
    border: 1px solid #BCB3B3;
}

.aprovado::placeholder{
    color: #19B200 !important;
}

.reprovado::placeholder{
    color: red !important;
}

.standby::placeholder{
    color: blue !important;
}

textarea{
    resize: none !important;
}

.download{
    transform: rotate(180deg) !important;
    cursor:pointer;
}

.subtitulo{
    color: #090B2E;
    font-weight: bold;
    font-size: large;
}

@media screen and (min-width: 992px) {
    .empty{
        height: 200px;
    }
  }

</style>
