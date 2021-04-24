export interface Ilogin {
    email: string
    password: string
}

export interface IloginError {
    location: string[]
    message: string
    path: string[]
}