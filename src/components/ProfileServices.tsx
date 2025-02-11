import addSvg from "../assets/addSvg.svg";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { resetEditService, setIsNewService, setPreviewServiceModal, setShowServiceModal, setUpdateService } from "../redux/userSlice";
import { deleteService } from "../services/profileServices";
import EditService from "./EditService";
import ServiceInfo from "./ServiceInfo";
import ToastNotification from "./ToastNotification";
import { AppDispatch } from "../redux/store";
import { Service, User } from "../misc/types";

const ProfileServices = () => { 

    const dispatch = useDispatch<AppDispatch>();
   
    const state = useSelector((state: { user: User }) => state.user);
   
    const { services, showServiceModal, previewServiceModal  } = state;
 
    const handleEdit = (index: number, service: Service) => {
        dispatch(setUpdateService({
               serviceIndex: index,
               name: service.name,
               feeType: service.feeType,
               fixedCost: service.fixedCost,
               skills: service.skills,
               description: service.description,
               deliverables: service.deliverables
           }))
           
           dispatch(setShowServiceModal(true))
           dispatch(setIsNewService(false))
           document.body.style.overflow = 'hidden';
    };

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this service?")) {
            const serviceId = id
            dispatch(deleteService(serviceId))
            ToastNotification("Service removed.")
            document.body.style.overflow = 'auto';
        }
    };


    const handleViewService = (index: number, service: Service) => {
        dispatch(setPreviewServiceModal(true))
        dispatch(setUpdateService({
            serviceIndex: index,
            name: service.name,
            feeType: service.feeType,
            fixedCost: service.fixedCost,
            skills: service.skills,
            description: service.description,
            deliverables: service.deliverables
        }))
        document.body.style.overflow = 'hidden';
    }


    const handleAddService = () => {
        dispatch(setShowServiceModal(true))
        dispatch(resetEditService())  
        dispatch(setIsNewService(true))
        document.body.style.overflow = 'hidden';
    };

    return (
        <div className='mx-auto max-w-4xl px-4 lg:px-0 py-10'>

            <div className="flex flex-col gap-y-8 mt-6">
                <div className="flex justify-around sm:justify-end gap-4">
                    <div onClick={handleAddService} className="cursor-pointer rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        <span className="flex-1 flex items-center text-center w-full gap-1">
                            <img src={addSvg} className='h-4' alt="" />
                            <span className="flex-1">
                                add service
                            </span>
                        </span>
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {services.map((service,index) => (
                        <div key={service._id} className="relative h-72">
                            <div className="flex flex-col bg-white border group border-gray-300 rounded-3xl py-10 hover:pt-8 will-change-transform transition-all px-6 h-full pb-16">
                                <div className="relative text-2xl font-semibold leading-tight text-ellipsis overflow-hidden group-hover:mb-2 transition-all">
                                    {service.name}
                                </div>
                                <div>
                                    <div className="uppercase text-gray-300 text-sm mt-4">
                                        {service.feeType === 'Fixed fee' ? 'Starting at' : ''}
                                    </div>
                                    <div className="text-2xl">
                                        {service.feeType === 'Fixed fee' ? `${service.fixedCost.currency === 'INR' ? '₹' : '$'}${service.fixedCost.cost}/${service.fixedCost.durationType}` : 'Contact for pricing'}
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-1 mt-4">
                                    {service.skills.map((skill, index) => (
                                        <div key={index} className="inline-flex shrink-0 border rounded-2xl px-2 py-1 text-xs">
                                            {skill}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div onClick={() => handleViewService(index, service)} className="absolute cursor-pointer top-[10rem] right-[1rem] rounded-full bg-backdrop px-5 py-2.5 text-sm shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 inline-flex self-end mt-6 items-center max-w-full">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-6 w-8">
                                    <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clipRule="evenodd"></path>
                                </svg>
                            </div>

                            <div className="absolute w-full px-6 -mt-12 flex justify-between">
                                <div
                                    onClick={() => handleEdit(index, service)}
                                    className="rounded cursor-pointer bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 inline-flex self-end">
                                    <span className="flex-1 flex items-center text-center w-full gap-1">
                                        <span className="flex-1">
                                            edit
                                        </span>
                                    </span>
                                </div>

                                <div
                                    onClick={() => service._id && handleDelete(service._id)}
                                    className="rounded cursor-pointer bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 inline-flex self-end">
                                    <span className="flex-1 flex items-center text-center w-full gap-1">
                                        <span className="flex-1">
                                            delete
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            {showServiceModal && <EditService />}

            {previewServiceModal && <ServiceInfo/>}
        </div>
    )
}

export default ProfileServices;