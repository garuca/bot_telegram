
import { livrosRecomendados } from '../data/livrosData.js';

let responseMessage = "📚 *Livros essenciais que todo dev deveria ler:*\n";
livrosRecomendados.forEach((livro, index) => {
    responseMessage += `\n${index + 1}. *${livro.titulo}*\n   Autor: ${livro.autor}\n`;
});

export const command = {
    command: 'livros',
    description: 'Livros que indico',
    pattern: /\/livros/,
    handler: async (bot, msg) => {
        const chatId = msg.chat.id;
        await bot.sendMessage(chatId, responseMessage, { parse_mode: 'Markdown' });
    }
};