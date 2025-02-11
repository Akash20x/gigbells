import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setPreviewServiceModal, setUpdateService } from "../../redux/userSlice";
import ServiceInfo from "../ServiceInfo";
import { AppDispatch } from "../../redux/store";
import { Service, User } from "../../misc/types";

const Services = () => {

    const dispatch = useDispatch<AppDispatch>();

    const state = useSelector((state: { user: User }) => state.user);
    
    const { services, previewServiceModal } = state;

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

  return (
    <div className='mx-auto max-w-4xl px-4 lg:px-0 py-10'>

        <div className="flex flex-col gap-y-8 mt-6">
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

                        <div onClick={() => handleViewService(index, service)} className="absolute cursor-pointer top-[13rem] right-[1rem] rounded-full bg-backdrop px-5 py-2.5 text-sm shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 inline-flex self-end mt-6 items-center max-w-full">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-6 w-8">
                            <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clipRule="evenodd"></path>
                            </svg>
                        </div>
                    
                    </div>
                ))}
            </div>
        </div>

        {previewServiceModal && <ServiceInfo />}
    </div>
    )
}

export default Services
