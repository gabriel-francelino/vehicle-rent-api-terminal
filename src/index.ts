// Importa o módulo prompt-sync
import * as promptSync from 'prompt-sync';

function main() {
    // Cria uma instância do prompt-sync
    const prompt = promptSync();

    // Solicita o nome do usuário
    const nome: string = prompt('Qual é o seu nome? ');

    // Imprime o nome na tela
    console.log(`Olá, ${nome}!`);
}

// Chama a função principal
main();
