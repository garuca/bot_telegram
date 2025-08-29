import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';


import { carreirasInfo } from './data/carreirasData.js';

import { cursosOpcoes } from './data/cursosData.js';
import { options as carreirasOptions } from './commands/carreiras.js';

import { livrosOpcoes } from './data/livrosOpcoes.js';

dotenv.config();

const token = process.env.TOKEN;

if (!token) {
    console.error("ERRO: TOKEN não encontrado no arquivo .env!");
    process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });


(async () => {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const commandsPath = path.join(__dirname, 'commands');

        const commandFiles = await fs.readdir(commandsPath);
        
        const commandModules = await Promise.all(
            commandFiles
                .filter(file => file.endsWith('.js'))
                .map(file => import(pathToFileURL(path.join(commandsPath, file))))
        );
        
        const commandsToSet = [];
        commandModules.forEach(module => {
            const cmd = module.command;
            if (cmd && cmd.pattern && cmd.handler) {
                bot.onText(cmd.pattern, (msg) => cmd.handler(bot, msg));
                commandsToSet.push({ command: cmd.command, description: cmd.description });
            }
        });

        await bot.setMyCommands(commandsToSet);
        console.log('Bot iniciado e comandos carregados com sucesso!');

    } catch (error) {
        console.error('Falha ao carregar os comandos:', error);
    }
})();



bot.on('callback_query', async (callbackQuery) => {
    const msg = callbackQuery.message;
    const data = callbackQuery.data; 
    const chatId = msg.chat.id;

    try {
        await bot.answerCallbackQuery(callbackQuery.id);

        if (data === 'menu_carreiras') {
            const introMessage = "Qual área de TI você gostaria de conhecer?";
            await bot.sendMessage(chatId, introMessage, carreirasOptions);

        
        } else if (data === 'menu_livros') {
            const message = "📚 *Livros essenciais que todo dev deveria ler:*";
            await bot.sendMessage(chatId, message, { ...livrosOpcoes, parse_mode: 'Markdown' });

        } else if (data.startsWith('carreira_')) {
            const carreiraKey = data.split('_')[1];
            
            const descCarreira = carreirasInfo[carreiraKey];
            if (descCarreira) {
                await bot.sendMessage(chatId, descCarreira, { parse_mode: 'Markdown' });
            }

            const menuCursos = cursosOpcoes[carreiraKey];
            if (menuCursos) {
                await bot.sendMessage(chatId, 'Aqui estão algumas sugestões de cursos gratuitos:', menuCursos);
            } else {
                await bot.sendMessage(chatId, 'Nenhum curso encontrado para esta área no momento.');
            }
        }

    } catch (error) {
        console.error('Erro no callback_query:', error.message);
    }
});