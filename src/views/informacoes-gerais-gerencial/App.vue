<template>
  <Header />
  <main>
      <section>
        <div class="container-custom">
          <h3 class="fw-bold">Informações gerais</h3>
          <div class="area-btns">
            <a href="/dados-participante-busca">
              <div class="btn-container participante">Participante</div>
            </a>
            <a href="/dados-instrutor-busca">
              <div class="btn-container instrutor">Instrutor</div>
            </a>
            <a href="/dados-programa-busca">
              <div class="btn-container programaDeFormacao">
                Programa <br />
                de <br />
                Formação
              </div>
            </a>
          </div>
        </div>
      </section>
  </main>
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
      responseStatus: ''
    }
  },
  beforeMount () {
    Funcoes.verificaToken()
  }
}
</script>

<style>
.container-custom {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.5em;
}

body {
  background-color: #ebebeb !important;
}

h2 {
  font-weight: bold;
  font-size: 22px;
  margin-bottom: 20px;
  color: #090b2e;
}

.area-btns {
  width: 80%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 20px;
}

.btn-container {
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

.btn-container:hover {
  box-shadow: 0px 0px 20px #5a5a5a;
}

.btn-container.participante {
  background: linear-gradient(45deg, #ab0045, #ec005f);
}

.btn-container.instrutor {
  background: linear-gradient(45deg, #c79007, #ffb600);
}

.btn-container.programaDeFormacao {
  background: linear-gradient(45deg, #090b2e, #1d2276);
}

@media (max-width: 960px){
    .area-btns{
        grid-template-columns: repeat(2,1fr);
    }
}

@media (max-width: 650px){
    .area-btns{
        grid-template-columns: repeat(1,1fr);
    }
}
</style>
