import toast from 'react-hot-toast';
import { AiOutlineClose } from "react-icons/ai";


const ToastNotification = (message: string) => {
  return (
    toast(
        (t) => (
          <div style={{
              background: 'linear-gradient(to right, #268beb, #4352f7)'
            }} 
            className=' text-white p-3 flex gap-3 shadow-md rounded-sm'>
            <span>{message}</span>
            <AiOutlineClose size={20} className='hover:shadow-dark-glow cursor-pointer' 
            onClick={() => toast.dismiss(t.id)} />
          </div>
        )
      )
  )
}

export default ToastNotification
