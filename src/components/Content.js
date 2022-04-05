import React from "react"
import Chart from "./Chart";
import LatestTransactionsCard from "./LatestTransactionsCard";
import NewUsersCard from "./NewUsersCard";
import ReportCard from "./ReportCard";


const Content = props => {
  return (
    <div className={`min-h-[100vh] bg-primary-100 p-8 ${props.className}`}>
      {props.children}
    </div>
  )
}

export default Content