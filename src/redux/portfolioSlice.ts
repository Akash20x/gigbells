import { createSlice } from '@reduxjs/toolkit';
import { createCard, createCollection, deleteCard, deleteCollection, editCollection, updateCard } from '../services/portfolioServices';
import { AxiosErrorResponse, Portfolio } from '../misc/types';

const initialState : Portfolio = {
    loading: false,
    error: null, 
    collections: [],
    newCollectionName: "",
    showCollectionModal: false,
    showRenameCollectionModal: false,
    selectedCollectionIndex: null,
    editCard: {
        cardIndex: -1,
        style: 'text',
        color: '#ffe7ce',
        opacity: 100,
        size: 'large',
        body: 'say more',
        url: '',
        image: '',
        isSubPage: false,
        subPage: {
            description: '',
            functionality: '',
            tags: [],
            link: {
                code: '',
                live: ''
            },
            images: []
        }
    },
    showCardModal: false,
    previewCardSubPageModal: false,
};

const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState,
    reducers: {
        setNewCollectionName(state, action) {
            state.newCollectionName = action?.payload
        },
        saveNewCollection(state, action){
            state.collections.push({ name: action.payload.newCollectionName, cards: [] });
        },
        setPortfolio(state, action){
            state.collections = action?.payload
        },
        setShowCollectionModal(state,action){
            state.showCollectionModal = action.payload
        },
        setShowRenameCollectionModal(state,action){
            state.showRenameCollectionModal = action.payload
        },
        setSelectedCollectionIndex(state,action){
            state.selectedCollectionIndex = action.payload
        },
        setEditCard(state, action) {
            const { field, value } = action.payload; 

            if(field === 'description' || field === 'functionality' || field === 'tags'
                || field === 'images')
            {
                state.editCard = {
                    ...state.editCard,
                    subPage: {
                        ...state.editCard.subPage,
                        [field]: value
                    },
                };
                return
            }

            if(field === 'code' || field === 'live'){
                state.editCard = {
                    ...state.editCard,
                    subPage: {
                        ...state.editCard.subPage,
                       link: {
                        ...state.editCard.subPage.link,
                        [field]: value
                       }
                    },
                };
                return
            }

            state.editCard = {
              ...state.editCard,
              [field]: value, 
            };
          },
        resetEditCard(state) {
            state.editCard = {
                cardIndex: -1,
                style: 'text',
                color: '#ffe7ce',
                opacity: 100,
                size: 'large',
                body: 'say more',
                url: '',
                image: '',
                isSubPage: false,
                subPage: {
                    description: '',
                    functionality: '',
                    tags: [],
                    link: {
                        code: '',
                        live: ''
                    },
                    images: []
                }
            }
          },

        setSubPageSkill(state,action){
            const { skill } = action.payload;

            state.editCard = {
                ...state.editCard,
                subPage: {
                    ...state.editCard.subPage,
                    tags : [...(state.editCard.subPage?.tags || []), skill],
                }

            };

        },  
        removeSubPageSkill(state, action) {
            const { skill } = action.payload;

            state.editCard = {
                ...state.editCard,
                subPage: {
                    ...state.editCard.subPage,
                    tags : state.editCard.subPage.tags?.filter(s => s !== skill) || [],
                }

            };
        
        },
        saveCard(state, action) {
            
            const {newCard} = action.payload

            const { selectedCollectionIndex } = state;

            if (selectedCollectionIndex === null || selectedCollectionIndex < 0) return;

            const collection = state.collections[selectedCollectionIndex];
            const updatedCard = { ...newCard };
            
            if (state.editCard.cardIndex === -1){
                collection.cards.push(updatedCard);
            } 
                
            else{
                if(state.editCard.cardIndex){
                    collection.cards[state.editCard.cardIndex] = updatedCard;
                }
            } 
            
            state.collections[selectedCollectionIndex] = collection;           
          },
        setShowCardModal(state,action){
            state.showCardModal = action.payload
        },
        setPreviewCardSubPageModal(state,action){
            state.previewCardSubPageModal = action.payload
        },
        setUpdateCard(state,action){
            const {
                cardIndex,
                style,
                color,
                opacity,
                size,
                body,
                url,
                image,
                isSubPage,
                subPage
            } = action.payload;

            state.editCard = {
                ...state.editCard,
                cardIndex,
                style,
                color,
                opacity,
                size,
                body,
                url,
                image,
                isSubPage,
                subPage
            };

        }

        
    },
    extraReducers: (builder) => {
        builder.addCase(createCollection.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(createCollection.fulfilled, (state, action) => {  
            state.error = null
            state.loading = false;
            state.collections = action.payload.portfolio;
        })
        builder.addCase(createCollection.rejected, (state, action) => {  
            state.loading = false;
            state.error = (action.payload as AxiosErrorResponse).message;
        })
        builder.addCase(deleteCollection.fulfilled, (state, action) => {  
            state.collections = action.payload.portfolio
        })
        builder.addCase(deleteCollection.rejected, (state, action) => {  
            state.error = (action.payload as AxiosErrorResponse).message
        })
        builder.addCase(editCollection.fulfilled, (state, action) => {  
            state.collections = action.payload.portfolio
        })
        builder.addCase(editCollection.rejected, (state, action) => {  
            state.error = (action.payload as AxiosErrorResponse).message
        })
        builder.addCase(createCard.fulfilled, (state, action) => {  
            state.error = null
            state.collections = action.payload.portfolio;
        })
        builder.addCase(createCard.rejected, (state, action) => {  
            state.error = (action.payload as AxiosErrorResponse).message
        })
        builder.addCase(deleteCard.fulfilled, (state, action) => {  
            state.error = null
            state.collections = action.payload.portfolio;
        })
        builder.addCase(deleteCard.rejected, (state, action) => {  
            state.error = (action.payload as AxiosErrorResponse).message
        })
        builder.addCase(updateCard.fulfilled, (state, action) => {  
            state.error = null
            state.collections = action.payload.portfolio;
        })
        builder.addCase(updateCard.rejected, (state, action) => {  
            state.error = (action.payload as AxiosErrorResponse).message
        })

    }
});

export const { 
    setNewCollectionName, 
    saveNewCollection, 
    setPortfolio,
    setShowCollectionModal,
    setShowRenameCollectionModal,
    setSelectedCollectionIndex,
    setEditCard,
    setShowCardModal, 
    resetEditCard, 
    saveCard, 
    setUpdateCard,
    setSubPageSkill,
    removeSubPageSkill,
    setPreviewCardSubPageModal
    } = portfolioSlice.actions;

export default portfolioSlice.reducer;