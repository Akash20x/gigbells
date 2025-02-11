import closeSvg from '../assets/close.svg'
import ReactQuill from 'react-quill';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setEditPosition, setShowPositionModal } from '../redux/userSlice';
import { createPosition, updatePosition } from '../services/profileServices';
import { AppDispatch } from '../redux/store';
import { User } from '../misc/types';

const EditPosition = () => {

    const dispatch = useDispatch<AppDispatch>();
    
    const state = useSelector((state: { user: User }) => state.user);
    
    const { editPosition, positions, isNewPosition } = state;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        dispatch(setEditPosition({field: name, value: value}))
    };

    const handleCheckedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        dispatch(setEditPosition({ field: name, value: checked }));
    };

    const handleQuillChange = (value: string) => {
        dispatch(setEditPosition({field: 'description', value: value}))
    };
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const position =  {
            title: editPosition.title,
            company: editPosition.company,
            location: editPosition.location,
            isCurrentPosition: editPosition.isCurrentPosition,
            startedAt: editPosition.startedAt,
            endedAt: {
                month: editPosition.isCurrentPosition ? '' : editPosition.endedAt.month,
                year: editPosition.isCurrentPosition ? '' : editPosition.endedAt.year,
            },
            description: editPosition.description
        }        

        if(editPosition.positionIndex && editPosition.positionIndex < 0){
            dispatch(createPosition(position))    
        }
        else{
            const positionId = positions[editPosition.positionIndex ?? 0]._id

            if(positionId){
                dispatch(updatePosition({positionId, position}))
            }
        }

        dispatch(setShowPositionModal(false))
        document.body.style.overflow = 'auto';
    };

    const handleClose = () => {
        dispatch(setShowPositionModal(false))
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

                        <div className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-12 text-neutral-700 text-center">
                            {isNewPosition ?  "Add new position" :  "Update position"}
                        </div>

                        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto flex flex-col gap-8 bg-white p-8 rounded">
                            <div className="w-full border-2 rounded-2xl px-4 sm:px-6 py-2 sm:py-3 flex flex-col focus-within:border-black">
                                <label className="text-sm" htmlFor="title">Title *</label>
                                <input
                                    className="sm:text-md disabled:bg-gray-100 disabled:cursor-not-allowed focus:outline-none"
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={editPosition?.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="w-full border-2 rounded-2xl px-4 sm:px-6 py-2 sm:py-3 flex flex-col focus-within:border-black">
                                <label className="text-sm" htmlFor="company">Company *</label>
                                <input
                                    className="sm:text-md disabled:bg-gray-100 disabled:cursor-not-allowed focus:outline-none"
                                    type="text"
                                    name="company"
                                    id="company"
                                    value={editPosition.company}
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
                                    value={editPosition.location}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex items-center gap-4 mt-4">
                                <input
                                    id="isCurrentPosition"
                                    name="isCurrentPosition"
                                    type="checkbox"
                                    checked={editPosition.isCurrentPosition}
                                    onChange={handleCheckedChange}
                                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded"
                                />
                                <label htmlFor="isCurrentPosition" className="text-sm font-medium text-gray-700">Current position</label>
                            </div>
                            <div className="w-full flex flex-col sm:flex-row gap-4">
                                <div className="w-full border-2 rounded-2xl px-4 sm:px-6 py-2 sm:py-3 flex flex-col focus-within:border-black">
                                    <label className="text-sm">Started at *</label>
                                    <div className='flex gap-4'>
                                    <select
                                        className="sm:text-md disabled:bg-gray-100 disabled:cursor-not-allowed"
                                        name="startedAtMonth"
                                        id="startedAtMonth"
                                        value={editPosition.startedAt.month}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Month</option>
                                        {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(month => (
                                            <option key={month} value={month}>{month}</option>
                                        ))}
                                    </select>
                                    <select
                                        className="sm:text-md disabled:bg-gray-100 disabled:cursor-not-allowed"
                                        name="startedAtYear"
                                        id="startedAtYear"
                                        value={editPosition.startedAt.year}
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
                                    <label className="text-sm" htmlFor="endedAtMonth">Ended at *</label>
                                    <div className='flex gap-4'>
                                    <select
                                        className="sm:text-md disabled:bg-gray-100 disabled:cursor-not-allowed"
                                        name="endedAtMonth"
                                        id="endedAtMonth"
                                        disabled = {editPosition.isCurrentPosition === true}
                                        value={editPosition.endedAt.month}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Month</option>
                                        {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(month => (
                                            <option key={month} value={month}>{month}</option>
                                        ))}
                                    </select>
                                    <select
                                        className="sm:text-md disabled:bg-gray-100 disabled:cursor-not-allowed"
                                        name="endedAtYear"
                                        id="endedAtYear"
                                        disabled = {editPosition.isCurrentPosition === true}
                                        value={editPosition.endedAt.year}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Year</option>
                                        {Array.from({ length: 35 }, (_, i) => 2024 - i).map(year => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                    </div>
                                
                                </div>
                            
                            </div>

                            <div className="w-full justify-start border-2 rounded-2xl px-4 sm:px-6 py-2 sm:py-3 flex flex-col focus-within:border-black">
                                <label className="text-sm px-2">
                                    Description
                                </label>
                                <ReactQuill
                                    theme="snow"
                                    className='py-2'
                                    value={editPosition.description}
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

export default EditPosition;
