import "./styles/app.scss";
import "./styles/footer.scss";
import "./styles/Header.scss";
import "./styles/Home.scss";
import "./styles/Founder.scss";
import "./styles/Menu.scss";
import "./styles/Contact.scss";
import "./styles/Cart.scss";
import "./styles/shipping.scss";
import "./styles/confirmOrder.scss";
import "./styles/PaymentSucces.scss";
import "./styles/Login.scss";
import "./styles/Profile.scss";
import "./styles/Table.scss";
import "./styles/OrderDetails.scss";
import "./styles/Dashboard.scss";
import "./styles/Orders.scss";
import "./styles/About.scss";
import "./styles/NotFound.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Contact from "./components/Contact/Contact";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import PaymentSuccess from "./components/Cart/PaymentSuccess";
import Login from "./components/login/Login";
import Profile from "./components/profile/Profile";
import OrderDetails from "./components/myorders/OrderDetails.jsx";
import Myorders from "./components/myorders/Myorders";
import Dashboard from "./components/Admin/Dashboard";
import Users from "./components/Admin/Users";
import Orders from "./components/Admin/Orders";
import About from "./components/About/About";
import NotFound from "./components/layout/NotFound";
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { loadUser } from "./redux/actions/userActions";
import toast, { Toaster } from "react-hot-toast"
import { ProtectedRoute } from "protected-route-react";



function App() {
  const dispatch = useDispatch();
  const { error, message, user, isAuthenticated } = useSelector((state) => state.auth)
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch])

  //toaster use
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({
        type: "clearError",
      })
    }

    if(message){
      toast.success(message);
      dispatch({
        type:"clearMesage",
      })
    }
  }, [dispatch, error,message]);


  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/me" ><Login /></ProtectedRoute>} />


        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/me" element={<Profile />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/confirmOrder" element={<ConfirmOrder />} />
          <Route path="/myorders" element={<Myorders />} />
          <Route path="/order/:id" element={<OrderDetails />} />
          <Route path="/paymentsuccess" element={<PaymentSuccess />} />
        </Route>


        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role==="admin"} redirectAdmin="/me" />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/orders" element={<Orders />} />
        </Route>



        <Route path="*" element={<NotFound />} />

      </Routes>
      <Footer />

      <Toaster />
    </Router>
  )
}

export default App;
