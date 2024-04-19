import React, { ReactElement, createContext, useState } from 'react'
import { iPaymentDataObj } from '../utils/interfaces'

interface iPaymentList {
    paymentList: iPaymentDataObj[],
    setPaymentList: React.Dispatch<React.SetStateAction<iPaymentDataObj[]>>
}

export const PaymentListContext = createContext<iPaymentList>({} as iPaymentList)

const PaymentsContext = (props: { children: ReactElement }) => {

    const [paymentList, setPaymentList] = useState<iPaymentDataObj[]>([])

    return (
        <PaymentListContext.Provider value={{ paymentList, setPaymentList }}>
            {props.children}
        </PaymentListContext.Provider>
    )
}

export default PaymentsContext
