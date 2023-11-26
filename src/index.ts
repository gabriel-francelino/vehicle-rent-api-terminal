import * as promptSync from 'prompt-sync';
import { RentalSystem } from './rentalSystem';

const prompt = promptSync();
let option: string = "99";

try {
    do {
        setTimeout(() => { }, 3000);
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
                RentalSystem.rentVehicle();
                break;
            case "12":
                RentalSystem.devolutionVehicle();
                break;
            case "13":
                RentalSystem.generateInvoice();
                break;
            case "0":
                console.log("Saindo...");
                break;
            default:
                break;
        }

    } while (option !== "0");
} catch (error) {
    console.log(error);
}