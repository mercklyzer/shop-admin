import React from "react"
import moment from 'moment-timezone'
import { useNavigate } from "react-router-dom"



const NewUsersCard = ({data}) => {
    const navigate = useNavigate()
    return (
        <div className="p-6 shadow-xl bg-white rounded-lg">
            <div className="mb-4 font-semibold text-xl">New Users</div>
            {
                data.map((user, i) => userRow(user._id, `${user.firstName} ${user.lastName}`, moment(user.createdAt).calendar(), i, navigate))
            }
      </div>
    )
}

const userRow = (id, name, createdAt, i, navigate) => {
    return (
        <div  className="mb-4 flex justify-between items-center cursor-pointer hover:bg-primary-100" key={i} onClick={()=> navigate(`/users/${id}`)}>
            <div className="flex items-center">
                <div className="mr-4 font-medium text-lg ">
                    <div className="text-lg font-bold">{name}</div>
                    <div className="text-sm">{createdAt}</div>
                </div>
            </div>
        </div>
    )
}

export default NewUsersCard