import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Home from "./Pages/LandingPage/Home";
import About from "./Pages/LandingPage/About";
import Services from "./Pages/LandingPage/Services";
import Reviews from "./Pages/LandingPage/Reviews";
import Contact from "./Pages/LandingPage/Contact";
import Navbar from './Pages/LandingPage/Navbar';
import Dashboard from "./Dashboard/Dashboard";
import National from "./Dashboard/National";
import UserSelection from "./Signup/UserSelection";
import CreatePassword from "./Signup/CreatePassword";
import SignUp from "./Signup/Signup";
import Login from "./Signup/Login";
import LoginSuccess from "./Signup/Success";

import TutorProfile from "./Profile/TutorProfile";

import CreateReview from "./Dashboard/CreateReview"
import Review from"./Dashboard/Reviews"





function Layout({ children }) {
  const location = useLocation();

  const hideNavbarRoutes = ["/Dashboard", "/National","/createReviews"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      {children}
    </>
  );
}

function App() {

  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/OurServices" element={<Services />} />
            <Route path="/Reviews" element={<Reviews />} />
            <Route path="/ContactUs" element={<Contact />} />
            <Route path="/userselection" element={<UserSelection />}></Route>
            <Route path="/CreatePassword" element={<CreatePassword />}></Route>
            <Route path="/SignUp" element={<SignUp />}></Route>
            <Route path="/LoginPage" element={<Login />}></Route>
            <Route path="/successfull" element={<LoginSuccess />} />
            {/* <Route path="/Dashboard" element={<Dashboard />} /> */}


            <Route path="/Dashboard/:userId" element={<Dashboard />} />
            <Route path="/National/:userId" element={<National />} />
            <Route path="/Profile/:userId" element={<TutorProfile />} />

           
            <Route path="/createReviews" element={<CreateReview/>} />
            <Route path="/review" element={<Review/>} />
           



          </Routes>
        </Layout>
      </Router>
    </>

  )
}

export default App;


