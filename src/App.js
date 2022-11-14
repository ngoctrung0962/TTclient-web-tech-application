import './App.css';

import Home from './pages/client/home/Home.page';
import Contact from './pages/client/contact/Contact.page';
import { Route, Routes, useNavigate } from 'react-router-dom'
import Detail from './pages/client/detail/Detail.page';
import SignUp from './pages/authentication/signup/SignUp.page';
import Shop from './pages/client/shop/Shop.page';
import SignIn from './pages/authentication/signin/SignIn.page';
import Cart from './pages/client/cart/Cart.page';
import Checkout from './pages/client/checkout/Checkout.page'
import { useSelector } from "react-redux";
import Forgot from './pages/authentication/forgotpwd/Forgotpwd.page';
import Reset from './pages/authentication/resetpass/ResetPass.page';

import { Navigate } from "react-router-dom";
import UserInfoPage from './pages/client/UserInfo/page/ProfilePage/UserInfo.page';




function App() {
  const user = useSelector((state) => state.user.currentUser);
  const nav = useNavigate();
  return (
    <div >
      <Routes>
        <Route path='/shop' element={<Shop />} />
        <Route path='/contact' exact element={<Contact />} />
        <Route path='/product/:id' exact element={<Detail />} />
        <Route
          path="/account/*"
          element={user ? <UserInfoPage /> : <Navigate to="/signin" />}
        />
        <Route
          path="/signin"
          element={user ? <Navigate to="/" /> : <SignIn />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" replace /> : <SignUp />}
        />

        <Route
          path="/forgot"
          element={<Forgot />}
        />

        <Route
          path="/reset"
          element={<Reset />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />
        <Route path='/' element={<Home />} />
        <Route path='/forgot' element={<Forgot />} />
      </Routes>
    </div>
  );
}

export default App;