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
              <input class="form-control disabledTextInput" id="inputName" :placeholder="participante.nome" type="text" disabled>
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo" for="inputCpf">CPF</label>
              <input class="form-control disabledTextInput" id="inputCpf" :placeholder="participante.cpf" type="text" disabled>
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo" for="inputContato">Contato</label>
              <input class="form-control disabledTextInput" id="inputContato" :placeholder="participante.contato" type="tel" disabled>
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo" for="inputFonteRecrutamento">Fonte recrutamento</label>
              <input v-model="modelFonteRecrutamento" class="form-control" id="inputFonteRecrutamento" placeholder="Palestra via faculdade" type="text">
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo" for="inputNotaLogica">Nota na prova de lógica</label>
              <input v-model="modelNotaLogica" class="form-control" id="inputNotaLogica" placeholder="10/10" type="number" min="0" max="10">
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo" for="inputInstEnsino">Instituição de Ensino</label>
              <input v-model="modelInstituicaoEnsino" class="form-control" id="inputInstEnsino" placeholder="Fatec Ourinhos" type="text">
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo" for="inputCurso">Curso</label>
              <input v-model="modelCurso" class="form-control" id="inputCurso" placeholder="Análise e Desenvolvimento de Sistemas" type="text">
            </div>
        </div>
        <div class="col-xl-4">
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo" for="inputTerminoGraduacao">Término da graduação</label>
              <input v-model="modelTerminoGraduacao" class="form-control" id="inputTerminoGraduacao" placeholder="20/12/2021" type="date">
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo" for="inputCargo">Cargo</label>
              <select class="form-select" id="inputCargo" placeholder="Estagiário" v-model="modelCargo">
                <option value="ESTAGIARIO">Estagiário</option>
                <option value="JOVEM_APRENDIZ">Jovem Aprendiz</option>
                <option value="TRAINEE">Trainee</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo">Salário</label>
              <input v-model="modelSalario" class="form-control disabledTextInput" type="number" disabled>
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo">Programa de Formação - Turma</label>
              <select class="form-select" v-model="modelPrograma" @input="exibeDadosPrograma(programas)">
                <option id="programa" v-bind:value="programa.nome + ' - ' + programa.turma" v-for="programa in programas" v-bind:key="programa"> {{programa.nome}} - {{programa.turma}}</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo">Coordenador Técnico</label>
              <input id="coordenador" class="form-control disabledTextInput" type="text" disabled>
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo">Início do programa</label>
              <input id="inicioPrograma" class="form-control disabledTextInput" type="text" disabled>
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo">Término do programa</label>
              <input id="terminoPrograma" class="form-control disabledTextInput" type="text" disabled>
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold mb-0 titulo">Observação</label>
              <textarea v-model="modelObservacao" class="form-control" placeholder="Mensagem..." cols="20" rows="6" style="resize:none;"></textarea>
            </div>
        </div>
        <div class="col-xl-2">
            <div class="text-center text-md-left">
              <img src="@/assets/imgs/perfil.svg" class="rounded-circle" alt="">
            </div>
        </div>
      </div>
      <div class="row justify-content-evenly">
        <div class="col-xl-4 ">
          <button @click="enviarDados" type="button" class="btn submit form-control" data-bs-toggle="modal" data-bs-target="#exampleModal">
            CONFIRMAR
          </button>
        </div>
        <div class="col-xl-4">
          <a :href="'/dados-participante-arquivos?id=' + participante.cpf " >
            <div class="btn cancel form-control mb-5">
              ENVIAR ARQUIVOS
            </div>
          </a>
        </div>
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
                <li>Nome: <span class="titulo"> {{participante.nome}} </span></li>
                <li>CPF: <span class="titulo"> {{participante.cpf}} </span></li>
                <li>Contato: <span class="titulo"> {{participante.contato}} </span></li>
                <li>Fonte de recrutamento: <span class="titulo"> {{participante.fonteRecrutamento}} </span></li>
                <li>Nota na prova lógica: <span class="titulo"> {{participante.notaProvaLogica}}</span> </li>
                <li>Instituição de Ensino: <span class="titulo"> {{participante.instituicaoEnsino}} </span></li>
                <li>Curso: <span class="titulo"> {{participante.curso}} </span></li>
                <li>Término da Graduação: <span class="titulo"> {{participante.terminoGraduacao}} </span></li>
                <li>Cargo: <span class="titulo"> {{participante.cargo}} </span></li>
                <li>Salário: <span class="titulo"> {{participante.salario}}</span></li>
                <li>Programa de Formação - Turma: <span class="titulo"> {{participante.programaSelecionado.nomeETurma}}</span></li>
                <li>Observação: <span class="titulo"> {{participante.observacao}}</span></li>
              </ul>
            </div>
          </div>
          <div class="modal-footer border-0 justify-content-around">
            <div>
              <button type="button" class="btn submit-modal">CONFIRMAR</button>
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
export default {
  name: 'App',
  components: {
    Header
  },
  data () {
    return {
      responseStatus: '',
      tipo: '',
      programas: [
        {
          id: 1,
          nome: 'Java',
          turma: 'Turma I 2021',
          coordenador: 'Kaiqui Lopes',
          inicio: '20/07/2021',
          termino: '12/12/2021'
        },
        {
          id: 2,
          nome: 'Java',
          turma: 'Turma II 2021',
          coordenador: 'Nico Steppat',
          inicio: '12/07/2021',
          termino: '12/12/2022'
        },
        {
          id: 3,
          nome: 'Mainframe',
          turma: 'Turma I 2021',
          coordenador: 'João Maurício',
          inicio: '10/12/2021',
          termino: '10/12/2022'
        }
      ],
      participante: {
        nome: '',
        cpf: '',
        contato: '',
        fonteRecrutamento: '',
        notaProvaLogica: '',
        instituicaoEnsino: '',
        curso: '',
        terminoGraduacao: '',
        cargo: '',
        salario: '',
        programaSelecionado: {
          nomeETurma: ''
        },
        observacao: '',
        status: 'Ativo'
      }
    }
  },
  methods: {
    enviarDados () {
      this.participante.fonteRecrutamento = this.modelFonteRecrutamento
      this.participante.notaProvaLogica = this.modelNotaLogica
      this.participante.instituicaoEnsino = this.modelInstituicaoEnsino
      this.participante.curso = this.modelCurso
      this.participante.terminoGraduacao = this.formataDataParaExibicao(this.modelTerminoGraduacao)
      this.participante.programaSelecionado.nomeETurma = this.modelPrograma
      this.participante.observacao = this.modelObservacao
    },
    formataDataParaExibicao (data) {
      const dataPreForm = new Date(data)
      const dataFormatada = `${dataPreForm.getUTCDate()}/${dataPreForm.getUTCMonth() + 1}/${dataPreForm.getUTCFullYear()}`
      return dataFormatada
    },
    exibeDadosPrograma (programas) {
      let elProgramas = document.querySelectorAll('#programa')
      let arrayOptions = []
      elProgramas.forEach(elPrograma => {
        arrayOptions.push([elPrograma.value, elPrograma.selected])
      })
      arrayOptions.forEach(option => {
        if (option[1]) {
          for (let i = 0; i < programas.length; i++) {
            let nomeETurma = `${programas[i].nome} - ${programas[i].turma}`
            if (nomeETurma === option[0]) {
              document.querySelector('#coordenador').placeholder = programas[i].coordenador
              document.querySelector('#inicioPrograma').placeholder = programas[i].inicio
              document.querySelector('#terminoPrograma').placeholder = programas[i].termino
            }
          }
        }
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
    }
  },
  beforeMount () {
    Funcoes.verificaToken()
    const dadosUrl = this.pegaDadosUrl()
    if (dadosUrl.tipo == 'edicao') {
      this.tipo = dadosUrl.tipo
    }
    // Chamada da API MOCK
    http.get(`mock/participante/${dadosUrl.id}`)
      .then(response => {
        this.participante.nome = response.data.nome
        this.participante.cpf = response.data.cpf
        this.participante.contato = response.data.telefone
      })
      .catch(error => {
        alert('Erro na chamada da API MOCK - ' + error)
      })
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