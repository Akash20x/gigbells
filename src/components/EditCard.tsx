import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css'
import EditCardImage from "./EditCardImage";
import closeSvg from '../assets/close.svg'
import { getRGBA } from "../misc";
import { BootstrapTooltip } from "./Tooltip";
import { useSelector } from "react-redux";
import { removeSubPageSkill, resetEditCard, setEditCard, setShowCardModal, setSubPageSkill } from "../redux/portfolioSlice";
import { useDispatch } from "react-redux";
import { createCard, updateCard } from '../services/portfolioServices';
import React from "react";
import { Switch, FormControlLabel } from "@mui/material";
import EditSkills from './EditSkills';
import UploadImages from './UploadImages';
import ToastNotification from './ToastNotification';
import { AppDispatch } from '../redux/store';
import { Portfolio } from '../misc/types';
import { textColorMapping, colors } from '../misc/constant';


const EditCard = () => {
    
    const dispatch = useDispatch<AppDispatch>();
    
    const state = useSelector((state: { portfolio: Portfolio }) => state.portfolio);
    
    const { collections, selectedCollectionIndex, editCard } = state;

    const handleStyleChange = (newStyle: 'text' | 'image' | 'text_image') => {
        dispatch(setEditCard({ field: 'style', value: newStyle }));
    };

    const handleOpacityChange = (newOpacity: number) => {    
        dispatch(setEditCard({ field: 'opacity', value: newOpacity }));
    };

    const handleColorChange = (newColor: string) => {
        dispatch(setEditCard({ field: 'color', value: newColor }));
    };

   const handleSlideChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        dispatch(setEditCard({field: name, value: checked}))
        if(editCard.url){
            dispatch(setEditCard({field: 'url', value: ''}))
        }
    };

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch(setEditCard({field: name, value: value}))
    };

    const handleImagesChange = (images: { name: string; url?: string }[]) =>{
        dispatch(setEditCard({field: 'images', value: images}))
    }

    const handleQuillChange = (field: string, value: string) => {
        dispatch(setEditCard({ field, value }));
    };


    const handleSizeChange = (newSize: 'large' | 'small') => {
        dispatch(setEditCard({ field: 'size', value: newSize }));
    };

    const handleBodyChange = (value: string) => {
        dispatch(setEditCard({ field: 'body', value: value }));
    };

    const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setEditCard({ field: 'url', value: event.target.value })); 
    };

    const handleSubmitCard = async (e: React.FormEvent) => {
        e.preventDefault();        

        if (selectedCollectionIndex === null) {
            return;
        }

        const newCard = {
            style: editCard.style,
            color: editCard.color,
            size: editCard.size,
            opacity: editCard.opacity,
            body: editCard.body,
            url: editCard.url,
            image: editCard.image,
            isSubPage: editCard.isSubPage,
            subPage: {
                description: editCard.subPage.description,
                functionality: editCard.subPage.functionality,
                tags: editCard.subPage.tags,
                link: {
                    code: editCard?.subPage?.link?.code,
                    live: editCard?.subPage?.link?.live
                },
                images: editCard.subPage.images
            }
        };
        
        
        const collectionId = collections[selectedCollectionIndex]._id

       
        if(editCard.cardIndex === -1 && collectionId){
            dispatch(createCard({card: newCard, collectionId}))
            ToastNotification("Card created")
        }
        else{
            const cardId = collections[selectedCollectionIndex].cards[editCard.cardIndex ?? 0]._id

            if(cardId && collectionId){
                dispatch(updateCard({cardId, collectionId, card: newCard}))
            }
        }

        dispatch(resetEditCard())      
        dispatch(setShowCardModal(false))
        document.body.style.overflow = 'auto';
    };
   
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full justify-center text-center items-center p-2 md:p-4">
            <div className="fixed inset-0 bg-gray-300 bg-opacity-75 transition-opacity"></div>
            <div className="relative transform rounded-lg bg-white text-left shadow-xl transition-all py-8 md:py-12 px-8 md:px-16 h-full sm:my-8 w-full max-w-6xl xl:h-4/5">
                <div className="relative max-w-full">
                    <div className="absolute right-0 top-0 pr-4 pt-2 sm:pt-4 block">
                        <button className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={() => {
                            document.body.style.overflow = 'auto';
                            dispatch(setShowCardModal(false))
                            }}
                        >
                            <img src={closeSvg} className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="text-3xl font-bold mb-12 text-neutral-700 text-center">
                        Edit card
                    </div>

                    <form onSubmit={handleSubmitCard}>
                        <div className="flex flex-col md:flex-row w-full flex-1 gap-8">
                            <div className="flex-1 flex flex-col gap-8 flex-wrap">
                                {/* Style  */}
                                <div className="flex flex-col w-full">
                                    <div className="text-lg font-semibold">Card Style</div>
                                    <div className="flex items-center gap-4 mt-2 flex-wrap">
                                        <div>
                                            <input
                                                className="hidden peer"
                                                type="radio"
                                                value="text"
                                                checked={editCard?.style=== 'text'}
                                                name="card_style"
                                                id="card_style_text"
                                                onChange={() => handleStyleChange('text')}
                                            />
                                            <label className="flex justify-center items-center border-2 rounded-xl py-2 px-4 peer-checked:border-pink-700 cursor-pointer" htmlFor="card_style_text">
                                                Text
                                            </label>
                                        </div>
                                        <div>
                                            <input
                                                className="hidden peer"
                                                type="radio"
                                                value="image"
                                                name="card_style"
                                                id="card_style_image"
                                                onChange={() => handleStyleChange('image')}
                                            />
                                            <label className="flex justify-center items-center border-2 rounded-xl py-2 px-4 peer-checked:border-pink-700 cursor-pointer" htmlFor="card_style_image">
                                                Image
                                            </label>
                                        </div>
                                        <div>
                                            <input
                                                className="hidden peer"
                                                type="radio"
                                                value="text_image"
                                                name="card_style"
                                                id="card_style_text_image"
                                                onChange={() => handleStyleChange('text_image')}
                                            />
                                            <label className="flex justify-center items-center border-2 rounded-xl py-2 px-4 peer-checked:border-pink-700 cursor-pointer" htmlFor="card_style_text_image">
                                                Text &amp; Image
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Color  */}
                                <div className="flex flex-col w-full">
                                    <div className="text-lg font-semibold">Color</div>
                                    <div className="flex items-center gap-4 mt-2 flex-wrap">
                                        <div className="grid grid-cols-5 gap-y-2 gap-x-4">
                                        {colors.map(({color, name}) => (
                                            <div key={color}>
                                            <input
                                                className="hidden peer"
                                                type="radio"
                                                value={color}
                                                name="card_color"
                                                id={`card_color_${color.replace("#", "")}`}
                                                checked={editCard.color === color}
                                                onChange={() => handleColorChange(color)}
                                            />
                                            <BootstrapTooltip
                                                title={name}
                                                placement="top"
                                                arrow
                                                sx={{
                                                    "& .MuiTooltip-tooltip": {
                                                    fontSize: "14px", 
                                                    },
                                                }}
                                            >
                                                <label
                                                className="flex justify-center items-center border-2 rounded-full p-4 peer-checked:border-pink-700 cursor-pointer bg-transparent-pattern"
                                                style={{
                                                    background: color,
                                                    color: color === "#ffffff" ? "black" : "white",
                                                }}
                                                htmlFor={`card_color_${color.replace("#", "")}`}
                                                ></label>
                                            </BootstrapTooltip>
                                            </div>
                                        ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Opacity  */}
                                <div className="flex flex-col w-full">
                                    <div className="text-lg font-semibold">Text opacity</div>
                                    <div className="flex items-center gap-4 mt-2 flex-wrap">
                                        <div>
                                            <input
                                                className="hidden peer"
                                                type="radio"
                                                value={0}
                                                checked={editCard?.opacity===0}
                                                name="card_opacity"
                                                id="opacity-0"
                                                onChange={() => handleOpacityChange(0)}
                                            />
                                            <label className="flex justify-center items-center border-2 rounded-xl py-2 px-4 peer-checked:border-pink-700 cursor-pointer" htmlFor="opacity-0">
                                                0%
                                            </label>
                                        </div>
                                        <div>
                                            <input
                                                className="hidden peer"
                                                type="radio"
                                                value={25}
                                                checked={editCard?.opacity===25}
                                                name="card_opacity"
                                                id="opacity-25"
                                                onChange={() => handleOpacityChange(25)}
                                            />
                                            <label className="flex justify-center items-center border-2 rounded-xl py-2 px-4 peer-checked:border-pink-700 cursor-pointer" htmlFor="opacity-25">
                                                25%
                                            </label>
                                        </div>
                                        <div>
                                            <input
                                                className="hidden peer"
                                                type="radio"
                                                value={50}
                                                checked={editCard?.opacity===50}
                                                name="card_opacity"
                                                id="opacity-50"
                                                onChange={() => handleOpacityChange(50)}
                                            />
                                            <label className="flex justify-center items-center border-2 rounded-xl py-2 px-4 peer-checked:border-pink-700 cursor-pointer" htmlFor="opacity-50">
                                                50%
                                            </label>
                                        </div>
                                        <div>
                                            <input
                                                className="hidden peer"
                                                type="radio"
                                                value={75}
                                                checked={editCard?.opacity===75}
                                                name="card_opacity"
                                                id="opacity-75"
                                                onChange={() => handleOpacityChange(75)}
                                            />
                                            <label className="flex justify-center items-center border-2 rounded-xl py-2 px-4 peer-checked:border-pink-700 cursor-pointer" htmlFor="opacity-75">
                                                75%
                                            </label>
                                        </div>
                                        <div>
                                            <input
                                                className="hidden peer"
                                                type="radio"
                                                value={100}
                                                checked={editCard?.opacity===100}
                                                name="card_opacity"
                                                id="opacity-100"
                                                onChange={() => handleOpacityChange(100)}
                                            />
                                            <label className="flex justify-center items-center border-2 rounded-xl py-2 px-4 peer-checked:border-pink-700 cursor-pointer" htmlFor="opacity-100">
                                                100%
                                            </label>
                                        </div>
                                    
                                    </div>
                                </div>

                                {/* Card Size  */}
                                <div className="flex flex-col w-full">
                                    <div className="text-lg font-semibold">Card Size</div>
                                    <div className="flex items-center gap-4 mt-2 flex-wrap">
                                        <div>
                                            <input
                                                className="hidden peer"
                                                type="radio"
                                                value="large"
                                                name="card_size"
                                                id="card_size_large"
                                                checked={editCard.size === 'large'}
                                                onChange={() => handleSizeChange('large')}
                                            />
                                            <label className="flex justify-center items-center border-2 rounded-xl h-32 py-4 px-6 peer-checked:border-pink-700 cursor-pointer" htmlFor="card_size_large">
                                                Large
                                            </label>
                                        </div>
                                        <div>
                                            <input
                                                className="hidden peer"
                                                type="radio"
                                                value="small"
                                                name="card_size"
                                                id="card_size_small"
                                                checked={editCard.size === 'small'}
                                                onChange={() => handleSizeChange('small')}
                                            />
                                            <label className="flex justify-center items-center border-2 rounded-xl w-16 h-16 py-4 px-6 peer-checked:border-pink-700 cursor-pointer" htmlFor="card_size_small">
                                                Small
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Body  */}
                                <div className="w-full max-w-[46rem] justify-start border-2 rounded-2xl px-4 sm:px-6 py-2 sm:pt-[0.75rem] sm:pb-[3.75rem] flex flex-col focus-within:border-black">
                                    <label className="text-sm px-2" htmlFor="profile_about">
                                    Edit body
                                    </label>
                                    <ReactQuill
                                        theme="snow"
                                        className='py-2'
                                        value={editCard.body}
                                        onChange={handleBodyChange}
                                    />
                                </div>

                                {/* Card SubPage Switch  */}
                                <div className="flex gap-4 items-center">
                                    <p className='text-lg font-semibold'>Subpage</p>
                                    <FormControlLabel
                                        control={<Switch checked={editCard?.isSubPage} name="isSubPage" onChange={handleSlideChange} />}
                                        label={editCard?.isSubPage ? "Slide To Hide" : "Slide To Edit"}
                                    />
                                </div>

                                {/* Card SubPage  */}
                                {editCard?.isSubPage && 
                                    <>
                                        {/* Description  */}
                                        <div className="w-full max-w-[46rem] justify-start border-2 rounded-2xl px-4 sm:px-6 py-2 sm:pt-[0.75rem] sm:pb-[3.75rem] flex flex-col focus-within:border-black">
                                            <label className="text-sm px-2" htmlFor="profile_about">
                                                Edit Description
                                            </label>
                                            <ReactQuill
                                                theme="snow"
                                                className='py-2'
                                                value={editCard?.subPage?.description}
                                                onChange={(value) => handleQuillChange('description', value)}
                                            />
                                        </div>

                                        {/* Functionality */}
                                        <div className="w-full max-w-[46rem] justify-start border-2 rounded-2xl px-4 sm:px-6 py-2 sm:pt-[0.75rem] sm:pb-[3.75rem] flex flex-col focus-within:border-black">
                                            <label className="text-sm px-2" htmlFor="profile_about">
                                                Edit Functionality
                                            </label>
                                            <ReactQuill
                                                theme="snow"
                                                className='py-2'
                                                value={editCard?.subPage?.functionality}
                                                onChange={(value) => handleQuillChange('functionality', value)}
                                            />
                                        </div>

                                        {/* Skills/Tags  */}
                                        <EditSkills
                                            skillsData = {editCard?.subPage?.tags}
                                            setSkillAction={setSubPageSkill} 
                                            removeSkillAction={removeSubPageSkill} 
                                        />

                                        {/* Code URL  */}
                                        <div className="w-full justify-start border-2 rounded-2xl px-4 sm:px-6 py-4 flex flex-col focus-within:border-black">
                                            <label className="text-sm px-2" htmlFor="profile_about">
                                                Add Code URL
                                            </label>
                                            <input
                                                type="text"
                                                className="border-none outline-none py-2 px-4 focus:border-pink-700 focus:outline-none"
                                                name='code'
                                                value={editCard?.subPage?.link?.code}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        {/* Live URL  */}
                                        <div className="w-full justify-start border-2 rounded-2xl px-4 sm:px-6 py-4 flex flex-col focus-within:border-black">
                                            <label className="text-sm px-2" htmlFor="profile_about">
                                                Add Live Project URL
                                            </label>
                                            <input
                                                type="text"
                                                name='live'
                                                className="border-none outline-none py-2 px-4 focus:border-pink-700 focus:outline-none"
                                                value={editCard.subPage.link.live}
                                                onChange={handleChange}
                                            />
                                        </div>


                                        {/* Upload & Remove Single/Multiple Images  */}
                                        <UploadImages
                                            data = {editCard?.subPage?.images}
                                            setData = {handleImagesChange}
                                        />

                                    </>
                                }

                                {/* Card URL  */}                       
                                {!editCard?.isSubPage && 
                                    <div className="w-full justify-start border-2 rounded-2xl px-4 sm:px-6 py-4 flex flex-col focus-within:border-black">
                                        <label className="text-sm px-2" htmlFor="profile_about">
                                        Add URL
                                        </label>
                                        <input
                                            type="text"
                                            className="border-none outline-none py-2 px-4 focus:border-pink-700 focus:outline-none"
                                            value={editCard.url}
                                            onChange={handleUrlChange}
                                        />
                                    </div>
                                }

                                
                            </div>

                            <div className="preview w-full sm:w-64 mx-auto flex justify-center">
                                <div className={`relative w-64 ${editCard.size === "large" ? "row-span-2 h-[calc(34rem)]" : "h-64"}`}>
                                    <div className="flex rounded-3xl relative group h-full w-full" style={{ background: editCard.color }}>
                                        <div className="relative flex w-full h-full">
                                            <div className="relative flex-1 flex h-full w-full">
                                               
                                                {/* Text Card  */}
                                                {editCard.style === 'text' && 
                                                <div
                                                    className={`relative flex-1 flex justify-center items-center  m-4  rounded-xl text-center px-4 z-30 overflow-auto break-words`}
                                                >
                                                    <ReactQuill
                                                        value={editCard.body}
                                                        readOnly={true} 
                                                        theme={"bubble"}
                                                        className={`font-quill ${textColorMapping[editCard.color]} max-w-full`}
                                                    />
                                                </div>
                                                }

                                                {/* Image Card  */}
                                                {editCard.style !== 'text' &&
                                                    <EditCardImage />
                                                }

                                                {/* Text & Image Card  */}
                                                {editCard.style === 'text_image' &&
                                                    <div className="absolute flex items-end justify-center w-full h-full flex-grow-0 z-20">
                                                        <div className="relative w-4/5 h-full flex justify-center text-center">
                                                            <div
                                                                className={`absolute rounded-2xl leading-tight px-4 ${editCard.size === "small" ? 'bottom-[1rem]' : 'bottom-[4rem]'} z-20`}                                       
                                                                style={{ background: getRGBA(editCard.color, editCard.opacity)}}
                                                            >
                                                                <ReactQuill
                                                                    value={editCard.body}
                                                                    readOnly={true} 
                                                                    theme={"bubble"}
                                                                    className={`font-quill-normal-center max-w-[14rem] ${textColorMapping[editCard.color]}`}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                }


                                                {/* Show Card URL  */}
                                                {editCard.url &&
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="absolute inset-auto bottom-0 right-0 mr-4 mb-4 text-black h-8 group-hover:h-10 transition-all origin-center bg-[#ffe7ce] rounded-full p-2">
                                                    <path fillRule="evenodd" d="M19.902 4.098a3.75 3.75 0 00-5.304 0l-4.5 4.5a3.75 3.75 0 001.035 6.037.75.75 0 01-.646 1.353 5.25 5.25 0 01-1.449-8.45l4.5-4.5a5.25 5.25 0 117.424 7.424l-1.757 1.757a.75.75 0 11-1.06-1.06l1.757-1.757a3.75 3.75 0 000-5.304zm-7.389 4.267a.75.75 0 011-.353 5.25 5.25 0 011.449 8.45l-4.5 4.5a5.25 5.25 0 11-7.424-7.424l1.757-1.757a.75.75 0 111.06 1.06l-1.757 1.757a3.75 3.75 0 105.304 5.304l4.5-4.5a3.75 3.75 0 00-1.035-6.037.75.75 0 01-.354-1z" clipRule="evenodd"></path>
                                                    </svg>
                                                } 

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="rounded-full bg-gray-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 inline-flex self-end  mt-4">
                            <span className="flex-1 flex items-center text-center w-full gap-1">
                                <span className="flex-1">
                                    Update
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

export default EditCard
