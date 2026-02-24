import { Outlet } from "react-router-dom"
import Header from "./Header";
import ProtectedRoute from "./ProtectedRoute";


const MainContainer = () => {
  
  return (
    <>
    <ProtectedRoute>
      <Header />
      <Outlet /> 
    </ProtectedRoute>
    </>
  )
}

export default MainContainer
 