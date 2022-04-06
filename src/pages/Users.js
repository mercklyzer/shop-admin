import React, { useEffect, useState } from "react";
import { getUsers } from "../apiCalls/user.apiCall";
import { useToken } from "../hooks/useToken";
import moment from "moment-timezone";
import Role from "../components/Role";
import useSorter from "../hooks/useSorter";

const Users = props => {
    const token = useToken()
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [sorter, setSorter] = useSorter({
        user: '',
        email: '',
        memberSince: 'desc',
        role: '',
        totalSpending: ''
    }, 'memberSince')
    
    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true)
            let fields = Object.keys(sorter)
            let chosenField = ''
            let sort = ''
            for(let field of fields){
                if(sorter[field] !== ''){
                    chosenField = field
                    sort = sorter[field]
                    break;
                }
            }

            const [data, err] = await getUsers(token, chosenField, sort)
            console.log(data);
            setUsers(data)
            setIsLoading(false)
        }
        fetchUsers()
    }, [sorter])


    return (
        <div className={props.className}>
            <div className={`p-6 shadow-xl bg-white rounded-lg`}>
                <div className="text-2xl font-bold">Users</div>
            </div>
            <div className="mt-6 p-6 shadow-xl bg-white rounded-lg">
                <table className="w-full">
                    <thead>
                        <tr className="">
                        {[
                                {field: 'User', value: 'user'},
                                {field: 'Email', value: 'email'},
                                {field: 'Member Since', value: 'memberSince'},
                                {field: 'Role', value: 'role'},
                                {field: 'Total Spending', value: 'totalSpending'},
                            ].map(({field, value}, i) => {
                                if(sorter[value] !== 'desc'){
                                    return <th className="text-left p-2 text-lg" key={i}>
                                        {field}
                                        <svg 
                                        onClick={() => setSorter(value)}
                                        className={`ml-2 w-6 h-6 inline ${sorter[value]? 'stroke-primary-400': 'stroke-gray-400'} cursor-pointer`} 
                                        fill="none" stroke="" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"></path></svg>
                                    </th>
                                }

                                else if(sorter[value] === 'desc'){
                                    return <th className="text-left p-2 text-lg" key={i}>
                                        {field}
                                        <svg 
                                        onClick={() => setSorter(value)} 
                                        className={`ml-2 w-6 h-6 inline stroke-primary-400 cursor-pointer`} 
                                        fill="none" stroke="" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"></path></svg>
                                    </th>
                                }
                            })}

                        </tr>
                    </thead>
                    {users && <tbody>
                        {users.map(({_id, firstName, lastName, email, createdAt, isAdmin, totalSpending}, i) => <tr className="cursor-pointer group hover:bg-primary-100">
                            <td className="p-2 group-hover:font-semibold">{firstName} {lastName}</td>
                            <td className="p-2 group-hover:font-semibold">{email}</td>
                            <td className="p-2 group-hover:font-semibold">{moment(createdAt).calendar()}</td>
                            <td className="p-2 group-hover:font-semibold">{isAdmin? <Role role='Admin'/> : <Role role='Ordinary'/>}</td>
                            <td className="p-2 group-hover:font-semibold">${totalSpending}.00</td>
                        </tr>)}
                        
                    </tbody>}
                </table>
            </div>
        </div>
    )
}

export default Users