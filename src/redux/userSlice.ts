import { createSlice } from '@reduxjs/toolkit';
import { fetchUserInfo, signIn, signUp } from '../services/authServices';
import { updateProfile, editProfileImage, fetchUserPortfolio, fetchPortfolioPreview, createAbout, createPosition, deletePosition, updatePosition, createEducation, deleteEducation, updateEducation, createService, deleteService, updateService, fetchProfileServices } from '../services/profileServices';
import { AxiosErrorResponse, User } from '../misc/types';

const initialState: User = {
    loading: false,
    previewLoading: false,
    error: null, 
    isLogged: false,
    profile: {
        name: '',
        description: '',
        location: '',        
        skills: [],
        social: [],
        userName: ''
    },
    profileImage: '',
    about: "",
    positions: [],
    showPositionModal: false,
    isNewPosition: false,
    editPosition: {
        positionIndex: -1,
        title: '',
        company: '',
        location: '',
        isCurrentPosition: false,
        startedAt: {
            month: '',
            year: ''
        },
        endedAt: {
            month: '',
            year: ''
        },
        description: ''
    },
    educationItems: [],
    showEducationModal: false,
    isNewEducationItem: false,
    editEducation: {
        educationIndex: -1,
        title: '',
        location: '',
        startedAtYear: '',
        endedAtYear: '',
        description: ''
    },
    services: [],
    showServiceModal: false,
    previewServiceModal: false,
    isNewService: false,
    currentService: "",
    editService: {
        serviceIndex: -1,
        name: '',
        feeType: '',
        fixedCost: {
            currency: '',
            cost: '',
            durationType: ''
        },
        skills: [],
        description: '',
        deliverables: ''
    },

};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logOut() {
            localStorage.removeItem("token")
        },
        setAbout(state, action) {
            state.about = action?.payload
        },
        setProfileSkill(state,action ){
            const { skill } = action.payload;

            state.profile = {
                ...state.profile,
                skills : [...(state.profile?.skills || []), skill],
            };
        },  
        removeProfileSkill(state, action) {
            const { skill } = action.payload;

            state.profile = {
                ...state.profile,
                skills : state.profile?.skills?.filter(s => s !== skill) || [],
            };
        
        },
        setEditPosition(state, action) {
            const { field, value } = action.payload;

            const nestedFields = {
                startedAtYear: "startedAt.year",
                startedAtMonth: "startedAt.month",
                endedAtYear: "endedAt.year",
                endedAtMonth: "endedAt.month",
            };
            
            type NestedFieldKeys = keyof typeof nestedFields;
            type ParentKeys = "startedAt" | "endedAt"; 
            
            if (field in nestedFields) {
                const [parent, child] = nestedFields[field as NestedFieldKeys].split(".");
                state.editPosition = {
                    ...state.editPosition,
                    [parent]: {
                        ...(state.editPosition[parent  as ParentKeys]),
                        [child]: value,
                    },
                };
            }

            else {
                state.editPosition = { ...state.editPosition, [field]: value };
            }
            
           
        },
        setShowPositionModal(state,action){
            state.showPositionModal = action.payload
        },
        resetEditPosition(state) {
            state.editPosition = {
                positionIndex: -1,
                title: '',
                company: '',
                location: '',
                isCurrentPosition: false,
                startedAt: {
                    month: '',
                    year: ''
                },
                endedAt: {
                    month: '',
                    year: ''
                },
                description: ''
            }
          },
        setUpdatePosition(state,action){
            const {
                positionIndex,
                title,
                company,
                location,
                isCurrentPosition,
                startedAt,
                endedAt,
                description
            } = action.payload;

            state.editPosition = {
                ...state.editPosition,
                positionIndex,
                title,
                company,
                location,
                isCurrentPosition,
                startedAt,
                endedAt,
                description
            };



        },
        setEditEducation(state, action) {
            const { field, value } = action.payload;
        
                // Handle other fields dynamically
                state.editEducation = {
                    ...state.editEducation,
                    [field]: value,
                };
        },
        setShowEducationModal(state,action){
            state.showEducationModal = action.payload
        },
        resetEditEducation(state) {
            state.editEducation = {
                educationIndex: -1,
                title: '',
                location: '',
                startedAtYear: '',
                endedAtYear: '',
                description: ''                
            }
          },
        setUpdateEducation(state,action){
            const {
                educationIndex,
                title,
                location,
                startedAtYear,
                endedAtYear,
                description  
            } = action.payload;

            state.editEducation = {
                ...state.editEducation,
                educationIndex,
                title,
                location,
                startedAtYear,
                endedAtYear,
                description  
            };

            

        },
        setServiceSkill(state,action){
            const { skill } = action.payload;

            state.editService = {
                ...state.editService,
                skills: [...(state.editService?.skills || []), skill],
            };

        },
        setEditService(state, action) {
            const { field, value } = action.payload;

            if(field === 'currency' || field === 'cost' || field === 'durationType'){
                state.editService = {
                    ...state.editService,
                    fixedCost: {
                        ...state.editService.fixedCost,
                        [field]: value
                    },
                };
                return
            }
        
                state.editService = {
                    ...state.editService,
                    [field]: value,
                };
        },

        setCurrentService(state, action) {
            state.currentService = action?.payload
        },

        setShowServiceModal(state,action){
            state.showServiceModal = action.payload
        },
        setPreviewServiceModal(state,action){
            state.previewServiceModal = action.payload
        },
        resetEditService(state) {
            state.editService = {
                serviceIndex: -1,
                name: '',
                feeType: '',
                fixedCost: {
                    currency: '',
                    cost: '',
                    durationType: ''
                },
                skills: [],
                description: '',
                deliverables: ''         
            }
          },
        setUpdateService(state,action){
            const {
                serviceIndex,
                name,
                feeType,
                fixedCost,
                skills,
                description,
                deliverables 
            } = action.payload;

            state.editService = {
                ...state.editService,
                serviceIndex,
                name,
                feeType,
                fixedCost,
                skills,
                description,
                deliverables 
            };

        },
        setIsNewPosition(state,action){
            state.isNewPosition = action.payload
        },
        setIsNewEducationItem(state,action){
            state.isNewEducationItem = action.payload
        },
        setIsNewService(state,action){
            state.isNewService = action.payload
        },
        removeServiceSkill(state, action) {
            const { skill } = action.payload;
        
            state.editService = {
                ...state.editService,
                skills: state.editService.skills?.filter(s => s !== skill) || [],
            };
        },


    },
    extraReducers: (builder) => {
        builder.addCase(signUp.fulfilled, (state, action) => {  
            localStorage.setItem("token", action.payload.token)
            state.isLogged = true
            state.error = null
        })
        builder.addCase(signUp.rejected, (state, action) => {  
            state.error = (action.payload as AxiosErrorResponse).message;
        })

        builder.addCase(signIn.fulfilled, (state, action) => {
            localStorage.setItem("token", action.payload.token);  
            state.isLogged = true
            state.error = null   
        })

        builder.addCase(signIn.rejected, (state, action) => {
            state.error = (action.payload as AxiosErrorResponse).message;
        })
        builder.addCase(updateProfile.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(updateProfile.fulfilled, (state) => {
            state.loading = false;
            state.error = null
        })
        builder.addCase(updateProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as AxiosErrorResponse).message;
        })
        builder.addCase(editProfileImage.fulfilled, (state, action) => {
            state.error = null
            state.profileImage = action.payload
        })
        builder.addCase(editProfileImage.rejected, (state, action) => {
            state.error = (action.payload as AxiosErrorResponse).message;
        })


        builder.addCase(fetchUserInfo.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null
            const payload = action.payload;
            state.profile.userName = payload?.user?.userName
            state.isLogged = payload?.user?.userName ? true: false            
        })
        builder.addCase(fetchUserInfo.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as AxiosErrorResponse).message;
        })


        builder.addCase(fetchUserPortfolio.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchUserPortfolio.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null
            const { name, description, skills, location, social = [], 
                  userName, image, about, positions, educationRecords, services } = action.payload.profile;

            state.profile = {
                name: name,
                description,
                skills,
                location,
                social: social.length === 0 ? [{ platform: "", link: "" }] : social,
                userName
            };

            state.about = about

            state.positions = positions

            state.educationItems = educationRecords

            state.services = services

            state.profileImage = image
        })
        builder.addCase(fetchUserPortfolio.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as AxiosErrorResponse).message;
        })
        builder.addCase(fetchPortfolioPreview.pending, (state) => {
            state.previewLoading = true;
        })
        builder.addCase(fetchPortfolioPreview.fulfilled, (state, action) => {
            state.previewLoading = false;
            state.error = null
            const { name, description, skills, location, social = [], 
                  userName, image, about, positions, educationRecords, services } = action.payload.profile;

            state.profile = {
                name,
                description,
                skills,
                location,
                social: social.length === 0 ? [{ platform: "", link: "" }] : social,
                userName
            };


            state.about = about

            state.positions = positions

            state.educationItems = educationRecords

            state.services = services

            state.profileImage = image
        })
        builder.addCase(fetchPortfolioPreview.rejected, (state, action) => {
            state.previewLoading = false;
            state.error = (action.payload as AxiosErrorResponse).message;
        })
        builder.addCase(fetchProfileServices.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchProfileServices.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null
            state.services = action.payload.services
        })
        builder.addCase(fetchProfileServices.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as AxiosErrorResponse).message;
        })
        builder.addCase(createAbout.fulfilled, (state, action) => {  
            state.error = null
            state.about = action.payload.about;
        })
        builder.addCase(createAbout.rejected, (state, action) => {
            state.error = (action.payload as AxiosErrorResponse).message;
        })
        builder.addCase(createPosition.fulfilled, (state, action) => {  
            state.error = null
            state.positions = action.payload.positions;
        })
        builder.addCase(createPosition.rejected, (state, action) => {
            state.error = (action.payload as AxiosErrorResponse).message;
        })
        builder.addCase(deletePosition.fulfilled, (state, action) => {  
            state.positions = action.payload.positions
        })
        builder.addCase(deletePosition.rejected, (state, action) => {  
            state.error = (action.payload as AxiosErrorResponse).message;
        })
        builder.addCase(updatePosition.fulfilled, (state, action) => {  
            state.error = null
            state.positions = action.payload.positions;
        })
        builder.addCase(updatePosition.rejected, (state, action) => {  
            state.error = (action.payload as AxiosErrorResponse).message;
        })

        builder.addCase(createEducation.fulfilled, (state, action) => {  
            state.error = null
            state.educationItems = action.payload.education;
        })
        builder.addCase(createEducation.rejected, (state, action) => {
            state.error = (action.payload as AxiosErrorResponse).message;
        })
        builder.addCase(deleteEducation.fulfilled, (state, action) => {  
            state.educationItems = action.payload.education
        })
        builder.addCase(deleteEducation.rejected, (state, action) => {  
            state.error = (action.payload as AxiosErrorResponse).message;
        })
        builder.addCase(updateEducation.fulfilled, (state, action) => {  
            state.error = null
            state.educationItems = action.payload.education;
        })
        builder.addCase(updateEducation.rejected, (state, action) => {  
            state.error = (action.payload as AxiosErrorResponse).message;
        })

        builder.addCase(createService.fulfilled, (state, action) => {  
            state.error = null
            state.services = action.payload.services;
        })
        builder.addCase(createService.rejected, (state, action) => {
            state.error = (action.payload as AxiosErrorResponse).message;
        })
        builder.addCase(deleteService.fulfilled, (state, action) => {  
            state.services = action.payload.services
        })
        builder.addCase(deleteService.rejected, (state, action) => {  
            state.error = (action.payload as AxiosErrorResponse).message;
        })
        builder.addCase(updateService.fulfilled, (state, action) => {  
            state.error = null
            state.services = action.payload.services;
        })
        builder.addCase(updateService.rejected, (state, action) => {  
            state.error = (action.payload as AxiosErrorResponse).message;
        })
    }
});

export const { 
    logOut, 
    setAbout, 
    setProfileSkill, 
    removeProfileSkill, 
    setEditPosition,
    setShowPositionModal, 
    setUpdatePosition,
    resetEditPosition, 
    setUpdateEducation, 
    resetEditEducation, 
    setShowEducationModal,
    setIsNewPosition, 
    setIsNewEducationItem,
    setEditEducation, 
    setEditService, 
    setCurrentService, 
    setShowServiceModal, 
    resetEditService, 
    setUpdateService,
    setIsNewService, 
    setServiceSkill, 
    removeServiceSkill, 
    setPreviewServiceModal
    } = userSlice.actions;

export default userSlice.reducer;