import React from "react"
import Status from "./Status"

const transactionsData = [
    {
        firstName: "Lyzer",
        lastName: "Bautista",
        transactionDate: "24 May 2021",
        amount: 144,
        status: "Completed"
    },
    {
        firstName: "Lyzer",
        lastName: "Bautista",
        transactionDate: "24 May 2021",
        amount: 144,
        status: "Completed"
    },
    {
        firstName: "Lyzer",
        lastName: "Bautista",
        transactionDate: "24 May 2021",
        amount: 144,
        status: "Completed"
    },
    {
        firstName: "Lyzer",
        lastName: "Bautista",
        transactionDate: "24 May 2021",
        amount: 144,
        status: "Completed"
    },
]

const LatestTransactionsCard = props => {
    return (
        <div className="p-6 shadow-xl bg-white rounded-lg">
            <div className="mb-4 font-semibold text-xl">Latest Transactions</div>
            <table className="w-full">
                <thead>
                    <tr className="">
                        <th className="text-left p-2 text-lg">Customer</th>
                        <th className="text-left p-2 text-lg">Date</th>
                        <th className="text-left p-2 text-lg">Amount</th>
                        <th className="text-left p-2 text-lg">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        transactionsData.map(({firstName, lastName, transactionDate, amount, status}) => (
                            transactionRow(firstName + " " + lastName, transactionDate, amount, status)
                        ))
                    }
                    
                </tbody>
            </table>
        </div>
    )
}

const transactionRow = (name, transactionDate, amount, status) => {
    return (
        <tr>
            <td className="p-2 flex items-center">
                <div className="w-10 h-10 bg-red-900 rounded-full"></div>
                <div className="ml-4 font-semibold">{name}</div>
            </td>
            <td className="p-2">{transactionDate}</td>
            <td className="p-2">${amount}.00</td>
            <td className="">
                <Status status={status} />
            </td>
        </tr>
    )
}

export default LatestTransactionsCard