import React, { ReactElement, createContext, useState } from 'react'

interface iNewPayment {
    newPayment: string,
    setNewPayment: React.Dispatch<React.SetStateAction<string>>
}

export const NewPaymentContext = createContext<iNewPayment>({} as iNewPayment)

const NewPaymentAddedContext = (props: { children: ReactElement }) => {

    const [newPayment, setNewPayment] = useState<string>('')

    return (
        <NewPaymentContext.Provider value={{ newPayment, setNewPayment }}>
            {props.children}
        </NewPaymentContext.Provider>
    )
}

export default NewPaymentAddedContext
