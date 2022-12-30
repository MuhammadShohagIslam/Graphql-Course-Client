import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import AddService from "./pages/AddService/AddService";
import Blogs from "./pages/Blogs/Blogs";
import Home from "./pages/Home/Home/Home";
import Login from "./pages/Login/Login";
import MyReviews from "./pages/MyReviews/MyReviews";
import UpdateReview from "./pages/MyReviews/UpdateReview/UpdateReview";
import NotFound from "./pages/NotFound/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import ServiceDetails from "./pages/Services/ServiceDetails/ServiceDetails";
import Services from "./pages/Services/Services";
import Signup from "./pages/Signup/Signup";
import TermCondition from "./pages/TermCondition/TermCondition";
import PrivateRouter from "./routers/PrivateRouter/PrivateRouter";
import SignupV2 from './pages/Auth/Signup';
import CompleteSignUp from "./pages/Auth/CompleteSignup";

function App() {
    return (
        <>
            <Toaster />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/:id" element={<ServiceDetails />} />
                <Route
                    path="/add-service"
                    element={
                        <PrivateRouter>
                            <AddService />
                        </PrivateRouter>
                    }
                />
                <Route
                    path="/my-reviews"
                    element={
                        <PrivateRouter>
                            <MyReviews />
                        </PrivateRouter>
                    }
                />
                <Route
                    path="/my-reviews/update/:id"
                    element={
                        <PrivateRouter>
                            <UpdateReview />
                        </PrivateRouter>
                    }
                />
                <Route path="/blog" element={<Blogs />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/v2/signup" element={<SignupV2 />} />
                <Route path="/completeSignup" element={<CompleteSignUp />} />
                <Route path="/term-condition" element={<TermCondition />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
