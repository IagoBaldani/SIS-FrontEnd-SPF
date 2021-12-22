<template>
  <Header link="../dados-candidato-participante-elegibilidade"/>
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
              <p id="erroCpf" class="none erro">Por favor, preencha este campo</p>
              <p id="erroCpfInvalido" class="none erro">Por favor, insira um CPF válido</p>
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
              <label class="form-label fw-bold mb-0 titulo" for="inputIndicacao">Indicação</label>
              <input  class="form-control" id="inputIndicacao" disabled :placeholder="candidato.indicacao" type="text">
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo" for="inputNotaLogica">Nota na prova de lógica</label>
              <input  class="form-control" id="inputNotaLogica" disabled :placeholder="candidato.testeLogico" type="number" min="0" max="10">
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo" for="inputInstEnsino">Instituição de Ensino</label>
              <input  class="form-control" id="inputInstEnsino" type="text" v-model="cadastroParticipanteForm.instituicaoEnsino">
              <p id="erroinstituicaoEnsino" class="none erro">Por favor, preencha este campo</p>
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo" for="inputCurso">Curso</label>
              <input  class="form-control" id="inputCurso" type="text" v-model="cadastroParticipanteForm.curso">
              <p id="erroCurso" class="none erro">Por favor, preencha este campo</p>
            </div>
            <div class="mt-5">
              <button v-on:click="validaForm(), buscarTurmaPorId(), buscarCargoPorId()" type="button" class="btn submit form-control mt-5" >
                CONFIRMAR
              </button>
              <p class="none" id="verificaCampos" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="popularCargoTurma()" ></p>
            </div>
        </div>
        <div class="col-xl-4">
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo" for="inputTerminoGraduacao">Término da graduação</label>
              <input  class="form-control" id="inputTerminoGraduacao"  type="date" v-model="candidato.dataConclusao" disabled>
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo" for="inputDataEntregaDocumentos">Entrega dos documentos</label>
              <input  class="form-control" id="inputDataEntregaDocumentos"  type="date" v-model="cadastroParticipanteForm.dataEntrega">
              <p id="erroDataEntrega" class="none erro">Por favor, preencha este campo</p>
            </div>
            <div class="mb-3">
                <label for="cargo"  id="selectRemuneracao" class="form-label fw-bold titulo">Cargo</label>
                <select class="form-select" id="filtro-programa" v-model="remuneracao.id">
                    <option v-for="cargo in cargos" :value="cargo.id" :key="cargo.id" >{{ cargo.nome }}</option>
                </select>
                <p id="erroCargo" class="none erro">Por favor, preencha este campo</p>
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo">Email corporativo</label>
              <input  class="form-control" id="inputEmail" type="email" v-model="cadastroParticipanteForm.email">
              <p id="erroEmail" class="none erro">Por favor, preencha este campo</p>
              <p id="erroEmailInvalido" class="none erro">Por favor, insira um e-mail válido</p>
            </div>
            <div class="mb-3">
                <label class="form-label fw-bold titulo">TCE</label>
                <input id="fileTce" type="file" accept="application/pdf" class="form-control"/>
                <label for="file" class="btn-file d-flex justify-content-between">
                </label>
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo" for="inputFonteRecrutamento">Nome do Programa</label>
              <p id="idPrograma" :value="nomeProgramaCandidato.id" class="none"></p>
              <input class="form-control" disabled id="nomeProgramaCandidato" :value="nomeProgramaCandidato.nome"  type="text">
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo">Turma</label>
                <select required class="form-select" id="selectTurma" v-on:click="buscarTurmasDeUmaFormacao()">
                    <option class="relatorio_opcao" disabled selected value="0">Turma</option>
                    <option class="relatorio_opcao" v-for="(turmasProgramaCandidato, id) in turmasProgramaCandidatos"
                    :key="id" :value="turmasProgramaCandidato.id">{{turmasProgramaCandidato.turmas}}
                    </option>
                </select>
                <p id="erroTurma" class="none erro">Por favor, preencha este campo</p>
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
<!--      <div class="row justify-content-evenly">-->
<!--        <div class="col-xl-4 ">-->
<!--          <button v-on:click="validaForm(), buscarTurmaPorId(), buscarCargoPorId()" type="button" class="btn submit form-control" >-->
<!--            CONFIRMAR-->
<!--          </button>-->
<!--          <p class="none" id="verificaCampos" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="popularCargoTurma()" ></p>-->
<!--        </div>-->
<!--        <div class="col-xl-4"></div>-->
<!--        <div class="col-xl-2"></div>-->
<!--      </div>-->
    </div>
    <!-- fim do formulário -->
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
                <li>Término da Graduação: <span class="titulo"> {{formataDataParaMostrar(candidato.dataConclusao)}} </span></li>
                <li>Cargo: <span class="titulo">{{ cargo.cargo }}</span></li>
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
   <!-- Modal de confirmação -->
  <p class="none" id="abreModalInvisivel" data-bs-toggle="modal" data-bs-target="#modalConfirmacao" ></p>
    <div class="modal fade mt-5"  id="modalConfirmacao" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
      cargo: {},
      turmasPrograma: [],
      nomePrograma: '',
      idProgramaCandidato: '',
      cadastroParticipanteForm: {
        cpf: '',
        instituicaoEnsino: '',
        curso: '',
        terminoGraduacao: '',
        idRemuneracao: '',
        idCandidato: '',
        idPrograma: '',
        email: '',
        dataEntrega: ''
      },
      nomeProgramaCandidato: {
        id: '',
        nome: ''
      },
      turmasProgramaCandidatos: [],
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
    }
  },
  methods: {
    buscarTurmasDeUmaFormacao () {
      http.get(`candidato/programa-candidato-turmas/${this.nomeProgramaCandidato.nome}`)
        .then(response => (this.turmasProgramaCandidatos = response.data))
    },
    buscarTurmaPorId () {
      var idPrograma = document.querySelector('#selectTurma').value
      http.get(`programa/buscarFormacaoPorId/${idPrograma}`)
        .then(response => (this.turmaSelecionada = response.data))
    },
    buscarCargoPorId () {
      var idCargo = document.getElementById('filtro-programa').value
      http.get(`remuneracao/${idCargo}`)
        .then(response => (this.cargo = response.data))
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
    abrirModal () {
      document.getElementById('abreModalInvisivel').click()
    },
    enviarDados () {
      var formData = new FormData()
      var arquivo = document.getElementById('fileTce').files[0]
      formData.append('cpf', this.cadastroParticipanteForm.cpf)
      formData.append('instituicaoEnsino', this.cadastroParticipanteForm.instituicaoEnsino)
      formData.append('curso', this.cadastroParticipanteForm.curso)
      formData.append('idRemuneracao', this.remuneracao.id)
      formData.append('idCandidato', this.id)
      formData.append('idPrograma', document.getElementById('selectTurma').value)
      formData.append('email', this.cadastroParticipanteForm.email)
      formData.append('tce', arquivo)
      formData.append('dataEntrega', this.cadastroParticipanteForm.dataEntrega)
      http
        .post('participante/salvarParticipante', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
        })
        .catch(error => {
          console.log(error)
        })
      this.redirecionar()
    },
    redirecionar () {
      this.abrirModal()
      setTimeout(function () {
        location.href = '/dados-participante-busca'
      }, 1521)
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
    validaCpf (cpf) {
      cpf = cpf.replaceAll('.', '')
      cpf = cpf.replace('-', '')
      var Soma
      var Resto
      Soma = 0
      if (cpf == '00000000000') {
        return false
      }
      for (var i = 1; i <= 9; i++) {
        Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i)
      }
      Resto = (Soma * 10) % 11
      if ((Resto == 10) || (Resto == 11)) {
        Resto = 0
      }
      if (Resto != parseInt(cpf.substring(9, 10))) {
        return false
      }
      Soma = 0
      for (i = 1; i <= 10; i++) {
        Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i)
      }
      Resto = (Soma * 10) % 11
      if ((Resto == 10) || (Resto == 11)) {
        Resto = 0
      }
      if (Resto != parseInt(cpf.substring(10, 11))) {
        return false
      }
      return true
    },
    validaForm () {
      var cpf = document.getElementById('inputCpf').value
      var instituicaoEnsino = document.getElementById('inputInstEnsino').value
      var curso = document.getElementById('inputCurso').value
      var cargo = document.getElementById('filtro-programa').value
      var email = document.getElementById('inputEmail').value
      var turma = document.getElementById('selectTurma').value
      var dataEntrega = document.getElementById('inputDataEntregaDocumentos').value
      let erro = 0
      if (cpf == '') {
        document.querySelector('#erroCpf').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroCpf').classList.add('none')
      }
      if (!this.validaCpf(cpf) && cpf != '') {
        erro = 1
        document.querySelector('#erroCpfInvalido').classList.remove('none')
      } else {
        document.querySelector('#erroCpfInvalido').classList.add('none')
      }
      if (instituicaoEnsino == '') {
        document.querySelector('#erroinstituicaoEnsino').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroinstituicaoEnsino').classList.add('none')
      }
      if (curso == '') {
        document.querySelector('#erroCurso').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroCurso').classList.add('none')
      }
      if (cargo == '') {
        document.querySelector('#erroCargo').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroCargo').classList.add('none')
      }
      if (email == '') {
        document.querySelector('#erroEmail').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroEmail').classList.add('none')
      }
      if (!this.reg.test(email) && email != '') {
        erro = 1
        document.querySelector('#erroEmailInvalido').classList.remove('none')
      } else {
        document.querySelector('#erroEmailInvalido').classList.add('none')
      }
      if (turma == 0) {
        document.querySelector('#erroTurma').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroTurma').classList.add('none')
      }
      if (dataEntrega == ''){
        document.querySelector('#erroDataEntrega').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroDataEntrega').classList.add('none')
      }
      if (erro == 1) {
        return false
      } else {
        document.getElementById('verificaCampos').click()
      }
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
      .then(response => {
        this.candidato = response.data
      })

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
.cursor{
  cursor: pointer;
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
.none {
  display: none;
}
.erro {
  color: red;
  font-weight: bold;
}
@media (max-width: 1200px) {
  .editar{
    margin-bottom: 3em;
  }
}
</style>
