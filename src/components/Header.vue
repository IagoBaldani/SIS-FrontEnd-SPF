<template>
  <header>
    <div class="header">
      <a href="/home">
        <div class="home btn-header">
          <img src="@/assets/imgs/home_white_24dp.svg" />
        </div>
      </a>

      <div class="logo">
        <img src="@/assets/imgs/LOGO_SIS_2.png" />
      </div>

      <a href="javascript:history.back()">
        <div class="rollback btn-header">
          <img src="@/assets/imgs/arrow_back_white_24dp.svg" />
        </div>
      </a>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
header {
  margin-bottom: 30px;
}

.header {
  background-color: #090b2e;
  height: 75px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.btn-header {
  height: 75px;
  width: 75px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-header img,
.logo img {
  height: 50px;
}

.home.btn-header {
  background-color: #ffb700;
}

.rollback.btn-header {
  background-color: #ab0045;
}
</style>
