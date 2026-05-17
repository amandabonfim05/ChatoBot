const MENUS = {
    principal: (nome) =>
        `Olá, ${nome}! Sou o assistente virtual da Procont. Como posso ajudá-lo hoje?\n\n` +
        `1 - Solicitação de rescisão\n` +
        `2 - Solicitação de férias\n` +
        `3 - Solicitação de recálculo de imposto\n` +
        `4 - Solicitação de faturamento\n` +
        `5 - Falar diretamente com atendente\n` +
        `6 - Não precisa mais de atendimento`,

    rescisao:
        `Aviso prévio:\n\n` +
        `7 - Aviso prévio trabalhado\n` +
        `8 - Aviso prévio indenizado`,

    encerramento:
        `Tudo bem! Se precisar de mais alguma coisa, é só chamar.\n\n` +
        `Para acompanhar notícias sobre contabilidade, siga-nos no Instagram:\n` +
        `https://www.instagram.com/procont.ba/profilecard/?igsh=NTBrOXBvdjJlcmZs`,

    aguardandoAtendente:
        `Em breve um atendente irá falar com o(a) senhor(a).`,

    aguardandoDoc:
        `Em breve enviaremos a documentação solicitada.`,

    encerramentoAtendente:
        `Seu atendimento foi encerrado. Se precisar de mais alguma coisa, é só mandar um *oi* que te atendo novamente! 😊`,
};

module.exports = { MENUS };
