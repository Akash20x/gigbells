import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { resetEditEducation, resetEditPosition, setAbout, setIsNewEducationItem, setIsNewPosition, setShowEducationModal, setShowPositionModal, setUpdateEducation, setUpdatePosition } from '../redux/userSlice';
import { createAbout, deleteEducation, deletePosition } from '../services/profileServices';
import 'react-quill/dist/quill.bubble.css'
import ToastNotification from './ToastNotification';
import { Education, Position, User } from '../misc/types';
import { AppDispatch } from '../redux/store';
import EditEducation from './EditEducation';
import EditPosition from './EditPosition';

const ProfileAbout = () => {

    const dispatch = useDispatch<AppDispatch>();

    const state = useSelector((state: { user: User }) => state.user);
    
    const { about, positions, showPositionModal, educationItems, showEducationModal } = state;
    
    const handleAboutChange = (value: string) => {
        dispatch(setAbout(value));
    };

    const handleAboutSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(createAbout(about))
        ToastNotification('About updated.')

    };

    const handleAddEducation = () => {
        dispatch(resetEditEducation())
        dispatch(setIsNewEducationItem(true))
        dispatch(setShowEducationModal(true))
        document.body.style.overflow = 'hidden';
    };

    const handleEditEducation = (index: number, education: Education) => {
        dispatch(setUpdateEducation({
            educationIndex: index,
            title: education.title,
            location: education.location,
            startedAtYear: education.startedAtYear,
            endedAtYear: education.endedAtYear,
            description: education.description
        }))
        
        dispatch(setIsNewEducationItem(false))
        dispatch(setShowEducationModal(true))
        document.body.style.overflow = 'hidden';
    };

   
    const handleAddPosition = () => {
        dispatch(resetEditPosition())
        dispatch(setIsNewPosition(true))
        dispatch(setShowPositionModal(true))
        document.body.style.overflow = 'hidden';
    };

    const handleEditPosition = (index: number, position: Position) => {
         dispatch(setUpdatePosition({
            positionIndex: index,
            title: position.title,
            company: position.company,
            location: position.location,
            isCurrentPosition: position.isCurrentPosition,
            startedAt: position.startedAt,
            endedAt: position.endedAt,
            description: position.description
        }))
        
        dispatch(setIsNewPosition(false))
        dispatch(setShowPositionModal(true))
        document.body.style.overflow = 'hidden';
    };

  
    const handleDeleteEducation = (id: string) => {
        if (window.confirm("Are you sure?.")) {
            const educationId = id
            dispatch(deleteEducation(educationId))
            document.body.style.overflow = 'auto';
        }
    };

    const handleDeletePosition = (id: string) => {
        if (window.confirm("Are you sure?.")) {
            const positionId = id
            dispatch(deletePosition(positionId))
            document.body.style.overflow = 'auto';
        }
    };

    return (
        <div className='mx-auto max-w-4xl pb-20 px-4 lg:px-0'>
            {/* About  */}
            <div className="flex flex-col gap-y-8 mt-6">
                <form className="flex flex-col gap-8" onSubmit={handleAboutSubmit}>
                    <div className="w-full justify-start border-2 rounded-2xl px-4 sm:px-6 py-2 sm:py-3 flex flex-col focus-within:border-black">
                        <label className="text-sm px-2">
                            About
                        </label>
                        <ReactQuill
                            theme="snow"
                            className='py-2 font-quill-normal'
                            value={about}
                            onChange={handleAboutChange}
                        />
                    </div>
                    <div className="self-start">
                        <button
                            type="submit"
                            className="rounded-full bg-gray-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 inline-flex self-end"
                        >
                            <span className="flex-1 flex items-center text-center w-full gap-1">
                                <span className="flex-1">Update</span>
                            </span>
                        </button>
                    </div>
                </form>
            </div>

            {/* Position  */}
            <div className="flex flex-col gap-y-8 mt-6">
                <div className="flex justify-center sm:justify-end gap-4 cursor-pointer">
                    <div className="rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 inline-flex self-end" onClick={handleAddPosition}>
                        <span className="flex-1 flex items-center text-center w-full gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span className="flex-1">Add Position</span>
                        </span>
                    </div>
                </div>

                <div className="flex flex-col gap-8">
                    {positions.length === 0 ? (
                        <div className="flex flex-col w-full">
                            <div className="flex w-full mb-4 gap-4 flex-col sm:flex-row">
                                <div className="flex-1 text-xl font-semibold">
                                    <div className="flex justify-between items-center w-full cursor-pointer sm:cursor-auto">
                                        <span>Build Your Resume</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="sm:hidden h-6 shrink-0 transition-transform" data-section-toggle-target="arrow">
                                            <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clipRule="evenodd"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="relative w-full cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-4" onClick={handleAddPosition}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="mx-auto h-12 w-12 text-gray-400">
                                    <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd"></path>
                                </svg>
                                <div className="mt-4 text-sm font-semibold text-gray-900">
                                    <span>Add your positions here</span>
                                </div>
                            </div>
                        </div>
                    ) : (

                        <div className="flex flex-col gap-4">
                            {positions?.map((position, index) => (
                                <>

                                    <div key={position._id} className="relative pl-8 group">
                                        <div className="absolute inset-0 mt-2 w-4 h-4 bg-gradient-to-b from-[#771EE1] to-[#DA0F10] rounded-full"></div>
                                        <div className="absolute inset-0 mt-6 ml-2 w-px h-[calc(100%+1rem)] bg-gray-600 group-last-of-type:hidden"></div>
                                        <div className="flex flex-col sm:flex-row flex-grow w-full text-2xl font-bold text-[#A91677]">
                                            <div className="flex-1">
                                                {position.title}, {position.company}
                                            </div>

                                            <div className="relative self-start py-2 sm:py-0 sm:self-center cursor-pointer inline-flex items-center gap-2">
                                                <div onClick={() => handleEditPosition(index,position)} className="rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 inline-flex self-end">
                                                    <span className="flex-1 flex items-center text-center w-full gap-1">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="h-4">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"></path>
                                                        </svg>

                                                        <span className="flex-1">
                                                            edit
                                                        </span>
                                                    </span>
                                                </div>

                                                <div onClick={() => position._id && handleDeletePosition(position._id)} className="rounded bg-white px-2 py-1 text-sm cursor-pointer font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 inline-flex self-end">
                                                    <span className="flex-1 flex items-center text-center w-full gap-1">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="h-4">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path>
                                                        </svg>

                                                        <span className="flex-1">
                                                            delete
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-lg text-gray-400 font-bold">
                                            ({position.startedAt.year} - {position.endedAt.year !== "" ? position.endedAt.year : "Present" })
                                            <div className="inline ml-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 -mt-1 inline">
                                                    <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path>
                                                </svg>
                                                {position.location}
                                            </div>
                                        </div>
                                        <div className="text-xl text-gray-600 mt-2">
                                            
                                              <ReactQuill
                                                    value={position.description}
                                                    readOnly={true} 
                                                    theme={"bubble"}
                                                    className={`font-quill-normal-ns`}
                                                    />
                                        </div>
                                    </div>

                                </>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Education  */}
            <div className="flex flex-col mt-10 gap-4">
                <div className="flex w-full gap-4 flex-col sm:flex-row">
                    <div className="flex-1 text-xl font-semibold">
                        <div className="flex justify-between items-center w-full cursor-pointer sm:cursor-auto" data-action="click->section-toggle#toggle">
                            <span>Education </span> 
                        </div>
                    </div>

                    <div className="flex justify-around xs:justify-end gap-4 cursor-pointer">
                        <div className="rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 inline-flex self-end" onClick={handleAddEducation}>
                            <span className="flex-1 flex items-center text-center w-full gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <span className="flex-1">Add Education item</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    {educationItems.length === 0 ? (
                        <div className="relative w-full cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-4" onClick={handleAddEducation}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="mx-auto h-12 w-12 text-gray-400">
                                <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd"></path>
                            </svg>
                            <div className="mt-4 text-sm font-semibold text-gray-900">
                                <span>Add your education here</span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {educationItems.map((education,index) => (
                                <>
                                    <div key={education._id} className="relative group">
                                        <div className="flex flex-col sm:flex-row flex-grow w-full text-2xl font-bold text-[#A91677]">
                                            <div className="flex-1">
                                                {education.title}
                                            </div>
                                            <div className="relative py-2 sm:py-0 self-start sm:self-center inline-flex items-center gap-2 cursor-pointer">
                                                <div onClick={() => handleEditEducation(index,education)} className="rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 inline-flex self-end">
                                                    <span className="flex-1 flex items-center text-center w-full gap-1">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="h-4">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"></path>
                                                        </svg>

                                                        <span className="flex-1">
                                                            edit
                                                        </span>
                                                    </span>
                                                </div>
                                                <div onClick={() => education._id && handleDeleteEducation(education._id)} className="cursor-pointer rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 inline-flex self-end">
                                                    <span className="flex-1 flex items-center text-center w-full gap-1">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="h-4">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path>
                                                        </svg>

                                                        <span className="flex-1">
                                                            delete
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-lg text-gray-400 font-bold">
                                            ({education.startedAtYear} - {education.endedAtYear} )
                                            <div className="inline ml-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 -mt-1 inline">
                                                    <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path>
                                                </svg>
                                                {education.location}
                                            </div>
                                        </div>
                                        <div className="text-xl text-gray-600 mt-2">
                                            <ReactQuill
                                                value={education.description}
                                                readOnly={true} 
                                                theme={"bubble"}
                                                className={`font-quill-normal-ns`}
                                            />
                                        </div>
                                    </div>
                                </>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {showEducationModal && <EditEducation />}

            {showPositionModal && <EditPosition />}

        </div>
    );
};

export default ProfileAbout;
