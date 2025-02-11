import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../misc/types";
import { AppDispatch } from "../redux/store";
import { fetchProfileServices } from "../services/profileServices";

const ProfileContact = () => {

  const state = useSelector((state: { user: User }) => state.user);
  
  const { profile, services, currentService } = state;
    
  const [formData, setFormData] = useState({
    responseEmail: '',
    name: "",
    email: "",
    description: "",
    service: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
       [name]: value,
    }));
  };

  const handleResponseSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Email service is currently unavailable. We appreciate your understanding ')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Email service is currently unavailable. We appreciate your understanding ')
  }

  const dispatch = useDispatch<AppDispatch>();

  useEffect(()=>{
    if(profile.userName && services.length===0){
      dispatch(fetchProfileServices(profile.userName));
    }
  },[dispatch, profile.userName, services.length])
  
  useEffect(() => {
    if (currentService) {
      setFormData((prev) => ({
        ...prev,
        service: currentService, 
      }));
    }
  }, [currentService]); 
    

  return (
    <div className="w-full md:w-[75%] mx-auto pb-8 px-6 md:px-0">
      <h1 className="font-bold text-3xl md:text-4xl py-8">Get in touch with me ✨</h1>
      <p className="text-xl font-semibold">👋 Nice to meet you! What do you need help with? ✨</p>

      <form className="w-full mx-auto flex gap-4 items-center" onSubmit={handleResponseSubmit}>
        <div className="w-full md:w-auto flex flex-col py-4">
          <label className="font-semibold">Email To Receive Responses</label>
          <input
              type="email"
              name="responseEmail"
              className="border border-black w-full md:w-[20rem] my-2"
              value={formData.responseEmail}
              onChange={handleChange}
              required
            />
        </div>
        <button    
          type="submit"  
          className="bg-sky-500 text-sm mt-5 text-white font-bold px-6 py-[0.35rem] rounded hover:bg-sky-600 disabled:bg-gray-400">
        Save
        </button>
      </form>

      <form onSubmit={handleSubmit} className="w-full mx-auto">
        <p className="italic py-2">The following fields will be visible to visitors of your contact form.</p>
        <div className="flex flex-col pb-4">
          <label className="font-semibold">Your Name</label>
          <input
            type="text"
            name="name"
            className="border border-black w-full md:w-[20rem] my-2 px-2"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col pb-4">
          <label className="font-semibold">Your Email Address</label>
          <input
            type="email"
            className="border border-black w-full md:w-[20rem] my-2 px-2"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col pb-4">
          <label className="font-semibold">What are you looking for my help with?</label>
          <textarea
            name="description"
            value={formData.description}
            className="border border-black w-full md:w-[30rem] my-2 h-[8rem] px-2"
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col pb-4">
          <label className="font-semibold">Service</label>
          <select name="service" value={formData.service} onChange={handleChange}
                className={`border border-black w-full md:w-[20rem] my-2 ${services.length === 0 ? 'cursor-not-allowed': ''}`}
                >
            {services.map((service, index) => (
              <option key={index} value={service.name}>
                {service.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="lg:flex text-white text-center font-bold text-sm md:text-lg px-8 py-1 rounded-full get-in">Submit</button>
      </form>
    </div>
  );
};

export default ProfileContact;
