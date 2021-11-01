<template>
    <Header/>
    <main>
        <section>
            <div class="container">
                <h2> Participante selecionado: <span>{{ participante.nome }}</span></h2>
                <div class="area-btns">
                    <a :href="'../acompanhamento-alura?id=' + id"> <div class="btn-container alura"> Alura </div> </a>
                    <a :href="'../acompanhamento-feedback?id=' + id"> <div class="btn-container feedbacks"> Feedbacks </div> </a>
                    <a :href="'../acompanhamento-avaliacao?id=' + id"> <div class="btn-container avaliacoes"> Avaliações </div> </a>
                    <a :href="'../acompanhamento-ciclo?id=' + id"> <div class="btn-container conclusoes"> Conclusões </div> </a>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import Header from '@/components/Header.vue'
import Funcoes from '../../services/Funcoes'
import axios from 'axios'
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
      participante: {},
      id: {}
    }
  },

  beforeMount () {
    const dadosUrl = this.pegaDadosUrl()
    this.id = dadosUrl.id
    this.getParticipanteNome(dadosUrl.id)
    Funcoes.verificaToken()
  },

  methods: {
    getParticipanteNome (id) {
      axios
        .get(`http://localhost:8081/api/gerencial/${id}`)
        .then((response) => {
          this.participante = response.data
        })
        .catch((error) => {
          console.log(error)
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
  }
  
}
</script>

<style scoped>
.container{
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 1.5em;
}

h2{
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #090B2E;
}

h2 span{
    margin-left: 20px;
    color: #737373;
}

.area-btns{
    width:80%;
    display: grid;
    grid-template-columns: repeat(4,1fr);
    grid-row-gap: 20px;
}

.btn-container{
    height: 225px;
    width: 225px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 23px;
    font-weight: bold;
    text-align: center;
    transition: all linear 0.2s;
}

.btn-container:hover{
    box-shadow: 0px 0px 20px #5a5a5a;
}

.btn-container.alura{
    background: linear-gradient(45deg, #AB0045, #EC005F);
}

.alura{
    margin-right: 20px;
}

.btn-container.feedbacks{
    background: linear-gradient(45deg, #C79007, #FFB600);
}

.feedbacks{
    margin-right: 20px;
}

.btn-container.avaliacoes{
    background: linear-gradient(45deg, #090B2E, #1D2276);
}

.avaliacoes{
    margin-right: 20px;
}

.btn-container.conclusoes{
    background: linear-gradient(45deg, #0288BE, #00B6FF);
}

.conclusoes{
    margin-right: 20px;
}
</style>
