<template>
    <Header :link="`../acompanhamento-gerencial?id=${this.id}`"/>
    <main>
        <div class="container-fluid">

            <!-- LINHA SUPERIOR DA PÁG. (TÍTULO E PARTICIPANTE)-->
            <div class="row justify-content-evenly mt-5 mb-3">
                <div class="titulo col-lg-4">
                    <h3 class="fw-bold">Registrar notas das avaliações:</h3>
                </div>
                <div class="col-lg-7 d-flex justify-content-center align-items-center">
                    <div class="d-block justify-content-center">
                        <h4 class="fw-bold text-center titulo">Participante selecionado:</h4>
                        <h4 class="fw-bold grey-font text-center">{{participante.nome}}</h4>
                    </div>
                </div>
            </div>

            <!-- LINHA DE BAIXO (FORMULÁRIO, TABELA E BOTÕES) -->
            <div class="row justify-content-evenly">
                <div class="col-lg-4">
                    <form>
                        <div class="mb-3">
                            <label for="tecnica" class="form-label fw-bold h5 titulo">Técnica</label>
                            <input type="number" class="form-control" id="tecnicaNotas" v-model="form.notaTecnica" min="0" max="10">
                            <p id="erroTecnica" class="erro none">Preencha este campo</p>
                            <p id="erroNota" class="erro none">A nota deve ser entre 0 - 10</p>
                        </div>
                        <div class="mb-3">
                            <label for="praticas-ageis" class="form-label fw-bold h5 titulo">Módulo práticas ágeis</label>
                            <input type="number" class="form-control" id="praticas-ageis" v-model="form.notaPraticasAgeis" min="0.00" max="10.00">
                            <p id="erroPraticas" class="erro none">Preencha este campo</p>
                            <p id="erroNotaPratica" class="erro none">A nota deve ser entre 0 - 10</p>
                        </div>
                        <div class="mb-3">
                            <label for="lideranca" class="form-label fw-bold h5 titulo">Módulo liderança</label>
                            <input type="number" class="form-control" id="lideranca" v-model="form.notaLideranca" min="0" max="10">
                            <p id="erroLideranca" class="erro none">Preencha este campo</p>
                            <p id="erroNotaLideranca" class="erro none">A nota deve ser entre 0 - 10</p>
                        </div>
                        <div class="mb-3">
                            <label for="negocios" class="form-label fw-bold h5 titulo">Módulo negócios</label>
                            <input type="number" class="form-control" id="negocios" v-model="form.notaNegocios" step=".01" min="0" max="10">
                            <p id="erroNegocio" class="erro none">Preencha este campo</p>
                            <p id="erroNotaNegocio" class="erro none">A nota deve ser entre 0 - 10</p>
                        </div>
                        <div class="mb-3">
                            <label for="comportamental" class="form-label fw-bold h5 titulo" >Comportamental</label>
                            <div class="input-group mb-3">
                                <input type="number" disabled class="form-control" 
                                    id="comportamental" aria-label="Recipient's username" aria-describedby="basic-addon2" :value="getMedia().toFixed(2)">
                                <div class="input-group-append">
                                    <button class="btn btn-outline-secondary botao-adc" type="button" 
                                        data-bs-toggle="modal"
                                        data-bs-target="#modalComportamental">+</button>
                                </div>
                            </div>
                            <p id="erroComportamental" class="erro none">Não esqueça de preencher as notas comportamentais!</p>
                        </div>

                        <button type="button" 
                            class="btn btn-danger sis-red-btn mt-3 mb-1 fw-bold fs-5 w-100" @click="verificaForm()">REGISTRAR</button>
                        <p id="verificaCampos" class="none" @click="postForm()"></p>
                        <p id="populaForm" class="none" @click="getMedia().toFixed(2)"></p>
                        <p class="none h4 mt-3" id="aguarde">Enviando formulário, aguarde...</p>
                        <p class="none h4 enviado mt-3" id="enviado">Formulário enviado</p>
                    </form>
                </div>
                <div class="col-lg-7 d-flex flex-column align-items-end mb-3 div-tabela justify-content-between">
                    <table class="table table-bordered tabela">
                        <tbody>
                            <tr v-for="(avaliacao, index) in avaliacoes" v-bind:key="avaliacao">
                                <th scope="row" class="w-50px titulo">{{++index}}</th>
                                <td class="text-align-left">Técnica: {{avaliacao.notaTecnica}} | Ágeis {{avaliacao.notaPraticasAgeis}} | Liderança: {{avaliacao.notaLideranca}} | Negócios: {{avaliacao.notaNegocios}} | Comportamental: {{avaliacao.notaComportamental.media}}</td>
                                <td @click="carregaModal(avaliacao, index)" class="eye" width="37px" data-bs-toggle="modal" data-bs-target="#modalDeletar">
                                    <img src="@/assets/imgs/visibility_white_24dp.svg" class="eye-img">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </main>
    <!--  MODAIS  -->
    <div class="modal fade" id="modalDeletar" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-size">
            <div class="modal-content p-5 conteudoModal">
                <div class="row mb-5">
                    <div class="col">
                        <h2 class="modal-title fw-bold titulo" id="exampleModalLabel">Série de avaliações: {{indiceModal}}</h2>
                    </div>
                </div>
                <div class="row mb-5">
                    <div class="col-lg-6">
                        <div class="mb-4">
                            <h4 class="fw-bold titulo">Técnica:</h4>
                            <p class="grey-font h4">{{avaliacaoModal.notaTecnica}}</p>
                        </div>
                        <div class="mb-4">
                            <h4 class="fw-bold titulo">Comportamental:</h4>
                            <div>
                              <p class="grey-font h4 d-inline marginEye">{{modalDesempenho.media}}</p>
                              <button class="btn btn-outline-secondary botao-adc" type="button" 
                                        data-bs-toggle="modal"
                                        data-bs-target="#serievisu" @click="carregaModal(avaliacaoModal)"><img src="@/assets/imgs/visibility_white_24dp.svg"></button>
                            </div>
                        </div>
                      
                        <div class="mb-4">
                            <h4 class="fw-bold titulo">Módulo práticas ágeis:</h4>
                            <p class="grey-font h4">{{avaliacaoModal.notaPraticasAgeis}}</p>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="mb-4">
                            <h4 class="fw-bold titulo">Módulo liderança:</h4>
                            <p class="grey-font h4">{{avaliacaoModal.notaLideranca}}</p>
                        </div>
                        <div class="mb-4">
                            <h4 class="fw-bold titulo">Módulo negócios:</h4>
                            <p class="grey-font h4">{{avaliacaoModal.notaNegocios}}</p>
                        </div>
                    </div>
                </div>
                <div class="row mt-5">
                    <button type="submit" data-bs-toggle="modal" data-bs-target="#modalConfirme"
                            class="btn btn-danger sis-red-btn mt-3  fw-bold fs-5 w-50" >DELETAR SÉRIE</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modalConfirme" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-size grey-background">
            <div class="modal-content p-5 conteudoModal ">
                <div class="row mb-5">
                    <div class="col d-flex justify-content-center">
                        <h2 class="modal-title fw-bold titulo" id="exampleModalLabel">Deseja deletar o registro de avaliações?</h2>
                    </div>
                </div>
                <div class="row mb-5">
                    <div class="col-lg-6">
                        <div class="mb-4">
                            <h4 class="fw-bold titulo">Técnica:</h4>
                            <p class="grey-font h4">{{avaliacaoModal.notaTecnica}}</p>
                        </div>
                        <div class="mb-4">
                            <h4 class="fw-bold titulo">Comportamental:</h4>
                            <p class="grey-font h4">{{modalDesempenho.media}}</p>
                        </div>
                        <div class="mb-4">
                            <h4 class="fw-bold titulo">Módulo práticas ágeis:</h4>
                            <p class="grey-font h4">{{avaliacaoModal.notaPraticasAgeis}}</p>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="mb-4">
                            <h4 class="fw-bold titulo">Módulo liderança:</h4>
                            <p class="grey-font h4">{{avaliacaoModal.notaLideranca}}</p>
                        </div>
                        <div class="mb-4">
                            <h4 class="fw-bold titulo">Módulo negócios:</h4>
                            <p class="grey-font h4">{{avaliacaoModal.notaNegocios}}</p>
                        </div>
                    </div>
                </div>
                <div class="row mt-5">
                    <div class="col-lg-6">
                        <button type="submit"
                            class="btn btn-danger sis-red-btn mt-3 fw-bold fs-5 w-100" @click="deleteById(),deletarFormularioModal()" data-bs-dismiss="modal">CONFIRMAR</button>
                    </div>
                    <div class="col-lg-6">
                        <button type="submit" class="btn btn-warning sis-yellow-btn fw-bold fs-5 mt-3 w-100" data-bs-dismiss="modal">CANCELAR</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modalComportamental" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-size">
            <div class="modal-content p-5 conteudoModal scroll-modal">
                <div class="row mb-5">
                    <div class="col">
                        <h2 class="modal-title fw-bold titulo" id="exampleModalLabel">Teste de desempenho:</h2>
                    </div>
                </div>
                <div class="row mb-3">
                    <form class="col-lg-6">
                        <div class="comboBox w-100 mb-3" id="avaliacao-comportamental">
                            <label class="form-label fw-bold h5 titulo">Avaliação:</label>
                            <select class="form-select" id="avaliacaoModal" v-model="form.avaliacaoDesempenhoForm.avaliacao">
                                <option selected disabled value="0">Selecione uma avaliação</option>
                                <option :value="'FORAM_SUPERADAS'">Foram superadas</option>
                                <option :value="'FORAM_ATENDIDAS_PLENAMENTE'">Foram atendidas plenamente</option>
                                <option :value="'FORAM_ATENDIDAS_PARCIALMENTE'">Foram atendidas parcialmente</option>
                                <option :value="'NAO_FORAM_ATENDIDAS'">Não foram atendidas</option>
                            </select>
                            <p id="erroAvaliacao" class="erro none">Por favor, preencha este campo</p>
                        </div>
                        <div class="mb-3">
                            <label for="adaptacao" class="form-label fw-bold h5 titulo">Adaptação:</label>
                            <input type="number" class="form-control" id="adaptacaoModal" step=".01" min="0" max="4"
                                v-model="form.avaliacaoDesempenhoForm.adaptacao">
                                <p id="erroAdaptacao" class="erro none">Por favor, preencha este campo</p>
                                <p id="erroNotaAdaptacao" class="erro none">A nota deve ser entre 0 - 4</p>
                        </div>
                        <div class="mb-3">
                            <label for="tecnica" class="form-label fw-bold h5 titulo">Capacitação Técnica:</label>
                            <input type="number" class="form-control" id="tecnicaModal" step=".01" min="0" max="4"
                                v-model="form.avaliacaoDesempenhoForm.capTecnica">
                                <p id="erroCapacitacao" class="erro none">Por favor, preencha este campo</p>
                                <p id="erroNotaCapacitacao" class="erro none">A nota deve ser entre 0 - 4</p>
                        </div>
                        <div class="mb-3">
                            <label for="aprendizagem" class="form-label fw-bold h5 titulo">Aprendizagem prática:</label>
                            <input type="number" class="form-control" id="aprendizagemModal" step=".01" min="0" max="4"
                                v-model="form.avaliacaoDesempenhoForm.apPratica">
                                <p id="erroAprendizagem" class="erro none">Por favor, preencha este campo</p>
                                <p id="erroNotaAprendizagem" class="erro none">A nota deve ser entre 0 - 4</p>
                        </div>
                        <div class="mb-3">
                            <label for="cooperacao" class="form-label fw-bold h5 titulo">Cooperação:</label>
                            <input type="number" class="form-control" id="cooperacaoModal" step=".01" min="0" max="4"
                                v-model="form.avaliacaoDesempenhoForm.cooperacao">
                                <p id="erroCooperacao" class="erro none">Por favor, preencha este campo</p>
                                <p id="erroNotaCooperacao" class="erro none">A nota deve ser entre 0 - 4</p>
                        </div>
                        <div class="mb-3">
                            <label for="disciplina" class="form-label fw-bold h5 titulo">Disciplina</label>
                            <input type="number" class="form-control" id="disciplinaModal" step=".01" min="0" max="4"
                                v-model="form.avaliacaoDesempenhoForm.disciplina">
                                <p id="erroDisciplina" class="erro none">Por favor, preencha este campo</p>
                                <p id="erroNotaDisciplina" class="erro none">A nota deve ser entre 0 - 4</p>
                        </div>
                        <div class="mb-3">
                            <label for="responsabilidade" class="form-label fw-bold h5 titulo">Responsabilidade:</label>
                            <input type="number" class="form-control" id="responsabilidadeModal" step=".01" min="0" max="4"
                                v-model="form.avaliacaoDesempenhoForm.responsabilidade">
                                <p id="erroResponsabilidade" class="erro none">Por favor, preencha este campo</p>
                                <p id="erroNotaResponsabilidade" class="erro none">A nota deve ser entre 0 - 4</p>
                        </div>
                    </form>
                    <form class="col-lg-6">
                        <div class="comboBox w-100 mb-3" id="parecer">
                            <label class="form-label fw-bold h5 titulo">Parecer:</label>
                            <select class="form-select" id="filtro-parecer" v-model="form.avaliacaoDesempenhoForm.parecer">
                                <option disabled selected value="0">Selecione um status</option>
                                <option :value="'APROVADO'">Aprovado</option>
                                <option :value="'REPROVADO'">Reprovado</option>
                            </select>
                            <p id="erroParecer" class="erro none">Por favor, preencha este campo</p>
                        </div>
                        <div class="mb-3">
                            <label for="qualidade" class="form-label fw-bold h5 titulo">Qualidade:</label>
                            <input type="number" class="form-control" id="qualidadeModal" step=".01" min="0" max="4"
                                v-model="form.avaliacaoDesempenhoForm.qualidade">
                                <p id="erroQualidade" class="erro none">Por favor, preencha este campo</p>
                                <p id="erroNotaQualidade" class="erro none">A nota deve ser entre 0 - 4</p>
                        </div>
                        <div class="mb-3">
                            <label for="comunicabilidade" class="form-label fw-bold h5 titulo">Comunicabilidade:</label>
                            <input type="number" class="form-control" id="comunicabilidadeModal" step=".01" min="0" max="4"
                                v-model="form.avaliacaoDesempenhoForm.comunicabilidade">
                                <p id="erroComunicabilidade" class="erro none">Por favor, preencha este campo</p>
                                <p id="erroNotaComunicabilidade" class="erro none">A nota deve ser entre 0 - 4</p>
                        </div>
                        <div class="mb-3">
                            <label for="dedicacao" class="form-label fw-bold h5 titulo">Dedicação:</label>
                            <input type="number" class="form-control" id="dedicacaoModal" step=".01" min="0" max="4"
                                v-model="form.avaliacaoDesempenhoForm.dedicacao">
                                <p id="erroDedicacao" class="erro none">Por favor, preencha este campo</p>
                                <p id="erroNotaDedicacao" class="erro none">A nota deve ser entre 0 - 4</p>
                        </div>
                        <div class="mb-3">
                            <label for="iniciativa" class="form-label fw-bold h5 titulo">Iniciativa:</label>
                            <input type="number" class="form-control" id="iniciativaModal" step=".01" min="0" max="4"
                                v-model="form.avaliacaoDesempenhoForm.iniciativa">
                                <p id="erroIniciativa" class="erro none">Por favor, preencha este campo</p>
                                <p id="erroNotaIniciativa" class="erro none">A nota deve ser entre 0 - 4</p>
                        </div>
                        <div class="mb-3">
                            <label for="organizacao" class="form-label fw-bold h5 titulo">Organização:</label>
                            <input type="number" class="form-control" id="organizacaoModal" step=".01" min="0" max="4"
                                v-model="form.avaliacaoDesempenhoForm.organizacao">
                                <p id="erroOrganizacao" class="erro none">Por favor, preencha este campo</p>
                                <p id="erroNotaOrganizacao" class="erro none">A nota deve ser entre 0 - 4</p>
                        </div>
                        <div class="mb-3">
                            <label for="sociabilidade" class="form-label fw-bold h5 titulo">Sociabilidade:</label>
                            <input type="number" class="form-control" id="sociabilidadeModal" step=".01" min="0" max="4"
                                v-model="form.avaliacaoDesempenhoForm.sociabilidade">
                                <p id="ErroSociabilidade" class="erro none">Por favor, preencha este campo</p>
                                <p id="ErroNotaSociabilidade" class="erro none">A nota deve ser entre 0 - 4</p>
                        </div>
                    </form>
                </div>
                <div class="row d-flex">
                    <div class="col-lg-6">
                        <button  type="button" class="btn btn-danger sis-red-btn fw-bold fs-5 mt-3 w-100" @click="verificaForm()" >CONFIRMAR</button>
                        <p data-bs-toggle="modal" id="fechaModal" class="none"></p>
                    </div>
                    <div class="col-lg-6">
                        <button type="button" data-bs-toggle="modal" class="btn btn-warning sis-yellow-btn fw-bold fs-5 mt-3 w-100">CANCELAR</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

<!-- MODAL VISUALIZACAO-->
    <div class="modal fade" id="serievisu" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-size">
            <div class="modal-content p-5 conteudoModal scroll-modal">
                <div class="row mb-5">
                    <div class="col">
                        <h2 class="modal-title fw-bold titulo" id="exampleModalLabel">Teste de desempenho:</h2>
                    </div>
                </div>
                <div class="row mb-3">
                    <form class="col-lg-6">
                        <div class="comboBox w-100 mb-3" id="avaliacao-comportamental">
                            <label class="form-label fw-bold h5 titulo">Avaliação: {{modalDesempenho.avaliacao}}</label>
                        <!-- <label class="form-label fw-bold h5 titulo">Avaliação: {{modalDesempenho.avaliacao.replaceAll('_',' ').tolowerCase().toUpperCase(modalDesempenho.avaliacao[0])}}</label> -->
                        </div>
                        <div class="mb-3">
                            <label for="adaptacao" class="form-label fw-bold h5 titulo">Nota Adaptação: {{ modalDesempenho.adaptacao}}</label>
                        </div>
                        <div class="mb-3">
                            <label for="tecnica" class="form-label fw-bold h5 titulo">Nota Capacitação Técnica: {{ modalDesempenho.capTecnica }}</label>
                        </div>
                        <div class="mb-3">
                            <label for="aprendizagem" class="form-label fw-bold h5 titulo">Nota Aprendizagem Prática: {{modalDesempenho.apPratica}}</label>
                        </div>
                        <div class="mb-3">
                            <label for="cooperacao" class="form-label fw-bold h5 titulo">Cooperação: {{modalDesempenho.cooperacao}}</label>
                        </div>
                        <div class="mb-3">
                            <label for="disciplina" class="form-label fw-bold h5 titulo">Disciplina: {{modalDesempenho.disciplina}}</label>
                        </div>
                        <div class="mb-3">
                            <label for="responsabilidade" class="form-label fw-bold h5 titulo">Responsabilidade: {{modalDesempenho.responsabilidade}}</label>
                        </div>
                    </form>
                    <form class="col-lg-6">
                        <div class="comboBox w-100 mb-3" id="parecer">
                        <label class="form-label fw-bold h5 titulo">Parecer: {{modalDesempenho.parecer}} </label>
                        </div>
                        <div class="mb-3">
                            <label for="qualidade" class="form-label fw-bold h5 titulo">Qualidade: {{modalDesempenho.qualidade}}</label>
                        </div>
                        <div class="mb-3">
                            <label for="comunicabilidade" class="form-label fw-bold h5 titulo">Comunicabilidade: {{modalDesempenho.comunicabilidade}}</label>
                        </div>
                        <div class="mb-3">
                            <label for="dedicacao" class="form-label fw-bold h5 titulo">Dedicação: {{modalDesempenho.dedicacao}}</label>
                        </div>
                        <div class="mb-3">
                            <label for="iniciativa" class="form-label fw-bold h5 titulo">Iniciativa: {{modalDesempenho.iniciativa}}</label>
                        </div>
                        <div class="mb-3">
                            <label for="organizacao" class="form-label fw-bold h5 titulo">Organização: {{modalDesempenho.organizacao}}</label>
                        </div>
                        <div class="mb-3">
                            <label for="sociabilidade" class="form-label fw-bold h5 titulo">Sociabilidade: {{modalDesempenho.sociabilidade}}</label>
                        </div>
                    </form>
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

export default {
  name: 'App',
  components: {
    Header
  },
  data () {
    return {
      avaliacoes: [], // Array de avaliações, que é populado com o getAvaliações.
      avaliacaoModal: '', // objeto que é usado para popular os campos do modal.
      participante: {}, // objeto para salvar as informações do participante.
      id: {},
      media: {}, // media das notas do modal, que origina a nota Comportamental.
      form: { // objeto para usar no Body para enviar as requisições. 
        notaTecnica: '',
        notaPraticasAgeis: '',
        notaLideranca: '',
        notaNegocios: '',
        avaliacaoDesempenhoForm: {
          avaliacao: '',
          parecer: '',
          adaptacao: '',
          qualidade: '',
          capTecnica: '',
          comunicabilidade: '',
          apPratica: '',
          dedicacao: '',
          cooperacao: '',
          iniciativa: '',
          disciplina: '',
          organizacao: '',
          responsabilidade: '',
          sociabilidade: ''
        }
      },
      indiceModal: {}, // função para gerar os indices no modal de acordo com a posição na tabela.
      modalDesempenho: {} // // é usado para mostrar o registro especifico que foi escolhido da tabela no modal.
    }
  },

  beforeMount () {
    Funcoes.verificaToken()
    this.id = this.pegaDadosUrl().id
    this.getParticipanteNome()
    this.getAvaliacao()
  },

  methods: {
    carregaModal (avaliacao, index) {
      this.avaliacaoModal = avaliacao
      this.indiceModal = index
      this.modalDesempenho = this.avaliacaoModal.notaComportamental
    },
    abrirModal () {
      document.getElementById('abreModalInvisivel').click()
    },
    abrirModalExclusao () {
      document.getElementById('abreModalInvisivelExclusao').click()
    },
    // é usada para capturar as informações na url para ser passada nas requisições
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
    // faz o get no back-end para rertornar as informações do participante.
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
    // faz o get no back-end para exibir as notas anteriores do participante.
    getAvaliacao () {
      http
        .get(`avaliacao/${this.id}`)
        .then((response) => {
          this.avaliacoes = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // requisição do tipo post para enviar as informações obtidas do formulário
    postForm () {
      http
        .post(`avaliacao/novo/${this.id}`, this.form)
        .then((response) => {
          this.getAvaliacao()
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
        .delete(`avaliacao/deletar/${this.avaliacaoModal.id}`)
        .then((response) => {
          this.getAvaliacao()
          document.querySelector('#deletado').classList.remove('none')
          setTimeout(function () {
            document.querySelector('#deletado').classList.add('none')
          }, 1500)
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
    // função para gerar a média dos campos do modal, para exibir a nota comportamental no formulario
    getMedia () {
      this.media = (this.form.avaliacaoDesempenhoForm.qualidade + 
        this.form.avaliacaoDesempenhoForm.adaptacao +
        this.form.avaliacaoDesempenhoForm.capTecnica +
        this.form.avaliacaoDesempenhoForm.comunicabilidade + 
        this.form.avaliacaoDesempenhoForm.apPratica +
        this.form.avaliacaoDesempenhoForm.dedicacao +
        this.form.avaliacaoDesempenhoForm.cooperacao +
        this.form.avaliacaoDesempenhoForm.iniciativa +
        this.form.avaliacaoDesempenhoForm.disciplina + 
        this.form.avaliacaoDesempenhoForm.organizacao +
        this.form.avaliacaoDesempenhoForm.responsabilidade +
        this.form.avaliacaoDesempenhoForm.sociabilidade) / 12
      return this.media
    },
    // verifica os campos do formulário, caso tenha algum vazio um paragrafo aparece para notificar.  
    // função para ver se existe campo vazio no formulário
    verificaForm () {
      let notaTecnica = document.querySelector('#tecnicaNotas').value
      let notaPratica = document.querySelector('#praticas-ageis').value
      let notaLideranca = document.querySelector('#lideranca').value
      let notaNegocio = document.querySelector('#negocios').value
      let avaliacao = document.querySelector('#avaliacaoModal').value
      let adaptacao = document.querySelector('#adaptacaoModal').value
      let capacitacaoTecnica = document.querySelector('#tecnicaModal').value
      let aprendizagemPratica = document.querySelector('#aprendizagemModal').value
      let parecer = document.querySelector('#filtro-parecer').value
      let qualidade = document.querySelector('#qualidadeModal').value
      let comunicabilidade = document.querySelector('#comunicabilidadeModal').value
      let dedicacao = document.querySelector('#dedicacaoModal').value
      let cooperacao = document.querySelector('#cooperacaoModal').value
      let disciplina = document.querySelector('#disciplinaModal').value
      let responsabilidade = document.querySelector('#responsabilidadeModal').value
      let iniciativa = document.querySelector('#iniciativaModal').value
      let organizacao = document.querySelector('#organizacaoModal').value
      let sociabilidade = document.querySelector('#sociabilidadeModal').value
      let erro = 0
      document.getElementById('erroComportamental').classList.remove('none')
      if (notaTecnica == '') {
        document.querySelector('#erroTecnica').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroTecnica').classList.add('none')
      }
      if (notaTecnica < 0 || notaTecnica > 10) {
        document.querySelector('#erroNota').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroNota').classList.add('none')
      }
      if (notaPratica == '') {
        document.querySelector('#erroPraticas').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroPraticas').classList.add('none')
      }
      if (notaPratica < 0 || notaPratica > 10) {
        document.querySelector('#erroNotaPratica').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroNotaPratica').classList.add('none')
      }
      if (notaLideranca == '') {
        document.querySelector('#erroLideranca').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroLideranca').classList.add('none')
      }
      if (notaLideranca < 0 || notaLideranca > 10) {
        document.querySelector('#erroNotaLideranca').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroNotaLideranca').classList.add('none')
      }
      if (notaNegocio == '') {
        document.querySelector('#erroNegocio').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroNegocio').classList.add('none')
      }
      if (notaNegocio < 0 || notaNegocio > 10) {
        document.querySelector('#erroNotaNegocio').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroNotaNegocio').classList.add('none')
      }
      if (avaliacao == 0) {
        document.querySelector('#erroAvaliacao').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroAvaliacao').classList.add('none')
      }
      if (adaptacao == '') {
        document.querySelector('#erroAdaptacao').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroAdaptacao').classList.add('none')
      }
      if (adaptacao < 0 || adaptacao > 4) {
        document.querySelector('#erroNotaAdaptacao').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroNotaAdaptacao').classList.add('none')
      }
      if (capacitacaoTecnica == '') {
        document.querySelector('#erroCapacitacao').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroCapacitacao').classList.add('none')
      }
      if (capacitacaoTecnica < 0 || capacitacaoTecnica > 4) {
        document.querySelector('#erroNotaCapacitacao').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroNotaCapacitacao').classList.add('none')
      }
      if (aprendizagemPratica == '') {
        document.querySelector('#erroAprendizagem').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroAprendizagem').classList.add('none')
      }
      if (aprendizagemPratica < 0 || aprendizagemPratica > 4) {
        document.querySelector('#erroNotaAprendizagem').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroNotaAprendizagem').classList.add('none')
      }
      if (parecer == 0) {
        document.querySelector('#erroParecer').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroParecer').classList.add('none')
      }
      if (qualidade == '') {
        document.querySelector('#erroQualidade').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroQualidade').classList.add('none')
      }
      if (qualidade < 0 || qualidade > 4) {
        document.querySelector('#erroNotaQualidade').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroNotaQualidade').classList.add('none')
      }
      if (comunicabilidade == '') {
        document.querySelector('#erroComunicabilidade').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroComunicabilidade').classList.add('none')
      }
      if (comunicabilidade < 0 || comunicabilidade > 4) {
        document.querySelector('#erroNotaComunicabilidade').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroNotaComunicabilidade').classList.add('none')
      }
      if (dedicacao == '') {
        document.querySelector('#erroDedicacao').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroDedicacao').classList.add('none')
      }
      if (dedicacao < 0 || dedicacao > 4) {
        document.querySelector('#erroNotaDedicacao').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroNotaDedicacao').classList.add('none')
      }
      if (cooperacao == '') {
        document.querySelector('#erroCooperacao').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroCooperacao').classList.add('none')
      }
      if (cooperacao < 0 || cooperacao > 4) {
        document.querySelector('#erroNotaCooperacao').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroNotaCooperacao').classList.add('none')
      }
      if (disciplina == '') {
        document.querySelector('#erroDisciplina').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroDisciplina').classList.add('none')
      }
      if (disciplina < 0 || disciplina > 4) {
        document.querySelector('#erroNotaDisciplina').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroNotaDisciplina').classList.add('none')
      }
      if (responsabilidade == '') {
        document.querySelector('#erroResponsabilidade').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroResponsabilidade').classList.add('none')
      }
      if (responsabilidade < 0 || responsabilidade > 4) {
        document.querySelector('#erroNotaResponsabilidade').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroNotaResponsabilidade').classList.add('none')
      }
      if (iniciativa == '') {
        document.querySelector('#erroIniciativa').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroIniciativa').classList.add('none')
      }
      if (iniciativa < 0 || iniciativa > 4) {
        document.querySelector('#erroNotaIniciativa').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroNotaIniciativa').classList.add('none')
      }
      if (organizacao == '') {
        document.querySelector('#erroOrganizacao').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroOrganizacao').classList.add('none')
      }
      if (organizacao < 0 || organizacao > 4) {
        document.querySelector('#erroNotaOrganizacao').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroNotaOrganizacao').classList.add('none')
      }
      if (sociabilidade == '') {
        document.querySelector('#erroSociabilidade').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroSociabilidade').classList.add('none')
      }
      if (sociabilidade < 0 || sociabilidade > 4) {
        document.querySelector('#erroNotaSociabilidade').classList.remove('none')
        erro = 1
      } else {
        document.querySelector('#erroNotaSociabilidade').classList.add('none')
      }
      if (erro == 1) {
        return false
      } else if (erro == 0) {
        document.getElementById('erroComportamental').classList.add('none')
        document.getElementById('populaForm').click()
        document.getElementById('abreModalInvisivel').click()
        document.getElementById('verificaCampos').click()
        setTimeout(function () {
          document.location.reload(true)
        }, 1500) 
      }
    }
  }
}
</script>

<style scoped>
/* body {
    background-color: #EBEBEB !important;
} */

.erro {
    color: red;
    font-weight: bold;
}

.none{
    display: none;
}

.grey-background {
    background-color: #EBEBEB;
}

.container{
    width: 100%;
    height: 100%;
    display: flex;
    padding: 1.5em;
}

.div-tabela {
    height: 425px;
}

.tabela{
    text-align: center;
    background-color: white;
    width: 100%;
    line-height: 1.3rem;
    color: #666666 !important;
    font-weight: 500;
    vertical-align: middle !important;
}

.tabela td, .tabela th {
    border: 1px solid #bcb3b3 !important;
}

.w-10 {
    width: 10%;
}

.w-50px {
    width: 50px;
}

/* main */

.perfil-img {
    height: 80px;
    border-radius: 50%;
    margin-left: 20px;
}

.grey-font {
    color:  #737373;
}

.radio-item {
  display: inline-block;
  position: relative;
  padding: 0 6px;

}

.radio-item input[type='radio'] {
  display: none;
}

.radio-item label {
  color: #090B2E;
  font-weight: normal;
}

.radio-item label:before {
  content: " ";
  display: inline-block;
  position: relative;
  top: 5px;
  margin: 0 5px 0 0;
  width: 20px;
  height: 20px;
  border-radius: 3px;
  border: 1px solid #666;
  background-color: white;
}

.radio-item label:hover {
    cursor: pointer;
}

.botao-adc {
  font-size: 2em;
  line-height: .75!important;
  background: #FFB700;
  color: #444444
}

.radio-item input[type=radio]:checked + label:after {
  border-radius: 0;
  width: 0;
  height: 0;
  position: absolute;
  top: -5px;
  left: 9px;
  content: "x";
  font-size: 25px;
  font-weight: 500;
  display: block;
}

.btn-file {
    background: #fff;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    color: #737373;
    font-weight: 400 !important;
    cursor: pointer;
    font-weight: bold;
    padding: .375rem .75rem;
    width: 100%;
    height: 38px;
}

.upload-img {
    vertical-align: top; padding-top: 3px; margin-right: 1em;
    width: 13px
}

.ellipsis-overflow {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.scroll-modal {
    overflow-y: scroll;
    max-height: 500px;
}

.clear-file {
    width: 24px;
    text-align: right;
    font-weight: 500;
    border-radius: 50%;
    color: red;
}

.none {
    display: none;
}

.h-198px {
    height: 198px;
}

.sis-red-btn {
    background-color: #AB0045 !important;
    transition:  300ms;
}

.sis-red-btn:hover {
    background-color: #9a0045 !important;
}

.sis-yellow-btn {
    background-color: #FFB700 !important;
    transition: 300ms;
    color: white !important;
}

.sis-yellow-btn:hover {
    background-color: #DD9700 !important;
}

.relative {
    position: relative;
}

.eye {
    padding: 5px !important;
    background-color: #FFB700 !important;
    cursor: pointer;
}

.eye-img {
    width: 1.5em !important;
}

.modal-size {
    width: 1080px !important;
    max-width: 1080px !important;
}

.font-red {
    color: #dc3545;
}

.text-align-left {
    text-align: left;
}

.titulo{
    color: #090B2E;
}

.conteudoModal{
    background-color: #EBEBEB !important;
}

.marginEye {
  margin-right: 157px;
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
