import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

// Carrega variáveis do arquivo .env
dotenv.config();

// Usa o TOKEN do .env
const token = process.env.TOKEN;

// Modo polling (fica escutando mensagens)
const bot = new TelegramBot(token, { polling: true });

// Define os comandos do bot
bot.setMyCommands([
    { command: '/start', description: 'Inicia o bot' },
    { command: '/carreiras', description: 'Mostra cursos e áreas de TI' },
    { command: '/livros', description: 'Livros que indico' }
]);

// Comando /carreiras
bot.onText(/\/carreiras/, (msg) => {
    const chatId = msg.chat.id;

    const resposta = `
📚 *Cursos de Base:*
• *EC*: Engenharia da Computação  
• *ES*: Engenharia de Software  
• *SI*: Sistemas de Informação  
• *ADS*: Análise e Desenvolvimento de Sistemas  

⸻

🔐 *Cibersegurança (CyberSec)*  
Base: EC ou ES  
Extra: CEH, CompTIA Security+, CISSP  

💻 *Programação / Dev*  
Base: ES ou ADS  
Foco: Python, Java, JS, ágil  

📊 *Análise de Dados (Data Analytics/Science)*  
Base: SI ou ES  
Extra: BI, SQL, Python, ML  

🏗 *Arquitetura de Software*  
Base: ES  
Foco: sistemas complexos, padrões  

☁️ *DevOps / Cloud*  
Base: ES ou EC  
Extra: AWS, Azure, Docker, K8s
    `;

    bot.sendMessage(chatId, resposta, { parse_mode: 'Markdown' });
});

// Comando /livros
bot.onText(/\/livros/, (msg) => {
    const chatId = msg.chat.id;

    const livros = `
📚 *Livros recomendados para devs:*

1. *Clean Code*  
   Autor: Robert C. Martin  

2. *Clean Architecture*  
   Autor: Robert C. Martin  

3. *O Programador Pragmático*  
   Autores: Andrew Hunt e David Thomas
    `;

    bot.sendMessage(chatId, livros, { parse_mode: 'Markdown' });
});
