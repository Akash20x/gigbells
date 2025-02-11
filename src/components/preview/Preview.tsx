import { Outlet, useLocation } from "react-router-dom"
import Intro from "./Intro"
import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPortfolioPreview } from "../../services/profileServices";
import Header from "../Header";
import { User } from "../../misc/types";
import { AppDispatch } from "../../redux/store";
import Loading from "../Loading";


const Preview = () => {

  const dispatch = useDispatch<AppDispatch>();

  const state = useSelector((state: { user: User }) => state.user);

  const { previewLoading } = state;
  
  const { username } = useParams();

  const location = useLocation()

  const isContactView = location.pathname.endsWith('/contact');
  
  useEffect(()=>{
    if(username && !isContactView){
      dispatch(fetchPortfolioPreview(username));
    }
  },[dispatch, username, isContactView])




  if(previewLoading){
    return <Loading />
  }

  
  return (
    <>
      <Header/>
      {!isContactView && <Intro />}
      <Outlet />
    </>
  )
}

export default Preview
