import { AlreadyRegistered, NotFound } from './error/errors'

export enum ECategoryType {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  AB = 'AB',
  AC = 'AC',
  AD = 'AD',
  AE = 'AE',
}
export class Customer {
  private _cpf: string
  private _name: string
  private _dateOfBirth: Date
  private _driverLicense: ECategoryType
  private _hasRent: boolean

  private static customers: Customer[] = []

  constructor(
    cpf: string,
    name: string,
    dateOfBirth: Date,
    driverLicense: ECategoryType,
  ) {
    this._cpf = cpf
    this._name = name
    this._dateOfBirth = dateOfBirth
    this._driverLicense = driverLicense
    this._hasRent = false
  }

  get cpf(): string {
    return this._cpf
  }

  get name(): string {
    return this._name
  }

  get dateOfBirth(): Date {
    return this._dateOfBirth
  }

  get driverLicense(): string {
    return this._driverLicense
  }

  get hasRent(): boolean {
    return this._hasRent
  }

  set hasRent(hasRent: boolean) {
    this._hasRent = hasRent
  }

  static create(newCustomer: Customer): Customer {
    const alreadyExistsCustomer = this.customers.some(
      customer => customer.cpf === newCustomer.cpf,
    )

    if (alreadyExistsCustomer) {
      throw new AlreadyRegistered('Cliente já registrado')
    }

    this.customers.push(newCustomer)

    return newCustomer
  }

  static getByCpf(customerCpf: string): Customer {
    const customer = this.customers.find(
      (customer) => customer.cpf === customerCpf,
    )

    if (!customer) {
      throw new NotFound('Cliente não foi encontrado')
    }

    return customer
  }

  static getAll(): Customer[] {
    if (!this.customers.length) {
      throw new NotFound('Nenhum cliente foi encontrado')
    }

    return this.customers
  }

  static delete(customerCpf: string): boolean {
    const customerIndex = this.customers.findIndex(
      (customer) => customer._cpf === customerCpf,
    )

    if (customerIndex === -1) {
      throw new NotFound('Cliente não foi encontrado')
    }

    this.customers.splice(customerIndex, 1)
    return true
  }
}
