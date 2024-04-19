export interface iUsers {
    data: {
        id: number,
        name: string
    }[]
}

export interface iUser {
    id: number,
    name: string
}

export interface iPaymentDataObj {
    id: string,
    date: string,
    sender: iUser,
    receiver: iUser,
    amount: string,
    currency: string,
    memo: string
}

export interface iPayments {
    data: iPaymentDataObj
}

export const CURRENCIES = [
    'BTC', 'GBP', 'EUR', 'JPY', 'USD'
]