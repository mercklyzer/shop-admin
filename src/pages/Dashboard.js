import React, { useEffect, useState } from "react"
import { getSalesStats } from "../apiCalls/product.apiCall";
import { getUserStats } from "../apiCalls/user.apiCall";
import Chart from "../components/Chart";
import LatestTransactionsCard from "../components/LatestTransactionsCard";
import NewUsersCard from "../components/NewUsersCard";
import ReportCard from "../components/ReportCard";
import { useToken } from "../hooks/useToken";

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
  name: "Aug",
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
  const token = useToken()

  const [isLoading, setIsLoading] = useState({
    revenue: true,
    sales: true,
    newUsers: true,
    usersChart: true,
    salesChart: true,
  })

  const [userStats, setUserStats] = useState([])
  const [salesStats, setSalesStats] = useState([])

  useEffect(() => {
    const fetchUserStats = async () => {
      setIsLoading(loaders => ({...loaders, usersChart: true}))
      let [data, err] = await getUserStats(token)
      data = data.map(stat => ({...stat, name: `${stat.month} ${stat.year}`}))
      setUserStats(data)
      setIsLoading(loaders => ({...loaders, usersChart: false}))
      console.log(data);
    }
    fetchUserStats()
  }, [])

  useEffect(() => {
    const fetchSalestats = async () => {
      setIsLoading(loaders => ({...loaders, usersChart: true}))
      let [data, err] = await getSalesStats(token)
      data = data.map(stat => ({...stat, name: `${stat.month} ${stat.year}`}))
      setSalesStats(data)
      setIsLoading(loaders => ({...loaders, usersChart: false}))
      console.log(data);
    }
    fetchSalestats()
  }, [])


  return (
    <div className={props.className}>
        <div className="grid grid-cols-3 gap-8 pb-8">
          <ReportCard />
          <ReportCard />
          <ReportCard />
        </div>

        <Chart
            data={salesStats}
            title="Sales Analytics"
            grid
            dataKey="total"
            className="mb-6"
        />

        <Chart
            data={userStats}
            title="New Users Analytics"
            grid
            dataKey="total"
        />

        <div className="grid grid-cols-3 gap-8 mt-8">
          <div className="col-span-1">
            <NewUsersCard />
          </div>
          <div className="col-span-2">
            <LatestTransactionsCard />
          </div>
        </div>
    </div>

  )
}

export default Dashboard