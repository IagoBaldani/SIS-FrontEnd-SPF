<template>
  <Header/>
  <main>
    <!-- ínicio do formulário -->
    <div class="container-fluid" id="participante">
      <div class="row mt-4 justify-content-evenly">
        <div class="div-titulo col-xl-4">
          <h3 class="fw-bold titulo">Dados do participante:</h3>
        </div>
        <div class="col-xl-4"></div>
        <div class="col-xl-2 d-flex justify-content-center">
          <h2 class="titulo secundario"> Status: <span v-bind:class="(participante.status == 'Ativo')?'ativo':'inativo'"> {{participante.status}} </span></h2>
        </div>
      </div>
      <div class="row justify-content-evenly">
        <div class="col-xl-4">
          <fieldset disabled>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo">Nome</label>
              <input class="form-control disabledTextInput" v-bind:value="participante.nome" type="text">
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo">Contato</label>
              <input class="form-control disabledTextInput" v-bind:value="participante.contato" type="tel" disabled readonly>
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo">Fonte recrutamento</label>
              <input class="form-control disabledTextInput" v-bind:value="participante.fonteRecrutamento" type="text" disabled readonly>
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo">Nota na prova de lógica</label>
              <input class="form-control disabledTextInput" v-bind:value="participante.notaProvaLogica" type="number" min="0" max="10" disabled readonly>
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo">DISC</label><br>
              <a v-bind:href="participante.urlDisc"><img src="@/assets/imgs/file_download_black_24dp.svg" alt="">disc.xls</a>
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo">Instituição de Ensino</label>
              <input class="form-control disabledTextInput" v-bind:value="participante.instituicaoEnsino" type="text" disabled readonly>
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo">Curso</label>
              <input class="form-control disabledTextInput" v-bind:value="participante.curso" type="text" disabled readonly>
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo">TCE</label><br>
              <a v-bind:href="participante.urlTce"><img src="@/assets/imgs/file_download_black_24dp.svg" alt="">tce.xls</a>
            </div>
          </fieldset>
        </div>
        <div class="col-xl-4">
          <fieldset disabled>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo">Término da graduação</label>
              <input class="form-control disabledTextInput" v-bind:value="participante.terminoGraduacao" type="text" disabled readonly>
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo">Cargo</label>
              <input class="form-control disabledTextInput" v-bind:value="participante.cargo" type="text" disabled readonly>
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo">Salário</label>
              <input class="form-control disabledTextInput" v-bind:value="participante.salario" type="number">
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo">Programa de Formação - Turma</label>
              <input class="form-control disabledTextInput" v-bind:value="participante.programaDeFormacao.nome + ' - ' +  participante.programaDeFormacao.turma" type="text" disabled readonly>
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo">Coordenador Técnico</label>
              <input class="form-control disabledTextInput" v-bind:value="participante.programaDeFormacao.coordenador" type="text" disabled readonly>
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo">Início do programa</label>
              <input class="form-control disabledTextInput" v-bind:value="participante.programaDeFormacao.inicio" type="text" disabled readonly>
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo">Término do programa</label>
              <input class="form-control disabledTextInput" v-bind:value="participante.programaDeFormacao.fim" type="text" disabled readonly>
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo">Observação</label>
              <textarea class="form-control disabledTextInput" cols="20" rows="10" v-bind:value="participante.observacao" ></textarea>
            </div>
          </fieldset>
        </div>
        <div class="col-xl-2">
          <fieldset disabled>
            <div class=" text-center text-md-left">
              <img src="@/assets/imgs/perfil.svg" class="rounded-circle" alt="">
            </div>
          </fieldset>
        </div>
      </div>
      <div class="row justify-content-evenly">
        <div class="col-xl-4 ">
          <button type="button" class="btn submit form-control" data-bs-toggle="modal" data-bs-target="#exampleModal">
            DESATIVAR PARTICIPANTE
          </button>
        </div>
        <div class="col-xl-4"></div>
        <div class="col-xl-2"></div>
      </div>
    </div>
    <!-- fim do formulário -->
  </main>
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-xl modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header border-0">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body d-flex justify-content-between">
          <div>
            <h1 class="modal-title form-label fw-bold mb-0 titulo"> Deseja confirmar a desativação do seguinte participante? </h1>
          </div>
          <div class="conteudomodal" id="participante-modal">
            <h2 class="fw-bold subtitulo"> {{participante.nome}}</h2>
          </div>
        </div>
        <div class="modal-footer border-0 justify-content-around">
          <div>
            <button type="button" class="btn submit-modal" >CONFIRMAR</button>
          </div>
          <div>
            <button type="button" class="btn cancel-modal" data-bs-dismiss="modal">CANCELAR</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  name: 'App',
  components: {
    Header
  },
  data () {
    return {
      participante: {
        id: 1,
        nome: 'Miguel Felisberto',
        contato: '(14)99999-9999',
        fonteRecrutamento: 'Palestra via faculdade',
        notaProvaLogica: '10',
        urlDisc: 'google.com.br',
        instituicaoEnsino: 'Fatec Ourinhos',
        curso: 'Análise e Desenvolvimento de Sistemas',
        urlTce: 'google.com.br',
        terminoGraduacao: '20/12/2021',
        cargo: 'Estagiário',
        salario: 1500,
        status: 'Ativo',
        programaDeFormacao: {
          nome: 'Java',
          turma: 'Turma I 2021',
          coordenador: 'Kaiqui Lopes',
          inicio: '20/07/2021',
          fim: '12/12/2021'
        },
        observacao: ''
      }
    }
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
    }
  },
  beforeMount () {
    console.log(this.pegaDadosUrl())
  }
}
</script>

<style>

body{
    background-color: #EBEBEB !important;
}

.titulo{
  color: #090B2E;
  font-weight: bold;
}

.secundario{
  font-size: 20px;
}

.ativo, .inativo{
  margin-left: 1em;
}

.ativo{
  color: green;
}
.inativo{
  color: darkred;
}

.subtitulo{
  color: #737373;
}

.disabledTextInput{
  background-color: #D3CACA !important;
  border: 1px solid #BCB3B3 !important;
}

.form-control{
  color: #737373 !important;
}

textarea{
  resize: none !important;
  height:200px !important;
}

.download{
  transform: rotate(180deg) !important;
}

.modal-body, .modal-header, .modal-footer {
  text-align: center;
  background-color: #EBEBEB
}

.modal-body{
  min-height: 55vh;
  flex-direction: column;
}

.submit-modal, .cancel-modal{
  color: white !important;
  font-weight: bold !important;
  border-radius: 5px !important;
  width: 350px;
  font-size: 25px !important;
}

.submit, .submit-modal{
  color: white !important;
  font-weight: bold !important;
  background-color: #AB0045 !important;
}

.cancel, .cancel-modal{
  color: white !important;
  font-weight: bold !important;
  background-color: #FFB700 !important;
}

.conteudomodal {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 40vh;
}

.rounded-circle{
  width: 150px;
}

@media (max-width: 1200px) {
  .rounded-circle{
    margin-bottom: 3em;
  }
}
</style>
