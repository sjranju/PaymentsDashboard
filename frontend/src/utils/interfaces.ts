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

// Flat nested sender and receiver objects
export const flattenObject = (obj: any) => {
    const result: any = {}

    for (const i in obj) {
        // if (i !== 'id') - To exclude 'id' from filtering to avoid confusion since it's not displayed in the payment history list 
        // Check the type of the i using typeof() function and recursively call the function
        if ((typeof obj[i] === 'object' && !Array.isArray(obj[i]))) {
            const temp: any = flattenObject(obj[i])
            for (const j in temp) {
                result[i + '.' + j] = temp[j]
            }
        } else {
            result[i] = obj[i]
        }
    }
    return result
}

export const REACT_APP_BACKEND_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'https://paymentsdashboardbackend.netlify.app/';
