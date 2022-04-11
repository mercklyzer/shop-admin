import React from "react"
import moment from 'moment-timezone'

const NewUsersCard = ({data}) => {
    return (
        <div className="p-6 shadow-xl bg-white rounded-lg">
            <div className="mb-4 font-semibold text-xl">New Users</div>
            {
                data.map((user, i) => userRow(`${user.firstName} ${user.lastName}`, moment(user.createdAt).calendar()))
            }
      </div>
    )
}

const userRow = (name, createdAt) => {
    return (
        <div  className="mb-4 flex justify-between items-center">
            <div className="flex items-center">
                <div className="mr-4 font-medium text-lg ">
                    <div className="text-lg font-bold">{name}</div>
                    <div className="text-sm">{createdAt}</div>
                </div>
            </div>
            {/* <div className="py-2 px-2 flex shadow-sm rounded-lg bg-gray-200 cursor-pointer hover:text-white hover:bg-gray-700 duration-100">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                <div className="ml-2">See More</div>
            </div> */}
        </div>
    )
}

export default NewUsersCard