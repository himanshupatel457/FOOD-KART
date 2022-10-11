import React, { useEffect } from 'react'
import { AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { GiArmoredBoomerang } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminOrders, processOrder } from '../../redux/actions/adminActions';
import Loader from '../layout/Loader';
import toast from 'react-hot-toast';









const Orders = () => {



    const dispatch = useDispatch();
    const { loading, orders, message, error } = useSelector((state) => state.admin);


    

    const processOrderHandler = (id) => {
        dispatch(processOrder(id));
    }

    useEffect(() => {

        if (message) {
            toast.success(message);
            dispatch({ type: "clearMessage" });

        }
        if (error) {
            toast.error(error);
            dispatch({ type: "clearError" })
        }



        dispatch(getAdminOrders());
    }, [dispatch, error, message])





    return (
        <section className='tableClass'>
            {
                loading === false ? <main>
                    <table>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Status</th>
                                <th>Quantity</th>
                                <th>Amount</th>
                                <th>Mode of Payment</th>
                                <th>User</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map(i => (
                                    <tr key={i}>
                                        <td>#{i._id}</td>
                                        <td>{i.orderStatus}</td>
                                        <td>{
                                            i.orderItems.sandwich.quantity +
                                            i.orderItems.pizza.quantity +
                                            i.orderItems.french_fries.quantity
                                        }</td>
                                        <td>${i.totalAmount}</td>
                                        <td>{i.paymentMethod}</td>
                                        <td>{i.user.name}</td>
                                        <td><Link to={`/order/${i._id}`} ><AiOutlineEye /></Link>
                                            <button className='boomerang' onClick={() => processOrderHandler(i._id)}>
                                                <GiArmoredBoomerang />
                                            </button>
                                        </td>

                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </main> : <Loader />
            }
        </section>

    )
}

export default Orders