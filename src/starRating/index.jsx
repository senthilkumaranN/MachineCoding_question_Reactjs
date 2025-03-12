import { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ noOfStars }) => {

    const [rating, setrating] = useState(0)
    const [hover,sethover] = useState(0)

    function handleclick(getcurrentindex){
           setrating(getcurrentindex)
    }
    function handleMouseMove(getcurrentindex){
         sethover(getcurrentindex)
    }
    function handleMouseEnter(getcurrentindex){
        sethover(getcurrentindex)
    }
    return (
        <div className="min-h-screen flex justify-center my-4">
            {
                [...Array(noOfStars)].map((_, index) => {
                    index += 1

                    return (
                        < FaStar 
                        key={index}
                        className={index <= (rating || hover) ? "text-yellow-300" : null}
                        onClick={()=>handleclick(index)}
                        onMouseMove={()=>handleMouseMove(index)}
                        onMouseEnter={()=>handleMouseEnter(index)}
                        size={40}
                     />
                    )

                    
                })
            }
        </div>
    )
}

export default StarRating