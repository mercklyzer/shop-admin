import { useState } from "react"

export const useForm = initialValues => {
    const [values, setValues] = useState(initialValues)

    return [
        values,
        e => {
            console.log({...values, [e.target.name]:e.target.value});
            setValues((values) => ({
                ...values,
                [e.target.name]: e.target.value
            }))
        },
        () => setValues(initialValues)
    ]
}

export default useForm