import * as promptSync from 'prompt-sync';
const prompt = promptSync();
export class System {
    static showInterface(): void {
        console.log(`
        ==============================
        Escolha uma opção:
        ------------------------------
        1  | Cadastrar cliente
        2  | Remover cliente
        3  | Listar clientes
        4  | Listar clientes por cpf
        5  | Cadastrar veículo
        6  | Remover veículo
        7  | Listar veículos
        8  | Listar veículos por placa
        9  | Listar veículos alugados
        10 | Listar veículos disponíveis
        11 | Alugar veículo
        12 | Devolver veículo
        13 | Gerar fatura do aluguel
        ==============================
        `)
    }
}