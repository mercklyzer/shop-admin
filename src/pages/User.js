import React, { useEffect, useState } from "react";
import { changeRole, getUser } from "../apiCalls/user.apiCall";
import OrdersTable from "../components/OrdersTable";
import Role from "../components/Role";
import { useToken } from "../hooks/useToken";
import moment from 'moment-timezone'


const User = ({id, className}) => {
    const [isLoading, setIsLoading] = useState(true)
    const token = useToken()
    const [user, setUser] = useState(null)
    const [showRoleOptions, setShowRoleOptions] = useState(false)

    const onChangeRole = async (newRole) => {
        let [data, err] = await changeRole(token, newRole, id)
        if(data){
            setUser(data)
            setShowRoleOptions(false)
        }
        if(err){
            console.log(err);
        }
    } 
    
    useEffect(() => {
        const fetchUser = async () => {
            setIsLoading(true)
            const [data, err] = await getUser(token, id)
            setUser(data)
            console.log(data);
            setIsLoading(false)
        }

        fetchUser()
    }, [])





    return (
        <div className={`p-6 shadow-xl bg-white rounded-lg ${className}`}>
            {user && <>
            <div className="flex justify-between items-center w-full">

                <div>
                    <div className="text-2xl font-bold">{user.firstName} {user.lastName}</div>
                    <div>Member since {moment(user.createdAt).calendar()}</div>
                </div>
                <div className="text-lg font-semibold relative">
                    Role: <Role className="cursor-pointer select-none" role={user.isAdmin? 'Admin': 'Ordinary'} onClick={() => setShowRoleOptions((val) => !val)}/>
                        <div className={`top-full right-0  flex-col absolute ${showRoleOptions? 'flex': 'hidden'}`}>
                            <Role className="mt-2 block cursor-pointer"  role={user.isAdmin? 'Ordinary': 'Admin'} onClick={() => onChangeRole(user.isAdmin? 'Ordinary' : 'Admin')}/>
                        </div>
                </div>
            </div>

            <div className="text-lg mt-4">Total Spending: ${user.totalSpending}.00</div>
            <div className="text-lg mt-6 font-semibold">Recent Orders</div>
            <OrdersTable userId={id}/>
            </>}
        </div>
    )
}

export default User