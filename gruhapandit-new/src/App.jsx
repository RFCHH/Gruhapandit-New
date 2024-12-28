import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./Pages/LandingPage/Home";
import About from "./Pages/LandingPage/About";
import Services from "./Pages/LandingPage/Services";
import Reviews from "./Pages/LandingPage/Reviews";
import Contact from "./Pages/LandingPage/Contact";
import Navbar from "./Pages/LandingPage/Navbar";
import Dashboard from "./Dashboard/Dashboard";
import National from "./Dashboard/National";
import UserSelection from "./Signup/UserSelection";
import CreatePassword from "./Signup/CreatePassword";
import SignUp from "./Signup/Signup";
import Login from "./Signup/Login";
import LoginSuccess from "./Signup/Success";
import TutorProfile from "./Profile/TutorProfile";
import CreateReview from "./Dashboard/CreateReview";
import Review from "./Dashboard/Reviews";
import MyRequest from "./Dashboard/Request";
import TutorTable from "./Admin Flow/TutorTable";
import Registration from "./Admin Flow/Registration";
import StudentTable from "./Admin Flow/StudentTable";
import MyPlans from "./Dashboard/Plans";
import StudentFeed from "./Dashboard/StudentFeed";
import ExamList from "./Exam/ExamList";
import ForgotPassword from "./Signup/ForgotPassword";
import PasswordVerification from "./Signup/PasswordVeification";
import Subjects from "./Dashboard/Subject";
import AllEmailTemplatesPage from "./Email/AllEmailTemplatesPage";
import EditEmailTemplatePage from "./Email/EditEmailTemplatePage";
import Payment from "./Payment";

import Exam from "./Exam/SelfExam";
import ExamPopUp from "./Exam/ExamPopUp";

import RequestApproval from "./Admin Flow/Request";


function Layout({ children }) {
  const location = useLocation();
  const isAuthenticated = true;

  const hideNavbarRoutes = [
    "/Dashboard",
    "/National",
    "/createReviews",
    "/Profile",
    "/Request",
    "/createReviews",
    "/review",
    "/plans",
    "/Feeds",
    "/ExamList",
    "/Registration",
    "/TutorTable",
    "/StudentTable",

    '/email-templates',
    '/Payment',
    '/subject',
    '/SelfExam',

    "/Request",

  ];

  const shouldHideNavbar =
    !isAuthenticated ||
    hideNavbarRoutes.some((route) => location.pathname.startsWith(route));

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
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
            <Route
              path="/PasswordVerification"
              element={<PasswordVerification />}
            />
            <Route path="/successfull" element={<LoginSuccess />} />

            <Route path="/Dashboard/:userId" element={<Dashboard />} />
            <Route path="/National/:userId" element={<National />} />
            <Route path="/Profile/:userId" element={<TutorProfile />} />
            <Route path="/Request/:userId" element={<MyRequest />} />
            <Route path="/createReviews" element={<CreateReview />} />
            <Route path="review" element={<Review />} />
            <Route path="/plans/:userId" element={<MyPlans />} />
            <Route path="/Feeds/:userId" element={<StudentFeed />} />
            <Route path="/ExamList"element={<ExamList/>}></Route>
            <Route path="/subject/:userId" element={<Subjects/>}></Route>
            <Route path="/Payment" element={<Payment/>}></Route>
            <Route path="/SelfExam" element={<Exam/>}></Route>
            <Route path="/exampopup" element={<ExamPopUp/>}/>
            




            <Route path="/Registration" element={<Registration />} />
            <Route path="/TutorTable" element={<TutorTable />} />
            <Route path="/StudentTable" element={<StudentTable />} />
            <Route path="/Request" element={<RequestApproval />} />

            <Route
              path="/email-templates"
              element={<AllEmailTemplatesPage />}
            />
            <Route
              path="/edit-email-template/:templateId"
              element={<EditEmailTemplatePage />}
            />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
