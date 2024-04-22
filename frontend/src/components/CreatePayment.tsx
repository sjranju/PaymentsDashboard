import { Fragment, useContext, useEffect, useRef, useState } from "react"
import { Transition, Dialog } from '@headlessui/react'
import { OpenPaymentDialogContext } from "../context/OpenDialogContext"
import { CURRENCIES, REACT_APP_BACKEND_URL, iPaymentDataObj, iUsers } from "../utils/interfaces"
import axios from "axios"
import { useMutation, useQuery } from "@tanstack/react-query"
import { PaymentListContext } from "../context/PaymentsContext"
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { GoCheckCircle } from "react-icons/go"
import DataListBox from "./DataListBox"
import InputBox from "./InputBox"
import { NewPaymentContext } from "../context/NewPaymentAdded"

const CreatePayment = () => {
    const [sender, setSender] = useState<string>('')
    const [receiver, setReceiver] = useState<string>('')
    const [amount, setAmount] = useState<string>('')
    const [currency, setCurrency] = useState<string>('')
    const [memo, setMemo] = useState<string>('')
    const { openDialog, setOpenDialog } = useContext(OpenPaymentDialogContext)
    const cancelButtonRef = useRef(null)
    const paymentDataRef = useRef<iPaymentDataObj>({} as iPaymentDataObj)
    const { paymentList, setPaymentList } = useContext(PaymentListContext)
    const { setNewPayment } = useContext(NewPaymentContext)

    // get /users
    const fetchUsers = async () => {
        const response = await axios.get(`${REACT_APP_BACKEND_URL}/api/users`)
        return response.data
    }

    // Get Users' data
    const { data, isError, error: usersError } = useQuery<iUsers>({
        queryKey: ['getUsers'],
        queryFn: fetchUsers
    })

    // Post New Payment
    const postPayment = async (paymentData: iPaymentDataObj) => {
        try {
            const response = await axios({
                method: 'post',
                url: `${REACT_APP_BACKEND_URL}/api/payments`,
                data: paymentData,
                headers: {
                    "Content-Type": "application/json"
                }
            })
            return response.data
        } catch (err) {
            throw err
        }
    }

    // react-query to post new payment data
    const { mutate, isError: isPaymentError, error: createPaymentError, isPending, isSuccess: isPaymentMutationSuccess } = useMutation({
        mutationFn: (data: iPaymentDataObj) => {
            return postPayment(data)
        },
        onSuccess() {
            setNewPayment(paymentDataRef.current.id)
            setPaymentList([...paymentList, paymentDataRef.current])
        },
        onError(error) {
            console.log('error.message', error.message)
        },
        // retry: (count, error) => {
        //     if (error instanceof AxiosError) {
        //         // retry only if error status is 503 and retry count is less than 5
        //         return (error.response?.status === 503 && count < 5)
        //     }
        //     return false
        // }
    }
    )

    // handle form submission - form a payment object to post
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const currentDate = Date.now()
        const paymentBody = {
            id: String(Math.floor((Math.random() * 100) + 200)),
            date: Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }).format(currentDate),
            sender: {
                id: data?.data.find(user => user.name === sender)?.id!,
                name: sender
            },
            receiver: {
                id: data?.data.find(user => user.name === receiver)?.id!,
                name: receiver
            },
            amount: amount,
            currency: currency,
            memo: memo
        }

        // setting paymentDataRef to add this data to payment history
        paymentDataRef.current = paymentBody
        mutate(paymentBody)
    }

    useEffect(() => {

        if (isPaymentMutationSuccess) {
            setTimeout(() => {
                setOpenDialog(false)
            }, 1000);
        }

    }, [isPaymentMutationSuccess, setOpenDialog])

    return (
        <Transition.Root show={openDialog} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpenDialog}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <form onSubmit={e => handleSubmit(e)}>
                                    <div className="bg-white px-4 py-6 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900 text-center">
                                                    Make a New Payment
                                                </Dialog.Title>
                                                <div className="my-4">
                                                    <div className="text-[14px] grid grid-cols-[100px_300px] grid-rows-4 gap-4 items-center justify-center">
                                                        {
                                                            data &&
                                                            <>
                                                                <DataListBox isPending={isPending} value={sender} onChange={(e) => setSender(e.target.value)} data={data} label='Sender' list='senderList' />
                                                                <DataListBox isPending={isPending} value={receiver} onChange={(e) => setReceiver(e.target.value)} data={data} label='Receiver' list='receiverList' />
                                                            </>
                                                        }
                                                        <InputBox label={'Amount'} value={amount} onChange={(e) => setAmount(e.target.value)} isPending={isPending} />
                                                        <label htmlFor="currencies">Currency</label>
                                                        <select name="currencies" id='currencies' value={currency} onChange={e => setCurrency(e.target.value)}
                                                            className="focus:outline-none border border-gray-200 rounded-md py-1 px-1.5">
                                                            <option value="" disabled defaultValue={'Select a currency'}>Select a currency</option>
                                                            {
                                                                CURRENCIES.map((currencyName, i) =>
                                                                    <option key={i} value={currencyName}>{currencyName}</option>
                                                                )
                                                            }
                                                        </select>
                                                        <InputBox label={'Memo'} value={memo} onChange={(e) => setMemo(e.target.value)} isPending={isPending} />
                                                    </div>
                                                </div>
                                                <div className="text-red-500 text-center text-sm my-4">{isPaymentError ? createPaymentError.message : isError && usersError.message}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 items-center justify-center w-full`}>
                                        {
                                            isPaymentMutationSuccess ?
                                                <div className="flex w-44 justify-center items-center space-x-2 rounded-md bg-green-700 px-3 py-2 font-semibold text-white shadow-sm sm:ml-3 sm:w-auto">
                                                    <span>Payment Successfull </span>
                                                    <span><GoCheckCircle /></span>
                                                </div>
                                                :
                                                <button
                                                    type="submit" disabled={isPending}
                                                    className={`flex justify-center items-center space-x-2 rounded-md px-3 py-2 font-semibold text-white shadow-sm hover:bg-blue-600 sm:ml-3 ${isPending ? 'bg-orange-500 w-52' : 'bg-blue-700 w-44'}`} >
                                                    <AiOutlineLoading3Quarters className={`${isPending ? 'animate-spin' : 'hidden'} mr-1`} />
                                                    {
                                                        isPending ?
                                                            'Processing Payment'
                                                            :
                                                            'Send'
                                                    }
                                                </button>
                                        }
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root >
    )
}

export default CreatePayment
