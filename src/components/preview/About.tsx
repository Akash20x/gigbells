import ReactQuill from "react-quill"
import 'react-quill/dist/quill.bubble.css'
import { useSelector } from "react-redux";
import { User } from "../../misc/types";
import { isContentEmpty } from "../../misc";

const About = () => {

  const state = useSelector((state: { user: User }) => state.user);
  
  const { about, positions, educationItems } = state;
  
  
  return (
    <div className="max-w-[60rem] mx-auto">
        <div className="px-4 py-2">
            <ReactQuill
                value={about}
                readOnly={true} 
                theme={"bubble"}
                className={`font-quill-medium`}
            />
        </div>

        <div className="flex flex-col gap-4 px-8 py-6">
            {positions?.map((position) => ( 
                <div key={position._id} className="relative pl-8 group">
                    <div className="absolute inset-0 mt-2 w-4 h-4 bg-gradient-to-b from-[#771EE1] to-[#DA0F10] rounded-full"></div>
                        <div className="absolute inset-0 mt-6 ml-2 w-px h-[calc(100%+1rem)] bg-gray-600 group-last-of-type:hidden"></div>
                            <div className="flex flex-grow w-full text-2xl font-bold text-[#A91677]">
                                <div className="flex-1">
                                    {position.title}, {position.company}
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
                            {!isContentEmpty(position.description) && 
                                <div className="text-xl text-gray-600 mt-2">       
                                    <ReactQuill
                                        value={position.description}
                                        readOnly={true} 
                                        theme={"bubble"}
                                        className={`font-quill-normal-ns`}
                                    />
                                </div>
                            }
                </div>
            ))}
        </div>

        {educationItems?.length > 0 && 
            <div className="px-8 py-2">
            <h2 className="text-xl font-semibold py-2">Education</h2>
            <div className="flex flex-col gap-4">
                {educationItems.map((education) => (
                    <div key={education._id} className="relative group" >
                        <div className="flex flex-grow w-full text-2xl font-bold text-[#A91677]">
                            <div className="flex-1">
                                {education.title}
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
                        {!isContentEmpty(education.description) && 
                            <div className="text-xl text-gray-600 mt-2">
                                <ReactQuill
                                    value={education.description}
                                    readOnly={true} 
                                    theme={"bubble"}
                                    className={`font-quill-normal-ns`}
                                />
                            </div>
                        }
                    </div>
                ))}
            </div>
            </div>
        }
       

    </div>
  )
}

export default About
