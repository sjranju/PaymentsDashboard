import axios from 'axios'
import { useCallback, useContext, useEffect, useState } from 'react'
import { iPayments, iPaymentDataObj, flattenObject, REACT_APP_BACKEND_URL } from '../utils/interfaces'
import { PaymentListContext } from '../context/PaymentsContext'
import { useQuery } from '@tanstack/react-query'
import { IoSearch, IoClose } from "react-icons/io5";
import PaymentData from '../components/PaymentData'
import CreatePayment from '../components/CreatePayment'
import { OpenPaymentDialogContext } from '../context/OpenDialogContext'

const Dashboard = () => {
    const [searchString, setSearchString] = useState<string>('')
    const [filteredPaymentList, setFilteredPaymentList] = useState<iPaymentDataObj[]>([])
    const { paymentList, setPaymentList } = useContext(PaymentListContext)
    const { setOpenDialog, openDialog } = useContext(OpenPaymentDialogContext)

    // get /payments
    const fetchPayment = async () => {
        try {
            const response = await axios.get(`{${REACT_APP_BACKEND_URL}/api/payments}`)
            const paymentData: iPayments = response.data
            const existingPaymentIDs = paymentList.map(paymentData => paymentData.id)

            // If get /payments request was done again withint the same clock second then dont display it again
            if (!existingPaymentIDs.includes(paymentData.data.id)) {
                // Show only recent 25 payments
                if (paymentList.length > 24) {
                    paymentList.shift()
                }

                // Format date to be human readable
                paymentData.data.date = Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }).format(Date.parse(paymentData.data.date))
                setPaymentList([...paymentList, paymentData.data])
            }
            return response.data
        } catch (error) {
            throw error
        }
    }

    // react-query to get payment data 
    // reactively gets as the server produces new payments on the `GET /payments` endpoint
    const { isError, error: paymentResponseError } = useQuery({
        queryKey: ['paymentData'],
        queryFn: fetchPayment,
        refetchInterval: 1000
    })

    const filterPayments = useCallback(() => {
        // search keyword
        const keyword = searchString.toLowerCase()

        // filter payments - flatten paymentData object, join it and return if keyword exists in that object
        const result = paymentList.filter(paymentData => {
            const found = flattenObject(paymentData)
            return Object.values(found).join(' ').toLowerCase().includes(keyword)
        })
        setFilteredPaymentList(result)
    }, [searchString, paymentList])

    // to be able to seach on click of 'Enter' button on keyboard
    const handleSearchOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            filterPayments()
        }
    }

    // if searchString is present then filter based on it otherwise setFilteredPaymentList to empty array so that payment history updates can be seen
    useEffect(() => {
        if (searchString.length > 0) {
            filterPayments()
        } else {
            setFilteredPaymentList([])
        }
    }, [searchString, filterPayments])

    return (
        <div className="py-8 w-full px-32 bg-neutral-100">
            <div className='relative grid grid-rows-25 items-center w-6/12 grid-flow-row'>
                <div className="grid grid-cols-[600px_350px_150px] gap-2 justify-start items-center w-full my-4">
                    <p className='text-lg font-bold my-4'>Payment History</p>
                    <div className="relative flex items-center w-full h-10 rounded-md shadow-lg bg-white overflow-hidden">
                        <div className="grid place-items-center h-full w-12 text-gray-300">
                            <IoSearch size={22} />
                        </div>

                        <input className="peer h-full w-full outline-none text-sm text-gray-700 pr-2 border-gray-600"
                            type="text" id="search" placeholder="Search here..."
                            value={searchString}
                            onChange={(e) => setSearchString(e.target.value)}
                            onKeyDown={(e) => handleSearchOnEnter(e)} />
                        <div className="">
                            {
                                searchString
                                &&
                                <button className='py-1 rounded-md font-semibold'
                                    onClick={() => {
                                        setFilteredPaymentList([])
                                        setSearchString('')
                                    }}><IoClose size={22} className='text-gray-500 mr-2' /></button>
                            }
                        </div>
                    </div>
                    <button className='h-10 bg-blue-700 text-white px-2 py-1 rounded-md font-semibold'
                        data-modal-target="make-payment-modal" data-modal-toggle="make-payment-modal"
                        onClick={() => setOpenDialog(true)}
                    >
                        Make Payment +
                    </button>
                </div>
                <div className='grid grid-cols-[200px_200px_200px_200px_300px] justify-center items-center w-full font-semibold border-b border-b-slate-200 py-2 bg-blue-700 text-white rounded-t-lg mt-4'>
                    <h2 className=''>Date</h2>
                    <h2 className=''>Sender</h2>
                    <h2 className=''>Receiver</h2>
                    <h2 className=''>Amount</h2>
                    <h2 className=''>Narrative</h2>
                </div>
                {
                    isError &&
                    <p className='text-red-600 text-sm'>{paymentResponseError.message}</p>
                }
                {
                    filteredPaymentList.length > 0
                        ?
                        [...filteredPaymentList].reverse().map(payment =>
                            <PaymentData key={payment.id} data={payment} />
                        )
                        :
                        [...paymentList].reverse().map(payment =>
                            <PaymentData key={payment.id} data={payment} />
                        )
                }
                {
                    openDialog && <CreatePayment />
                }
            </div>
        </div >
    )
}

export default Dashboard
