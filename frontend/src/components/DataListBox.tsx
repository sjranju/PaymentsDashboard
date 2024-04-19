import { ChangeEvent } from 'react'
import { iUsers } from '../utils/interfaces'

interface iDataListProps {
    data: iUsers,
    isPending: boolean,
    value: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    label: string,
    list: string,
}

const DataListBox = ({ value, onChange, isPending, data, label, list }: iDataListProps) => {
    return (
        <>
            <label htmlFor={label}>{label}</label>
            <input id={label} type="text" name={label} disabled={isPending}
                className="focus:outline-none border border-gray-200 rounded-md py-1 px-1.5"
                list={list} value={value || ''} onChange={onChange} />
            <datalist id={list} className="text-red">
                {
                    isPending ?
                        <option value=" " disabled>Loading</option>
                        :
                        data?.data.map(user =>
                            <option key={user.id} value={user.name} className="">
                                {user.name}
                            </option>
                        )
                }
            </datalist>
        </>
    )
}

export default DataListBox
