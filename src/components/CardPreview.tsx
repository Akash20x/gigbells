import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import 'react-quill/dist/quill.bubble.css'
import { setPreviewCardSubPageModal } from "../redux/portfolioSlice";
import ReactQuill from "react-quill";
import { Link } from "react-router-dom";
import { FaRegFileCode } from "react-icons/fa";
import { FaExternalLinkAlt } from "react-icons/fa";
import { AppDispatch } from "../redux/store";
import { Portfolio } from "../misc/types";
import closeSvg from '../assets/close.svg'
import { isContentEmpty } from "../misc";


const CardPreview = () => {

    const dispatch = useDispatch<AppDispatch>();
    
    const state = useSelector((state: { portfolio: Portfolio }) => state.portfolio);

    const { editCard  } = state;

    const handleClose = () => {
        dispatch(setPreviewCardSubPageModal(false))
        document.body.style.overflow = 'auto';
    };
    
           
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full justify-center text-center items-center pt-12">
            <div
                className="fixed inset-0 bg-gray-300 bg-opacity-75 transition-opacity"
                onClick={handleClose}
            />
            <div className="relative transform rounded-lg bg-white text-left shadow-xl transition-all py-8 md:py-12 px-8 md:px-16 h-full w-full">
                <div className="relative max-w-2xl mx-auto">
                    
                    <div className="absolute right-0 top-0 pr-4 pt-2 block">
                        <button className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={handleClose}>
                            <img src={closeSvg} className="h-6 w-6" />
                        </button>
                    </div>
                 
                    <div className="text-3xl font-bold mb-12 text-neutral-700 text-left">
                          <ReactQuill
                            value={editCard?.body}
                            readOnly={true} 
                            theme={"bubble"}
                            className={`font-quill-heading`}
                            />
                        </div>

                    <div className="space-y-8">
                        
                        {!isContentEmpty(editCard.subPage.description) &&
                        <div>
                            <h3 className="font-semibold text-lg">Project Description</h3>
                            <ReactQuill
                                value={editCard.subPage.description}
                                readOnly={true} 
                                theme={"bubble"}
                                className={`font-quill-normal-ns`}
                            />
                        </div>}
                        
                        {!isContentEmpty(editCard.subPage.functionality) &&
                        <div>
                            <h3 className="font-semibold text-lg">Functionality</h3>
                            <ReactQuill
                                value={editCard.subPage.functionality}
                                readOnly={true} 
                                theme={"bubble"}
                                className={`font-quill-normal-ns`}
                            />
                        </div>
                        }

                        {editCard?.subPage?.tags.length > 0 && 
                            <div className="flex flex-col gap-2">
                                <h3 className="font-semibold text-lg w-full py-2">Tags</h3>
                                <div className="w-full flex gap-2 flex-wrap">
                                    {editCard?.subPage?.tags.map((tag, index) => (
                                        <div key={index} className="inline-flex shrink-0 border rounded-2xl px-3 py-1 text-sm bg-blue-100">
                                            {tag}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        } 
                               

                        {editCard.subPage.link && 
                        <div className='flex gap-6 font-semibold'>
                            {editCard.subPage.link.code && 
                                <Link to={editCard.subPage.link.code} target="_blank" rel="noopener noreferrer">
                                    <div className='bg-sky-300 flex gap-2 items-center cursor-pointer py-1 px-4 rounded-md shadow-lg hover:bg-blue-300 hover:border-orange-300 hover:border'>
                                        <FaRegFileCode />
                                        Code
                                    </div>
                                </Link>
                            }
                            {editCard.subPage.link.live && 
                                <Link to={editCard.subPage.link.live} target="_blank" rel="noopener noreferrer">
                                    <div className='bg-sky-300 flex gap-2 items-center cursor-pointer py-1 px-4 rounded-md shadow-lg hover:bg-blue-300 hover:border-orange-300 hover:border'>
                                        <FaExternalLinkAlt />
                                        Live
                                    </div>
                                </Link>
                            }
                        </div>
                        }

                        <div className="flex flex-wrap gap-2 justify-center">
                            {editCard.subPage.images.map((image) => (
                                <img src={image.url} className='py-4 max-h-[30rem]'/>
                            ))}
                        </div>

                    </div>
                   
                </div>
            </div>
        </div>
    </div>
  )
}

export default CardPreview
