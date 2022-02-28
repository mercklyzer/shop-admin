import React from "react"

const ReportCard = props => {
    return (
        <div className="p-4 shadow-xl bg-white rounded-lg">
            <div className="mb-4 font-semibold text-xl">Revenue</div>
            <div  className="mb-4 flex items-center">
            <div className="mr-8 font-bold text-2xl">$2,415</div>
            <div className="mr-4 text-lg">-11.4%</div>
                <svg className="w-6 h-6 stroke-red-600" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
            </div>
            <div className="mb-4 text-gray-500">Compared to last month</div>
      </div>
    )
}

export default ReportCard