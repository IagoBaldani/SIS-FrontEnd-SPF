<template>
    <Header :link="`../acompanhamento-gerencial?id=${this.id}`"/>
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
                    </div>
                </div>
            </div>
            <div class="row justify-content-evenly">
                <div class="col-lg-4">
                    <form>
                        <div class="mb-3">
                            <label for="qtdHoras" class="form-label fw-bold mb-0 titulo">Quantidade de Horas</label>
                            <input id="inputQuantidade" name="qtdHoras" v-model="form.qtdHoras" max="40" min="0" type="number" required class="form-control campo">
                            <p id="erroQuantidade" class="erro none">Por favor, preencha este campo</p>
                            <p id="qtdHoras" class="erro none">Valores válidos: 0 - 40</p>
                        </div>
                        <div class="mb-3">
                            <label for="mAvaliado" class="form-label fw-bold mb-0 titulo">Mês avaliado</label>
                            <input id="inputMes" name="mAvaliado" max="18" min="0" v-model="form.mesAvaliado" type="number" required class="form-control campo">
                            <p id="mesErro" class="erro none">Por favor, preencha este campo</p>
                            <p id="mesAval" class="erro none">Valores válidos: 0 - 18</p>
                        </div>
                        <div class="mb-3">
                            <label for="sAvaliada" class="form-label fw-bold mb-0 titulo">Semana avaliada</label>
                            <input id="inputSemana" name="sAvaliada" max="5" min="0" v-model="form.semanaAvaliada" type="number" required class="form-control campo">
                            <p id="semanaErro" class="erro none">Por favor, preencha este campo</p>
                            <p id="semAval" class="erro none">Valores válidos: 0 - 5</p>
                        </div>
                        <div class="mb-3">
                            <label for="dtRegistro" class="form-label fw-bold mb-0 titulo">Data do Registro</label>
                            <input id="inputData" name="dtRegistro"  v-model="form.dataRegistro" type="date" required class="form-control campo">
                            <p id="erroData" class="erro none">Por favor, preencha este campo</p>
                        </div>
                        <div class="mb-3">
                            <label for="hMinima" class="form-label fw-bold mb-0 titulo">Horas mínimas semanais</label>
                            <input name="hMinima" max="40" min="0" id="hMinima" v-model="form.hrMinSemana" type="number" required class="form-control campo">
                            <p id="ErroHoras" class="erro none">Por favor, preencha este campo</p>
                            <p id="hrMin" class="erro none">Valores válidos: 0 - 40</p>
                        </div>
                        <button type="button" @click="validaCampos()" class="btn btn-primary mt-2 fw-bold w-100 botao">REGISTRAR</button>
                    </form>
                    <p id="invisivel" v-on:click="postForm()"></p>
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
                                <tr v-for="(registro, index ) in registros" :key="registro"  >
                                    <th scope="row" class=" text-center titulo" id="info-id">{{++index}}</th>
                                    <td class="text-center campo-tabela">{{registro.mesAvaliado}}/{{registro.semanaAvaliada}}</td>
                                    <td class="text-center campo-tabela">{{this.formataDataParaMostrar(registro.dataRegistro)}}</td>
                                    <td @click="carregaModal(registro, index)"
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
                        <h2 class="modal-title fw-bold titulo" id="exampleModalLabel">Registro do acompanhamento: {{indiceModal}}</h2>
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
                            <p class="">{{this.formataDataParaMostrar(registroModal.dataRegistro)}}</p>
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
                            <p class="">{{registroModal.hrMinSemana}}</p>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="mb-4">
                            <h4 class="fw-bold titulo">Data do registro:</h4>
                            <p class="">{{this.formataDataParaMostrar(registroModal.dataRegistro)}}</p>
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
                            <button type="submit"  @click="deleteById(),deletarFormularioModal()" class="btn btn-primary mt-2 fw-bold w-100 botao" data-bs-dismiss="modal" >CONFIRMAR</button>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div>
                            <button type="submit" class="btn btn-primary mt-2 fw-bold w-100 botaocanc" data-bs-dismiss="modal" >CANCELAR</button>
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
                        <h3 class="modal-title fw-bold titulo text-center" id="exampleModalLabel">Formulário registrado com sucesso</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal de Exclusão -->
    <p class="none" id="abreModalInvisivelExclusao" data-bs-toggle="modal" data-bs-target="#modalConfirmacaoExclusao" ></p>
    <div class="modal fade mt-5"  id="modalConfirmacaoExclusao" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-size">
            <div class="modal-content p-5 grey-background">
                <div class="row mb-5">
                    <div class="col">
                        <h3 class="modal-title fw-bold titulo text-center" id="exampleModalLabelExclusao">Formulário excluído com sucesso</h3>
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
import { variavel } from '../../services/Variavel'

export default {
  name: 'App',
  components: {
    Header
  },
  data () {
    return {
      registros: [], // Lista de registro obtidos para popular a tabela.
      participante: {}, // Informações do participante
      id: {}, // cpf do participante
      registroModal: '', // é usado para mostrar o registro especifico que foi escolhido da tabela no modal.
      form: { // Objeto formulário para ser enviado ao Back-end.
        qtdHoras: '',
        mesAvaliado: '',
        semanaAvaliada: '',
        dataRegistro: '',
        hrMinSemana: ''
      },
      indiceModal: {} // função para gerar os indices no modal de acordo com a posição na tabela.
    }
  },

  beforeMount () {
    this.id = this.pegaDadosUrl().id
    this.getParticipanteNome()
    this.getAlura()
    Funcoes.verificaToken()
  },

  methods: {
    // faz o get no back-end e retorna as informações do participante
    getParticipanteNome () {
      http
        .get(`participante/${this.id}`)
        .then((response) => {
          this.participante = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    abrirModal () {
      document.getElementById('abreModalInvisivel').click()
    },
    abrirModalExclusao() {
      document.getElementById('abreModalInvisivelExclusao').click()
    },
    // requisição do tipo post para enviar as informações obtidas do formulário
    postForm () {
      http
        .post(`alura/novo/${this.id}`, this.form)
        .then((response) => {
          this.getAlura()
          document.querySelector('#aguarde').classList.add('none')
          document.querySelector('#enviado').classList.remove('none')
          setTimeout(function () {
            document.querySelector('#enviado').classList.add('none')
          }, 2000)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // Requisição para deletar um registro.
    deleteById () {
      http
        .delete(`alura/deletar/${this.registroModal.codigoAlura}`)
        .then((response) => {
          this.getAlura()
          document.querySelector('#deletado').classList.remove('none')
          setTimeout(function () {
            document.querySelector('#deletado').classList.add('none')
          }, 2000)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    deletarFormularioModal () {
        this.abrirModalExclusao()
        setTimeout(function () {
        document.location.reload(true)
         }, 1500)
},
    // requisição do tipo get para popular a tabela com os dados.
    getAlura () {
      http
        .get(`alura/${this.id}`)
        .then((response) => {
          this.registros = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    
    validaCampos () {
      var quantidadeHoras = document.getElementById('inputQuantidade').value
      var mesAvaliado = document.getElementById('inputMes').value
      var semanaAvaliada = document.getElementById('inputSemana').value
      var dataRegistro = document.getElementById('inputData').value
      var horasMinimasSemanais = document.getElementById('hMinima').value
      let erro = 0
      if (quantidadeHoras == '') {
        document.querySelector('#erroQuantidade').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroQuantidade').classList.add('none')
      }
      if (quantidadeHoras > 40 || quantidadeHoras < 0) {
        document.querySelector('#qtdHoras').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#qtdHoras').classList.add('none')
      }
      if (mesAvaliado == '') {
        document.querySelector('#mesErro').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#mesErro').classList.add('none')
      }
      if (mesAvaliado > 18 || mesAvaliado < 0) {
        document.querySelector('#mesAval').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#mesAval').classList.add('none')
      }
      if (semanaAvaliada == '') {
        document.querySelector('#semanaErro').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#semanaErro').classList.add('none')
      }
      if (semanaAvaliada > 5 || semanaAvaliada < 0) {
        document.querySelector('#semAval').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#semAval').classList.add('none')
      }
      if (dataRegistro == '') {
        document.querySelector('#erroData').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroData').classList.add('none')
      }
      if (horasMinimasSemanais == '') {
        document.querySelector('#ErroHoras').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#ErroHoras').classList.add('none')
      }
      if (horasMinimasSemanais > 40 || horasMinimasSemanais < 0) {
        document.querySelector('#hrMin').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#hrMin').classList.add('none')
      }
      if (erro == 1) {
        return false
      } else {
        this.abrirModal()
        setTimeout(function () {
            document.location.reload(true)
            }, 1500) 
        document.getElementById('invisivel').click()
      }
    },

    formataDataParaMostrar (data) {
      const dataPreForm = new Date(data)
      const dataFormatada = `${dataPreForm.getUTCDate()}/${dataPreForm.getUTCMonth() + 1}/${dataPreForm.getUTCFullYear()}`

      return dataFormatada
    },
    // função para pegar os dados da URL
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
    // abre modal com as informações corretas e com o indice correspondente.
    carregaModal (registro, index) {
      this.registroModal = registro
      this.indiceModal = index
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

.none {
    display: none;
}

.erro {
  color: red;
  font-weight: bold;
}

.enviado {
  color: green
}
</style>
