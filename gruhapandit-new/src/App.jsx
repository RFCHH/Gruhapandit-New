import {  BrowserRouter as Router,  Route,  Routes,} from "react-router-dom";
import Home from "./Pages/LandingPage/Home";
import About from "./Pages/LandingPage/About";
import Services from "./Pages/LandingPage/Services";
import Reviews from "./Pages/LandingPage/Reviews";
import Contact from "./Pages/LandingPage/Contact";
import Navbar from "./Navbar";
import UserSelection from "./Pages/LandingPage/UserSelection";
import CreatePassword from "./Pages/LandingPage/CreatePassword";
import SignUp from "./Pages/LandingPage/SignUp";
import LoginPage from "./Pages/LandingPage/LoginPage"



function App() {

  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/About" element={<About />} />
      <Route path="/OurServices" element={<Services />} />
      <Route path="/Reviews" element={<Reviews />} />
      <Route path="/ContactUs" element={<Contact />} />
      <Route path="/userselection" element={<UserSelection/>}></Route>
      <Route path="/CreatePassword" element={<CreatePassword/>}></Route>
      <Route path="/SignUp" element={<SignUp/>}></Route>
      <Route path="/LoginPage" element={<LoginPage/>}></Route>
      </Routes>
      </Router>
    </>
  )
}

export default App
