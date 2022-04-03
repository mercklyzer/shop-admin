import React, { useState } from "react"

const useSorter = (initialValues) => {
    const [values, setValues] = useState(initialValues)

    return [
        values,
        (field) => {
            console.log("field");
            let sortValue = 'asc'

            if(values[field] === 'asc'){
                sortValue = 'desc'
            }

            setValues({initialValues, [field]: sortValue})
        }
    ]
}

export default useSorter