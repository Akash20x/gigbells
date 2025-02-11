import React from 'react';
import { updateProfile } from '../services/profileServices';
import { useDispatch } from 'react-redux';
import { removeProfileSkill, setProfileSkill } from '../redux/userSlice';
import { ProfileData } from '../misc/types';
import closeSvg from '../assets/close.svg'
import ToastNotification from './ToastNotification';
import EditSkills from './EditSkills';
import { isValidURL } from '../misc';
import { AppDispatch } from '../redux/store';

interface EditProfileProps {
  profile: ProfileData;
  setProfile: React.Dispatch<React.SetStateAction<ProfileData>>; 
  handleClose: () => void;
}

const EditProfile = ({ profile, setProfile, handleClose }: EditProfileProps) => {

  
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const invalidSocial = profile.social.some(
      (item: { link?: string }) => !isValidURL(item.link || '') && item.link !== ''
    );
    
    if (invalidSocial) {
      alert('Please enter valid social media links.');
      return;
    }



    dispatch(updateProfile({...profile}))

    ToastNotification("Profile Updated")       

    handleClose();

  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };


  const handleSocialChange = (index: number, field: 'platform' | 'link', value: string) => {    
    const newSocial = [...profile.social];
    newSocial[index] = { ...newSocial[index], [field]: value }; 
    setProfile(prev => ({ ...prev, social: newSocial }));
  };


  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex min-h-full justify-center text-center items-center p-2 md:p-4">
        <div className="fixed inset-0 bg-gray-300 bg-opacity-50 transition-opacity"></div>
        <div className="relative transform rounded-lg bg-white text-left shadow-xl transition-all py-8 md:py-12 px-8 md:px-16 sm:my-8 w-full max-w-6xl h-4/5">
          <div className="relative max-w-full">

            <div className="absolute right-0 top-0 pr-4 pt-[0.2rem] md:pt-4">
              <button
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
                onClick={handleClose}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="text-xl md:text-3xl font-bold mb-12 text-neutral-700 text-center">
              Update your profile
            </div>
            <form className="flex flex-col gap-8">
              <div className="w-full border-2 rounded-2xl px-4 sm:px-6 py-2 sm:py-3 flex flex-col focus-within:border-black">
                <label className="text-sm" htmlFor="name">Full name</label>
                <input
                  className="sm:text-md disabled:bg-gray-100 disabled:cursor-not-allowed focus:outline-0"
                  autoFocus
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full border-2 rounded-2xl px-4 sm:px-6 py-2 sm:py-3 flex flex-col focus-within:border-black">
                <label className="text-sm" htmlFor="description">Bio</label>
                <textarea
                  className="sm:text-md disabled:bg-gray-100 disabled:cursor-not-allowed focus:outline-0"
                  rows={4}
                  name="description"
                  value={profile.description}
                  onChange={handleInputChange}
                ></textarea>
              </div>
       
              <EditSkills
                skillsData = {profile?.skills}
                setSkillAction={setProfileSkill} 
                removeSkillAction={removeProfileSkill} 
              />

              <div className="w-full border-2 rounded-2xl px-4 sm:px-6 py-2 sm:py-3 flex flex-col focus-within:border-black">
                <label className="text-sm" htmlFor="location">Location</label>
                <input
                  type="text"
                  name="location"
                  value={profile.location}
                  onChange={handleInputChange}
                  className='outline-none'
                />
              </div>
              <div className="w-full border-2 rounded-2xl px-4 sm:px-6 py-2 sm:py-3 flex flex-col focus-within:border-black">
                <label className="text-sm" htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  value={profile.userName}
                  className='outline-none'
                  readOnly
                />
              </div>
              <div className="w-full border-2 rounded-2xl px-4 sm:px-6 py-2 sm:py-3 flex flex-col overflow-hidden">
                <label className="text-sm" htmlFor="social">Social</label>
                {profile?.social?.map((socialItem, index) => (
                  <div key={index} className="flex gap-2 mb-2 w-full py-2">
                    <select
                      className="flex-1 sm:max-w-48 border rounded-md sm:text-md border-gray-400"
                      value={socialItem.platform}
                      onChange={(e) => handleSocialChange(index, 'platform', e.target.value)}
                    >
                      <option value="">Select platform</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="instagram">Instagram</option>
                      <option value="twitter">Twitter</option>
                    </select>
                    <div className='flex w-full '>
                      <input
                        className="min-w-20 w-full sm:text-md px-2  rounded-md "
                        type="text"
                        placeholder="Link"
                        value={socialItem.link}
                        onChange={(e) => handleSocialChange(index, 'link', e.target.value)}
                      />
                        <button
                        onClick={() => setProfile(prevProfile => ({
                          ...prevProfile,
                          social: prevProfile.social.filter((_, i) => i !== index),
                        }))}
                      >
                        <img src={closeSvg} className="h-6 w-6" />
                        </button>
                      
                      
                    </div>  
                  </div>
                ))}
                <button
                  type="button"
                  className="mt-2 w-full py-2 bg-blue-400 text-white font-semibold md:w-[14rem] rounded-md"
                  onClick={() => setProfile(prevProfile => ({
                    ...prevProfile,
                    social: [...prevProfile.social, { platform: '', link: '' }],
                  }))}
                >
                  Add Social Link
                </button>
              </div>
            </form>
            <div className='flex items-center gap-4 mt-8'>
              <button
                className="py-2 px-5 font-semibold bg-gray-800 text-white rounded-full"
                onClick={handleSubmit}
              >
                Save Changes
              </button>
              <button
                className="py-2 px-5 font-semibold bg-gray-500 text-white rounded-full"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
