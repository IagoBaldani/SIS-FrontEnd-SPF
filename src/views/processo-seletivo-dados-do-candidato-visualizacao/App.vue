<template>
        <main>
            <Header />
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
                                <label for="nome" class="form-label mb-0 titulo">Nome</label>
                                <input name="nome" type="text" class="form-control" id="disabledTextInput" v-bind:placeholder="candidato.nome">
                            </div>
                            <div class="mb-3">
                                <label for="contato" class="form-label mb-0 titulo">Contato</label>
                                <input name="contato" type="text" class="form-control" id="disabledTextInput" v-bind:placeholder="candidato.contato">
                            </div>
                            <div class="mb-3">
                                <label for="fonteRecrutamento" class="form-label mb-0 titulo">Fonte de Recrutamento</label>
                                <input name="fonteRecrutamento" type="text" class="form-control" id="disabledTextInput" v-bind:placeholder="candidato.fonteRecrutamento">
                            </div>
                            <div class="mb-3">
                                <label for="dataAgendamento" class="form-label mb-0 titulo">Data Agendamento</label>
                                <input name="dataAgendamento" type="text" class="form-control" id="disabledTextInput" v-bind:placeholder="candidato.dataAgendamento">
                            </div>
                            <div class="mb-3">
                                <label for="curso" class="form-label mb-0 titulo">Curso</label>
                                <input name="curso" type="text" class="form-control" id="disabledTextInput" v-bind:placeholder="candidato.curso">
                            </div>
                            <div class="mb-3">
                                <label for="status" class="form-label mb-0 titulo">Status</label>
                                <input name="status" type="text" class="form-control aprovado" id="disabledTextInput" placeholder="Aprovado na primeira fase" v-if="candidato.status=='APROVADO_1_FASE'">
                                <input name="status" type="text" class="form-control aprovado" id="disabledTextInput" placeholder="Aprovado na segunda fase" v-else-if="candidato.status=='APROVADO_2_FASE'">
                                <input name="status" type="text" class="form-control reprovado" id="disabledTextInput" placeholder="Reprovado na primeira fase" v-else-if="candidato.status=='REPROVADO_1_FASE'">
                                <input name="status" type="text" class="form-control reprovado" id="disabledTextInput" placeholder="Reprovado na segunda fase" v-else-if="candidato.status=='REPROVADO_2_FASE'">
                                <input name="status" type="text" class="form-control standby" id="disabledTextInput" placeholder="StandBy" v-else-if="candidato.status=='STANDBY'">
                                <input name="status" type="text" class="form-control" id="disabledTextInput" placeholder="Sem status" v-else>
                            </div>
                        </fieldset>
                    </div>
                    <div class="col-lg-4">
                        <fieldset disabled>
                            <div class="mb-3">
                                <label for="provaPratica" class="form-label mb-0 titulo">Prova prática</label>
                                <input name="provaPratica" type="text" class="form-control" id="disabledTextInput" v-bind:placeholder="candidato.provaPratica">
                            </div>
                            <div class="mb-3">
                                <label for="disc" class="form-label mb-0 titulo">DISC</label>
                                <input name="disc" type="text" class="form-control" id="disabledTextInput" v-bind:placeholder="candidato.disc">
                            </div>
                            <div class="mb-3">
                                <label for="curriculoCandidato" class="form-label mb-0 titulo">Currículo candidato</label><br>
                                <a href=""><img src="../../assets/imgs/file_upload_black_24dp.svg" class="download">curriculo.pdf</a>

                            </div>
                            <div class="mb-3">
                                <label for="observacoes" class="form-label mb-0 titulo">Observações</label>
                                <textarea name="observacoes" class="form-control" id="disabledTextInput" v-bind:placeholder="candidato.observacoes" rows="8"></textarea>
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
import Funcoes from '../../services/Funcoes.js'
import Cookie from 'js-cookie'

let config = {
  headers: {
    Authorization: `Bearer ${Cookie.get('login_token')}`
  }
}

export default {
  name: 'App',
  components: {
    Header
  },
  data () {
    return {
      responseStatus: '',
      candidato: {
        id: 1,
        nome: 'Gustavo de Oliveira Juliano',
        contato: '(14)99706-2197',
        fonteRecrutamento: 'Palestra via Faculdade',
        dataAgendamento: '31/10/2021',
        curso: 'Análise e Desenvolvimento de Sistemas',
        status: 'APROVADO_1_FASE',
        provaPratica: '10/10',
        disc: 'D:10 I:10 S:10 C:10',
        observacoes: 'Observações feitas através do Vue'
      }
    }
  },
  beforeMount () {
    Funcoes.verificaToken()
  }

}
</script>

<style>

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
