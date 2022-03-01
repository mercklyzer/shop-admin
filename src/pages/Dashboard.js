import React from "react"
import Chart from "../components/Chart";
import LatestTransactionsCard from "../components/LatestTransactionsCard";
import NewUsersCard from "../components/NewUsersCard";
import ReportCard from "../components/ReportCard";

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

const Dashboard = props => {
  return (
    <>
        <div className="grid grid-cols-3 gap-8 p-8">
          <ReportCard />
          <ReportCard />
          <ReportCard />
        </div>

        <Chart
            data={userData}
            title="User Analytics"
            grid
            dataKey="Active User"
        />

        <div className="grid grid-cols-3 gap-8 p-8">
          <div className="col-span-1">
            <NewUsersCard />
          </div>
          <div className="col-span-2">
            <LatestTransactionsCard />
          </div>
        </div>
    </>

  )
}

export default Dashboard