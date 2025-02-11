import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import openingSmArrow from "../../assets/openingSmArrow.svg"
import { setPreviewCardSubPageModal, setUpdateCard } from "../../redux/portfolioSlice";
import ReactQuill from "react-quill";
import CardImage from "../CardImage";
import CardPreview from "../CardPreview";
import { textColorMapping } from "../../misc/constant";
import { getRGBA } from "../../misc";
import { AppDispatch } from "../../redux/store";
import { Card, Portfolio as PortfolioType } from "../../misc/types";
import { useState } from "react";

const Portfolio = () => {

    const dispatch = useDispatch<AppDispatch>();
    
    const state = useSelector((state: { portfolio: PortfolioType }) => state.portfolio);

    const { collections, showCardModal, previewCardSubPageModal } = state;

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
     
            <div className="my-4">
                {collections.map((collection, collectionIndex) => (
                    collection?.cards?.length>0 &&
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
                      </div>

                      <div  onClick={(e) => e.stopPropagation()} 
                      className={`grid grid-rows-2 ${openCollections[collectionIndex] ? '' : 'hidden'} sm:grid grid-flow-col auto-cols-[16rem] auto-rows-[32rem] overflow-x-auto gap-8 py-2`}>
                          
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
                                                                          className={`font-quill-text-image max-w-[12rem]  ${textColorMapping[card.color]}`}
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
                                      </div>
                                  </div>
                              ))}
                          </>

                      </div>  
                  </div>  
                ))}
            </div>

            {previewCardSubPageModal && <CardPreview />}

    </div>
    );
}

export default Portfolio;