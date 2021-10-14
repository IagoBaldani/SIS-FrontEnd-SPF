<template>
  <Header/>
  <main>
    <section>
      <div class="container">
        <div class="area-btns">
          <a href="/informacoes-gerais-gerencial">
            <div class="btn-container">
              <div class="icon-btn-container info">
                <img src="@/assets/imgs/account_box_white_24dp.svg" />
              </div>
              <div class="txt-btn-container info">
                Informações <br />
                Gerais
              </div>
            </div>
          </a>
          <a href="">
            <div class="btn-container">
              <div class="icon-btn-container acompanhamento">
                <img src="@/assets/imgs/preview_white_24dp.svg" />
              </div>
              <div class="txt-btn-container acompanhamento">Acompanhamento</div>
            </div>
          </a>
          <a href="">
            <div class="btn-container">
              <div class="icon-btn-container relatorios">
                <img src="@/assets/imgs/assessment_white_24dp.svg" />
              </div>
              <div class="txt-btn-container relatorios">Relatórios</div>
            </div>
          </a>
          <a href="">
            <div class="btn-container">
              <div class="icon-btn-container investimentos">
                <img src="@/assets/imgs/payments_white_24dp.svg" />
              </div>
              <div class="txt-btn-container investimentos">Investimentos</div>
            </div>
          </a>
          <a href="">
            <div class="btn-container">
              <div class="icon-btn-container processoSeletivo">
                <img src="@/assets/imgs/group_add_white_24dp.svg" />
              </div>
              <div class="txt-btn-container processoSeletivo">
                Processos <br />
                seletivos
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style>

.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.5em;
}

body {
  background-color: #ebebeb !important;
}

h2 {
  font-size: 22px;
  margin-bottom: 20px;
}

.area-btns {
  width: 85%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 20px;
}

.btn-container {
  height: 240px;
  width: 240px;
  display: flex;
  flex-direction: column;
  color: white;
  font-size: 23px;
  font-weight: bold;
  text-align: center;
  border-radius: 20px;
  transition: all linear 0.2s;
  margin: 0px 30px 0px 0px;
}

.btn-container:hover {
  box-shadow: 0px 0px 20px #5a5a5a;
}

.icon-btn-container,
.txt-btn-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-btn-container img {
  width: 50px;
}

.icon-btn-container {
  height: 35%;
  width: 100%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.txt-btn-container {
  height: 65%;
  width: 100%;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}

.icon-btn-container.info,
.icon-btn-container.processoSeletivo {
  background-color: #aa0045;
}
.txt-btn-container.info,
.txt-btn-container.processoSeletivo {
  background: linear-gradient(45deg, #ab0045, #ec005f);
}

.icon-btn-container.acompanhamento {
  background-color: #ffb600;
}
.txt-btn-container.acompanhamento {
  background: linear-gradient(45deg, #c79007, #ffb600);
}

.icon-btn-container.relatorios {
  background-color: #090b2e;
}
.txt-btn-container.relatorios {
  background: linear-gradient(45deg, #090b2e, #1d2276);
}

.icon-btn-container.investimentos {
  background-color: #00b6ff;
}
.txt-btn-container.investimentos {
  background: linear-gradient(45deg, #0288be, #00b6ff);
}

@media (max-width: 1300px) {
  .area-btns {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 960px) {
  .area-btns {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 650px) {
  .area-btns {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
