import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setCurrentService, setPreviewServiceModal } from "../redux/userSlice";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.bubble.css'
import { AppDispatch } from "../redux/store";
import { User } from "../misc/types";
import { isContentEmpty } from "../misc";
import { useLocation, useNavigate } from "react-router-dom";

const ServiceInfo = () => {

    const dispatch = useDispatch<AppDispatch>();

    const navigate = useNavigate();
    const location = useLocation();

    const state = useSelector((state: { user: User }) => state.user);
    
    const { editService, profile } = state;

    const handleClose = () => {
        dispatch(setPreviewServiceModal(false))
        document.body.style.overflow = 'auto';
    };

    const handleServiceContact = () => {        
        dispatch(setCurrentService(editService?.name))

        if (location.pathname.endsWith("/services")) {
            const newPath = location.pathname.replace("/services", "/contact");
            navigate(newPath);
        }      
        handleClose()
    }
    
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full justify-center text-center items-center pt-12">
            <div
                className="fixed inset-0 bg-gray-300 bg-opacity-75 transition-opacity"
                onClick={handleClose}
            />
            <div className="relative transform rounded-lg bg-white text-left shadow-xl transition-all py-8 md:py-12 px-8 md:px-16 h-full w-full">
                <div className="relative max-w-2xl mx-auto">
                    <div className="absolute right-0 top-0 pr-4 pt-4 block">
                        <div
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
                            onClick={handleClose}
                        >
                            <span className="sr-only">Close</span>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                    </div>
                    <div className="text-3xl font-bold mb-12 text-neutral-700 text-left">
                        {editService?.name}
                    </div>

                    <div className="space-y-8">
                        {editService.feeType === 'Fixed fee' && 
                         <div>
                            <h3 className="font-semibold text-lg">Price</h3>
                            <h4 className="text-2xl font-bold">{`${editService.fixedCost.currency === 'INR' ? '₹' : '$'}${editService.fixedCost.cost}/${editService.fixedCost.durationType}`}</h4>
                        </div>
                        }

                        {!isContentEmpty(editService.description) &&       
                        <div>
                            <h3 className="font-semibold text-lg">Description</h3>
                            <div className="text-xl text-gray-600 mt-2">                                        
                                <ReactQuill
                                    value={editService.description}
                                    readOnly={true} 
                                    theme={"bubble"}
                                    className={`font-quill-normal-ns`}
                                />
                            </div>
                        </div>
                        }

                        {!isContentEmpty(editService.deliverables) &&
                        <div>
                            <h3 className="font-semibold text-lg">Deliverables</h3>
                            <div className="text-xl text-gray-600 mt-2">                                                    
                                <ReactQuill
                                    value={editService.deliverables}
                                    readOnly={true} 
                                    theme={"bubble"}
                                    className={`font-quill-normal-ns`}
                                    />
                            </div>
                        </div>
                        }    

                        <div className="flex flex-wrap gap-2">
                            {editService.skills.map((skill) => (
                                <div key={skill} className="inline-flex shrink-0 border rounded-2xl px-3 py-1 text-sm">
                                    {skill}
                                </div>
                            ))}
                        </div>

                        <hr />

                        <div className="flex flex-col items-center">
                            
                            <div className="font-semibold text-xl my-4">
                                {`Collaborate with ${profile?.name}`}
                            </div>
                            <div className="text-white text-center font-bold text-lg md:text-lg lg:text-2xl px-4 md:px-4 lg:px-8 py-1.5 lg:py-3 rounded-full cursor-pointer get-in" onClick={handleServiceContact}>
                            Get in touch!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ServiceInfo
