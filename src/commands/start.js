export const command = {
    command: 'start',
    description: 'Inicia o bot',
    pattern: /\/start/,
    handler: async (bot, msg) => {
        const chatId = msg.chat.id;
        const welcomeMessage = `
👋 *Fala Comigo!*

Sou um bot para ajudar você a navegar pelo mundo da Tecnologia. Escolha uma das opções abaixo:
`;
        const options = {
            reply_markup: {
                inline_keyboard: [
                    [{ text: '📚 Carreiras de TI', callback_data: 'menu_carreiras' }],
                    [{ text: '📖 Livros Essenciais', callback_data: 'menu_livros' }]
                ]
            },
            parse_mode: 'Markdown'
        };

        await bot.sendMessage(chatId, welcomeMessage, options);
    }
};