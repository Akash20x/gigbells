import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeServiceSkill, setEditService, setServiceSkill, setShowServiceModal } from "../redux/userSlice";
import ReactQuill from "react-quill";
import { createService, updateService } from "../services/profileServices";
import EditSkills from "./EditSkills";
import closeSvg from '../assets/close.svg'
import ToastNotification from "./ToastNotification";
import { AppDispatch } from "../redux/store";
import { User } from "../misc/types";


const EditService = () => {

    const dispatch = useDispatch<AppDispatch>();

    const state = useSelector((state: { user: User }) => state.user);
    
    const { editService, isNewService, services  } = state;

    const handleClose = () => {
        dispatch(setShowServiceModal(false))
        document.body.style.overflow = 'auto';
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        dispatch(setEditService({field: name, value: value}))
    };

    const handleQuillChange = (field: string, value: string) => {
        dispatch(setEditService({ field, value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
                           
        const service =  {
            name: editService.name,
            feeType: editService.feeType,
            fixedCost: editService.fixedCost,
            skills: editService.skills,
            description: editService.description,
            deliverables: editService.deliverables
        }
                
                
        if(editService.serviceIndex && editService.serviceIndex < 0){
            dispatch(createService(service))
            ToastNotification("Service added")            
        }
        else{
            const serviceId =  services[editService.serviceIndex ?? 0]._id

            if(serviceId){
                dispatch(updateService({serviceId: serviceId, service: service}))
                ToastNotification("Service updated")
            }
        }

        dispatch(setShowServiceModal(false))
        document.body.style.overflow = 'auto';
    };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full justify-center text-center items-center pt-12">
            <div className="fixed inset-0 bg-gray-300 bg-opacity-75 transition-opacity"/>
            <div className="relative transform rounded-lg bg-white text-left shadow-xl transition-all py-8 md:py-12 px-8 md:px-16 h-full w-full">
                <div className="relative max-w-2xl mx-auto">
                    <div className="absolute right-0 top-0 pr-4 pt-4 block">
                        <button className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={handleClose}>
                            <img src={closeSvg} className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="text-3xl font-bold mb-12 text-neutral-700 text-left">
                        {isNewService ?  "Create Service": "Edit Service"}
                    </div>
                    <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                        <div className="w-full border-2 rounded-2xl px-4 sm:px-6 py-2 sm:py-3 flex flex-col focus-within:border-black">
                            <label className="text-sm" htmlFor="service_name">Service name</label>
                            <input
                                className="sm:text-md disabled:bg-gray-100 disabled:cursor-not-allowed focus:outline-0"
                                autoFocus
                                type="text"
                                name="name"
                                id="name"
                                required
                                value={editService?.name || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="w-full border-2 rounded-2xl px-4 sm:px-6 py-2 sm:py-3 flex flex-col focus-within:border-black">
                            <label className="text-sm" htmlFor="fee_type">Fee Type</label>
                            <select
                                className="sm:text-md disabled:bg-gray-100 disabled:cursor-not-allowed focus:outline-0"
                                name="feeType"
                                id="feeType"
                                value={editService.feeType}
                                onChange={handleChange}
                            >
                                <option value="Contact for pricing">Contact for pricing</option>
                                <option value="Fixed fee">Fixed fee</option>
                            </select>
                        </div>
                        {editService.feeType === 'Fixed fee' && (
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="w-full border-2 rounded-2xl px-4 sm:px-6 py-2 sm:py-3 flex flex-col focus-within:border-black">
                                    <div className="flex flex-row gap-x-3">
                                        <div className="w-1/4 flex flex-col justify-center font-bold text-gray-600">
                                            <select
                                                className="sm:text-md disabled:bg-gray-100 disabled:cursor-not-allowed focus:outline-0"
                                                name="currency"
                                                id="currency"
                                                value={editService.fixedCost?.currency || 'INR'}
                                                onChange={handleChange}
                                            >
                                                <option value="INR">INR</option>
                                                <option value="USD">USD</option>
                                            </select>
                                        </div>
                                        <div className="flex flex-grow flex-col">
                                            <label className="text-sm" htmlFor="cost">Price (starting at)</label>
                                            <input
                                                className="sm:text-md disabled:bg-gray-100 disabled:cursor-not-allowed focus:outline-0"
                                                autoFocus
                                                type="text"
                                                name="cost"
                                                id="cost"
                                                required
                                                value={editService.fixedCost.cost || ''}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full border-2 rounded-2xl px-4 sm:px-6 py-2 sm:py-3 flex flex-col focus-within:border-black">
                                    <label className="text-sm" htmlFor="durationType">Per</label>
                                    <select
                                        className="sm:text-md disabled:bg-gray-100 disabled:cursor-not-allowed focus:outline-0"
                                        name="durationType"
                                        id="durationType"
                                        value={editService.fixedCost.durationType || ''}
                                        onChange={handleChange}
                                    >
                                        <option value="" label=" "></option>
                                        <option value="hour">hour</option>
                                        <option value="month">month</option>
                                        <option value="project">project</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        <EditSkills
                            skillsData = {editService?.skills}
                            setSkillAction={setServiceSkill} 
                            removeSkillAction={removeServiceSkill} 
                        />

                        <div className="w-full justify-start border-2 rounded-2xl px-4 sm:px-6 py-2 sm:py-3 flex flex-col focus-within:border-black">
                            <label className="text-sm px-2">
                                Description
                            </label>
                            <ReactQuill
                                theme="snow"
                                className='py-2'
                                value={editService.description}
                                onChange={(value) => handleQuillChange('description', value)}
                            />
                        </div>
                       
                        <div className="w-full justify-start border-2 rounded-2xl px-4 sm:px-6 py-2 sm:py-3 flex flex-col focus-within:border-black">
                            <label className="text-sm px-2">
                            Deliverables
                            </label>
                            <ReactQuill
                                theme="snow"
                                className='py-2'
                                value={editService.deliverables}
                                onChange={(value) => handleQuillChange('deliverables', value)}
                            />
                        </div>

                        <button type="submit" className="rounded-full bg-gray-600 px-12 sm:px-6 py-2.5 text-base sm:text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 inline-flex self-center sm:self-end">
                            <span className="flex-1 flex items-center text-center w-full gap-1">
                                <span className="flex-1">
                                    {isNewService ? 'Update' : 'Save'}
                                </span>
                            </span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
</div>
  )
}

export default EditService
