import { Navigate } from "react-router-dom";

interface RedirectLoggedInUserProps {
    children: React.ReactNode
  }

const RedirectLoggedInUser = ({ children }: RedirectLoggedInUserProps) => {

  return (localStorage.getItem("token"))? (
    children
  ) : (
    <Navigate replace={true} to={"/sign-in"} />
  );
};

export default RedirectLoggedInUser;