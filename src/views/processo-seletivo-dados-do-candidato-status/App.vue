<template>
  <Header />

  <main>
    <form class="container-fluid" action="" method="POST">
      <div class="row justify-content-evenly">
        <div class="col-lg-4">
          <div class="mt-3"><h3 class="titulo">Status: Fase 1</h3></div>
          <div class="mt-5"><span class="subtitulo">Testes</span></div>
          <div class="mt-4">
            <label for="testeLogico" class="form-label titulo mb-0">Teste lógico</label>
            <input name="testeLogico" class="form-control" type="text" placeholder="10/10" v-model="modelTesteLogico"/>
          </div>
          <div class="mt-1">
            <label for="disc" class="form-label titulo mt-4 mb-0">DISC</label>
            <input type="text" name="disc" class="form-control" placeholder="D:10 I:9 S:9 C:7" v-model="modelDisc"/>
          </div>
          <div class="mt-4">
            <label class="form-label titulo mb-0">Resultado 1ª fase</label>
            <select class="form-select" v-model="modelResultado1">
              <option selected value="SEM_STATUS">Sem status</option>
              <option value="APROVADO_1_FASE" class="aprovado">Aprovado 1ª fase</option>
              <option value="REPROVADO_1_FASE" class="reprovado">Reprovado 1ª fase</option>
            </select>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="mt-3"><h3 class="titulo">Status: Fase 2</h3></div>
          <div class="mt-5"><span class="subtitulo">Testes</span></div>
          <div class="mt-3">
            <label for="entrevistaPessoal" class="form-label titulo mb-0"
              >Entrevista pessoal</label
            >
            <textarea
              name="entrevistaPessoal"
              rows="5"
              class="form-control"
              placeholder="Considerações..."
              v-model="modelEntrevistaPessoal"
            ></textarea>
          </div>
          <div class="mt-4">
            <label class="form-label titulo mb-0">Resultado 2ª fase</label>
            <select class="form-select" v-model="modelResultado2" required>
              <option value="SEM_STATUS">Sem status</option>
              <option value="APROVADO_2_FASE" class="aprovado">Aprovado 2ª fase</option>
              <option value="REPROVADO_2_FASE" class="reprovado">Reprovado 2ª fase</option>
              <option value="STANDBY" class="standby">Stand By</option>
            </select>
          </div>
        </div>
      </div>
      <div class="row empty"></div>
      <div class="row justify-content-center">
        <div class="col-lg-4">
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
    </form>
  </main>

  <!-- modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-xl modal-dialog modal-dialog-centered" id="candidato">
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
            <h1 v-if="informacoes.resultado1 == 'APROVADO_1_FASE' & informacoes.resultado2 == 'APROVADO_2_FASE'">Deseja aprovar na 2ª fase o seguinte participante?</h1>
            <h1 v-if="informacoes.resultado1 == 'REPROVADO_1_FASE' || informacoes.resultado2 == 'REPROVADO_2_FASE'">Deseja reprovar o seguinte participante?</h1>
            <h1 v-if="informacoes.resultado1 == 'APROVADO_1_FASE' & informacoes.resultado2 == 'STANDBY'">Deseja definir para standby o seguinte participante?</h1>
            <h1 v-if="informacoes.resultado1 == 'APROVADO_1_FASE' & informacoes.resultado2 == 'SEM_STATUS'">Deseja aprovar na 1ª fase o seguinte participante?</h1>
          </div>
          <div class="conteudomodal">
            <h3 class="informacoes-modal">{{ candidato.nome }}</h3>
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
import Header from '@/components/Header.vue'
import Funcoes from '../../services/Funcoes'
export default {
  name: 'App',
  components: {
    Header
  },
  data () {
    return {
      candidato: {
        id: '1',
        nome: 'Gustavo de Oliveira Juliano'
      },
      informacoes: {
        testeLogico: '',
        disc: '',
        resultado1: '',
        entrevistaPessoal: '',
        resultado2: ''
      }
    }
  },
  beforeMount () {
    Funcoes.verificaToken()
  },
  methods: {
    enviarDados () {
      this.informacoes.testeLogico = this.modeltesteLogico
      this.informacoes.disc = this.modelDisc
      this.informacoes.resultado1 = this.modelResultado1
      this.informacoes.entrevistaPessoal = this.modelEntrevistaPessoal
      this.informacoes.resultado2 = this.modelResultado2
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

.aprovado{
    color: #19B200 !important;
}

.reprovado{
    color: red !important;
}

.standby{
    color: blue !important;
}

textarea{
    resize: none !important;
}
input{
  background: white;
}

.download{
    transform: rotate(180deg) !important;
}

.subtitulo{
    color: #090B2E;
    font-weight: bold;
    font-size: large;
}

.btn-confirmar{
    background-color: #AB0045 !important;
    font-weight: bold !important;
    color: #fff !important;
    width: 100%;
}

.btn-cancelar{
    background-color: #FFB700 !important;
    font-weight: bold !important;
    color: #fff !important;
    width: 100%;
}

@media screen and (min-width: 992px) {
    .empty{
        height: 150px;
    }
  }

/*Modal*/
.modal-body, .modal-header, .modal-footer {
    text-align: center;
    background-color: #EBEBEB
}

.modal-body{
    min-height: 55vh;
    flex-direction: column;
}

.submit, .cancel{
    color: white !important;
    font-weight: bold !important;
    border-radius: 5px !important;
    width: 350px;
    height: 50px;
    font-size: 25px !important;
}

.submit{
    background-color: #AB0045 !important;

}

.cancel{
    background-color: #FFB700 !important;
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

.alinharDiv{
    text-align: start;
}

.informacoes-modal{
    color: #737373 !important;
    font-size: 2rem;
}
</style>
