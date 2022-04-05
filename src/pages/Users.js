import React, { useEffect, useState } from "react";
import { getUsers } from "../apiCalls/user.apiCall";
import { useToken } from "../hooks/useToken";
import moment from "moment-timezone";

const Users = props => {
    const token = useToken()
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true)
            const [data, err] = await getUsers(token)
            console.log(data);
            setUsers(data)
            setIsLoading(false)
        }
        fetchUsers()
    }, [])


    return (
        <>
        <div className="p-6 shadow-xl bg-white rounded-lg">
            <div className="text-2xl font-bold">Users</div>
        </div>
        <div className="mt-6 p-6 shadow-xl bg-white rounded-lg">
            <table className="w-full">
                <thead>
                    <tr className="">
                        <th className="text-left p-2 text-lg">User</th>
                        <th className="text-left p-2 text-lg">Email</th>
                        <th className="text-left p-2 text-lg">Member Since</th>
                        <th className="text-left p-2 text-lg">Total Spending</th>
                    </tr>
                </thead>
                {users && <tbody>
                    {users.map(({_id, firstName, lastName, email, createdAt, totalSpending}, i) => <tr className="cursor-pointer group hover:bg-primary-100">
                        <td className="p-2 group-hover:font-semibold">{firstName} {lastName}</td>
                        <td className="p-2 group-hover:font-semibold">{email}</td>
                        <td className="p-2 group-hover:font-semibold">{moment(createdAt).calendar()}</td>
                        <td className="p-2 group-hover:font-semibold">${totalSpending}.00</td>
                    </tr>)}
                    
                </tbody>}
            </table>
        </div>
        </>
    )
}

export default Users