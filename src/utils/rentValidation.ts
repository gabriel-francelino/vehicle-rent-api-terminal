import { differenceInDays } from 'date-fns'
import { Customer } from '../customer'
import { BadRequest, DataInvalid, NotFound } from '../error/errors'
import { Vehicle } from '../vehicle'

// TODO
export const punctuation = {
  A: 1,
  B: 2,
  C: 4,
  D: 8,
  E: 16,
} as const

export function compareLicense(typeVehicle: string, driverLicenseUser: string): boolean {
  if (!typeVehicle) {
    throw new NotFound('Tipo de veiculo inválido')
  }

  const [firstLicence, otherLicence] = driverLicenseUser.split('') // ['A'], ['A', 'B']
  if (!otherLicence) {
    const punctuationDriver = punctuation[firstLicence as keyof object]
    const punctuationVehicle = punctuation[typeVehicle as keyof object]
    const difference = punctuationDriver - punctuationVehicle

    if (firstLicence === driverLicenseUser || difference >= 2) {
      return true
    }

    return false
  }

  return true
}

export function verifyCustomerWithoutRent(customerCpf: string): Customer {
  const customer = Customer.getByCpf(customerCpf)

  if (!customer) {
    throw new DataInvalid("Usuário Inválido")
  }

  if (customer.hasRent) {
    throw new BadRequest("Usuário já possui um veículo alugado")
  }

  return customer
}

export function verifyVehicleWithoutRent(vehiclePlate: string): Vehicle {
  const vehicle = Vehicle.getByPlate(vehiclePlate)

  if (!vehicle) {
    throw new DataInvalid("Veículo Inválido")
  }

  if (vehicle.rented) {
    throw new BadRequest("Veiculo está em uso e não poderá ser alugado")
  }

  return vehicle
}

export function verifyRentalDate(initialDate: Date, endDate: Date): void {
  const difference = differenceInDays(endDate, initialDate)
  const currentDate = new Date()

  if (initialDate < currentDate) {
    throw new BadRequest("A data de locação deve ser maior que a data atual")
  }

  if (difference <= 0) {
    throw new BadRequest("A data de devolução deve ser maior que a data de locação")
  }

}