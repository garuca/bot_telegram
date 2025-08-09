const introMessage = "Qual área de TI você gostaria de conhecer?";


export const options = {
    reply_markup: {
        inline_keyboard: [
            [{ text: '🔐 Cibersegurança', callback_data: 'carreira_cyber' }],
            [{ text: '💻 Programação / Dev', callback_data: 'carreira_dev' }],
            [{ text: '📊 Análise de Dados', callback_data: 'carreira_dados' }],
            [{ text: '🏗️ Arquitetura de Software', callback_data: 'carreira_arquitetura' }],
            [{ text: '☁️ DevOps / Cloud', callback_data: 'carreira_devops' }]
        ]
    }
};

export const command = {
    command: 'carreiras',
    description: 'Mostra cursos e áreas de TI',
    pattern: /\/carreiras/,
    handler: async (bot, msg) => {
        const chatId = msg.chat.id;
        await bot.sendMessage(chatId, introMessage, options);
    }
};