import addSvg from "../assets/addSvg.svg"
import openingSmArrow from "../assets/openingSmArrow.svg"
import plusIconSvg from "../assets/plusIconSvg.svg"
import editSvg from "../assets/editSvg.svg"
import closeSvg from "../assets/close.svg"
import deleteSvg from "../assets/deleteSvg.svg"
import renameSvg from "../assets/renameSvg.svg"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css'
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { createCollection, deleteCard, deleteCollection, editCollection } from "../services/portfolioServices";
import { resetEditCard, saveNewCollection, setNewCollectionName, setPreviewCardSubPageModal, setSelectedCollectionIndex, setShowCardModal, setShowCollectionModal, setShowRenameCollectionModal, setUpdateCard } from "../redux/portfolioSlice";
import CardImage from "./CardImage"
import EditCard from "./EditCard"
import { getRGBA } from "../misc"
import { textColorMapping } from "../misc/constant"
import CardPreview from "./CardPreview"
import ToastNotification from "./ToastNotification"
import { Card, Portfolio } from "../misc/types"
import { AppDispatch } from "../redux/store"
import { useState } from "react"


const ProfilePortfolio = () => {

    const dispatch = useDispatch<AppDispatch>();
    
    const state = useSelector((state: { portfolio: Portfolio }) => state.portfolio);
        
    const { collections, newCollectionName, showCollectionModal, showRenameCollectionModal,
        selectedCollectionIndex, showCardModal, previewCardSubPageModal } = state;
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newCollectionName.trim() !== "") {

            dispatch(saveNewCollection(newCollectionName))
            dispatch(setNewCollectionName(""))
            dispatch(setShowCollectionModal(false))            
            dispatch(createCollection({ name: newCollectionName }))

            ToastNotification("Section added")

        }
        document.body.style.overflow = 'auto';
    };

    const handleClose = () => {
        dispatch(setShowCollectionModal(false))
        dispatch(setNewCollectionName(""))
        document.body.style.overflow = 'auto';
    };

  
    const handleAddCard = (index: number) => {
        dispatch(resetEditCard())
        dispatch(setSelectedCollectionIndex(index))
        dispatch(setShowCardModal(true))
        document.body.style.overflow = 'hidden';
    }

    const handleRenameCollection = (index: number) => {
        dispatch(setSelectedCollectionIndex(index))
        dispatch(setNewCollectionName(collections[index].name ?? ''))
        dispatch(setShowRenameCollectionModal(true))
        document.body.style.overflow = 'hidden';

    };

    const handleDeleteCollection = (collectionId: string) => {
        if (window.confirm("Are you sure. All cards from this section will be lost.")) {
            dispatch(deleteCollection(collectionId))
        }        
    };


    const handleRenameSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedCollectionIndex !== null && newCollectionName.trim() !== "") {

            const collectionId = collections[selectedCollectionIndex]._id  ?? ""          

            dispatch(editCollection({name: newCollectionName, collectionId}))
            dispatch(setNewCollectionName(""))
            dispatch(setShowRenameCollectionModal(false))
            dispatch(setSelectedCollectionIndex(null))
        }
        document.body.style.overflow = 'auto';
    };


    const handleEditCard = (card: Card, cardIndex: number, collectionIndex: number)=>{

        dispatch(setShowCardModal(true))
        dispatch(setSelectedCollectionIndex(collectionIndex))
        dispatch(setUpdateCard({
            cardIndex: cardIndex,
            style: card.style,
            color: card.color,
            opacity: card.opacity,
            size: card.size,
            body: card.body,
            url: card.url,
            image: card.image,
            isSubPage: card.isSubPage,
            subPage: card.subPage
        }))
        document.body.style.overflow = 'hidden';
    }

    const handleDeleteCard = (cardIndex: number, collectionIndex: number) => {

        if (window.confirm("Are you sure?.")) {
            const collectionId = collections[collectionIndex]._id ?? ""
            const cardId = collections[collectionIndex].cards[cardIndex]._id

            if(cardId){
                dispatch(deleteCard({cardId, collectionId}))
                ToastNotification('Card deleted.')
            }
        }
    }

    const handleViewCard = (cardIndex: number, card: Card) =>{
        dispatch(setPreviewCardSubPageModal(true))
        dispatch(setUpdateCard({
            cardIndex: cardIndex,
            style: card.style,
            color: card.color,
            opacity: card.opacity,
            size: card.size,
            body: card.body,
            url: card.url,
            image: card.image,
            isSubPage: card.isSubPage,
            subPage: card.subPage
        }))
        document.body.style.overflow = 'hidden'; 
    }

    const [openCollections, setOpenCollections] = useState<Record<number, boolean>>({});
    
    const toggleCollection = (index: number) => {
        setOpenCollections((prev) => ({
            ...prev,
            [index]: !prev[index],  
        }));
    };    

    return (
        <div className="mx-auto max-w-4xl pb-20 px-4 lg:px-0 mt-10">
            <div className="flex xs:justify-around justify-end gap-4">
                <div
                    onClick={() => 
                        {
                            dispatch(setShowCollectionModal(true))
                            dispatch(setNewCollectionName(""))
                            document.body.style.overflow = 'hidden';
                        }
                    } 
                    className="cursor-pointer rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                    <span className="flex-1 flex items-center text-center w-full gap-1">
                        <img src={addSvg} alt="" className="h-4" />
                        <span className="flex-1">
                            add collection
                        </span>
                    </span>
                </div>
            </div>

            <a
                className="hidden sm:block relative group cursor-pointer w-full rounded-lg border-2 border-dashed border-gray-300 py-1 hover:py-4 hover:pb-6 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 row-span-2 transitions-all mt-8 mb-6 sm:mb-0"
                onClick={() => {
                    document.body.style.overflow = 'hidden';
                    dispatch(setShowCollectionModal(true))
                }}
            >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="mx-auto h-12 w-12 text-gray-400"
                >
                <path
                    fillRule="evenodd"
                    d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                    clipRule="evenodd"
                ></path>
                </svg>
                <span className="block mt-0 sm:group-hover:mt-2 text-sm font-semibold text-gray-900 sm:opacity-0 sm:h-0 sm:group-hover:opacity-100 sm:group-hover:h-4 transitions-all">Add a collection</span>
            </a>

                
            {/* Collection Modal  */}
            {showCollectionModal && <div className="fixed inset-0 z-10 overflow-y-auto" >
                <div className="flex min-h-full justify-center text-center items-center p-2 md:p-4">
                    <div className="fixed inset-0 bg-gray-300 bg-opacity-75 transition-opacity"></div>
                    <div className="relative transform rounded-lg bg-white text-left shadow-xl transition-all py-8 md:py-12 px-8 md:px-16 h-full sm:my-8 w-full max-w-6xl lg:h-4/5">
                        <div className="relative max-w-full">
                            <div className="absolute right-0 top-0 pr-4 pt-2 sm:pt-4 block">
                                <div
                                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
                                    onClick={handleClose}
                                >
                                     <img src={closeSvg} className="h-6 w-6" />

                                </div>
                            </div>

                            <div className="text-2xl sm:text-3xl font-bold mb-12 text-neutral-700 text-center">
                                Create collection
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="w-full border-2 rounded-2xl px-4 sm:px-6 py-2 sm:py-3 flex flex-col focus-within:border-black">
                                    <label className="text-sm" htmlFor="collection_name">Name</label>
                                    <input
                                        className="sm:text-md disabled:bg-gray-100 disabled:cursor-not-allowed focus:outline-0"
                                        autoFocus
                                        type="text"
                                        id="collection_name"
                                        value={newCollectionName}
                                        onChange={(e) => dispatch(setNewCollectionName(e.target.value))}
                                    />
                                </div>

                                <div className="flex mt-4 space-x-4">
                                    <button
                                        type="submit"
                                        className="rounded-full bg-gray-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                                    >
                                        <span className="flex-1 flex items-center text-center w-full gap-1">
                                            <span className="flex-1">Save</span>
                                        </span>
                                    </button>
                                    <button
                                        type="button"
                                        className="rounded-full bg-gray-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 opacity-60"
                                        onClick={handleClose}
                                    >
                                        <span className="flex-1 flex items-center text-center w-full gap-1">
                                            <span className="flex-1">Cancel</span>
                                        </span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >}


             {/* Rename Collection Modal */}
             {showRenameCollectionModal && (
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full justify-center text-center items-center p-2 md:p-4">
                        <div className="fixed inset-0 bg-gray-300 bg-opacity-75 transition-opacity"></div>
                        <div className="relative transform rounded-lg bg-white text-left shadow-xl transition-all py-8 md:py-12 px-8 md:px-16 h-full sm:my-8 w-full max-w-6xl lg:h-4/5">
                            <div className="relative max-w-full">
                                <div className="absolute right-0 top-0 pr-4 pt-2 sm:pt-4 block">
                                    <div
                                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
                                        onClick={() => {
                                            dispatch(setShowRenameCollectionModal(false))
                                            document.body.style.overflow = 'auto';
                                        }
                                            
                                        }
                                    >
                                         <img src={closeSvg} className="h-6 w-6" />
                                    </div>
                                </div>

                                <div className="text-2xl sm:text-3xl font-bold mb-12 text-neutral-700 text-center">
                                    Edit collection
                                </div>

                                <form onSubmit={handleRenameSubmit}>
                                    <div className="w-full border-2 rounded-2xl px-4 sm:px-6 py-2 sm:py-3 flex flex-col focus-within:border-black">
                                        <label className="text-sm" htmlFor="rename_collection_name">Name</label>
                                        <input
                                            className="sm:text-md disabled:bg-gray-100 disabled:cursor-not-allowed focus:outline-0"
                                            autoFocus
                                            type="text"
                                            id="rename_collection_name"
                                            value={newCollectionName}
                                            onChange={(e) => dispatch(setNewCollectionName(e.target.value))}
                                        />
                                    </div>

                                    <div className="flex mt-4 space-x-4">
                                        <button
                                            type="submit"
                                            className="rounded-full bg-gray-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                                        >
                                            <span className="flex-1 flex items-center text-center w-full gap-1">
                                                <span className="flex-1">Save</span>
                                            </span>
                                        </button>
                                        <button
                                            type="button"
                                            className="rounded-full bg-gray-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 opacity-60"
                                            onClick={() => {dispatch(setShowRenameCollectionModal(false))
                                                document.body.style.overflow = 'auto';}
                                            }
                                        >
                                            <span className="flex-1 flex items-center text-center w-full gap-1">
                                                <span className="flex-1">Cancel</span>
                                            </span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Card Modal  */}
            {showCardModal &&  <EditCard />}

            {/* Collections & Cards  */}
            <div className="my-4">
                {collections.map((collection, collectionIndex) => (
                      <div key={`${collection.name}-${collectionIndex}`} onClick={() => toggleCollection(collectionIndex)} 
                      className={`flex flex-col w-full  border-b mt-10 border-b-gray-800 sm:border-b-0 ${openCollections[collectionIndex] ? '': 'cursor-pointer'} md:cursor-default`  }>
                      <div className="flex w-full mb-4 gap-4 flex-col sm:flex-row">
                          <div className="flex-1 text-xl font-semibold">
                              <div
                                  className="active:bg-sky-100 md:active:bg-transparent transition-colors duration-300 flex justify-between items-center w-full cursor-pointer sm:cursor-auto"
                              >
                                  <span>{collection.name}</span>
                                  <img src={openingSmArrow} alt="" 
                                      className={`sm:hidden h-6 shrink-0 transition-transform duration-300 ${
                                          openCollections[collectionIndex]  ? "-rotate-90" : "rotate-0"
                                      }`}                                    
                                  />
                              </div>
                          </div>  
                          <div className=""> 
                                <div className="flex flex-row justify-start sm:justify-evenly gap-2 w-full xs:w-auto flex-wrap">
                                   
                                    <div onClick={() => handleAddCard(collectionIndex)} className="rounded cursor-pointer bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 inline-flex self-end">
                                        <span className="flex-1 flex items-center text-center w-full gap-1">
                                            <img src={addSvg} alt="" className="h-4" />
                                            <span className="flex-1">
                                                add card
                                            </span>
                                        </span>
                                    </div>
                                    <div onClick={() => handleRenameCollection(collectionIndex)} className="rounded cursor-pointer bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 inline-flex self-end">
                                        <span className="flex-1 flex items-center text-center w-full gap-1">
                                            <img src={renameSvg} className="h-4" alt="" />
                                            <span className="flex-1">
                                                rename
                                            </span>
                                        </span>
                                    </div>
                                    <div onClick={() => collection._id && handleDeleteCollection(collection._id)} className="rounded cursor-pointer bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 inline-flex self-end">
                                        <span className="flex-1 flex items-center text-center w-full gap-1">
                                            <img src={deleteSvg} className="h-4" alt="" />
                                            <span className="flex-1">
                                                delete
                                            </span>
                                        </span>
                                    </div>
                                </div>

                            </div>    
                      </div>

                      <div  onClick={(e) => e.stopPropagation()} 
                      className={`grid grid-rows-2 ${openCollections[collectionIndex] ? '' : 'hidden'} sm:grid grid-flow-col auto-cols-[16rem] auto-rows-[32rem] overflow-x-auto gap-8 py-2`}>
                           {collection.cards.length === 0 ? (
                                <div 
                              
                                onClick={() => handleAddCard(collectionIndex)}
                                    className="relative cursor-pointer hidden only:block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 row-span-2">
                                    <img src={plusIconSvg} className="mx-auto h-12 w-12 text-gray-400" alt="" />
                                    <span className="mt-2 block text-sm font-semibold text-gray-900">
                                        Add a card
                                    </span>
                                </div>
                            ) : (
                          <>
                              {collection?.cards?.map((card, cardIndex) => (
                                  <div key={`${collectionIndex}-${cardIndex}`} className={`relative w-64 ${card.size === 'large' ? 'row-span-2 h-[calc(34rem)]' : 'h-64'}`}>
                                      <div className="flex rounded-3xl relative group bg-[#ffe7ce] h-full w-full">
                                          <div className={`relative flex w-full h-full ${card.url || card.isSubPage ? 'cursor-pointer' : 'cursor-default'}`}
                                              onClick={card.isSubPage ? (() => handleViewCard(cardIndex, card)) : undefined}
                                          >
                                              {!showCardModal &&  card.url && 
                                                  <a href={card.url} target="_blank" className="absolute z-30 inset-auto w-full h-full"></a>
                                              }
                                              
                                              {card.style === 'text' &&  
                                                  <div className="flex-1 rounded-3xl flex flex-col h-full items-center justify-center text-center text-lg px-8" style={{ background: card.color }}>
                                                      <ReactQuill
                                                          value={card.body}
                                                          readOnly={true} 
                                                          theme={"bubble"}
                                                          className={`font-quill max-w-[12rem] ${textColorMapping[card.color]}`}
                                                      />
                                                  </div>
                                              }

                                              {card.style === 'image' &&       
                                                  <CardImage cardImg = {card.image} />
                                              }

                                              {card.style === 'text_image' && (
                                                  <>
                                                      <CardImage cardImg={card.image} />
                                                      <div className="absolute flex items-end justify-center w-full h-full flex-grow-0 overflow-y-hidden">
                                                          <div className="relative w-4/5 h-full flex justify-center text-center">
                                                              <div className="absolute rounded-2xl leading-none md:leading-tight px-1.5 py-0.5 md:px-2.5 md:py-1.5  bottom-[1.5rem] bg-[#ffe7ce]/100" style={{ background: getRGBA(card.color, card.opacity)}}>
                                                                  <div>
                                                                      <ReactQuill
                                                                          value={card.body}
                                                                          readOnly={true}
                                                                          theme={"bubble"}
                                                                          className={`font-quill-text-image max-w-[12rem] ${textColorMapping[card.color]}`}
                                                                      />
                                                                  </div>
                                                              </div>              
                                                          </div>
                                                      </div>             
                                                  </>
                                              )}

                                              {card.url &&
                                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="absolute inset-auto bottom-0 right-0 mr-4 mb-4 text-black h-8 group-hover:h-10 transition-all origin-center bg-[#ffe7ce] rounded-full p-2">
                                                  <path fillRule="evenodd" d="M19.902 4.098a3.75 3.75 0 00-5.304 0l-4.5 4.5a3.75 3.75 0 001.035 6.037.75.75 0 01-.646 1.353 5.25 5.25 0 01-1.449-8.45l4.5-4.5a5.25 5.25 0 117.424 7.424l-1.757 1.757a.75.75 0 11-1.06-1.06l1.757-1.757a3.75 3.75 0 000-5.304zm-7.389 4.267a.75.75 0 011-.353 5.25 5.25 0 011.449 8.45l-4.5 4.5a5.25 5.25 0 11-7.424-7.424l1.757-1.757a.75.75 0 111.06 1.06l-1.757 1.757a3.75 3.75 0 105.304 5.304l4.5-4.5a3.75 3.75 0 00-1.035-6.037.75.75 0 01-.354-1z" clipRule="evenodd"></path>
                                                  </svg>
                                              } 
                                              
                                          </div>
                                          {!showCardModal && 
                                                 <div className="absolute inset-auto top-0 mt-4 px-4 w-full hidden group-hover:flex justify-between items-center z-30 gap-4">
                                                 <div className="rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 inline-flex self-end -rotate-12 cursor-pointer"  onClick={()=> handleEditCard(card, cardIndex, collectionIndex)}>
                                                     <span className="flex-1 flex items-center text-center w-full gap-1 cursor-pointer">
                                                         <img src={editSvg} className="h-4" alt="" />
                                                         <span className="flex-1">edit</span>
                                                     </span>
                                                 </div>
                                                 <div className="rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 inline-flex self-end rotate-12 cursor-pointer" onClick={()=> handleDeleteCard(cardIndex, collectionIndex)}>
                                                     <span className="flex-1 flex items-center text-center w-full gap-1 cursor-pointer">
                                                         <img src={deleteSvg} className="h-4" alt="" />
                                                         <span className="flex-1">delete</span>
                                                     </span>
                                                 </div>
                                             </div>}
                                      </div>
                                  </div>
                              ))}
                          </>
                            )}
                      </div>  
                      </div>  
                )
                )}
            </div>

            {/* Add collection  */}
            {collections.length>1 && 
                <a
                className="hidden sm:block relative group cursor-pointer w-full rounded-lg border-2 border-dashed border-gray-300 py-1 hover:py-4 hover:pb-6 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 row-span-2 transitions-all mt-8 mb-6 sm:mb-0"
                onClick={() => {
                document.body.style.overflow = 'hidden';
                dispatch(setShowCollectionModal(true))
            }}
            >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="mx-auto h-12 w-12 text-gray-400"
                >
                <path
                    fillRule="evenodd"
                    d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                    clipRule="evenodd"
                ></path>
                </svg>
                <span className="block mt-0 sm:group-hover:mt-2 text-sm font-semibold text-gray-900 sm:opacity-0 sm:h-0 sm:group-hover:opacity-100 sm:group-hover:h-4 transitions-all">Add a collection</span>
                </a>
            }    

            {/* SubPage Modal  */}
            {previewCardSubPageModal && <CardPreview />}

        </div>
    )
}

export default ProfilePortfolio

