
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setEditEducation, setShowEducationModal } from '../redux/userSlice';
import { createEducation, updateEducation } from '../services/profileServices';
import ReactQuill from 'react-quill';
import closeSvg from '../assets/close.svg'
import { AppDispatch } from '../redux/store';
import { User } from '../misc/types';

const EditEducation = () => {

    const dispatch = useDispatch<AppDispatch>();

    const state = useSelector((state: { user: User }) => state.user);
    
    const { editEducation, educationItems, isNewEducationItem } = state;
 
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        dispatch(setEditEducation({field: name, value: value}))
    };

    const handleQuillChange = (value: string) => {
        dispatch(setEditEducation({field: 'description', value: value}))
    };
        
    const handleClose = () => {
        dispatch(setShowEducationModal(false))
        document.body.style.overflow = 'auto';
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
                   
        const education =  {
            title: editEducation.title,
            location: editEducation.location,
            startedAtYear: editEducation.startedAtYear,
            endedAtYear: editEducation.endedAtYear,
            description: editEducation.description
        }

        if(editEducation.educationIndex && editEducation.educationIndex < 0){
            dispatch(createEducation(education)) 
        }
        else{
            const educationId = educationItems[editEducation.educationIndex ?? 0]._id

            if(educationId){
                dispatch(updateEducation({educationId, education}))
            }
        }
       
        dispatch(setShowEducationModal(false))
        document.body.style.overflow = 'auto';
    };

    return (
        <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full justify-center text-center items-center p-2 md:p-4">
                <div className="fixed inset-0 bg-gray-300 bg-opacity-75 transition-opacity"></div>
                <div className="relative transform rounded-lg bg-white text-left shadow-xl transition-all py-8 md:py-12 px-0 md:px-16 h-full sm:my-8 w-full max-w-6xl xl:h-4/5">
                    <div className="relative max-w-full">
                        <div className="absolute right-0 top-0 pr-4 pt-2 sm:pt-4 block">
                            <button className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={handleClose}>
                                <img src={closeSvg} className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="text-2xl sm:text-3xl font-bold mb-12 text-neutral-700 text-center">
                            {isNewEducationItem ? "Add new education item" : "Update education item"}
                        </div>

                        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto flex flex-col gap-8 bg-white p-8 rounded">
                            <div className="w-full border-2 rounded-2xl px-4 sm:px-6 py-2 sm:py-3 flex flex-col focus-within:border-black">
                                <label className="text-sm" htmlFor="title">Title *</label>
                                <input
                                    className="sm:text-md disabled:bg-gray-100 disabled:cursor-not-allowed focus:outline-none"
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={editEducation.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            
                            <div className="w-full border-2 rounded-2xl px-4 sm:px-6 py-2 sm:py-3 flex flex-col focus-within:border-black">
                                <label className="text-sm" htmlFor="location">Location</label>
                                <input
                                    className="sm:text-md disabled:bg-gray-100 disabled:cursor-not-allowed focus:outline-none"
                                    type="text"
                                    name="location"
                                    id="location"
                                    value={editEducation.location}
                                    onChange={handleChange}
                                />
                            </div>
                            
                            <div className="w-full flex gap-4">
                                <div className="w-full border-2 rounded-2xl px-4 sm:px-6 py-2 sm:py-3 flex flex-col focus-within:border-black">
                                    <label className="text-sm" htmlFor="startedAtYear">Started at *</label>
                                    <div className='w-full'>
                                    <select
                                        className="sm:text-md disabled:bg-gray-100 disabled:cursor-not-allowed w-full"
                                        name="startedAtYear"
                                        id="startedAtYear"
                                        value={editEducation.startedAtYear}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Year</option>
                                        {Array.from({ length: 35 }, (_, i) => 2025 - i).map(year => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                
                                    </div>
                                
                                </div>
                                <div className="w-full border-2 rounded-2xl px-4 sm:px-6 py-2 sm:py-3 flex flex-col focus-within:border-black">
                                    <label className="text-sm" htmlFor="endedAtYear">Ended at *</label>
                                    <div className='w-full'>
                                    <select
                                        className="sm:text-md disabled:bg-gray-100 disabled:cursor-not-allowed w-full"
                                        name="endedAtYear"
                                        id="endedAtYear"
                                        value={editEducation.endedAtYear}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Year</option>
                                        {Array.from({ length: 35 }, (_, i) => 2025 - i).map(year => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                
                                    </div>
                                
                                </div>
                            
                            </div>

                            <div className="w-full justify-start border-2 rounded-2xl px-4 sm:px-6 py-2 sm:py-3 flex flex-col focus-within:border-black">
                                <label className="text-sm px-2">Description</label>
                                <ReactQuill
                                    theme="snow"
                                    className='py-2'
                                    value={editEducation.description}
                                    onChange={(value) => handleQuillChange(value)}
                                />
                            </div>
                            
                            <button
                                type="submit"
                                className="rounded-full w-1/2 sm:w-auto bg-gray-600 px-8 py-2.5 text-base sm:text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 inline-flex self-center sm:self-end"
                            >
                                <span className="flex-1 flex items-center text-center w-full gap-1">
                                    <span className="flex-1">
                                        Save
                                    </span>
                                </span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditEducation;
