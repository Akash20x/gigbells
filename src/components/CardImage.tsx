const CardImage = ({cardImg}: {cardImg: string}) => {

  return (
    <>    
      {cardImg &&  
        <div className="relative flex-1 flex-col  justify-center items-center font-bold uppercase rounded-xl text-center -z-0">
            <img
              src={cardImg}
              alt="Card Image"
              className=" object-cover rounded-xl h-full w-full"
            />                              
        </div>
      }
    </>

  )
}

export default CardImage
   