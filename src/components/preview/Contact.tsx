import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../../misc/types";
import { useParams } from "react-router-dom";
import { fetchProfileServices } from "../../services/profileServices";
import { AppDispatch } from "../../redux/store";

const Contact = () => {

  const state = useSelector((state: { user: User }) => state.user);

  const { username } = useParams();
    
  const { services, currentService } = state;
      
  const [formData, setFormData] = useState({
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


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Email service is currently unavailable. We appreciate your understanding ')
  }

  const dispatch = useDispatch<AppDispatch>();

  useEffect(()=>{
      if(username && services.length===0){
        dispatch(fetchProfileServices(username));
      }
  },[dispatch, username, services.length])

  useEffect(() => {
    if (currentService) {
      setFormData((prev) => ({
        ...prev,
        service: currentService, 
      }));
    }
  }, [currentService]); 
  
  

  return (
    <div className="w-full flex justify-center md:justify-start md:w-[75%] mx-auto">
 <div className="pb-8 flex flex-col justify-center px-4">
      <h1 className="font-bold text-3xl md:text-4xl py-8">Get in touch with me ✨</h1>
      <p className="text-xl font-semibold">👋 Nice to meet you! What do you need help with? ✨</p>


      <form onSubmit={handleSubmit} className="w-full mx-auto">
        <div className="flex flex-col pb-4 pt-4">
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
            <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className={`border border-black w-full md:w-[20rem] my-2 ${services.length === 0 ? 'cursor-not-allowed': ''}`}
                disabled={!services || services.length === 0}
                >
                {services && services.length > 0 ? (
                    services.map((service, index) => (
                    <option key={index} value={service.name}>
                        {service.name}
                    </option>
                    ))
                ) : (
                    <option value="">No services added</option>
                )}
            </select>

        </div>
        <button type="submit" className="lg:flex text-white text-center font-bold text-base md:text-lg px-8 py-1 rounded-full get-in">Submit</button>
      </form>
    </div>
    </div>
  );
};

export default Contact;
