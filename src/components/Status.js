import React from "react"

const getClassNames = (content) => {
    const classNames =  {
        completed: 'px-2 py-1 bg-green-300 text-emerald-800 rounded-lg',
        pending: ''
    }

    return classNames[content]
}

const Status = ({content, className}) => {
    
    return (
        <span className={`${getClassNames(content)} ${className}`}>{content}</span>
    )
}

export default Status