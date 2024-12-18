import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import Home from "./Pages/LandingPage/Home";
import About from "./Pages/LandingPage/About";
import Services from "./Pages/LandingPage/Services";
import Reviews from "./Pages/LandingPage/Reviews";
import Contact from "./Pages/LandingPage/Contact";
import Navbar from './Pages/LandingPage/Navbar';
import Dashboard from "./Dashboard/Dashboard";
import National from "./Dashboard/National";
import Sidebar from "./Layout/Sidebar";
import Footer from "./Layout/Footer";
import MainLayout from "./Layout/Mainlayout";
import UserSelection from "./Signup/UserSelection";
import CreatePassword from "./Signup/CreatePassword";
import SignUp from "./Signup/Signup";
import Login from "./Signup/Login";



function App() {

  return (
    <>
      {/* <Router>
      <Navbar/>
      <Sidebar/>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/About" element={<About/>} />
      <Route path="/OurServices" element={<Services />} />
      <Route path="/Reviews" element={<Reviews />} />
      <Route path="/ContactUs" element={<Contact />} />
      </Routes>
    </Router> */}

<Router><Navbar/>
  <Routes>
    
  <Route path="/" element={<UserSelection/>}></Route>
      <Route path="/CreatePassword" element={<CreatePassword/>}></Route>
      <Route path="/SignUp" element={<SignUp/>}></Route>
      <Route path="/LoginPage" element={<Login/>}></Route>
  </Routes>
</Router>


      {/* <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/National" element={<National />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
      </Router> */}
    </>

  )
}

export default App;


