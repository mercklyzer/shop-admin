import React, { useEffect, useState } from "react"
import { getLatestTransactions } from "../apiCalls/order.apiCall";
import { getMonthlyGrossSales, getMonthlyNetSales, getSalesStats } from "../apiCalls/product.apiCall";
import { getNewMonthlyUsersCount, getNewUsers, getUserStats } from "../apiCalls/user.apiCall";
import Chart from "../components/Chart";
import LatestTransactionsCard from "../components/LatestTransactionsCard";
import NewUsersCard from "../components/NewUsersCard";
import ReportCard from "../components/ReportCard";
import { useToken } from "../hooks/useToken";


const Dashboard = props => {
  const token = useToken()

  const [isLoading, setIsLoading] = useState({
    newMonthlyUsersCount: true,
    monthlyNetSales: true,
    monthlyGrossSales: true,
    usersChart: true,
    salesChart: true,
    newUsers: true,
    latestTransactions: true
  })

  const [userStats, setUserStats] = useState([])
  const [salesStats, setSalesStats] = useState([])
  const [newMonthlyUsersCount, setNewMonthlyUsersCount] = useState(null)
  const [monthlyNetSales, setMonthlyNetSales] = useState(null)
  const [monthlyGrossSales, setMonthlyGrossSales] = useState(null)
  const [newUsers, setNewUsers] = useState([])
  const [latestTransactions, setLatestTransactions] = useState([])

  useEffect(() => {
    const fetchUserStats = async () => {
      setIsLoading(loaders => ({...loaders, usersChart: true}))
      let [data, err] = await getUserStats(token)
      data = data.map(stat => ({...stat, name: `${stat.month} ${stat.year}`}))
      setUserStats(data)
      setIsLoading(loaders => ({...loaders, usersChart: false}))
    }
    fetchUserStats()
  }, [])

  useEffect(() => {
    const fetchSalestats = async () => {
      setIsLoading(loaders => ({...loaders, salesChart: true}))
      let [data, err] = await getSalesStats(token)
      data = data.map(stat => ({...stat, name: `${stat.month} ${stat.year}`}))
      setSalesStats(data)
      setIsLoading(loaders => ({...loaders, usersChart: false}))
    }
    fetchSalestats()
  }, [])

  useEffect(() => {
    const fetchNewMonthlyUsers = async () => {
      setIsLoading(loaders => ({...loaders, newMonthlyUsersCount: true}))
      let [data, err] = await getNewMonthlyUsersCount(token)
      setNewMonthlyUsersCount(data)
      setIsLoading(loaders => ({...loaders, newMonthlyUsersCount: false}))
    }
    fetchNewMonthlyUsers()
  }, [])

  useEffect(() => {
    const fetchMonthlyNetSales = async () => {
      setIsLoading(loaders => ({...loaders, monthlyNetSales: true}))
      let [data, err] = await getMonthlyNetSales(token)
      setMonthlyNetSales(data)
      setIsLoading(loaders => ({...loaders, monthlyNetSales: false}))
    }
    fetchMonthlyNetSales()
  }, [])

  useEffect(() => {
    const fetchMonthlyGrossSales = async () => {
      setIsLoading(loaders => ({...loaders, monthlyGrossSales: true}))
      let [data, err] = await getMonthlyGrossSales(token)
      setMonthlyGrossSales(data)
      setIsLoading(loaders => ({...loaders, monthlyGrossSales: false}))
    }
    fetchMonthlyGrossSales()
  }, [])

  useEffect(() => {
    const fetchNewUsers = async () => {
      setIsLoading(loaders => ({...loaders, newUsers: true}))
      let [data, err] = await getNewUsers(token)
      setNewUsers(data)
      setIsLoading(loaders => ({...loaders, newUsers: false}))
      console.log(data);
    }
    fetchNewUsers()
  }, [])

  useEffect(() => {
    const fetchLatestTransactions = async () => {
      setIsLoading(loaders => ({...loaders, latestTransactions: true}))
      let [data, err] = await getLatestTransactions(token)
      setLatestTransactions(data)
      setIsLoading(loaders => ({...loaders, latestTransactions: false}))
      console.log(data);
    }
    fetchLatestTransactions()
  }, [])


  return (
    <div className={props.className}>
        <div className="grid grid-cols-3 gap-8 pb-8">
          {monthlyGrossSales && <ReportCard title="Gross Sales" currency={true} figure={monthlyGrossSales.now} percentage={monthlyGrossSales.percentageIncrease}/>}
          {monthlyNetSales && <ReportCard title="Net Sales" currency={true} figure={monthlyNetSales.now} percentage={monthlyNetSales.percentageIncrease}/>}
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
            {newUsers && <NewUsersCard data={newUsers}/>}
          </div>
          <div className="col-span-2">
            {latestTransactions && <LatestTransactionsCard data={latestTransactions}/>}
          </div>
        </div>
    </div>

  )
}

export default Dashboard