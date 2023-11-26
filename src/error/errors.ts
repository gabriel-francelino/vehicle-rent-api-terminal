export class AlreadyRegistered extends Error {
    constructor(message = 'Cadastrado em duplicidade') {
        super(message)
        this.name = 'AlreadyRegistered'
    }
}

export class NotFound extends Error {
    constructor(message = 'Não encontrado') {
        super(message)
        this.name = 'NotFound'
    }
}

export class DataInvalid extends Error {
    constructor(message = 'Dado inválido') {
        super(message)
        this.name = 'DataInvalid'
    }
}

export class BadRequest extends Error {
    constructor(message = 'Solicitação inválida') {
        super(message)
        this.name = 'BadRequest'
    }
}

export class InternalServer extends Error {
    constructor(message = 'Erro no servidor') {
        super(message)
        this.name = 'InternalServer'
    }
}
