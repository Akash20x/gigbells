import { Outlet } from "react-router-dom"
import RedirectLoggedInUser from "./RedirectLoggedInUser";
import Header from "./Header";


const MainContainer = () => {
  
  return (
    <>
    <RedirectLoggedInUser>
      <Header />
      <Outlet /> 
    </RedirectLoggedInUser>
    </>
  )
}

export default MainContainer
