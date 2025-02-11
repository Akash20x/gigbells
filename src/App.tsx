import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import { Toaster } from "react-hot-toast";
import Preview from "./components/preview/Preview";
import Portfolio from "./components/preview/Portfolio";
import About from "./components/preview/About";
import Services from "./components/preview/Services";
import ProfileContact from "./components/ProfileContact";
import ProfilePortfolio from "./components/ProfilePortfolio";
import ProfileAbout from "./components/ProfileAbout";
import ProfileServices from "./components/ProfileServices";
import Contact from "./components/preview/Contact";
import MainContainer from "./components/MainContainer";


function App() {
  return (
    <div className='app-container'>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "transparent",
            boxShadow: "none",
          },
        }}
      />
      <Router>
        <Routes>
          <Route element={<MainContainer />}>

            <Route path='/' element={<Navigate to={"dashboard"} />} />
       
            <Route path='/dashboard' element={<Dashboard />}>
              <Route index element={<ProfilePortfolio />} />
              <Route path='about' element={<ProfileAbout />} />
              <Route path='services' element={<ProfileServices />} />
            </Route>

            <Route path="/dashboard/contact" element={<ProfileContact />}/>
 
          </Route>

          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />       

          <Route path='/:username' element={<Preview />}>
              <Route index element={<Portfolio />} />
              <Route path='about' element={<About />} />
              <Route path='services' element={<Services />} /> 
              <Route path='contact' element={<Contact />} />
          </Route>


        </Routes>
      </Router>
    </div>
  );
}

export default App;
