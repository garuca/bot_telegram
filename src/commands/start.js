export const command = {
    command: 'start',
    description: 'Inicia o bot',
    pattern: /\/start/,
    handler: async (bot, msg) => {
        const chatId = msg.chat.id;
        const welcomeMessage = `
👋 *Olá garuco!*

Sou um bot para ajudar você a navegar pelo mundo da Tecnologia.

Use os seguintes comandos:
/carreiras - Para ver as principais áreas de forma interativa.
/livros - Para receber recomendações de livros essenciais.
`;
        await bot.sendMessage(chatId, welcomeMessage, { parse_mode: 'Markdown' });
    }
};