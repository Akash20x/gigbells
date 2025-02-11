import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setEditCard } from "../redux/portfolioSlice";
import { colorMapping } from "../misc/constant";
import { AppDispatch } from "../redux/store";
import { Portfolio } from "../misc/types";
import { deleteFromCloudinary, uploadToCloudinary } from "../services/cloudinary";


const EditCardImage = () => {

    const dispatch = useDispatch<AppDispatch>();
    
    const state = useSelector((state: { portfolio: Portfolio }) => state.portfolio);
    
    const { editCard: { color: textColor, image: cardImg } } = state;

    const [previewSrc, setPreviewSrc] = useState<string | null>(cardImg || null);
    const fileInputRef = useRef<HTMLInputElement>(null);


    const processFile = async (file: File) => {
        try {
    
            const imageUrl = await uploadToCloudinary(file);

            if(imageUrl){
                setPreviewSrc(imageUrl);
                dispatch(setEditCard({ field: 'image', value: imageUrl }));
            }
    
        } catch (error) {
            console.error('Error processing file:', error);
        }
    };


    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            processFile(file);

        }
        else {
            alert('Please drop a valid image file.');
        }
    };


    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            processFile(file);
        }
    };


    const handleRemovePhoto = async () => {
        const publicId = previewSrc?.split('/')?.slice(-2)?.join('/')?.split('.')[0];
        setPreviewSrc(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }      
        if(publicId){
            const deletionSuccess = await deleteFromCloudinary(publicId);
            if (!deletionSuccess) return
        }
    };
    
    

  return (
    <>    
    {!previewSrc ?
        <div 
            className="relative flex-1 flex justify-center items-center border-4 border-dashed m-4 font-bold uppercase rounded-xl text-center px-4 z-30"
            style={{ color: colorMapping[textColor], borderColor: colorMapping[textColor] }} 
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={handleClick}
        >
            drag file or click to upload

            <input
                type="file"
                name="photo"
                id="photo"
                accept="image/*"
                className="mt-4 w-full px-4 hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
            />
                                         
        </div>
        : 
        <div className="relative flex-1 flex-col  justify-center items-center font-bold uppercase rounded-xl text-center -z-0">
            <img
                src={previewSrc}
                alt="Card Image Preview"
                className=" object-cover rounded-xl h-full w-full"
            />
                                                        
            <div className="flex flex-row justify-center items-center gap-2 mt-2">
                <button
                    className="rounded bg-white w-1/2 px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 inline-flex items-center gap-1"
                    onClick={handleRemovePhoto}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        className="h-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        ></path>
                    </svg>
                    <span className="text-nowrap">Remove Photo</span>
                </button>
            </div>
        </div>
    }
    </>
  )
}

export default EditCardImage
