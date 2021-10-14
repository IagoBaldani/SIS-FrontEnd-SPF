<template>
    <Header/>
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
                        <h4 class="fw-bold grey-font text-center">João da Silva Almeida</h4>
                    </div>
                    <img src="../../assets/imgs/perfil.svg" class="perfil-img" />
                </div>
            </div>

            <!-- LINHA DE BAIXO (FORMULÁRIO, TABELA E BOTÕES) -->
            <div class="row justify-content-evenly">
                <div class="col-lg-4">
                    <form>
                        <div class="mb-3">
                            <label for="tecnica" class="form-label fw-bold h5 titulo">Técnica</label>
                            <input type="text" class="form-control" id="tecnica" placeholder="10">
                        </div>
                        <div class="mb-3">
                            <label for="comportamental" class="form-label fw-bold h5 titulo">Comportamental</label>
                            <input type="text" class="form-control" id="comportamental" placeholder="10">
                        </div>
                        <div class="mb-3">
                            <label for="praticas-ageis" class="form-label fw-bold h5 titulo">Módulo práticas ágeis</label>
                            <input type="text" class="form-control" id="praticas-ageis" placeholder="10">
                        </div>
                        <div class="mb-3">
                            <label for="lideranca" class="form-label fw-bold h5 titulo">Módulo liderança</label>
                            <input type="text" class="form-control" id="lideranca" placeholder="10">
                        </div>
                        <div class="mb-3">
                            <label for="negocios" class="form-label fw-bold h5 titulo">Módulo negócios</label>
                            <input type="text" class="form-control" id="negocios" placeholder="10">
                        </div>

                        <button type="submit"
                            class="btn btn-danger sis-red-btn mt-5 mb-5 fw-bold fs-5 w-100">REGISTRAR</button>
                    </form>
                </div>
                <div class="col-lg-7 d-flex flex-column align-items-end mb-3 div-tabela justify-content-between">


                    <table class="table table-bordered tabela">
                        
                        <tbody>
                            <tr v-for="avaliacao in avaliacoes" v-bind:key="avaliacao">
                                <th scope="row" class="w-50px titulo">{{avaliacao.id}}</th>
                                <td class="text-align-left">{{avaliacao.tecnica}} / {{avaliacao.comportamental}} / {{avaliacao.moduloAgeis}} / {{avaliacao.lideranca}} / {{avaliacao.negocios}}</td>
                                <td @click="carregaModal(avaliacao)" class="eye" width="37px" data-bs-toggle="modal" data-bs-target="#modalDeletar">
                                    <img src="../../assets/imgs/visibility_white_24dp.svg" class="eye-img">
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
                        <h2 class="modal-title fw-bold titulo" id="exampleModalLabel">Série de avaliações: {{avaliacaoModal.id}}</h2>
                    </div>
                </div>
                <div class="row mb-5">
                    <div class="col-lg-6">
                        <div class="mb-4">
                            <h4 class="fw-bold titulo">Técnica:</h4>
                            <p class="grey-font h4">{{avaliacaoModal.tecnica}}</p>
                        </div>
                        <div class="mb-4">
                            <h4 class="fw-bold titulo">Comportamental:</h4>
                            <p class="grey-font h4">{{avaliacaoModal.comportamental}}</p>
                        </div>
                        <div class="mb-4">
                            <h4 class="fw-bold titulo">Módulo práticas ágeis:</h4>
                            <p class="grey-font h4">{{avaliacaoModal.moduloAgeis}}</p>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="mb-4">
                            <h4 class="fw-bold titulo">Módulo liderança:</h4>
                            <p class="grey-font h4">{{avaliacaoModal.lideranca}}</p>
                        </div>
                        <div class="mb-4">
                            <h4 class="fw-bold titulo">Módulo negócios:</h4>
                            <p class="grey-font h4">{{avaliacaoModal.negocios}}</p>
                        </div>
                    </div>
                </div>
                <div class="row mt-5">
                    <button type="submit" data-bs-toggle="modal" data-bs-target="#modalConfirme"
                            class="btn btn-danger sis-red-btn mt-3  fw-bold fs-5 w-50">DELETAR SÉRIE</button>
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
                            <p class="grey-font h4">{{avaliacaoModal.tecnica}}</p>
                        </div>
                        <div class="mb-4">
                            <h4 class="fw-bold titulo">Comportamental:</h4>
                            <p class="grey-font h4">{{avaliacaoModal.comportamental}}</p>
                        </div>
                        <div class="mb-4">
                            <h4 class="fw-bold titulo">Módulo práticas ágeis:</h4>
                            <p class="grey-font h4">{{avaliacaoModal.moduloAgeis}}</p>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="mb-4">
                            <h4 class="fw-bold titulo">Módulo liderança:</h4>
                            <p class="grey-font h4">{{avaliacaoModal.lideranca}}</p>
                        </div>
                        <div class="mb-4">
                            <h4 class="fw-bold titulo">Módulo negócios:</h4>
                            <p class="grey-font h4">{{avaliacaoModal.negocios}}</p>
                        </div>
                    </div>
                </div>
                <div class="row mt-5">
                    <div class="col-lg-6">
                        <button type="submit" 
                            class="btn btn-danger sis-red-btn mt-3 fw-bold fs-5 w-100">CONFIRMAR</button>
                    </div>
                    <div class="col-lg-6">
                        <button type="submit" class="btn btn-warning sis-yellow-btn fw-bold fs-5 mt-3 w-100">CANCELAR</button>
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
    data() {
        return {
            avaliacoes: [
                {
                    id: 1,
                    tecnica: 10,
                    comportamental: 9,
                    moduloAgeis: 8.5,
                    lideranca: 9.5,
                    negocios:10
                },
                {
                    id: 2,
                    tecnica: 9,
                    comportamental: 3,
                    moduloAgeis: 2,
                    lideranca: 7,
                    negocios: 6
                },
                {
                    id: 3,
                    tecnica: 2.5,
                    comportamental: 10,
                    moduloAgeis: 7,
                    lideranca: 7,
                    negocios: 7
                },
            ],
            avaliacaoModal: ''
        }
    },
    methods: {
        carregaModal(avaliacao) {
            this.avaliacaoModal = avaliacao;
        }
    }
}
</script>

<style scoped>
/* body {
    background-color: #EBEBEB !important;
} */

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
    border: solid 2px #000000;
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
    width: 32px;
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
</style>