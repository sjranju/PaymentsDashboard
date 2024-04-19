import React, { ReactElement, createContext, useState } from 'react'

interface iOpenDialog {
    openDialog: boolean,
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>
}

export const OpenPaymentDialogContext = createContext<iOpenDialog>({} as iOpenDialog)

const OpenDialogContext = (props: { children: ReactElement }) => {

    const [openDialog, setOpenDialog] = useState<boolean>(false)

    return (
        <OpenPaymentDialogContext.Provider value={{ openDialog, setOpenDialog }}>
            {props.children}
        </OpenPaymentDialogContext.Provider>
    )
}

export default OpenDialogContext
