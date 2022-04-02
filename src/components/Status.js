import React from "react"

const getClassNames = (status) => {
    status = status.toLowerCase()
    const classNames =  {
        completed: 'px-2 py-1 bg-green-300 text-emerald-800 rounded-lg',
        pending: 'px-2 py-1 text-orange-500 bg-yellow-200 rounded-lg'
    }

    return classNames[status]
}

const Status = ({status, className}) => {
    
    return (
        <span className={`${getClassNames(status)} ${className}`}>{status}</span>
    )
}

export default Status