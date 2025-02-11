import { useRef } from "react";
import CloseIcon from "../assets/file-remove.svg";
import { deleteFromCloudinary, uploadToCloudinary } from "../services/cloudinary";

interface FileData {
  name: string;
  url?: string;
}

interface UploadImagesProps {
  data: FileData[];
  setData: (images: { name: string; url?: string }[]) => void;
}


const UploadImages = ({ data, setData }: UploadImagesProps) => {

  const fileInputRef = useRef<HTMLInputElement | null>(null);
 
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = await Promise.all(
        Array.from(event.target.files).map(async (file) => ({
          name: file.name,
          url: await uploadToCloudinary(file),
        }))
      );
      setData([...data, ...newFiles]);
    }
  };

  const handleRemoveFile = async (index: number) => {
    setData(data.filter((_, i) => i !== index));

    const imgUrl = data[index].url 
    const publicId = imgUrl?.split('/')?.slice(-2)?.join('/')?.split('.')[0];

    if(publicId){
      const deletionSuccess = await deleteFromCloudinary(publicId);
      if (!deletionSuccess) return
    }
  };

 
  return (
    <div className="border border-gray-300 p-4">
      <div className="flex gap-2">
        <p className="font-semibold">Add Images</p>
      </div>

      <div className="py-4 flex items-center gap-4">
        <label className="bg-gray-50 py-2 border-blue-400 border px-2 flex justify-center cursor-pointer shadow-btn rounded-md text-blue-500 font-bold tracking-wide w-[10rem]">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <p className="flex items-center gap-1 cursor-pointer">Upload</p>
        </label>
      </div>

      {data?.length > 0 && (
        <div className="mt-2 space-y-2">
          {data.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="text-blue bg-white px-4 py-2 flex items-center justify-between border rounded-md shadow-sm"
            >
              <img src={file.url} alt="Image" className="h-10 w-10 object-cover rounded-md" />
              <span className=" max-w-[10rem] sm:max-w-[20rem] md:max-w-[10rem] lg:max-w-[24rem]">{file.name}</span>
              <img
                src={CloseIcon}
                className="h-3 w-3 cursor-pointer"
                alt="Remove Icon"
                onClick={() => handleRemoveFile(index)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadImages;
