import { livrosOpcoes } from '../data/livrosOpcoes.js';

export const command = {
    command: 'livros',
    description: 'Livros que indico',
    pattern: /\/livros/,
    handler: async (bot, msg) => {
        const chatId = msg.chat.id;
        const message = "📚 *Livros essenciais que todo dev deveria ler:*";
        
        await bot.sendMessage(chatId, message, { ...livrosOpcoes, parse_mode: 'Markdown' });
    }
};