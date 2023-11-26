import * as promptSync from 'prompt-sync';
import { RentalSystem } from './rentalSystem';

const prompt = promptSync();
let option: string = "99";

try {
    do {
        setTimeout(() => {
            // console.clear();
        }, 10000);
        RentalSystem.showInterface();
        option = prompt("Escolha uma opção: ");
        switch (option) {
            case "1":
                RentalSystem.createClient();
                break;
            case "2":
                RentalSystem.removeClient();
                break;
            case "3":
                RentalSystem.listClients();
                break;
            case "4":
                RentalSystem.listClientsByCpf();
                break;
            case "5":
                RentalSystem.createVehicle();
                break;
            case "6":
                RentalSystem.deleteVehicle();
                break;
            case "7":
                RentalSystem.listVehicles();
                break;
            case "8":
                RentalSystem.listVehiclesByPlate();
                break;
            case "9":
                RentalSystem.listRentedVehicles();
                break;
            case "10":
                RentalSystem.listAvailableVehicles();
                break;
            case "11":
                break;
            case "12":
                break;
            case "13":
                break;
            case "0":
                console.log("Saindo...");
                console.log(option)
                break;
            default:
                break;
        }

        // if(option == "0") {
        //     break;
        // }
    } while (option !== "0");
} catch (error) {
    
}



// function main() {
// }

// // Chama a função principal
// main();

// const customer1 = new Customer("12345678910", "João", new Date("1990-01-01"), ECategoryType.A);
// const customer2 = new Customer("12345678911", "Maria", new Date("1990-01-01"), ECategoryType.B);
// const customer3 = new Customer("12345678912", "José", new Date("1990-01-01"), ECategoryType.C);

// Customer.create(customer1);
// Customer.create(customer2);
// Customer.create(customer3);

// const vehicle1 = new Vehicle("Gol", "Preto", "AAAAAA", "CAR", "ABC-123", 200);
// const vehicle2 = new Vehicle("Uno", "Branco", "BBBBBB", "CAR", "DEF-456", 300);
// const vehicle3 = new Vehicle("Fiesta", "Vermelho", "CCCCCC", "CAR", "GHI-789", 400);

// Vehicle.create(vehicle1);
// Vehicle.create(vehicle2);
// Vehicle.create(vehicle3);

// const rent1 = new Rent(customer1, vehicle1, new Date("2021-01-01"), new Date("2021-01-02"));
// const rent2 = new Rent(customer2, vehicle2, new Date("2021-01-01"), new Date("2021-01-02"));
// const rent3 = new Rent(customer3, vehicle3, new Date("2021-01-01"), new Date("2021-01-02"));

// const newRent = Rent.rentVehicle("12345678910", "ABC-123", new Date("2023-11-26"), new Date("2023-11-30"));
// console.log(newRent);
// const invoice = Rent.generateInvoice("12345678910", "ABC-123");
// console.log(invoice);

// const devRent = Rent.devolutionVehicle("12345678910", "ABC-123");
// console.log(devRent);
// console.log(Rent.listOfRents);