import React from "react"
import CountUp from 'react-countup';
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";

const ReportCard = ({title, figure, percentage, currency, isLoading}) => {
    return (
        <div className="p-6 shadow-xl bg-white rounded-lg">


        <ReactPlaceholder type='text' rows={3} ready={!isLoading}>
            
            <div className="mb-4 font-semibold text-xl">{title}</div>
            <div className="mb-4 flex items-center">
                <div className="mr-8 font-bold text-4xl">{currency? '$':''}{<CountUp end={figure} duration={2}/>}</div>
                <div className="mr-4 font-medium text-lg">{percentage !== "Inf"? `${(percentage*100).toFixed(1)}%` : ''}</div>
                {percentage !== "Inf" && percentage < 0 && <svg className="w-6 h-6 stroke-red-600" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>}
                {percentage !== "Inf" && percentage > 0 && <svg className="w-6 h-6 rotate-180 stroke-green-600" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>}
            </div>
            {<div className={`mb-4 font-semibold text-gray-500 ${percentage === "Inf"? 'hidden':''}`}>Compared to last month</div>}
            
        </ReactPlaceholder>
      </div>
    )
}

export default ReportCard