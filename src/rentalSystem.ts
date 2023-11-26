import * as promptSync from 'prompt-sync';
import { Customer, ECategoryType } from './customer';
import { BadRequest, DataInvalid } from './error/errors';
import { TVehicle, Vehicle } from './vehicle';

const prompt = promptSync();

export class RentalSystem {
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

    static createClient(): void {
        try {
            console.log("======== Cadastrar cliente ========");
            const name: string = prompt("Nome: ");
            const cpf: string = prompt("CPF: ");
            const dateOfBirth: string = prompt("Data de nascimento(aaaa-mm-dd): ");
            const driverLicense: string = prompt("CNH(A,B,C,D,E,AB,AC,AD,AE): ");
    
            const newCustomer: Customer = new Customer(cpf, name, new Date(dateOfBirth), driverLicense as ECategoryType);
            const customerCreated: Customer = Customer.create(newCustomer);
            if (customerCreated) {
                console.log("Cliente cadastrado com sucesso!");
                console.log(customerCreated);
            }else {
                throw new DataInvalid("Não foi possível cadastrar o cliente. Veirique os dados e tente novamente.");
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    static removeClient(): void {
        try {
            console.log("======== Remover cliente ========");
            const cpf: string = prompt("CPF: ");
            const customerDeleted: boolean = Customer.delete(cpf);
            console.log("Cliente removido com sucesso!");
            if (customerDeleted) {
            }else {
                throw new BadRequest("Não foi possível remover o cliente.");
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    static listClients(): void {
        try {
            console.log("======== Listar clientes ========");
            const customers: Customer[] = Customer.getAll();
            console.log(customers);
        } catch (error) {
            console.log(error.message);
        }
    }

    static listClientsByCpf(): void {
        try {
            console.log("======== Listar clientes por CPF ========");
            const cpf: string = prompt("CPF: ");
            const customer: Customer = Customer.getByCpf(cpf);
            console.log(customer);
        } catch (error) {
            console.log(error.message);
        }
    }

    static createVehicle(): void {
        try {
            console.log("======== Cadastrar veículo ========");
            const model: string = prompt("Modelo: ");
            const color: string = prompt("Cor: ");
            const chassis: string = prompt("Chassi: ");
            const type: string = prompt("Tipo(CAR ou MOTORCYCLE): ");
            const plate: string = prompt("Placa: ");
            const dailyRental = Number(prompt("Valor da diária: "));
    
            const newVehicle = new Vehicle(model, color, chassis, type as TVehicle, plate, dailyRental);
            const vehicleCreated = Vehicle.create(newVehicle);
            if (vehicleCreated) {
                console.log("Veículo cadastrado com sucesso!");
                console.log(vehicleCreated);
            }else {
                throw new DataInvalid("Não foi possível cadastrar o veículo. Veirique os dados e tente novamente.");
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    static deleteVehicle(): void {
        try {
            console.log("======== Remover veículo ========");
            const plate: string = prompt("Placa: ");
            const vehicleDeleted: boolean = Vehicle.delete(plate);
            if (vehicleDeleted) {
                console.log("Veículo removido com sucesso!");
            }else {
                throw new BadRequest("Não foi possível remover o veículo.");
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    static listVehicles(): void {
        try {
            console.log("======== Listar veículos ========");
            const vehicles: Vehicle[] = Vehicle.getAll();
            console.log(vehicles);
        } catch (error) {
            console.log(error.message);
        }
    }

    static listVehiclesByPlate(): void {
        try {
            console.log("======== Listar veículos por placa ========");
            const plate: string = prompt("Placa: ");
            const vehicle: Vehicle = Vehicle.getByPlate(plate);
            console.log(vehicle);
        } catch (error) {
            console.log(error.message);
        }
    }

    static listRentedVehicles(): void {
        try {
            console.log("======== Listar veículos alugados ========");
            const rentedVehicles: Vehicle[] = Vehicle.listRentedVehicles();
            console.log(rentedVehicles);
        } catch (error) {
            console.log(error.message);
        }
    }

    static listAvailableVehicles(): void {
        try {
            console.log("======== Listar veículos disponíveis ========");
            const availableVehicles: Vehicle[] = Vehicle.listAvailableVehicles();
            console.log(availableVehicles);
        } catch (error) {
            console.log(error.message);
        }
    }
}