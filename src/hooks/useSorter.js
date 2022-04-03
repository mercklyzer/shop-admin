import { useState } from "react"

const useSorter = (initialValues, initialField) => {
    const [values, setValues] = useState(initialValues)

    return [
        values,
        (field) => {
            let sortValue = 'asc'

            if(values[field] === 'asc'){
                sortValue = 'desc'
            }
            
            setValues({...initialValues, [initialField]:'', [field]: sortValue})
        }
    ]
}

export default useSorter