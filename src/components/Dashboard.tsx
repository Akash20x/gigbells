import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import EditProfile from "../components/EditProfile";
import linkedin from "../assets/linkedin.png";
import instagram from "../assets/instagram.png";
import twitter from "../assets/twitter.png";
import { fetchUserPortfolio } from "../services/profileServices";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import LinearProgress from '@mui/material/LinearProgress';
import { Box } from "@mui/material";
import { getSkillEmoji } from "../misc";
import { AppDispatch } from "../redux/store";
import { ProfileData, User } from "../misc/types";
import ProfileImage from "./ProfileImage";

const Dashboard = () => {
    
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation();
    const state = useSelector((state: { user: User }) => state.user);

    const { profile, loading } = state;

    const [profileData, setProfileData] = useState<ProfileData>({
        name: '',
        description: '',
        skills: [],
        location: '',
        social: [],
        userName: ''
    });

    const [modalOpen, setModalOpen] = useState(false);

    const socialImages: { [key: string]: string } = {
        linkedin,
        instagram,
        twitter,
    };

    useEffect(() => {
        dispatch(fetchUserPortfolio());
    }, [dispatch]);

    useEffect(() => {
        if (profile) {
            setProfileData(profile);
        }
    }, [profile]);


    if (loading) {
        return (
            <Box sx={{ width: '100%', position: 'fixed', top: 0, left: 0, zIndex: 100 }}>
                <LinearProgress />
            </Box>
        );
    }

    return (
    <>
        <>
            <div>
                <div className="relative flex flex-col w-full">
                    <div className="relative flex-row gap-4 sm:gap-12 md:gap-8">
                        <div className="hero-background rounded-[50px] flex flex-col-reverse md:flex-row w-full border border-[#EBEBEB] rounded-5xl p-8 md:p-16 max-w-5xl mx-auto backdrop-blur-3xl bg-white bg-opacity-70">
                            <div className="flex-1 text-center md:text-left">
                                <div className="text-4xl sm:text-center md:text-left text-gray-700 mb-4">
                                    <strong className="text-black">{profileData.name}</strong>
                                </div>
                                <div className="text-lg lg:text-xl text-gray-700 mb-6" id="taglines">
                                    {profileData.description}
                                </div>

                                <div data-controller="skills-toggle">
                                    <div className="skills flex justify-center md:justify-start flex-wrap gap-1 sm:gap-2 gap-y-3 -mx-6 sm:mx-0">
                                        {profileData?.skills?.map((skill, index) => (
                                            <div key={index} className="flex items-center gap-1 border border-gray-800 px-3 py-px text-sm flex-shrink-0 rounded-2xl tracking-normal bg-backdrop">
                                                <div className="text-base">{getSkillEmoji(skill)}</div> {skill}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-4 cursor-pointer flex gap-1 items-center w-fit" onClick={() => {
                                    setModalOpen(true);
                                    document.body.style.overflow = 'hidden';
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 inline">
                                        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z"></path>
                                        <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z"></path>
                                    </svg>
                                    edit profile
                                </div>
                                <a target="_blank" className="mt-4 flex gap-1 items-center w-fit" href={`/${profileData?.userName}`} rel="noopener noreferrer">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 inline">
                                        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z"></path>
                                        <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd"></path>
                                    </svg>
                                    preview public profile
                                </a>
                                <div className="font-bold text-gray-600 mt-4 flex gap-1 items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 inline">
                                        <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path>
                                    </svg>
                                    <span className="self-end">{profileData.location}</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-center">
                                <ProfileImage profileData={profileData} />
                                <div className={`mt-4 flex items-center gap-3 ${modalOpen && 'hidden'}`}>
                                    {profileData?.social?.map((social, index) => (
                                        <a key={index} href={social.link} target="_blank" rel="noopener noreferrer">
                                            <img
                                                src={social.platform && socialImages[social.platform]}
                                                alt={social.platform || ''}
                                                className={`${social.platform ? '' : 'hidden'} w-8 h-8 `}
                                            />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex lg:flex flex-col-reverse px-4 lg:px-0 md:flex-row gap-8 w-full max-w-4xl mx-auto mt-8">
                    <div className="flex-1 flex justify-evenly sm:justify-start text-lg sm:text-2xl lg:text-2xl font-bold text-gray-600 gap-16 min-h-[3rem]">
                        <Link to="/dashboard" className="flex items-center relative hover:text-gray-900 text-gray-900">
                            Portfolio
                            <div className={`absolute bottom-0 w-full h-1 rounded ${location.pathname === '/dashboard' ? 'get-in' : ''} to-light-purple`}></div>
                        </Link>
                        <Link to="/dashboard/about" className="flex items-center relative hover:text-gray-900 text-gray-600">
                            About
                            <div className={`absolute bottom-0 w-full h-1 rounded ${location.pathname === '/dashboard/about' ? 'get-in' : ''}`}></div>
                        </Link>
                        <Link to="/dashboard/services" className="flex items-center relative hover:text-gray-900 text-gray-600">
                            Services
                            <div className={`absolute bottom-0 w-full h-1 rounded ${location.pathname === '/dashboard/services' ? 'get-in' : ''}`}></div>
                        </Link>
                    </div>
                    <Link
                        to="/dashboard/contact"
                        className="hidden lg:flex text-white text-center font-bold text-sm md:text-lg lg:text-2xl px-3 lg:px-8 py-1.5 md:px-2 lg:py-3 rounded-full get-in"
                    >
                        Get in touch!
                    </Link>
                </div>
            </div>

            {modalOpen && (
                <EditProfile profile={profileData} setProfile={setProfileData} handleClose={() => { setModalOpen(false); document.body.style.overflow = 'auto'; }} />
            )}
        </>
        <Outlet />
    </>
    );
};

export default Dashboard;
