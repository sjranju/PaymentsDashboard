import { useContext } from "react"
import { iPaymentDataObj } from "../utils/interfaces"
import { NewPaymentContext } from "../context/NewPaymentAdded"

const PaymentData = ({ data }: { data: iPaymentDataObj }) => {
    const { newPayment } = useContext(NewPaymentContext)

    return (
        <div className={`grid grid-cols-[200px_200px_200px_200px_300px] justify-center items-center w-full border-b border-x border-b-slate-200 rounded-sm py-2 text-[15px] ${newPayment === data.id ? 'animate-animateNewPaymentWithBg' : 'animate-animateNewPayment'}`}>
            <p className='items-start'>{data.date}</p>
            <p className='items-start'>{data.sender.name}</p>
            <p className='items-start'>{data.receiver.name}</p>
            <p className='items-start'>{data.amount}<span className='ml-1'>{data.currency}</span></p>
            <p className='items-start truncate'>{data.memo}</p>
        </div>
    )
}

export default PaymentData
