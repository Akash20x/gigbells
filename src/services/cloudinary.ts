import axios from "axios";

const BASE_API = `${import.meta.env.PORTAL_BACKEND_API_URL}/api`

export const uploadToCloudinary = async (file: File) => {
    
    const formData = new FormData();
    formData.append("image", file);

    try {
        const response = await axios.post(`${BASE_API}/upload-image`, formData,
            {
                headers: { 
                    "Content-Type": "multipart/form-data",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                 },
            }
        )
        const data = await response.data.url
        return data; 
    } catch (error) {
        return null;
    }
};



export const deleteFromCloudinary = async (publicId: string) => {

    
    try {

        const response = await axios.post(`${BASE_API}/delete-image`, { public_id: publicId }, {
            headers: { 
                Authorization: "Bearer " + localStorage.getItem("token"),
             },
        });

        const message = await response.data.message 

        if (message) {
            return true;
        }
    } catch (error) {
        console.error("Error deleting image:", error);
        return false;
    }
};
