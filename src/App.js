import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Main from "./pages/Main";
import Layout from "./layouts/common/Layout";
import 'react-toastify/dist/ReactToastify.css';
import './style.css';
import CustomComponents from "./components/common/CustomComponents";
import UserPageLayout from "./layouts/UserPageLayout";
import MyPageMain from "./pages/member/MyPageMain";
import Error from "./pages/error/Error";
import AdminPageLayout from "./layouts/AdminPageLayout";
import AdminMain from "./pages/admin/AdminMain";
import SellerPageLayout from "./layouts/SellerPageLayout";
import MyStoreList from "./pages/seller/MyStoreList";
import ChallengeMain from "./pages/challenge/ChallengeMain";
import ProductMain from "./pages/product/ProductMain";
import Wishlist from "./pages/product/Wishlist";
import InquiryMain from "./pages/Inquiry/site/InquiryMain";
import Signup from "./pages/member/Signup";
import ProductRegist from "./pages/seller/ProductRegist";
import ProductManagement from "./pages/seller/ProductManagement";
import LoginModal from "./components/items/LoginModal";
import MemberProfile from "./pages/member/MemberProfile";
import AdminNotices from "./pages/admin/AdminNotices";
import AdminMemberView from "./pages/admin/AdminMemberView";
import InquiryRegist from "./pages/Inquiry/site/InquiryRegist";
import StoreProfile from "./components/items/StoreProfile";
import ProtectedRoute from "./components/route/ProtectedRoute";
import AdminCategory from "./pages/admin/AdminCategory";
import AdminReport from "./pages/admin/AdminReport";
import OrderPage from "./pages/order/OrderPage";
import {CheckoutPage} from "./pages/payment/CheckoutPage";
import {FailPage} from "./pages/payment/FailPage";
import {SuccessPage} from "./pages/payment/SuccessPage";
import InquiryUpdate from "./pages/Inquiry/site/InquiryUpdate";
import ReportPage from "./pages/admin/ReportPage";
import MemberNotices from "./pages/admin/MemberNotices";
import MemberNotice from "./pages/admin/MemberNotice";
import AdminNotice from "./pages/admin/AdminNotice";
import AdminCreateNotice from "./pages/admin/AdminCreateNotice";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/" element={<Layout/>}>
                        <Route path="/notice" element={<MemberNotices/>}/>
                        <Route path="/notice/detail" element={<MemberNotice/>}/>
                        <Route path="/ex" element={<CustomComponents/>}/>
                        <Route path="/challenge" element={<ChallengeMain/>}/>


                        <Route path="/product" element={<ProductMain/>}>

                        </Route>
                        <Route path="/wish" element={<Wishlist/>}>


                        </Route>
                        <Route path="/members">
                            <Route path="signup"
                                   element={<ProtectedRoute loginCheck={false}><Signup/></ProtectedRoute>}/>
                            <Route path="login"
                                   element={<ProtectedRoute loginCheck={false}><LoginModal/></ProtectedRoute>}/>
                            <Route path="mypage"
                                   element={<ProtectedRoute loginCheck={true}> <UserPageLayout/> </ProtectedRoute>}>
                                <Route index element={<Navigate to="/members/mypage/main" replace/>}/>
                                <Route path="main" element={<MyPageMain/>}/>
                                <Route path="profile" element={<MemberProfile/>}/>
                                <Route path="report" element={<ReportPage/>}/>


                                <Route path="inquiry" >
                                    <Route index element={<InquiryMain/>}/>
                                    <Route path="regist" element={<InquiryRegist/>}/>
                                    <Route path="list" element={<InquiryUpdate/>}/>
                                </Route>


                                {/*<Route path="regist/update" element={<InquiryUpdate/>}/>*/}

                            </Route>
                        </Route>

                        <Route path="/seller">
                            <Route path="mystore" element={<SellerPageLayout/>}>
                                <Route index element={<Navigate to="/seller/mystore/main" replace/>}/>
                                {/*<Route path="main" element={<MyStoreMain/>} />*/}
                                <Route path="main" element={<MyStoreList/>}/>
                                <Route path=":storeCode" element={<StoreProfile/>}/>
                                <Route path="product" element={<ProductManagement/>}/>
                                <Route path="regist" element={<ProductRegist/>}/>
                            </Route>

                        </Route>
                        <Route path="/admin">
                            <Route path="dashboard" element={<AdminPageLayout/>}>
                                <Route index element={<Navigate to="/admin/dashboard/main" replace/>}/>
                                <Route path="notices" element={<AdminNotices/>}/>
                                <Route path="notice" element={<AdminNotice/>}/>
                                <Route path="notice-create" element={<AdminCreateNotice/>}/>
                                <Route path="members" element={<AdminMemberView/>}/>
                                <Route path="main" element={<AdminMain/>}/>
                                <Route path="category" element={<AdminCategory/>}/>
                                <Route path="reports" element={<AdminReport/>}/>
                            </Route>
                        </Route>

                        <Route path="/order">
                            <Route index element={<OrderPage/>}/>
                        </Route>

                        <Route path="/payment">
                            <Route index element={<CheckoutPage/>}/>
                            <Route path="fail" element={<FailPage/>}/>
                            <Route path="success" element={<SuccessPage/>}/>
                        </Route>

                    </Route> {/* Layout end*/}
                    <Route path="*" element={<Error/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
