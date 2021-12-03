module.exports = {
  pages: {
    login: {
      entry: './src/views/login/main.js',
      template: 'public/index.html',
      title: 'SIS Programa de Formação - Login',
      chunks: ['chunk-vendors', 'chunk-common', 'login']
    },
    home: {
      entry: './src/views/home/main.js',
      template: 'public/index.html',
      title: 'Home - Painel Gerencial',
      chunks: ['chunk-vendors', 'chunk-common', 'home']
    },
    'informacoes-gerais-gerencial': {
      entry: './src/views/informacoes-gerais-gerencial/main.js',
      template: 'public/index.html',
      title: 'Informações Gerais - Painel Gerencial',
      chunks: ['chunk-vendors', 'chunk-common', 'informacoes-gerais-gerencial']
    },
    'dados-programa-visualizacao': {
      entry: './src/views/dados-programa-visualizacao/main.js',
      template: 'public/index.html',
      title: 'Programa de Formação - Visualização',
      chunks: ['chunk-vendors', 'chunk-common', 'dados-programa-visualizacao']
    },
    'dados-programa-busca': {
      entry: './src/views/dados-programa-busca/main.js',
      template: 'public/index.html',
      title: 'Programa de Formação - Busca',
      chunks: ['chunk-vendors', 'chunk-common', 'dados-programa-busca']
    },
    'dados-programa-cadastro_edicao': {
      entry: './src/views/dados-programa-cadastro_edicao/main.js',
      template: 'public/index.html',
      title: 'Programa de Formação - Cadastro e Edição',
      chunks: ['chunk-vendors', 'chunk-common', 'dados-programa-cadastro_edicao']
    },
    'dados-programa-processo-seletivo': {
      entry: './src/views/dados-programa-processo-seletivo/main.js',
      template: 'public/index.html',
      title: 'Programa de Formação - Processo Seletivo',
      chunks: ['chunk-vendors', 'chunk-common', 'dados-programa-processo-seletivo']
    },
    'dados-participante-visualizacao': {
      entry: './src/views/dados-participante-visualizacao/main.js',
      template: 'public/index.html',
      title: 'Participante - Visualização',
      chunks: ['chunk-vendors', 'chunk-common', 'dados-participante-visualizacao']
    },
    'dados-participante-cadastro_participante': {
      entry: './src/views/dados-participante-cadastro_participante/main.js',
      template: 'public/index.html',
      title: 'Cadastro Participante',
      chunks: ['chunk-vendors', 'chunk-common', 'dados-participante-cadastro_participante']
    },
    'dados-participante-busca': {
      entry: './src/views/dados-participante-busca/main.js',
      template: 'public/index.html',
      title: 'Participante - Busca',
      chunks: ['chunk-vendors', 'chunk-common', 'dados-participante-busca']
    },
    'dados-participante-cadastro_edicao': {
      entry: './src/views/dados-participante-cadastro_edicao/main.js',
      template: 'public/index.html',
      title: 'Participante - Cadastro e Edição',
      chunks: ['chunk-vendors', 'chunk-common', 'dados-participante-cadastro_edicao']
    },
    'dados-participante-selecao-cadastro': {
      entry: './src/views/dados-participante-selecao-cadastro/main.js',
      template: 'public/index.html',
      title: 'Participante - Seleção para cadastro',
      chunks: ['chunk-vendors', 'chunk-common', 'dados-participante-selecao-cadastro']
    },
    'dados-participante-arquivos': {
      entry: './src/views/dados-participante-arquivos/main.js',
      template: 'public/index.html',
      title: 'Participante - Envio de arquivos',
      chunks: ['chunk-vendors', 'chunk-common', 'dados-participante-arquivos']
    },
    'dados-candidato-participante-elegibilidade': {
      entry: './src/views/dados-candidato-participante-elegibilidade/main.js',
      template: 'public/index.html',
      title: 'Participante Elegibilidade',
      chunks: ['chunk-vendors', 'chunk-common', 'dados-candidato-participante-elegibilidade']
    },
    'dados-instrutor-visualizacao': {
      entry: './src/views/dados-instrutor-visualizacao/main.js',
      template: 'public/index.html',
      title: 'Instrutor - Visualização',
      chunks: ['chunk-vendors', 'chunk-common', 'dados-instrutor-visualizacao']
    },
    'dados-instrutor-busca': {
      entry: './src/views/dados-instrutor-busca/main.js',
      template: 'public/index.html',
      title: 'Instrutor - Busca',
      chunks: ['chunk-vendors', 'chunk-common', 'dados-instrutor-busca']
    },
    'dados-instrutor-cadastro_edicao': {
      entry: './src/views/dados-instrutor-cadastro_edicao/main.js',
      template: 'public/index.html',
      title: 'Instrutor - Cadastro - Edição',
      chunks: ['chunk-vendors', 'chunk-common', 'dados-instrutor-cadastro_edicao']
    },
    'acompanhamento-feedback': {
      entry: './src/views/acompanhamento-feedback/main.js',
      template: 'public/index.html',
      title: 'Acompanhamento Feedback',
      chunks: ['chunk-vendors', 'chunk-common', 'acompanhamento-feedback']
    },
    'acompanhamento-avaliacao': {
      entry: './src/views/acompanhamento-avaliacao/main.js',
      template: 'public/index.html',
      title: 'Acompanhamento Avaliacao',
      chunks: ['chunk-vendors', 'chunk-common', 'acompanhamento-avaliacao']
    },
    'acompanhamento-ciclo': {
      entry: './src/views/acompanhamento-ciclo/main.js',
      template: 'public/index.html',
      title: 'Acompanhamento Ciclo',
      chunks: ['chunk-vendors', 'chunk-common', 'acompanhamento-ciclo']
    },
    'acompanhamento-ciclo-final': {
      entry: './src/views/acompanhamento-ciclo-final/main.js',
      template: 'public/index.html',
      title: 'Acompanhamento Ciclo Final',
      chunks: ['chunk-vendors', 'chunk-common', 'acompanhamento-ciclo-final']
    },
    'acompanhamento-gerencial': {
      entry: './src/views/acompanhamento-gerencial/main.js',
      template: 'public/index.html',
      title: 'Acompanhamento Gerencial',
      chunks: ['chunk-vendors', 'chunk-common', 'acompanhamento-gerencial']
    },
    'acompanhamento-busca-participante': {
      entry: './src/views/acompanhamento-busca-participante/main.js',
      template: 'public/index.html',
      title: 'Acompanhamento Busca Participante',
      chunks: ['chunk-vendors', 'chunk-common', 'acompanhamento-busca-participante']
    },
    'acompanhamento-alura': {
      entry: './src/views/acompanhamento-alura/main.js',
      template: 'public/index.html',
      title: 'Acompanhamento Alura',
      chunks: ['chunk-vendors', 'chunk-common', 'acompanhamento-alura']
    },
    'investimento-folha': {
      entry: './src/views/investimento-folha/main.js',
      template: 'public/index.html',
      title: 'Investimento Folha',
      chunks: ['chunk-vendors', 'chunk-common', 'investimento-folha']
    },
    'investimento-instrutor': {
      entry: './src/views/investimento-instrutor/main.js',
      template: 'public/index.html',
      title: 'Investimento Instrutor',
      chunks: ['chunk-vendors', 'chunk-common', 'investimento-instrutor']
    },
    'processo-seletivo-busca-por-candidato': {
      entry: './src/views/processo-seletivo-busca-por-candidato/main.js',
      template: 'public/index.html',
      title: 'Busca por candidato',
      chunks: ['chunk-vendors', 'chunk-common', 'processo-seletivo-busca-por-candidato']
    },
    'processo-seletivo-busca-por-vagas': {
      entry: './src/views/processo-seletivo-busca-por-vagas/main.js',
      template: 'public/index.html',
      title: 'Busca por vagas',
      chunks: ['chunk-vendors', 'chunk-common', 'processo-seletivo-busca-por-vagas']
    },
    'processo-seletivo-dados-da-vaga-cadastro-edicao': {
      entry: './src/views/processo-seletivo-dados-da-vaga-cadastro-edicao/main.js',
      template: 'public/index.html',
      title: 'Dados da vaga - Cadastro/Edição',
      chunks: ['chunk-vendors', 'chunk-common', 'processo-seletivo-dados-da-vaga-cadastro-edicao']
    },
    'dados-instrutor-cadastro': {
      entry: './src/views/dados-instrutor-cadastro/main.js',
      template: 'public/index.html',
      title: 'Dados Instrutor -  Cadastro',
      chunks: ['chunk-vendors', 'chunk-common', 'dados-instrutor-cadastro']
    },
    'processo-seletivo-dados-da-vaga-visualizacao': {
      entry: './src/views/processo-seletivo-dados-da-vaga-visualizacao/main.js',
      template: 'public/index.html',
      title: 'Dados da vaga - Visualização',
      chunks: ['chunk-vendors', 'chunk-common', 'processo-seletivo-dados-da-vaga-visualizacao']
    },
    'processo-seletivo-dados-do-candidato-cadastro-edicao': {
      entry: './src/views/processo-seletivo-dados-do-candidato-cadastro-edicao/main.js',
      template: 'public/index.html',
      title: 'Dados do candidato - Cadastro/Edição',
      chunks: ['chunk-vendors', 'chunk-common', 'processo-seletivo-dados-do-candidato-cadastro-edicao']
    },
    'processo-seletivo-dados-do-candidato-status': {
      entry: './src/views/processo-seletivo-dados-do-candidato-status/main.js',
      template: 'public/index.html',
      title: 'Dados do candidato - Status',
      chunks: ['chunk-vendors', 'chunk-common', 'processo-seletivo-dados-do-candidato-status']
    },
    'processo-seletivo-dados-do-candidato-visualizacao': {
      entry: './src/views/processo-seletivo-dados-do-candidato-visualizacao/main.js',
      template: 'public/index.html',
      title: 'Dados do candidato - Visualização',
      chunks: ['chunk-vendors', 'chunk-common', 'processo-seletivo-dados-do-candidato-visualizacao']
    },
    'relatorios-gerencial': {
      entry: './src/views/relatorios-gerencial/main.js',
      template: 'public/index.html',
      title: 'Relatórios | Gerencial',
      chunks: ['chunk-vendors', 'chunk-common', 'relatorios-gerencial']
    },
    'relatorios-alura': {
      entry: './src/views/relatorios-alura/main.js',
      template: 'public/index.html',
      title: 'Relatórios | Alura',
      chunks: ['chunk-vendors', 'chunk-common', 'relatorios-alura']
    },
    'relatorios-avaliacoes': {
      entry: './src/views/relatorios-avaliacoes/main.js',
      template: 'public/index.html',
      title: 'Relatórios | Avaliações',
      chunks: ['chunk-vendors', 'chunk-common', 'relatorios-avaliacoes']
    },
    'relatorios-conclusoes': {
      entry: './src/views/relatorios-conclusoes/main.js',
      template: 'public/index.html',
      title: 'Relatórios | Conclusões',
      chunks: ['chunk-vendors', 'chunk-common', 'relatorios-conclusoes']
    },
    'relatorios-investimentos': {
      entry: './src/views/relatorios-investimentos/main.js',
      template: 'public/index.html',
      title: 'Relatórios | Investimentos',
      chunks: ['chunk-vendors', 'chunk-common', 'relatorios-investimentos']
    },
    'cargo-listar': {
      entry: './src/views/cargo-listar/main.js',
      template: 'public/index.html',
      title: 'Cargos | Listar',
      chunks: ['chunk-vendors', 'chunk-common', 'cargo-listar']
    },
    'cargo-visualizar': {
      entry: './src/views/cargo-visualizar/main.js',
      template: 'public/index.html',
      title: 'Cargos | Visualizar',
      chunks: ['chunk-vendors', 'chunk-common', 'cargo-visualizar']
    },
    'cargo-cadastro-edicao': {
      entry: './src/views/cargo-cadastro-edicao/main.js',
      template: 'public/index.html',
      title: 'Cargos | Edição',
      chunks: ['chunk-vendors', 'chunk-common', 'cargo-cadastro-edicao']
    },
   
  }
}
