import React, { useEffect, useState } from "react"
import { getMonthlyNetSales, getSalesStats } from "../apiCalls/product.apiCall";
import { getNewMonthlyUsersCount, getUserStats } from "../apiCalls/user.apiCall";
import Chart from "../components/Chart";
import LatestTransactionsCard from "../components/LatestTransactionsCard";
import NewUsersCard from "../components/NewUsersCard";
import ReportCard from "../components/ReportCard";
import { useToken } from "../hooks/useToken";


const Dashboard = props => {
  const token = useToken()
  console.log(token);

  const [isLoading, setIsLoading] = useState({
    revenue: true,
    sales: true,
    newMonthlyUsersCount: true,
    monthlyNetSales: true,
    usersChart: true,
    salesChart: true,
  })

  const [userStats, setUserStats] = useState([])
  const [salesStats, setSalesStats] = useState([])
  const [newMonthlyUsersCount, setNewMonthlyUsersCount] = useState(null)
  const [monthlyNetSales, setMonthlyNetSales] = useState(null)

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

  useEffect(() => {
    const fetchNewMonthlyUsers = async () => {
      setIsLoading(loaders => ({...loaders, newMonthlyUsersCount: true}))
      let [data, err] = await getNewMonthlyUsersCount(token)
      setNewMonthlyUsersCount(data)
      setIsLoading(loaders => ({...loaders, newMonthlyUsersCount: false}))
      console.log(data);
    }
    fetchNewMonthlyUsers()
  }, [])

  useEffect(() => {
    const fetchMonthlyNetSales = async () => {
      setIsLoading(loaders => ({...loaders, monthlyNetSales: true}))
      let [data, err] = await getMonthlyNetSales(token)
      setMonthlyNetSales(data)
      setIsLoading(loaders => ({...loaders, monthlyNetSales: false}))
      console.log(data);
    }
    fetchMonthlyNetSales()
  }, [])


  return (
    <div className={props.className}>
        <div className="grid grid-cols-3 gap-8 pb-8">
          <ReportCard />
          {monthlyNetSales && <ReportCard title="Net Sales (in $)" figure={monthlyNetSales.now} percentage={monthlyNetSales.percentageIncrease}/>}
          {newMonthlyUsersCount && <ReportCard title="New Users" figure={newMonthlyUsersCount.now} percentage={newMonthlyUsersCount.percentageIncrease}/>}
        </div>

        <Chart
            data={salesStats}
            title="Net Sales Analytics (in $)"
            grid
            dataKey="sales"
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