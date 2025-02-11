import { useEffect, useState } from "react";
import { signUp } from "../services/authServices";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { User } from "../misc/types";
import ToastNotification from "./ToastNotification";
import { AppDispatch } from "../redux/store";

const SignUp = () => {
    
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        link: "",
    });
    
    const [menuOpen, setMenuOpen] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const state = useSelector((state: { user: User }) => state.user);  

    const { error } = state;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (data.password !== data.confirmPassword) {
            ToastNotification("Password confirmation doesn't match Password")
            return;
        }

        const formData = {
            name: data.name,
            email: data.email,
            password: data.password,
            userName: data.link,
        };

        const result = await dispatch(signUp(formData));

        if (signUp.fulfilled.match(result)) {
            navigate('/dashboard'); 
        }

        if(error){
            ToastNotification(error)
        }
    
    };

    const [isHeaderBg, setIsHeaderBg] = useState(false)


     useEffect(() => {
            const handleScroll = () => {
                setIsHeaderBg(window.scrollY > 0); 
            };
    
            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
            <div className="flex flex-col min-h-screen">
                <div className="w-full">
                    <header className="relative inset-x-0 top-0 z-50">
                        <div className="relative flex md:hidden py-4 w-full"></div>
                        <nav className={` ${isHeaderBg ? 'bg-white': ''} fixed md:relative w-full top-0 flex items-center justify-between py-6 px-6 max-w-5xl mx-auto`}>
                        
                            <h2 className="text-2xl font-semibold">Gigbells</h2>
                            <div className="hidden md:flex md:flex-1 md:gap-x-8 md:justify-end">
                            <Link to="/sign-in" className="text-sm font-semibold leading-6 text-gray-900">Sign in</Link>
                            <Link to="/signup" className="text-sm font-semibold leading-6 text-gray-900">Sign up</Link>
                            </div>
                            <button onClick={() => setMenuOpen(true)} className="p-2 md:hidden text-gray-700">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
                                    </svg>
                            </button>
                        </nav>
                        <div className={`lg:hidden ${menuOpen ? '' : 'hidden'}`}>
                            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                                <div className="flex items-center justify-end">
                                    <button onClick={() => setMenuOpen(false)} className="-m-2.5 rounded-md p-2.5 text-gray-700">
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                    </button>
                                </div>
                                <div className="mt-6 flow-root">
                                    <div className="-my-6 divide-y divide-gray-500/10">
                                        <div className="space-y-2 py-6"></div>
                                        <div className="py-6">
                                            <Link to="/sign-in" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Sign in</Link>
                                            <Link to="/signup" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Sign up</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                </div>

                <div className="flex flex-col justify-center py-4 sm:px-6 lg:px-8 pt-20 sm:pt-0">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Let's get you started! 🌈</h2>
                    </div>

                    <div className="mt-10 sm:mx-auto w-full mx-auto sm:w-full sm:max-w-[480px]">
                        <div className="bg-white px-6 py-10 shadow sm:rounded-lg sm:px-12">
                            <form onSubmit={submitHandler} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="user_email">Email address</label>
                                    <div className="mt-2">
                                        <input 
                                            type="email" 
                                            name="email"
                                            id="user_email"  
                                            value={data.email} 
                                            onChange={handleChange} 
                                            required 
                                            className="ps-2 form-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="user_username">Claim your URL</label>
                                    <div className="relative mt-2">
                                        <div className="absolute inset-y-0 start-0 flex items-center px-2 pointer-events-none text-sm font-bold text-gray-400">
                                            gigbells/
                                        </div>
                                        <input  
                                            type="text" 
                                            name="link" 
                                            id="user_username" 
                                            value={data.link}
                                            onChange={handleChange}    
                                            required 
                                            className="form-input block ps-16 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                                        />
                                    </div>
                                    <div className="text-xs mt-1">💡 Tip: Select a unique URL - this will be your public link!</div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="user_name">Full name</label>
                                    <div className="mt-2">
                                        <input 
                                            type="text"
                                            name="name" 
                                            id="user_name"
                                            value={data.name} 
                                            onChange={handleChange} 
                                            required 
                                            className="ps-2 form-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="user_password">Password</label>
                                    <div className="mt-2">
                                        <input 
                                            type="password"
                                            name="password" 
                                            id="user_password"
                                            value={data.password} 
                                            onChange={handleChange} 
                                            required 
                                            className="ps-2 form-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                                        />
                                        <div className="text-xs mt-1">(6 characters minimum)</div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="user_password_confirmation">Password confirmation</label>
                                    <div className="mt-2">
                                        <input 
                                            type="password"
                                            name="confirmPassword" 
                                            id="user_password_confirmation"
                                            value={data.confirmPassword} 
                                            onChange={handleChange} 
                                            required 
                                            className="ps-2 form-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                                        />
                                    </div>
                                </div>


                                <button type="submit" className="w-full flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  focus-visible:outline-indigo-600">Sign up</button>
                            </form>
                        </div>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            Already have an account?{' '}
                            <Link to="/sign-in" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign in</Link>
                        </p>
                    </div>
                </div>
            </div> 
  );
};

export default SignUp;
