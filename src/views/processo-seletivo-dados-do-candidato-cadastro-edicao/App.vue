<template>
  <Header :link="`../processo-seletivo-busca-por-candidato?id=${this.idRetorno}` 
    + `&status=${this.statusProcesso}`"   />
  <main>
    <div class="container-fluid">
      <div class="row justify-content-evenly">
        <div class="col-xl-4">
          <h1 class="dadosCandidato mt-4 mb-4">Dados do Candidato:</h1>
        </div>
        <div class="col-xl-4"></div>
      </div>
      <div class="row justify-content-evenly">
        <div class="col-md-4">
          <div class="mb-3">
            <label class="label-form">Nome</label>
            <input
              type="text"
              class="form-control"
              id="inputNome"
              :value="candidato.nome"
            />
            <p id="nomeErro" class="none erro">Por favor, preencha o campo nome</p>
          </div>
          <div class="mt-4 mb-3">
            <label class="label-form">Contato</label>
            <input
              type="tel"
              class="form-control"
              v-mask="['(##) # ####-####']"
              id="inputContato"
              placeholder="(xx) xxxxx-xxxx"
              :value="candidato.telefone"
            />
            <p id="contatoErro" class="none erro">Por favor, preencha o campo telefone</p>
            <p id="erroTamanho" class="erro none">Este campo precisa ter 11 dígitos!</p>
          </div>

          <div class="mt-4 mb-3">
            <label class="label-form" >Fonte de recrutamento</label>
            <input
              type="text"
              class="form-control"
              id="inputFonteDeRecrutamento"
              :value="candidato.fonteRecrutamento"
            />
            <p id="fonteErro" class="none erro">Por favor, preencha o campo fonte de recrutamento</p>
          </div>

          <div class="mt-4 mb-3">
            <label class="label-form">Data agendamento</label>
            <input
              type="date"
              class="form-control"
              id="inputDataAgendamento"
              placeholder="2021/02/15"
              :value="candidato.dataAgendamento"
            />
            <p id="dataErro" class="none erro">Por favor, preencha o campo data agendamento</p>
          </div>
          <div class="mt-0">
            <label class="label-form titulo mb-0">Resultado</label>
            <select class="form-select" :value="candidato.status" id="status">
              <!-- <option value="candadidato.status" selected >{{ candidato.status }}</option> -->
              <option value="SEM_STATUS" >Sem status</option>
              <option value="APROVADO_1_FASE" class="aprovado">Aprovado 1ª fase</option>
              <option value="REPROVADO_1_FASE" class="reprovado">Reprovado 1ª fase</option>
              <option value="APROVADO_2_FASE" class="aprovado">Aprovado 2ª fase</option>
              <option value="REPROVADO_2_FASE" class="reprovado">Reprovado 2ª fase</option>
              <option value="STANDBY" class="standby">Stand By</option>
            </select>
            <p id="resultadoErro" class="none erro">Por favor, preencha o campo resultado</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="mb-3">
           <!--  <label class="label-form">Processo Seletivo</label>
            <select id="inputProcessoSeletivo" class="form-select" :value-="candidato.processoSeletivoId">
              <option selected value="0">Selecione o Processo Seletivo</option>
              <template v-for="processo in processosSeletivos" v-bind:key="processo">
                <option v-bind:value="processo.id" v-if="processo.status != 'FINALIZADA'">{{ processo.id }} - {{ processo.nome }}</option> 
              </template>
            </select> -->
            <!-- <input type="txt"  class="form-control" id="inputProcesso" disabled display="none" v-bind:value="this.idRetorno" /> -->
            <!-- <p id="processoErro" class="none erro">Por favor, preencha o campo processo seletivo</p> -->
          </div>
          <div class="mb-3">
            <label class="label-form">Prova prática</label>
            <input type="number"  class="form-control" id="inputProvaPratica"  :value="candidato.testeLogico" min="0" max="10" maxlength="10"/>
            <p id="provaErro" class="none erro">Por favor, preencha o campo prova prática</p>
            <p id="erroProvaPratica" class="none erro">A nota deve ser entre 0 - 10</p>
          </div>

          <div class="mb-3">
            <label class="label-form">DISC</label>
            <input type="text" class="form-control" id="inputDisc" v-mask="['d:## i:## s:## c:##']"  placeholder="Digite a nota do DISC" :value="candidato.notaDisc"/>
            <p id="discErro" class="none erro">Por favor, preencha o campo DISC</p>
          </div>

          <p class="none" id="verificaCampos" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="validaForm()"></p>

          <div class="mb-3">
            <label class="label-form mb-0 titulo">Currículo candidato</label><br>
            <input  type="file" class="form-control" id="fileCurriculo"  accept="application/pdf">
            <p v-if="tipoReq == 'edicao' " id="curriculo" class="lembrete" >Já existe um arquivo de curriculo. Deseja substituir ?</p>
            <p id="curriculoErro" class="none erro">Por favor, preencha o campo currículo</p>
          </div>

          <div class="mb-3">
            <label class="label-form mb-0 titulo">Disc xlsx</label><br>
            <input type="file" class="form-control" id="fileDisc">
            <p v-if="tipoReq  == 'edicao'" id="curriculo" class="lembrete" >Já existe um arquivo de Disc. Deseja substituir ?</p>
            <p id="discFileErro" class="none erro">Por favor, preencha o campo DISC</p>
          </div>

          <div class="mb-3">
            <label class="label-form">Observações Entrevista</label>
            <textarea rows="5" class="form-control" id="inputObservacao" :value="candidato.observacao"></textarea>
            <p id="observacaoErro" class="none erro">Por favor, preencha o campo observação</p>
          </div>
        </div>
      </div>
      <div class="row justify-content-evenly mt-4">
        <div class="col-md-4">
          <div class="mb-2">
            <div for="exampleModal" class="confirmar">
              <div
                type="button"
                @click.prevent="enviarDados()"
                class="bt"
              >
                <button type="button" class="btn-confirmar bt-footer largura" v-on:click="validaForm()">
                  CONFIRMAR
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
        </div>
      </div>
    </div>

    <!-- Modal -->

    <div
      class="modal"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-xl modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body d-flex justify-content-between">
            <div>
              <h1 class="modal-title form-label fw-bold mb-0 titulo" v-if="candidatoForm.id == ''">
                Deseja confirmar o cadastro?
              </h1>
              <h1 class="modal-title form-label fw-bold mb-0 titulo" v-else>
                Deseja confirmar a edição do participante?
              </h1>
            </div>
            <div class="conteudomodal d-flex flex-column justify-content-center mb-0">
                        <div class="mt-3">
                            <ul class="fw-bold subtitulo text-start">
                                Informações gerais:
                                <li>Nome: <span class="titulo"> {{ candidatoForm.nome }} </span></li>
                                <li>Contato: <span class="titulo"> {{ candidatoForm.telefone }} </span></li>
                                <li>Fonte de Recrutamento: <span class="titulo"> {{ candidatoForm.fonteRecrutamento}} </span></li>
                                <li>Data de Agendamento: <span class="titulo">{{ this.formataDataParaMostrar(candidatoForm.dataAgendamento) }}</span></li>
                                <li>Observação: <span class="titulo">{{ candidatoForm.observacao }}</span></li>
                                <li>Status: <span class="titulo">{{ candidatoForm.status }}</span></li>
                                <li>Processo Seletivo: <span class="titulo">{{ candidatoForm.idProcessoSeletivo}}</span></li>
                            </ul>
                        </div>
                        <div class="mt-3 modal-footer border-0 justify-content-around">
                            <div>
                                <button type="button" class="btn submit" @click="processaRequisicoes">CONFIRMAR</button>
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
        </div>
    </div>

     <!-- Modal de confirmação -->
    <p class="none" id="abreModalInvisivelCriacao" data-bs-toggle="modal" data-bs-target="#modalConfirmacaoCriacao" ></p>
    <div class="modal fade mt-5"  id="modalConfirmacaoCriacao" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
    <!-- Modal de confirmação -->
    <p class="none" id="abreModalInvisivel" data-bs-toggle="modal" data-bs-target="#modalConfirmacao" ></p>
    <div class="modal fade mt-5"  id="modalConfirmacao" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-size">
            <div class="modal-content p-5 grey-background">
                <div class="row mb-5">
                    <div class="col">
                        <h3 class="modal-title fw-bold titulo text-center" id="exampleModalLabel">Alteração Efetuada com sucesso</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </main>
</template>

<script>
import Header from '@/components/Header.vue'
import Funcoes from '@/services/Funcoes'
import { http } from '@/services/Config'
import { mask } from 'vue-the-mask'
import { variavel } from '../../services/Variavel'

export default {
  directives: { mask },
  name: 'App',
  components: {
    Header
  },

  data () {
    return {
      candidato: {},
      candidatoForm: {
        id: '',
        nome: '',
        telefone: '',
        fonteRecrutamento: '',
        dataAgendamento: '',
        testeLogico: '',
        notaDisc: '',
        observacao: '',
        status: '',
        idProcessoSeletivo: '',
        disc: '',
        curriculo: '',
        dataFormatadaCerta: ''
      },
      processosSeletivos: {},
      statusProcesso: '',
      idRetorno: '',
      tipoReq: '',
      statusParticipante: '',
      idRetornoNome:'', 
    }
  },
  beforeMount () {
    Funcoes.verificaToken()

    const dadosUrl = this.pegaDadosUrl()
    let id = dadosUrl.id
    let tipo = dadosUrl.tipo
    this.tipoReq = dadosUrl.tipo
    this.idRetorno = dadosUrl.idProcesso
    this.statusProcesso = dadosUrl.statusProcesso
    this.statusParticipante = dadosUrl.statusParticipante
    


    console.log(this.tipoReq)
    if (tipo == 'edicao') {
      this.getCandidato(id)
    }
    this.pegaInstrutores()
  },
  methods: {
    acao () {
      let modal = document.querySelector('.modal')
      let buttonClose = document.querySelector('.cancel')

      modal.style.display = 'block'

      buttonClose.addEventListener('click', () => {
        modal.removeAttribute('style')
      })
    },
    abrirModal () {
      document.getElementById('abreModalInvisivel').click()
    },
    abrirModalCriacao () {
      document.getElementById('abreModalInvisivelCriacao').click()
    },
    enviarDados () {
      this.candidatoForm.id = this.candidato.id
      this.candidatoForm.nome = document.querySelector('#inputNome').value
      this.candidatoForm.telefone = document.querySelector('#inputContato').value
      this.candidatoForm.fonteRecrutamento = document.querySelector('#inputFonteDeRecrutamento').value
      this.candidatoForm.dataAgendamento = document.querySelector('#inputDataAgendamento').value
      this.candidatoForm.testeLogico = document.querySelector('#inputProvaPratica').value
      this.candidatoForm.notaDisc = document.querySelector('#inputDisc').value
      this.candidatoForm.observacao = document.querySelector('#inputObservacao').value
      this.candidatoForm.status = document.querySelector('#status').value
      this.candidatoForm.idProcessoSeletivo = this.idRetorno
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
    processaRequisicoes () {
      const dados = this.pegaDadosUrl()
      let id = dados.id
      let tipo = dados.tipo
      var discAtualizar = document.getElementById('fileDisc').files[0]
      var curriculoAtualizar = document.getElementById('fileCurriculo').files[0]
      
      if (tipo == 'edicao' && discAtualizar !=undefined && curriculoAtualizar !=undefined) {
        console.log('editando completo')
        console.log(curriculoAtualizar)
        console.log(discAtualizar)
        
        var formDataAtualizar = new FormData()  
        formDataAtualizar.append('id', this.candidatoForm.id)
        formDataAtualizar.append('nome', this.candidatoForm.nome)
        formDataAtualizar.append('fonteRecrutamento', this.candidatoForm.fonteRecrutamento)
        formDataAtualizar.append('telefone', this.candidatoForm.telefone)
        formDataAtualizar.append('dataAgendamento', this.candidatoForm.dataAgendamento)
        formDataAtualizar.append('testeLogico', this.candidatoForm.testeLogico)
        formDataAtualizar.append('notaDisc', this.candidatoForm.notaDisc)
        formDataAtualizar.append('observacao', this.candidatoForm.observacao)
        formDataAtualizar.append('status', this.candidatoForm.status)
        formDataAtualizar.append('idProcessoSeletivo', this.idRetorno)
        formDataAtualizar.append('disc', discAtualizar)
        formDataAtualizar.append('curriculo', curriculoAtualizar)
        http
          .put(`candidato/${id}`, formDataAtualizar, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(response => {
            this.abrirModal()
            setTimeout(function () {
              window.location.href = variavel.href = 'processo-seletivo-busca-por-vagas'
            }, 1500) 
          })
          .catch(error => {
            console.log(error)
          })
      } else if (tipo == 'edicao' && discAtualizar ==undefined && curriculoAtualizar !=undefined) {
        console.log('editando com curriculo')
        formDataAtualizar = new FormData()  
        formDataAtualizar.append('id', this.candidatoForm.id)
        formDataAtualizar.append('nome', this.candidatoForm.nome)
        formDataAtualizar.append('fonteRecrutamento', this.candidatoForm.fonteRecrutamento)
        formDataAtualizar.append('telefone', this.candidatoForm.telefone)
        formDataAtualizar.append('dataAgendamento', this.candidatoForm.dataAgendamento)
        formDataAtualizar.append('testeLogico', this.candidatoForm.testeLogico)
        formDataAtualizar.append('notaDisc', this.candidatoForm.notaDisc)
        formDataAtualizar.append('observacao', this.candidatoForm.observacao)
        formDataAtualizar.append('status', this.candidatoForm.status)
        formDataAtualizar.append('idProcessoSeletivo', this.idRetorno)
        formDataAtualizar.append('curriculo', curriculoAtualizar)
        http
          .put(`candidato/${id}`, formDataAtualizar, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(response => {
            this.abrirModal()
            setTimeout(function () {
              window.location.href = variavel.href = 'processo-seletivo-busca-por-vagas'
            }, 1500) 
          })
          .catch(error => {
            console.log(error)
          })
      } else if (tipo == 'edicao' && discAtualizar !=undefined && curriculoAtualizar ==undefined) {
        console.log('editando com disc')
        formDataAtualizar = new FormData()  
        formDataAtualizar.append('id', this.candidatoForm.id)
        formDataAtualizar.append('nome', this.candidatoForm.nome)
        formDataAtualizar.append('fonteRecrutamento', this.candidatoForm.fonteRecrutamento)
        formDataAtualizar.append('telefone', this.candidatoForm.telefone)
        formDataAtualizar.append('dataAgendamento', this.candidatoForm.dataAgendamento)
        formDataAtualizar.append('testeLogico', this.candidatoForm.testeLogico)
        formDataAtualizar.append('notaDisc', this.candidatoForm.notaDisc)
        formDataAtualizar.append('observacao', this.candidatoForm.observacao)
        formDataAtualizar.append('status', this.candidatoForm.status)
        formDataAtualizar.append('idProcessoSeletivo', this.idRetorno)
        formDataAtualizar.append('disc', discAtualizar)
        http
          .put(`candidato/${id}`, formDataAtualizar, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(response => {
            this.abrirModal()
            setTimeout(function () {
              window.location.href = variavel.href = 'processo-seletivo-busca-por-vagas'
            }, 1500) 
          })
          .catch(error => {
            console.log(error)
          })
      } else if (tipo == 'edicao' && discAtualizar ==undefined && curriculoAtualizar ==undefined) {
        console.log('editando sem curriculo sem disc')
        formDataAtualizar = new FormData()  
        formDataAtualizar.append('id', this.candidatoForm.id)
        formDataAtualizar.append('nome', this.candidatoForm.nome)
        formDataAtualizar.append('fonteRecrutamento', this.candidatoForm.fonteRecrutamento)
        formDataAtualizar.append('telefone', this.candidatoForm.telefone)
        formDataAtualizar.append('dataAgendamento', this.candidatoForm.dataAgendamento)
        formDataAtualizar.append('testeLogico', this.candidatoForm.testeLogico)
        formDataAtualizar.append('notaDisc', this.candidatoForm.notaDisc)
        formDataAtualizar.append('observacao', this.candidatoForm.observacao)
        formDataAtualizar.append('status', this.candidatoForm.status)
        formDataAtualizar.append('idProcessoSeletivo', this.idRetorno)
        http
          .put(`candidato/${id}`, formDataAtualizar, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(response => {
            this.abrirModal()
            setTimeout(function () {
              window.location.href = variavel.href = 'processo-seletivo-busca-por-vagas'
            }, 1500) 
          })
          .catch(error => {
            console.log(error)
          })
      } else if (tipo == 'cadastro') {
        var formData = new FormData()
        var disc = document.getElementById('fileDisc').files[0]
        var curriculo = document.getElementById('fileCurriculo').files[0]
        formData.append('id', this.candidatoForm.id)
        formData.append('nome', this.candidatoForm.nome)
        formData.append('fonteRecrutamento', this.candidatoForm.fonteRecrutamento)
        formData.append('telefone', this.candidatoForm.telefone)
        formData.append('dataAgendamento', this.candidatoForm.dataAgendamento)
        formData.append('testeLogico', this.candidatoForm.testeLogico)
        formData.append('notaDisc', this.candidatoForm.notaDisc)
        formData.append('observacao', this.candidatoForm.observacao)
        formData.append('status', this.candidatoForm.status)
        formData.append('idProcessoSeletivo', this.idRetorno)
        formData.append('disc', disc)
        formData.append('curriculo', curriculo)
        http
          .post('candidato', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(response => {
            this.abrirModalCriacao()
            console.log(this.idRetorno)
            console.log(this.statusProcesso)
            setTimeout(function () {
              // window.location.href = variavel.href = 'processo-seletivo-busca-por-candidato' + '?id=' + this.idRetorno +  
              //   + '&status=' + this.statusProcesso
              window.location.href = variavel.href = 'processo-seletivo-busca-por-vagas'
            }, 1521)
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    validaForm () {
      var nome = document.getElementById('inputNome').value
      var contato = document.getElementById('inputContato').value
      var fonteRecrutamento = document.getElementById('inputFonteDeRecrutamento').value
      var dataAgendamento = document.getElementById('inputDataAgendamento').value
      var resultado = document.getElementById('status').value
      // var processoSeletivo = document.getElementById('inputProcessoSeletivo').value
      var provaPratica = document.getElementById('inputProvaPratica').value
      var discNota = document.getElementById('inputDisc').value
      var curriculo = document.getElementById('fileCurriculo').value
      var disc = document.getElementById('fileDisc').value
      var observacao = document.getElementById('inputObservacao').value
      console.log(curriculo)
      let erro = 0
      if (nome == '') {
        document.querySelector('#nomeErro').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#nomeErro').classList.add('none')
      }
      if (contato == '') {
        document.querySelector('#contatoErro').classList.remove('none')
        erro = 1
      } else if (contato.length != 16) {
        document.querySelector('#contatoErro').classList.add('none')
        document.querySelector('#erroTamanho').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroTamanho').classList.add('none')
      }
      if (fonteRecrutamento == '') {
        document.querySelector('#fonteErro').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#fonteErro').classList.add('none')
      }
      if (dataAgendamento == '') {
        document.querySelector('#dataErro').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#dataErro').classList.add('none')
      }
      if (resultado == '') {
        document.querySelector('#resultadoErro').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#resultadoErro').classList.add('none')
      }
      // if (processoSeletivo == 0) {
      //   document.querySelector('#processoErro').classList.remove('none')
      //   erro = 1
      // } else {
      //   document.querySelector('#processoErro').classList.add('none')
      // }
      if (provaPratica == '') {
        document.querySelector('#provaErro').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#provaErro').classList.add('none')
      }
      if (provaPratica < 0 || provaPratica > 10) {
        document.querySelector('#erroProvaPratica').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroProvaPratica').classList.add('none')
      }
      if (discNota == '') {
        document.querySelector('#discErro').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#discErro').classList.add('none')
      }
      if (observacao == '') {
        document.querySelector('#observacaoErro').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#observacaoErro').classList.add('none')
      }
      if (curriculo == '' && this.tipo != 'edicao') {
        document.querySelector('#curriculoErro').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#curriculoErro').classList.add('none')
      }
      if (disc == '' && this.tipo != 'edicao') {
        document.querySelector('#discFileErro').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#discFileErro').classList.add('none')
      }
      if (erro == 1) {
        return false
      } else if (erro == 0) {
        document.getElementById('verificaCampos').click()
      }
    },
    formataDataParaMostrar (data) {
    const dataPreForm = new Date(data)
    const dataFormatada = `${dataPreForm.getUTCDate()}/${dataPreForm.getUTCMonth() + 1}/${dataPreForm.getUTCFullYear()}`
    return dataFormatada
  },
    pegaInstrutores () {
      http
        .get('processo-seletivo')
        .then(response => {
          this.processosSeletivos = response.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}

</script>

<style>
/* Chamada root */
:root {
  /* Cores principais - Botões e telas */
  --color-background-screen: #ebebeb;
  --color-yellow-principal: #ffb700;
  --color-blue-principal: #090b2e;
  --color-magenta-principal: #ab0045;
  --color-background-form-input: #d3caca;

  /* Cores da barra de progresso da busca de vagas */
  --color-green-progress: #19b200;
  --color-yellow-progress: yellow;
  --color-red-progress: red;

  /* Cor base rodapé */
  --color-blue-footer: #00f;

  /* Cores de fonte */
  --color-gray-font: #737373;

  /* Cores default */
  --color-white-default: #ffffff;
  --color-black-default: #000000;
}

/* Restart da página*/
* {
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
  margin: 0;
  padding: 0;
  text-decoration: none;
  color: var(--color-blue-principal);
}

body {
  background-color: var(--color-background-screen) !important;
}

/* Tudo relacionado ao header */

.btn-header img,
.logo img {
  height: 50px;
}

/* Final do Header */
/* ------------------------------------------------------------ */

/* Main */

/* Titulo da página */
.dadosCandidato {
  font-weight: 700;
  width: 100%;
  font-size: 30px;
}

/* Labels de todos os inputs */
.label-form {
  font-weight: 700;
  font-size: 18px;
}

/* Textarea de mensagem */
#observacao {
  width: 100%;
  resize: none;
}

/* Início da chamada dos botões do rodapé */
.btn-confirmar,
.btn-status {
  height: 50px !important;
  width: 100%;

  border: none !important;

  font-size: 22px;

  text-align: center !important;
  font-weight: bold !important;
  color: var(--color-white-default);
  line-height: 30px;

  border-radius: 3px;
  white-space: normal !important;
}

.btn-confirmar {
  background: var(--color-magenta-principal);
}
.modal-size {
    width: 801px !important;
    max-width: 801px !important;
}
.erro {
  font-weight: bold;
  color: red;
}

.none {
  display: none;
}

.btn-status {
  background: var(--color-yellow-principal);
}

/* Final da chamada dos botões do rodapé */

/* Chamada dos campos disabled */
#disc,
#prova {
  background-color: var(--color-background-form-input);
}
.lembrete {
  color: #19B200;
  font-weight: 500;
}
/* Início da chamada do modal */

.modal {
  display: none;
}

button .largura {
  width: 100% !important;
}

.modal-body,
.modal-header,
.modal-footer {
  text-align: center;
  background-color: var(--color-background-screen);
}

.modal-title {
  margin-left: 75px;
}

.modal-body {
  min-height: 55vh;
  flex-direction: column;
  width: 100%;
}

.submit,
.cancel {
  color: white !important;
  font-weight: bold !important;
  border-radius: 5px !important;
  width: 350px;
  height: 50px;
  font-size: 25px !important;
}

.submit {
  background-color: var(--color-magenta-principal) !important;
}

.cancel {
  background-color: var(--color-yellow-principal) !important;
}

.conteudomodal {
   display: flex;
    justify-content: center;
    min-height: 40vh;
    font-size: 21px;
}

.btn.submit.form-control {
  font-size: 22px !important;
}

.nome {
  color: var(--color-gray-font);
  font-size: 24px;
}
.download{
    transform: rotate(180deg) !important;
}
textarea {
  resize: none;
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
</style>
