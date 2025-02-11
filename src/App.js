import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";
import { AnimatedBackground } from "animated-backgrounds";
import StaffManage from "./WebComponents/UserPanel/PeopleManage/StaffManage.jsx";
import QueryManage from "./WebComponents/UserPanel/PeopleManage/QueryManage.jsx";
import Dashboard from "./WebComponents/UserPanel/Dashboard.jsx";
import ViewUserDetails from "./WebComponents/UserPanel/PeopleManage/ViewUserDetails.jsx";
import AddSubUser from "./WebComponents/UserPanel/PeopleManage/AddSubUser.jsx";
import PushNotify from "./WebComponents/UserPanel/PeopleManage/PushNotify.jsx";
import CategoryManage from "./WebComponents/UserPanel/CategoryManagement/CategoryManage.jsx";
import ProductManage from "./WebComponents/UserPanel/ProductManagement/ProductManage.jsx";
import EditProfile from "./WebComponents/UserPanel/EditProfile.jsx";
import AddSubAdmin from "./WebComponents/UserPanel/PeopleManage/AddSubAdmin.jsx";

const Login = lazy(() => import("./WebComponents/Auths/Login.jsx"));
const Forgot = lazy(() => import("./WebComponents/Auths/ForgotPassword.jsx"));
const Verify = lazy(() => import("./WebComponents/Auths/OTPVerify.jsx"));
const Reset = lazy(() => import("./WebComponents/Auths/ResetPassword.jsx"));
const Main = lazy(() => import("./WebComponents/UserPanel//MainPage.jsx"));
const UserManage = lazy(() =>
  import("./WebComponents/UserPanel/PeopleManage/UserManage.jsx")
);

function App() {
  function ScrollToTopOnNavigation() {
    const location = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);

    return null;
  }

  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div
            style={{ height: "100vh" }}
            className="d-flex justify-content-center align-items-center h-100vh"
          >
            {/* <div className="logo">
              <img alt="" src="res/assets/imgs/navLogo.svg" />
            </div> */}
          </div>
        }
      >

        <ToastContainer
          position="bottom-right"
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
          theme="dark"
        />

        <RecoilRoot>
          <ScrollToTopOnNavigation />

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/Forgot-password" element={<Forgot />} />
            <Route path="/VerifyOtp" element={<Verify />} />
            <Route path="/ResetPass" element={<Reset />} />

            {/* Dash */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/Profile" element={<EditProfile />} />
            <Route path="/Users" element={<UserManage />} />
            <Route path="/vendor_management" element={<StaffManage />} />
            <Route path="/Query" element={<QueryManage />} />
            <Route path="/Notification" element={<PushNotify />} />
            <Route path="/category_management" element={<CategoryManage />} />
            <Route path="/product_management" element={<ProductManage />} />
            <Route path="/Users/View-User/:id" element={<ViewUserDetails />} />
            <Route path="/Users/Add-SubUsers" element={<AddSubUser />} />
            <Route path="/Users/Add-SubAdmin" element={<AddSubAdmin />} />
          </Routes>
        </RecoilRoot>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

