import { useEffect, useState } from "react"
import { CiLocationOn } from "react-icons/ci";
import { useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import linkedin from '../../assets/linkedin.png';
import twitter from '../../assets/twitter.png';
import instagram from '../../assets/instagram.png';
import defaultImg from "../../assets/default.svg"
import downArrow from "../../assets/downarrow.svg"
import { getSkillEmoji } from "../../misc";
import { ProfileData, User } from "../../misc/types";

const socialImages: { [key: string]: string } = {
    linkedin,
    instagram,
    twitter,
};
  
const Intro = () => {

    const state = useSelector((state: { user: User }) => state.user);

    const { profile, profileImage, isLogged } = state;
    
    const [previewSrc, setPreviewSrc] = useState<string | null>(null);

    const [profileData, setProfileData] = useState<ProfileData>({
        name: '',
        description: '',
        skills: [],
        location: '',
        social: [],
        userName: ''
    });
    
    const { username } = useParams();
    
    useEffect(() => {
        if (profile) {
            setProfileData(profile);
        }

        if(profileImage){
            setPreviewSrc(profileImage);
        }
    }, [profile, profileImage]);

                  
    const location = useLocation();
    const [showAllSkills, setShowAllSkills] = useState(false);
            
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setShowAllSkills(false);
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


  return (
    <>
        <div className="relative z-10 max-w-7xl mx-auto">
            
            {!isLogged && <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-between mx-auto container md:px-40 text-sm font-semibold gap-2 lg:gap-10 py-6">
                <Link
                    to={`/${username}/contact`}
                    className="get-in  text-white text-lg font-semibold px-8 rounded-full py-2"
                >
                    Get in touch!
                </Link>
            </div>}
            <div className="w-full">
                <div className={`flex text-gray-700 min-h-64 hero-background border border-pink-200 shadow-lg flex-col-reverse lg:flex-row md:mx-20 lg:mx-28 gap-0 lg:gap-5 rounded-3xl p-6 lg:px-20 lg:pt-12 ${profileData?.social?.length>0 ? 'lg:pb-12': 'lg:pb-24'}  rad-hero`}>
                    <div className="flex w-full text-center lg:text-left lg:w-9/12 flex-col gap-3">
                        <h1 className="text-3xl lg:text-4xl font-bold">{profileData.name}</h1>
                        <p className="text-lg lg:text-xl py-2 break-words">{profileData.description}</p>
                        <div className="hidden md:flex flex-wrap justify-center lg:justify-start gap-2">
                            {profileData?.skills?.map((skill, index) => (
                                <div key={index} className="inline-flex bg-[#fdfaf1] items-center text-sm border border-slate-500 rounded-full px-4 py-1">
                                <div className="pr-1">{getSkillEmoji(skill)}</div> 
                                {skill}
                                </div>
                            ))}
                        </div>
                        <div className="flex md:hidden flex-wrap justify-center lg:justify-start gap-2">
                            {showAllSkills
                                ? profileData?.skills?.map((skill, index) => (
                                    <div key={index} className="inline-flex bg-white items-center text-sm border rounded-full px-4 py-2">
                                    <div className="pr-1">{getSkillEmoji(skill)}</div> {skill}
                                    </div>
                                ))
                                : profileData?.skills?.slice(0, 4)?.map((skill, index) => (
                                    <div key={index} className="inline-flex bg-white items-center text-sm border rounded-full px-4 py-2">
                                    <div className="pr-1">{getSkillEmoji(skill)}</div> {skill}
                                    </div>
                                ))}
                        </div>

                        {!showAllSkills && profileData?.skills?.length > 3 && (
                            <button
                                onClick={() => setShowAllSkills(true)}
                                className="md:hidden font-bold py-1 px-2"
                            >                            
                                <img src={downArrow} alt="down arrow" className="inline -mt-1 h-4" /> &nbsp;
                                    Show more Skills
                                    &nbsp; 
                                <img src={downArrow} alt="down arrow" className="inline -mt-1 h-4" />
                            </button>
                        )}
                    </div>

                    <div className="flex w-full lg:w-3/12 flex-col gap-3 lg:gap-5 items-center justify-center lg:justify-end">
                        <img src={previewSrc ? previewSrc : defaultImg } className="w-2/5 md:w-1/3 lg:w-fit h-fit rounded-full mb-4 lg:mb-0" />
                        <div className="flex justify-center gap-4 items-center lg:flex-col lg:gap-2">
                    
                            {profileData.location && 
                                <div className="flex items-center gap-2">
                                    <CiLocationOn className="text-2xl font-bold" />
                                    <span className="text-lg font-bold">{profileData.location}</span>
                                </div>
                            }  

                            <div className="flex items-center gap-2">
                                {profileData?.social?.map((soc, index) => (
                                    <div key={index}>
                                        <a href={soc.link}
                                            target="_blank" rel="noopener noreferrer">
                                            <img src={socialImages[soc.platform!]} alt={soc.platform} />
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>    
                    </div>
                </div>
            </div>
            <div className="mx-auto max-w-4xl px-4 lg:px-0">
                <div className="flex lg:flex flex-col-reverse md:flex-row gap-8 w-full max-w-4xl mx-auto mt-8">
                    <div className="flex-1 flex justify-evenly sm:justify-start text-lg sm:text-2xl lg:text-2xl font-bold text-gray-600 gap-16 min-h-[3rem]">
                            
                            <Link to={`/${username}`} className="flex items-center relative hover:text-gray-900 text-gray-900">
                                Portfolio
                                <div className={`absolute bottom-0 w-full h-1 rounded ${location.pathname === `/${username}` ? 'get-in' : ''} to-light-purple`}></div>
                            </Link>
                        
                            <Link to={`/${username}/about`} className="flex items-center relative hover:text-gray-900 text-gray-600">
                                About
                                <div className={`absolute bottom-0 w-full h-1 rounded ${location.pathname === `/${username}/about` ? 'get-in' : ''}`}></div>
                            </Link>
                        
                            <Link to={`/${username}/services`}  className="flex items-center relative hover:text-gray-900 text-gray-600">
                                Services
                                <div className={`absolute bottom-0 w-full h-1 rounded ${location.pathname === `/${username}/services` ? 'get-in' : ''}`}></div>
                            </Link>
                        
                    </div>
                  

                    <Link
                        to={`/${username}/contact`}
                        className="hidden lg:flex text-white text-center font-bold text-sm md:text-lg lg:text-2xl px-3 lg:px-8 py-1.5 md:px-2 lg:py-3 rounded-full get-in"
                    >
                        Get in touch!
                    </Link>

                </div>
            </div>
        </div>
    </>
  )
}

export default Intro
