import { ChangeEvent } from "react"

interface iInputProps {
    label: string,
    value: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    isPending: boolean
}


const InputBox = ({ label, value, onChange, isPending }: iInputProps) => {
    return (
        <>
            <label htmlFor={label}>{label}</label>
            <input id={label} type="text" value={value || ''}
                onChange={onChange} disabled={isPending}
                className="focus:outline-none border border-gray-200 rounded-md py-1 px-1.5" />
        </>
    )
}

export default InputBox
