import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { User } from "../misc/types";

interface ProtectedRouteProps {
    children: React.ReactNode
  }

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {

  const token = useSelector((state: { user: User }) => state.user.token);

  return (token)? (
    children
  ) : (
    <Navigate replace={true} to={"/sign-in"} />
  );
};

export default ProtectedRoute; 