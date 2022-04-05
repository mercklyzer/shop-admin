import React from "react"

const getClassNames = (status) => {
    status = status.toLowerCase()
    const classNames =  {
        admin: 'px-2 py-1 bg-blue-200 text-blue-700 rounded-lg',
        ordinary: 'px-2 py-1 text-pink-700 bg-rose-200 rounded-lg'
    }

    return classNames[status]
}

const Role = ({role, className, onClick}) => {
    
    return (
        <span className={`${getClassNames(role)} ${className}`} onClick={onClick}>{role}</span>
    )
}

export default Role