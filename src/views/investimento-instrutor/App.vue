<template>
  <Header />
  <div class="container">
    <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
      <div class="col-xl-4">
        <div>
          <a class="btn mt-4" href="/investimento-folha" id="botaoFolha" role="button">FOLHA</a>
          <a
            class="btn mt-4"
            id="botaoInstrutor"
            role="button"
            >INSTRUTOR</a
          >
        </div>
      </div>
      <div class="col-xl-2">
        <div>
          <div class="form-group mt-4">
            <select class="form-control" id="filtro-programa">
              <option disabled selected value="0">Formação</option>
              <option
                id="programa"
                v-bind:value="programa.id"
                v-for="programa in programas"
                v-bind:key="programa"
              >
                {{ programa.nome }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="col-xl-2">
        <div>
          <div class="form-group mt-4">
            <select class="form-control" id="filtro-turma">
              <option disabled selected value="0">Turmas</option>
              <option
                id="turma"
                v-bind:value="turma.id"
                v-for="turma in turmas"
                v-bind:key="turma"
              >
                {{ turma.nome }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="col-xl-4">
        <div class="d-flex mt-4">
          <input
            name="nome"
            id="filtro-nome"
            class="form-control me-2"
            type="text"
            placeholder="Nome"
          />
          <button
            class="btn btn-outline-success botaoselecionar"
            id="close-image"
            @click="filtraDados()"
          >
            <img src="../../assets/imgs/lupa.svg" />
          </button>
        </div>
      </div>
    </div>
    <div class="col-lg-12 mt-4" id="participantes">
      <div class="aviso">
        <h4 class="titulo fw-bold">
          Não foi encontrado nenhum resultado com os parâmetros informados
        </h4>
        <button
          class="recarregar mt-3 form-control"
          onclick="window.location.reload()"
        >
          RECARREGAR LISTA
        </button>
      </div>
      <div class="table table-wrapper-scroll-y my-custom-scrollbar">
        <table class="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Formação</th>
              <th>Turma</th>
              <th>MM/YY</th>
              <th>MM/YY</th>
              <th>MM/YY</th>
            </tr>
          </thead>
          <tbody>
            <tr
              id="participante"
              v-for="participante in participantes"
              v-bind:key="participante"
            >
              <td id="info-nome">{{ participante.nome }}</td>
              <td id="info-programa">{{ participante.programa }}</td>
              <td id="info-turma">{{ participante.turma }}</td>
              <td id="info-salario">{{ participante.salario }}</td>
              <td id="info-salario">{{ participante.salario }}</td>
              <td id="info-salario">{{ participante.salario }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th class="ultima">TOTAL</th>
              <td class="ultima"></td>
              <td class="ultima"></td>
              <td class="ultima"></td>
              <td class="ultima"></td>
              <td class="ultima"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    <div class="container overflow-hidden botoes">
      <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
        <div class="botõesfinais col-xl-5">
          <div>
            <button id="botaoSalarioPadrao" type="button" class="btn-lg">
              ADICIONAR SALÁRIO PADRÃO
            </button>
          </div>
        </div>
        <div class="col-xl-2"></div>
        <div class="botõesfinais col-xl-5">
          <div
            onclick="acao()"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <button id="botaoAdicionarManualmente" type="button" class="btn-lg">
              ADICIONAR MANUALMENTE
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-xl modal-dialog modal-dialog-centered">
      <div class="modal-content" id="modalinteiro">
        <div class="g-2 g-lg-3 modal-header">
          <h5 class="col-xl-11 modal-title" id="exampleModalLabel">
            Adicionar investimento Folha
          </h5>
          <button
            type="button"
            class="col-xl-1 btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="container-fluid ms-2">
          <div class="modalBody" id="fontModal">
            <label id="modalconteudo">Nome</label>
            <div class="input-group input-group-lg">
              <input
                type="text"
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-lg"
              />
            </div>
            <label id="modalconteudo">Mês e ano</label>
            <div class="input-group input-group-lg">
              <input
                type="text"
                class="form-control"
                placeholder="MM/YY"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-lg"
              />
            </div>
            <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
              <div class="modalitens col-xl-6">
                <label id="modalconteudo">Valor Hora</label>
                <div class="input-group input-group-lg">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="R$"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-lg"
                  />
                </div>
              </div>
              <div class="modalitens col-xl-6">
                <label id="modalconteudo">Horas Trabalhadas</label>
                <div class="input-group input-group-lg">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="R$"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-lg"
                  />
                </div>
              </div>
            </div>
            <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
              <div class="modalitens col-xl-12">
                <label id="modalconteudo">Valor Total</label>
                <div class="input-group input-group-lg">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="R$"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-lg"
                  />
                </div>
              </div>
              <div class="conteudodescrição col-xl-12">
                <label class="" id="modalconteudo"
                  >Descrição do investimento</label
                >
                <div class="input-group input-group-lg">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Salário Padrão"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-lg"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3 modal-footer">
            <div class="row-xl-5">
              <button
                id="confirmar"
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                CONFIRMAR
              </button>
            </div>
            <div class="col-xl-5"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  name: "App",
  components: {
    Header,
  },
  data() {
    return {
      participantes: [
        {
          nome: "Marco Aguiar",
          programa: "Java",
          turma: "01",
          salario: "R$ 1500.00",
        },
        {
          nome: "Pedro Vieira",
          programa: "Java",
          turma: "02",
          salario: "R$ 1500.00",
        },
        {
          nome: "Marcelo Oliveira",
          programa: "Mobile",
          turma: "02",
          salario: "R$ 1500.00",
        },
        {
          nome: "Vania Silva",
          programa: ".Net",
          turma: "03",
          salario: "R$ 1500.00",
        },
        {
          nome: "Luciana Silva",
          programa: "Java",
          turma: "01",
          salario: "R$ 1500.00",
        },
        {
          nome: "Joao Godoy",
          programa: "Mainframe",
          turma: "02",
          salario: "R$ 1500.00",
        },
        {
          nome: "Junior Paulo",
          programa: "Java",
          turma: "01",
          salario: "R$ 1500.00",
        },
      ],
      programas: [
        {
          id: 1,
          nome: "Infraestrutura",
        },
        {
          id: 2,
          nome: "Java",
        },
        {
          id: 3,
          nome: "Mainframe",
        },
        {
          id: 4,
          nome: "Mobile",
        },
        {
          id: 5,
          nome: ".Net",
        },
      ],
      turmas: [
        {
          id: 1,
          nome: "01",
        },
        {
          id: 2,
          nome: "02",
        },
        {
          id: 3,
          nome: "03",
        },
      ],
      salarios: [
        {
          id: 1,
          nome: "	R$ 1500.00",
        },
      ],
    };
  },
  methods: {
    filtraDados() {
      const dadosLinhas = this.pegaDados();
      let nomeProcurado = document.querySelector("#filtro-nome").value;
      let programaProcurado = document.querySelector("#filtro-programa").value;
      let turmaProcurada = document.querySelector("#filtro-turma").value;
      let linhasNl = document.querySelectorAll("#participante");
      var linhasArray = Array.prototype.slice.call(linhasNl);
      let arrayBoolLinhas = this.verifica(
        dadosLinhas,
        nomeProcurado,
        programaProcurado,
        turmaProcurada
      );
      this.mudaVisibilidade(arrayBoolLinhas, linhasArray);
    },
    pegaDados() {
      let linhas = document.querySelectorAll("#participante");
      let programas = document.querySelectorAll("#programa");
      let arrayProgramas = [];
      let arrayDadosDasLinhas = [];
      programas.forEach((programa) => {
        arrayProgramas.push(programa.textContent);
      });
      console.log(arrayProgramas);
      linhas.forEach((linha) => {
        let dadosLinha = [];
        let nome = linha.querySelector("#info-nome").textContent;
        let programa = this.trataPrograma(linha, arrayProgramas);
        let turma = this.trataTurma(linha);
        dadosLinha.push(nome, programa, turma);
        arrayDadosDasLinhas.push(dadosLinha);
      });
      console.log(arrayDadosDasLinhas);
      return arrayDadosDasLinhas;
    },
    trataTurma(linha) {
      let turmaTxt = linha.querySelector("#info-turma").textContent;
      let turma = 0;
      if (turmaTxt == "01") {
        turma = 1;
        return turma;
      } else if (turmaTxt == "02") {
        turma = 2;
        return turma;
      } else if (turmaTxt == "03") {
        turma = 3;
        return turma;
      }
      return turma;
    },
    trataPrograma(linha, arrayProgramas) {
      var programaTxt = linha.querySelector("#info-programa").textContent;
      let programaNum = 0;
      let i = 0;
      for (let i = 0; i < arrayProgramas.length; i++) {
        if (programaTxt == arrayProgramas[i]) {
          programaNum = i + 1;
          return programaNum;
        }
      }
      return programaNum;
    },
    verifica(dadosLinhas, nomeProcurado, programaProcurado, turmaProcurada) {
      let arrayBoolLinhas = [];
      let expressao = new RegExp(nomeProcurado, "i");
      dadosLinhas.forEach((dadosLinha) => {
        let boolLinha = [];
        // Verificando se o nome procurado consta na tabela
        if (expressao.test(dadosLinha[0]) || nomeProcurado == "") {
          boolLinha.push(true);
        } else {
          boolLinha.push(false);
        }
        // Verificando se o programa procurado consta na tabela
        if (programaProcurado == dadosLinha[1] || programaProcurado == 0) {
          boolLinha.push(true);
        } else {
          boolLinha.push(false);
        }
        // Verificando se a turma procurada consta na tabela
        if (turmaProcurada == dadosLinha[2] || turmaProcurada == 0) {
          boolLinha.push(true);
        } else {
          boolLinha.push(false);
        }
        arrayBoolLinhas.push(boolLinha);
      });
      return arrayBoolLinhas;
    },
    mudaVisibilidade(arrayBoolLinhas, linhas) {
      let i;
      var contador = 0;
      let aviso = document.querySelector(".aviso");
      let tabela = document.querySelector(".table");
      var qtdLinhas = linhas.length;
      for (i = 0; i < linhas.length; i++) {
        if (
          arrayBoolLinhas[i][0] &&
          arrayBoolLinhas[i][1] &&
          arrayBoolLinhas[i][2]
        ) {
          linhas[i].style.display = "";
        } else {
          linhas[i].style.display = "none";
          contador++;
        }
      }
      if (qtdLinhas == contador) {
        aviso.style.display = "flex";
        tabela.style.display = "none";
      } else {
        aviso.style.display = "none";
        tabela.style.display = "flex";
      }
    },
  },
};
</script>

<style>
body {
  background: #ebebeb;
}

.tela {
  background-color: #ebebeb;
}

#botaoFolha {
  background: #ffb600;
  font-weight: bold;
  width: 180px;
  color: #ffffff;
}

#botaoInstrutor {
  
  background: #ab0045;
  font-weight: bold;
  width: 180px;
  margin-left: 10px;
  color: #ffffff;
}

#botaoSalarioPadrao {
  background: #ab0045;
  font-weight: bold;
  color: #ffffff;
  margin-left: 0%;
  border: none;
}

.botaoselecionar {
  display: inline-block;
  padding: 0px !important;
  height: 38px;
  margin: 0px !important;
  border: none !important;
}

#close-image img {
  display: inline-block;
  height: 38px;
}

#botaoAdicionarManualmente {
  background: #ffb700;
  font-weight: bold;
  color: #ffffff;
  margin-left: 120px;
  border: none;
}

#filtro-nome {
  height: 38px;
}

#botaoSelecionar {
  height: 38px;
}

.ultima {
  background: #63657a !important;
  color: #ffffff;
  text-align: left;
}

#info-nome,
#info-turma,
#info-programa,
#info-salario {
  text-align: left;
}

.forte {
  font-weight: bold;
}

#modalinteiro {
  background-color: #ebebeb;
}

.my-custom-scrollbar {
  position: relative;
  height: 59vh;
  overflow: auto;
}

.table-wrapper-scroll-y {
  display: block;
  height: 59vh;
}

#info-nome {
  font-weight: bold;
}

.botao {
  padding-bottom: 2%;
}

.botoes {
  margin-top: 100px;
}

#formação {
  width: 180px;
  margin-right: 23px;
  margin-bottom: 50px;
  margin-left: 0px;
}

.invisivel {
  display: none;
}

#botaoSelecionar {
  width: 40px;
}

#close-image:hover {
  background-color: #00b5;
}

.aviso {
  display: none;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  position: relative;
  margin-top: 220px;
  margin-bottom: 200px;
}

.recarregar {
  background-color: #090b2e !important;
  max-width: 50%;
  height: 40px;
  cursor: pointer !important;
  transition: all linear 0.3s !important;
  color: #ffffff;
}

.recarregar:hover {
  background-color: #141863 !important;
}

#investimentoFolha {
  width: 100%;
}

#modalconteudo {
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: center;
  margin-bottom: 12px;
  margin-top: 12px;
}

.conteudodescrição {
  margin-bottom: 40px;
}

#exampleModalLabel {
  font-family: Montserrat;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0em;
  font-weight: bold;
  text-align: center;
}

#confirmar {
  background: #ab0045;
  font-weight: bold;
  margin-top: 12px;
  width: 100%;
  border: none;
}

@media (max-width: 1400px) {
  #botaoFolha {
    width: 100%;
  }
  #botaoInstrutor {
    width: 100%;
    margin-left: 0px;
    margin-top: 10px;
  }

  #formação,
  #turmas {
    width: auto;
  }

  #botaoSalarioPadrao {
    width: max-content;
  }

  #botaoAdicionarManualmente {
    width: max-content;
    margin-left: 0px;
  }
}

@media (max-width: 1200px) {
  .modalitens,
  .botõesfinais {
    width: auto;
  }
  .conteudodescrição {
    width: 100%;
  }
}
</style>
