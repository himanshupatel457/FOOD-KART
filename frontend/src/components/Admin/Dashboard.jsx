import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, Tooltip, ArcElement, Legend } from 'chart.js'
import Loader from '../layout/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminStats} from "../../redux/actions/adminActions"






ChartJS.register(Tooltip, ArcElement, Legend)

const Box = ({ title, value }) => (
    <div>
        <h3>{title === "Income" && "$"}
            {value}</h3>
        <p>{title}</p>
    </div>
)


const Dashboard = () => {

    const dispatch = useDispatch();
    const {loading,userCount,ordersCount,totalIncome} = useSelector((state)=>state.admin);

    useEffect(()=>{
        dispatch(getAdminStats())
    },[dispatch])






    const data = {
        labels: ["preparing ", "checking", "delivered"],
        datasets: [{
            label: "# of orders",
            data: ordersCount?[ordersCount.preparing,ordersCount.shipped,ordersCount.delivered]:[0,0,0],
            backgroundColor: ["rgba(143, 18, 9)", "rgba(33, 33, 33);", "rgba(255, 187, 51)"],
            borderColor: [],
            borderWidth:1,
        }
        ]
    }
    return (
        <section className='dashboard'>
            {
                loading===false?<main>
                <article>
                    <Box title="Users" value={userCount} />
                    <Box title="Orders" value={ordersCount.total} />
                    <Box title="Income" value={totalIncome} />
                </article>
                <section>
                    <div>
                        <Link to='/admin/orders'>View Orders</Link>
                        <Link to='/admin/users'>View Users</Link>
                    </div>
                    <aside>
                        <Doughnut data={data} />
                    </aside>
                </section>
            </main> : <Loader />
            }
        </section>
    )
}

export default Dashboard