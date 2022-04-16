import React from "react"
import Status from "./Status"
import moment from 'moment-timezone'
import { useNavigate } from "react-router-dom"


const LatestTransactionsCard = ({data}) => {
    const navigate = useNavigate()

    return (
        <div className="p-6 shadow-xl bg-white rounded-lg">
            <div className="mb-4 font-semibold text-xl">Latest Transactions</div>
            <table className="w-full">
                <thead>
                    <tr className="">
                        <th className="text-left p-2 text-lg">User</th>
                        <th className="text-left p-2 text-lg">Date</th>
                        <th className="text-left p-2 text-lg">Amount</th>
                        <th className="text-left p-2 text-lg">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(({_id, user, updatedAt, total, status}, i) => (
                            transactionRow(_id, user.firstName + " " + user.lastName, updatedAt, total, status, navigate, i)
                        ))
                    }
                    
                </tbody>
            </table>
        </div>
    )
}

const transactionRow = (id, name, transactionDate, amount, status, navigate, i) => {
    return (
        <tr className="cursor-pointer hover:bg-primary-100" key={i} onClick={()=> navigate(`/orders/${id}`)}>
            <td className="p-2 flex items-center">
                <div className="font-semibold">{name}</div>
            </td>
            <td className="p-2">{moment(transactionDate).calendar()}</td>
            <td className="p-2">${amount}.00</td>
            <td className="">
                <Status status={status} />
            </td>
        </tr>
    )
}

export default LatestTransactionsCard