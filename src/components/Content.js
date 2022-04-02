import React from "react"
import Chart from "./Chart";
import LatestTransactionsCard from "./LatestTransactionsCard";
import NewUsersCard from "./NewUsersCard";
import ReportCard from "./ReportCard";

const userData = [
{
  name: "Jan",
  "Active User": 4000,
},
{
  name: "Feb",
  "Active User": 3000,
},
{
  name: "Mar",
  "Active User": 5000,
},
{
  name: "Apr",
  "Active User": 4000,
},
{
  name: "May",
  "Active User": 3000,
},
{
  name: "Jun",
  "Active User": 2000,
},
{
  name: "Jul",
  "Active User": 4000,
},
{
  name: "Agu",
  "Active User": 3000,
},
{
  name: "Sep",
  "Active User": 4000,
},
{
  name: "Oct",
  "Active User": 1000,
},
{
  name: "Nov",
  "Active User": 4000,
},
{
  name: "Dec",
  "Active User": 3000,
},
];

const Content = props => {
  return (
    <div className={`${props.className}`}>
      <div className="min-h-[100vh] bg-primary-100 p-8">
        {props.children}
      </div>
    </div>
  )
}

export default Content