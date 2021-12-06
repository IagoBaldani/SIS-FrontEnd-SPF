<template>
  <Header/>
  <main>
    <!-- ínicio do formulário -->
    <div class="container-fluid" id="participante candidato">
      <div class="row mt-4 justify-content-evenly">
        <div class="div-titulo col-xl-4">
          <h3 class="fw-bold titulo">Dados do participante:</h3>
        </div>
        <div class="col-xl-4"></div>
        <div class="col-xl-2" >
          <h2 class="titulo secundario" v-if="tipo =='edicao'">
            Status: <span v-bind:class="(participante.status === 'Ativo')?'ativo':'inativo'"> {{participante.status}} </span>
          </h2>
        </div>
      </div>
      <div class="row justify-content-evenly">
        <div class="col-xl-4">
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo" for="inputName">Nome</label>
              <input class="form-control" id="inputName" :placeholder="candidato.nome" disabled type="text">
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo" for="inputCpf">CPF</label>
              <input class="form-control" id="inputCpf" placeholder="xxx.xxx.xxx-xx" type="text" v-mask="['###.###.###-##']" maxlength="16" v-model="cadastroParticipanteForm.cpf" >
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo" for="inputContato">Contato</label>
              <input class="form-control"  id="inputContato" :placeholder="candidato.telefone" disabled type="tel">
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo" for="inputFonteRecrutamento">Fonte recrutamento</label>
              <input  class="form-control" id="inputFonteRecrutamento" disabled :placeholder="candidato.fonteRecrutamento" type="text">
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo" for="inputNotaLogica">Nota na prova de lógica</label>
              <input  class="form-control" id="inputNotaLogica" disabled :placeholder="candidato.testeLogico" type="number" min="0" max="10">
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo" for="inputInstEnsino">Instituição de Ensino</label>
              <input  class="form-control" id="inputInstEnsino" type="text" v-model="cadastroParticipanteForm.instituicaoEnsino">
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo" for="inputCurso">Curso</label>
              <input  class="form-control" id="inputCurso" type="text" v-model="cadastroParticipanteForm.curso">
            </div>
        </div>
        <div class="col-xl-4">
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo" for="inputTerminoGraduacao">Término da graduação</label>
              <input  class="form-control" id="inputTerminoGraduacao" placeholder="20/12/2021" type="date" v-model="cadastroParticipanteForm.terminoGraduacao">
            </div>
            <div class="mb-3">
                <label for="cargo" class="form-label fw-bold h5 titulo">Cargo</label>
                <select class="form-select" id="filtro-programa" v-model="remuneracao">
                    <option v-for="cargo in cargos" :value="cargo" :key="cargo.id" >{{ cargo.nome }}</option>
                </select>
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo">Email corporativo</label>
              <input  class="form-control" type="email" v-model="cadastroParticipanteForm.email">
            </div>
            <!-- <div>
              <label for="file" class="form-label fw-bold h5 titulo">Comprovante de rematrícula/conclusão</label>
              <input id="file" @change="formatoUpload()" type="file" accept="application/pdf" class="none mb-4" />
            </div> -->
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo" for="inputFonteRecrutamento">Nome do Programa</label>
              <input class="form-control" disabled id="nomeProgramaCandidato" :value="nomeProgramaCandidato.nome" type="text">
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo">Turma</label>
                <select required class="form-select" v-on:click="buscarTurmasDeUmaFormacao()" v-model="turmaSelecionada">
                    <option class="relatorio_opcao" disabled selected>Turma</option>
                    <option class="relatorio_opcao" v-for="(turmasProgramaCandidato, id) in turmasProgramaCandidatos"
                    :key="id" :value="turmasProgramaCandidato">{{turmasProgramaCandidato.turmas}}
                    </option>
                </select>
            </div>
            <!-- <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo">Coordenador Técnico</label>
              <input id="coordenador" class="form-control" type="text" >
            </div> -->
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo">Observação</label>
              <textarea  disabled class="form-control" placeholder="Mensagem..." cols="20" rows="6" style="resize:none;" :value="candidato.observacao"></textarea>
            </div>
        </div>
        <div class="col-xl-2">
            <!-- <div class="text-center text-md-left">
              <img src="@/assets/imgs/perfil.svg" class="rounded-circle" alt="">
            </div> -->
        </div>
      </div>
      <div class="row justify-content-evenly">
        <div class="col-xl-4 ">
          <button v-on:click="popularCargoTurma()" type="button" class="btn submit form-control" data-bs-toggle="modal" data-bs-target="#exampleModal">
            CONFIRMAR
          </button>
        </div>
        <div class="col-xl-4"></div>
        <div class="col-xl-2"></div>
      </div>
    </div>
    <!-- fim do formulário -->
  </main>

  <!-- modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-xl modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header border-0">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body d-flex justify-content-between">
          <div>
            <h1 class="modal-title form-label fw-bold mb-0 titulo"> Deseja confirmar os seguintes dados? </h1>
          </div>
          <div class="conteudomodal d-flex flex-column justify-content-center mb-5">
            <div class="">
              <ul class="fw-bold subtitulo text-start">Informações gerais:
                <li>Nome: <span class="titulo"> {{candidato.nome}} </span></li>
               <!-- <li>CPF: <span class="titulo"> {{participante.cpf}} </span></li> -->
                <li>Contato: <span class="titulo"> {{candidato.telefone}} </span></li>
                <li>Fonte de recrutamento: <span class="titulo"> {{candidato.fonteRecrutamento}} </span></li>
                <li>Nota na prova lógica: <span class="titulo"> {{candidato.testeLogico}}</span> </li>
                <li>Instituição de Ensino: <span class="titulo"> {{cadastroParticipanteForm.instituicaoEnsino}} </span></li>
                <li>Curso: <span class="titulo"> {{cadastroParticipanteForm.curso}} </span></li>
                <li>Término da Graduação: <span class="titulo"> {{formataDataParaMostrar(cadastroParticipanteForm.terminoGraduacao)}} </span></li>
                <li>Cargo: <span class="titulo">{{ remuneracao.nome }}</span></li>
                <li>Email: <span class="titulo">{{ cadastroParticipanteForm.email }}</span></li>
                <!-- <li>Salário: <span class="titulo"> {{participante.salario}}</span></li> -->
                <li>Programa de Formação - Turma: <span class="titulo"> {{turmaSelecionada.turmas}}</span></li>
                <li>Observação: <span class="titulo"> {{candidato.observacao}}</span></li>
              </ul>
            </div>
          </div>
          <div class="modal-footer border-0 justify-content-around">
            <div>
              <button v-on:click="enviarDados()" type="button" class="btn submit-modal">CONFIRMAR</button>
            </div>
            <div>
              <button type="button" class="btn cancel-modal" data-bs-dismiss="modal">CANCELAR</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
    return {
      candidato: {},
      id: '',
      instrutores: [],
      remuneracao: {},
      turmaSelecionada: {},
      cargos: [],
      turmasPrograma: [],
      nomePrograma: '',
      cadastroParticipanteForm: {
        cpf: '',
        instituicaoEnsino: '',
        curso: '',
        terminoGraduacao: '',
        idRemuneracao: '',
        idCandidato: '',
        idPrograma: '',
        email: ''
      },
      nomeProgramaCandidato: {
        id: '',
        nome: ''
      },
      turmasProgramaCandidatos: []
    }
  },
  methods: {
    buscarTurmasDeUmaFormacao () {
      http.get(`candidato/programa-candidato-turmas/${this.nomeProgramaCandidato.nome}`)
        .then(response => (this.turmasProgramaCandidatos = response.data)) 
    },
    validaCampos () {
      let campos = document.querySelectorAll('input')
      let campoVazio = 0
      campos.forEach(element => {
        if (!element.value) {
          campoVazio = 1
        }
      })
      if (campoVazio == 0) {
        document.querySelector('#preencha').classList.add('none')
        document.getElementById('abreModal').click()
      } else {
        document.querySelector('#preencha').classList.remove('none')
      }     
    },
    enviarDados () {
      // var formData = new FormData()
      // var comprovanteRematricula = document.getElementById('file').files[0] 
      http
        .post('participante/salvarParticipante', this.cadastroParticipanteForm)
        .then(response => {
          
        })
        .catch(error => {
          console.log(error)
        })
      this.redirecionar()
    },
    redirecionar () {
      location.href = '/dados-participante-busca'
    },
    formataDataParaExibicao (data) {
      const dataPreForm = new Date(data)
      const dataFormatada = `${dataPreForm.getUTCDate()}/${dataPreForm.getUTCMonth() + 1}/${dataPreForm.getUTCFullYear()}`
      return dataFormatada
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
    popularCargoTurma () {
      this.cadastroParticipanteForm.idRemuneracao = this.remuneracao.id
      this.cadastroParticipanteForm.idPrograma = this.turmaSelecionada.id
    },
    formataDataParaMostrar (data) {
      const dataPreForm = new Date(data)
      const dataFormatada = `${dataPreForm.getUTCDate()}/${dataPreForm.getUTCMonth() + 1}/${dataPreForm.getUTCFullYear()}`
      return dataFormatada
    }
  },
  beforeMount () {
    Funcoes.verificaToken()
    this.id = this.pegaDadosUrl().id
    const dadosUrl = this.pegaDadosUrl()
    if (dadosUrl.tipo == 'edicao') {
      this.tipo = dadosUrl.tipo
    }
    this.cadastroParticipanteForm.idCandidato = this.id
  },
  mounted () {
    http.get(`participante/candidato/${this.id}`)
      .then(response => (this.candidato = response.data))
    
    http.get('remuneracao/cargos')
      .then(response => (this.cargos = response.data))

    http.get('candidato/buscar-instrutor')
      .then(response => (this.instrutores = response.data))
    
    http.get(`candidato/programa-candidato-nome/${this.id}`)
      .then(response => (this.nomeProgramaCandidato = response.data))  
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
  background-color: #D3CACA;
  border: 1px solid #BCB3B3;
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
.input-arquivo{
  display: none;
}
.rounded-circle{
  width: 150px;
}
.conteudomodal {
  display: flex;
  justify-content: center;
  min-height: 40vh;
  font-size: 21px;
}
.envio-arquivo{
  cursor: pointer;
}
@media (max-width: 1200px) {
  .editar{
    margin-bottom: 3em;
  }
}
</style>