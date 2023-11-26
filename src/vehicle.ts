import { BadRequest, NotFound } from './error/errors'

export type TVehicle = 'CAR' | 'MOTORCYCLE'

export class Vehicle {
  private _model: string
  private _color: string
  private _chassis: string
  private _type: TVehicle
  private _plate: string
  private _dailyRental: number
  private _rented: boolean
  private _increasePorcentage: number

  static vehicles: Vehicle[] = []

  constructor(
    model: string,
    color: string,
    chassis: string,
    type: TVehicle,
    plate: string,
    dailyRental: number,
  ) {
    this._model = model
    this._color = color
    this._chassis = chassis
    this._type = type
    this._plate = plate
    this._dailyRental = dailyRental
    this._rented = false
    this._increasePorcentage = (type === 'CAR') ? 10 : 5
  }

  get model(): string {
    return this._model
  }

  get color(): string {
    return this._color
  }

  get chassis(): string {
    return this._chassis
  }

  get type(): TVehicle {
    return this._type
  }

  get plate(): string {
    return this._plate
  }

  get dailyRental(): number {
    return this._dailyRental
  }

  get rented(): boolean {
    return this._rented
  }

  get increasePorcentage(): number {
    return this._increasePorcentage
  }

  set color(newColor: string) {
    this._color = newColor
  }

  set chassis(newChassis: string) {
    this._chassis = newChassis
  }

  set type(newType: TVehicle) {
    this._type = newType
  }

  set plate(newPlate: string) {
    this._plate = newPlate
  }

  set dailyRental(newDailyRental: number) {
    if (newDailyRental <= 0) {
      throw new BadRequest('O valor do aluguel deve ser maior que zero')
    }
    this._dailyRental = newDailyRental
  }

  set rented(newRented: boolean) {
    if (this._rented === newRented) {
      throw new BadRequest('Não pode ser alterado para o mesmo status')
    }
    this._rented = newRented
  }

  static findPlate(plate: string): boolean {
    return this.vehicles.some(vehicle => vehicle.plate === plate)
  }

  static create(vehicle: Vehicle): Vehicle {
    const alreadyExistsVehicle = this.findPlate(vehicle.plate)

    if (alreadyExistsVehicle) {
      throw new BadRequest('Veículo já cadastrado')
    }

    this.vehicles.push(vehicle)

    return vehicle
  }

  static delete(plate: string): boolean {
    const vehicleDeleted = this.vehicles.find(
      (vehicle) => vehicle.plate === plate,
    )

    // console.log(vehicleDeleted)

    if (vehicleDeleted == undefined) {
      throw new NotFound('Veículo não encontrado')
    }

    if (vehicleDeleted.rented) {
      throw new BadRequest('Veículo está alugado e não pode ser excluído')
    }

    const index = this.vehicles.indexOf(vehicleDeleted)

    this.vehicles.splice(index, 1)

    return true
  }

  static getByPlate(plate: string): Vehicle {
    const vehicle = this.vehicles.find(
      (vehicle) => vehicle.plate === plate,
    )

    if (!vehicle) {
      throw new NotFound('Veículo não foi encontrado')
    }

    return vehicle
  }

  static getAll(): Vehicle[] {
    if (!this.vehicles.length) {
      throw new NotFound('Nenhum veículo foi encontrado')
    }

    return this.vehicles
  }

  static listRentedVehicles(): Vehicle[] {
    const rentedVehicles = this.vehicles.filter((vehicle) => vehicle._rented === true)

    if (!rentedVehicles.length) {
      throw new NotFound('Não há nenhum veículo alugado')
    }

    return rentedVehicles
  }

  static listAvailableVehicles(): Vehicle[] {
    const availableVehicles = this.vehicles.filter((vehicle) => vehicle._rented === false)

    if (!availableVehicles.length) {
      throw new NotFound('Não há nenhum veículo disponível')
    }

    return availableVehicles
  }
}
