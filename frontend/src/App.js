// import './App.css';
// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route,
//   RouterProvider,
// } from "react-router-dom";

// //importing components
// import Main from "./Components/Home/Main";


// function App() {

//   //managing routing configurations
//   const router = createBrowserRouter(

//     //creates routes from elements
//     createRoutesFromElements(

//       //defining the routes with exact path check
//       <Route path="/" exact element={<Main />}></Route>
//     )

//   );

//   return (
//     <div className="App">
//       {/* this make routing available  */}
//       <RouterProvider router={router} />
//     </div>
//   );

// }

// export default App;


// App.js
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./Components/Home/Main";
import PropertyList from './Components/Home/PropertyList';
import PropertyDetails from './Components/PropertyDetails/PropertyDetails';
import {Flip, ToastContainer} from 'react-toastify'
import Login from './Components/User/Login';
import "react-toastify/dist/ReactToastify.css"
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser } from './Store/User/user-action';
import { userActions } from './Store/User/user-slice';
import Signup from './Components/User/Signup';
import Profile from './Components/User/Profile';
import EditProfile from './Components/User/EditProfile';
import UpdatePassword from './Components/User/UpdatePassword';
import ForgotPassword from './Components/User/ForgotPassword';
import ResetPassword from './Components/User/ResetPassword';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from './Components/Payment/Payment';
import MyBookings from './Components/Mybookings/MyBookings';
import BookingDetails from './Components/Mybookings/BookingDetails';
import AccomodationForm from './Components/Accomodation/AccomodationForm';
import Accomodation from './Components/Accomodation/Accomodation';

function App() {
  
  const stripePromise = loadStripe(
    'pk_test_51P0RK9SJdt36HXhEYQqe5j21Ttv9Kq2C10b1vmREmqc559j0qQIvu0KsE0p3tDMHchlAeSQC9IRbsvJZ5oUTYepZ00XRiieL1n')
  const dispatch = useDispatch();
  const {errors} = useSelector((state)=>state.user);
  useEffect(()=>{
    if (errors){
      dispatch(userActions.clearError());
    }dispatch(currentUser());
  }, [errors,dispatch]);
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Main />} id='main' exact>
            <Route id='home' index element={<PropertyList />} exact />
            <Route id='PropertyDetails' path='propertylist/:id' element={<PropertyDetails />}  exact />
            <Route id='login' path='login' element={<Login />} exact />
            <Route id='signup' path='signup' element={<Signup />} exact />
            <Route id='profile' path='profile' element={<Profile />} />
            <Route id='editprofile' path='editprofile' element={<EditProfile />} />
            <Route id='updatepassword' path='user/updatepassword' element={<UpdatePassword />} />
            <Route id='forgotpassword' path='user/forgotpassword' element={<ForgotPassword />} />
            <Route id='resetpassword' path='user/resetpassword/:token' element={<ResetPassword />} />
            <Route id='payment' path='payment/:propertyId' element={<Elements stripe={stripePromise} ><Payment /></Elements>} />
            <Route id='mybookings' path='user/booking' element={<MyBookings />} />
            <Route id='bookingdetails' path='user/booking/:bookingId' element={<BookingDetails />} />
            <Route id='accomodation' path='accommodation' element={<Accomodation />} />

            <Route id='accomodationform' path='accomodationform' element={<AccomodationForm />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer position='bottom-center' autoClose={3000} draggable={true} transition={Flip} />
    </div>
  );
}

export default App;

