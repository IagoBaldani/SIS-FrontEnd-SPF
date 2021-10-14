module.exports = {
  pages: {
    login: {
      entry: './src/views/login/main.js',
      template: 'public/index.html',
      title: 'SPF - Login',
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
    'dados-participante-visualizacao': {
      entry: './src/views/dados-participante-visualizacao/main.js',
      template: 'public/index.html',
      title: 'Participante - Visualização',
      chunks: ['chunk-vendors', 'chunk-common', 'dados-participante-visualizacao']
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
      title: 'Instrutor - Cadastro e Edição',
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
    }
  }
}
