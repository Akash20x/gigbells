import {  useEffect, useRef, useState } from "react";
import defaultImg from "../assets/default.svg";
import { AppDispatch } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { ProfileData, User } from "../misc/types";
import { editProfileImage } from "../services/profileServices";

const ProfileImage = ({ profileData }: { profileData: ProfileData }) => {

    const dispatch = useDispatch<AppDispatch>();

    const state = useSelector((state: { user: User }) => state.user);
    const { profileImage } = state; 

    const [previewSrc, setPreviewSrc] = useState<string | null>(profileImage || null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setPreviewSrc(profileImage)     
    }, [profileImage])
    

    const processFile = async (file: File) => {
        try {
                dispatch(editProfileImage({ image: file, userName: profileData.userName }));
        } catch (error) {
            console.error("Error processing file:", error);
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) processFile(file);
    };

    const handleClick = () => fileInputRef.current?.click();

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
            processFile(file);
        } else {
            alert("Please drop a valid image file.");
        }
    };

    const handleRemovePhoto = async () => {
        const publicId = previewSrc?.split('/')?.slice(-2)?.join('/')?.split('.')[0];
        setPreviewSrc(null);
        fileInputRef.current && (fileInputRef.current.value = "");

        if(publicId){
            dispatch(editProfileImage({ image: null, userName: profileData.userName, imageId: publicId }));

        }

    };


    return (
        <div className="mb-6 sm:mb-0">
            <div className="w-full md:w-60">
                <div className="flex items-center flex-col">
                    <div
                        className="flex justify-center items-center w-36 h-36 sm:w-52 sm:h-52 bg-gray-200 aspect-square rounded-full overflow-hidden"
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                        onClick={handleClick}
                    >
                        <div className="relative inline-block h-full w-full overflow-hidden rounded-full bg-gray-100 group">
                            {previewSrc ? (
                                <img
                                    src={previewSrc}
                                    alt="Profile Image"
                                    className="h-full w-full object-cover rounded-full"
                                />
                            ) : (
                                <>
                                    <div className="absolute hidden group-hover:flex w-full h-full justify-center items-center self-center uppercase text-sm font-bold text-gray-700">
                                        Add a photo
                                    </div>
                                    <img src={defaultImg} className="h-full w-full" />
                                </>
                            )}
                        </div>
                    </div>
                    {!previewSrc && 
                    <input
                        type="file"
                        name="photo"
                        id="photo"
                        accept="image/*"
                        className="mt-4 w-full px-4"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                    />
                    }
                    {previewSrc && (
                        <div className="mt-2">
                            <button
                                className="rounded bg-white w-full px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 inline-flex items-center gap-1"
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
                    )}
                </div>
            </div>
        </div>
        );
};

export default ProfileImage;
