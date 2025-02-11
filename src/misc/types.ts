export interface Card {
    _id?: string;
    cardIndex?: number;
    style: 'text' | 'image' | 'text_image';
    color: string;
    size: 'large' | 'small';
    body: string;
    opacity: number;
    url: string;
    image: string;
    isSubPage: boolean;
    subPage: {
        description: string;
        functionality: string;
        tags: string[];
        link: {
            code: string;
            live: string;
        },
        images: { name: string; url?: string }[];
    }
}

interface Collection {
    _id?: string;
    name: string;
    cards: Card[];
}

export interface Portfolio {
    loading: boolean;
    error: string | null;
    collections: Collection[];
    newCollectionName: string;
    showCollectionModal: boolean;
    showRenameCollectionModal: boolean;
    selectedCollectionIndex: number | null;
    editCard: Card;
    showCardModal: boolean;
    previewCardSubPageModal: boolean;
}

export interface AxiosErrorResponse {
    message: string;
}

export interface Service {
    name: string;
    feeType: string;
    fixedCost: {
        currency: string;
        cost: string;
        durationType: string;
    };
    skills: string[];
    description: string;
    deliverables: string;
    _id?: string;
    serviceIndex?: number
}

export interface ProfileData {
    name?: string;
    description?: string;
    skills: string[];
    location?: string;
    social: {
        link: string;
        platform?: string;
      }[]; 
    userName: string;
  }
  

export interface Position {
    title: string;
    company: string;
    location: string;
    isCurrentPosition: boolean;
    startedAt: {
        month: string;
        year: string;
    },
    endedAt: {
        month: string;
        year: string;
    },
    description: string;
    _id?: string;
    positionIndex?: number
}  

export interface Education {
    title: string;
    location: string;
    startedAtYear: string;
    endedAtYear: string;
    description: string;
    _id?: string;
    educationIndex?: number
}  

export interface User {
    profile: ProfileData;
    profileImage: string;
    loading: boolean;
    previewLoading: boolean;
    error: string | null;
    isLogged: boolean;
    about: string;
    positions: Position[];
    educationItems: Education[];
    showPositionModal: boolean;
    showEducationModal: boolean;
    editEducation: Education;
    editPosition: Position;
    services: Service[];
    editService: Service;
    showServiceModal: boolean;
    previewServiceModal: boolean;
    currentService: string;
    isNewService: boolean;
    isNewPosition: boolean;
    isNewEducationItem: boolean;
}


