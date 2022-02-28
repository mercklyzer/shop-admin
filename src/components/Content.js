import React from "react"
import Chart from "./Chart";
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
    <div className={`${props.className} `}>
      <div className="bg-white h-16 py-4 px-8 flex justify-end items-center shadow-md sticky top-0">
        <div className="text-slate-700 font-bold">Lyzer</div>
      </div>

      <div className="min-h-[100vh] bg-gray-100">
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
      </div>


    </div>
  )
}

export default Content