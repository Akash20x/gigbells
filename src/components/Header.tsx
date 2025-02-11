import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logOut } from "../redux/userSlice";
import { User } from "../misc/types";
import { fetchUserInfo } from "../services/authServices";
import { AppDispatch } from "../redux/store";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();
    const state = useSelector((state: { user: User }) => state.user);
    const { profile, isLogged, error } = state;
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logOut());
        navigate('/sign-in');
    };

    useEffect(() => {
        if(!isLogged){
            dispatch(fetchUserInfo()); 
        }
    }, [dispatch, isLogged]);
  
  
    useEffect(() => {
      if (error === "Token Expired") {
          dispatch(logOut());
      }
    }, [error, dispatch]);
  

    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY === 0); 
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const validPaths = [
        `/${profile?.userName}`,
        `/${profile?.userName}/about`,
        `/${profile?.userName}/services`,
        `/${profile?.userName}/contact`
    ];
    

    return (
        <>
            {isLogged && (
                <div className="w-full md:pb-0 pb-8 z-0">
                    <header className="relative inset-x-0 top-0">
                        <div className="relative flex md:hidden py-4 w-full"></div>
                        <nav className="fixed md:relative w-full top-0 flex items-center justify-between py-6 px-6 max-w-5xl mx-auto">
                            <h2 className="text-2xl font-semibold"></h2>
                            <div className="hidden md:flex md:flex-1 md:gap-x-8 md:justify-end">
                                {validPaths.includes(location.pathname) ? (
                                    <Link to="/dashboard" className="text-sm font-semibold leading-6 text-gray-900">
                                        My Profile
                                    </Link>
                                ) : (
                                    <Link to={`/${profile?.userName}`} className="text-sm font-semibold leading-6 text-gray-900">
                                        Preview Profile
                                    </Link>
                                )}
                                <span
                                    className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer"
                                    onClick={handleLogout}
                                >
                                    Sign out
                                </span>
                            </div>
                            <button onClick={() => setMenuOpen(true)} className={`p-2 md:hidden text-gray-700 ${isVisible ? "opacity-100" : "opacity-0"}`}>
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
                                </svg>
                            </button>
                        </nav>
                        <div className={`lg:hidden ${menuOpen ? '' : 'hidden'}`}>
                            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                                <div className="flex items-center justify-end">
                                    <button onClick={() => setMenuOpen(false)} className="-m-2.5 rounded-md p-2.5 text-gray-700">
                                        <svg
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                    </button>
                                </div>
                                <div className="mt-6 flow-root">
                                    <div className="-my-6 divide-y divide-gray-500/10">
                                        <div className="space-y-2 py-6"></div>
                                        <div className="py-6">
                                            {validPaths.includes(location.pathname) ? (
                                                <Link
                                                    to="/dashboard"
                                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                                >
                                                    My Profile
                                                </Link>
                                            ) : (
                                                <Link
                                                    to={`/${profile?.userName}`}
                                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                                >
                                                    Preview Profile
                                                </Link>
                                            )}
                                            <span
                                                className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                                onClick={handleLogout}
                                            >
                                                Sign out
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                </div>
            )}
        </>
    );
};

export default Header;
