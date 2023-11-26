import { compareLicense, verifyCustomerWithoutRent, verifyVehicleWithoutRent } from "./utils/rentValidation";
import { DataInvalid, NotFound } from "./error/errors";
import { Customer } from "./customer";
import { Vehicle } from "./vehicle";
import { differenceInDays, parseISO } from "date-fns";

const IVehicle = {
    'CAR': 'B',
    'MOTORCYCLE': 'A',
}

interface IInvoice {
    customerName: string;
    customerCpf: string;
    customerCnh: string;
    vehiclePlate: string;
    vehicleType: string;
    vehicleModel: string;
    vehicleRental: number;
    rentalDate: Date;
    devolutionDate: Date;
    valueRental: number;
}
export class Rent {
    private _customer: Customer;
    private _vehicle: Vehicle;
    private _rentalDate: Date;
    private _devolutionDate: Date;
    private _valueRental: number;

    private static listOfRent: Rent[] = [];

    constructor(
        customer: Customer,
        vehicle: Vehicle,
        rentalDate: Date,
        devolutionDate: Date,
    ) {
        this._customer = customer;
        this._vehicle = vehicle;
        this._rentalDate = rentalDate;
        this._devolutionDate = devolutionDate;
        this._valueRental = 0;
    }

    get customer(): Customer {
        return this._customer;
    }

    set customer(newCustomer: Customer) {
        this._customer = newCustomer;
    }

    get vehicle(): Vehicle {
        return this._vehicle;
    }

    set vehicle(newVehicle: Vehicle) {
        this._vehicle = newVehicle;
    }

    get rentalDate(): Date {
        return this._rentalDate;
    }

    set rentalDate(newRentalDate: Date) {
        this._rentalDate = newRentalDate;
    }

    get devolutionDate(): Date {
        return this._devolutionDate;
    }

    set devolutionDate(newDevolutionDate: Date) {
        this._devolutionDate = newDevolutionDate;
    }

    get valueRental(): number {
        return this._valueRental;
    }

    set valueRental(newValueRental: number) {
        this._valueRental = newValueRental;
    }

    static get listOfRents(): Rent[] {
        return this.listOfRent;
    }

    static getRent(cpf: string, plate: string): Rent {
        const rent = Rent.listOfRent.find(rent => rent.customer.cpf === cpf && rent.vehicle.plate === plate)

        if (!rent) {
            throw new NotFound('Aluguel não encontrado')
        }

        return rent;
    }

    private static calculateRent(vehicle: Vehicle, days: number): number {
        const valueBase = days * vehicle.dailyRental;
        const valueIncrease = valueBase * (vehicle.increasePorcentage / 100);
        return valueBase + valueIncrease;
    }

    static rentVehicle(customerCpf: string, vehiclePlate: string, rentalDate: Date, devolutionDate: Date): Rent {
        const customer = verifyCustomerWithoutRent(customerCpf);
        const vehicle = verifyVehicleWithoutRent(vehiclePlate);
        const verifyLicense = compareLicense(vehicle.type, customer.driverLicense)

        if (!verifyLicense) {
            throw new DataInvalid("CNH incompatível com o veículo selecionado")
        }

        const rentedDays = differenceInDays(devolutionDate, rentalDate);
        const valueRental = this.calculateRent(vehicle, rentedDays);
        const rent = new Rent(customer, vehicle, rentalDate, devolutionDate);
        rent.valueRental = valueRental;
        customer.hasRent = true;
        vehicle.rented = true;
        this.listOfRent.push(rent);

        return rent;
    }

    static devolutionVehicle(cpf: string, plate: string): boolean {
        const rent = this.getRent(cpf, plate)

        if (!rent) {
            throw new NotFound('Aluguel não encontrado')
        }

        rent.vehicle.rented = false
        rent.customer.hasRent = false

        const indexRent = Rent.listOfRent.findIndex(rent => rent.customer.cpf === cpf && rent.vehicle.plate === plate)
        Rent.listOfRent.splice(indexRent, 1)

        return true;
    }

    static generateInvoice(cpf: string, plate: string): string {
        const rent = this.getRent(cpf, plate)

        if (!rent) {
            throw new NotFound('Aluguel não encontrado')
        }

        return `
        ============ FATURA DO CLIENTE ============
        Nome do cliente: ${rent.customer.name}
        CPF: ${rent.customer.cpf}
        CNH: ${rent.customer.driverLicense}
        ------------ DADOS DO VEÍCULO -------------
        Placa: ${rent.vehicle.plate}
        Tipo: ${rent.vehicle.type}
        Modelo: ${rent.vehicle.model}
        Diária: ${rent.vehicle.dailyRental}
        ------------ DADOS DO ALUGUEL -------------
        Data de aluguel: ${rent.rentalDate.toLocaleDateString('pt-BR')}
        Data de devolução: ${rent.devolutionDate.toLocaleDateString('pt-BR')}
        Valor do aluguel: ${rent.valueRental.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        ===========================================
        `;
    }
}
