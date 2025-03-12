import { useEffect, useState } from 'react'
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa'

const ImageSlider = ({ url, page, limit }) => {
    const [images, setimages] = useState([])
    const [currentslide, setcurrentslide] = useState(0)
    const [errormsg, seterrormsg] = useState("")
    const [loading, setloading] = useState(false)
    // https://picsum.photos/v2/list?page=2&limit=100
    async function fetchurl(geturl) {
        try {
            setloading(true)
            const response = await fetch(`${url}?page=${page}&limit=${limit}`)
            const result = await response.json()
            if (result && result.length > 0) {
                setimages(result)
                setloading(false)
            }

        } catch (e) {
            seterrormsg(e)
            setloading(false)
        }
    }

    function handlePrevious() {
        setcurrentslide(currentslide === 0 ? images.length - 1 : currentslide - 1)
    }

    function handleNext() {
        setcurrentslide(currentslide === images.length - 1 ? 0 : currentslide + 1)
    }


    useEffect(() => {
        if (url !== "") {
            fetchurl(url)
        }
    }, [url])

    if (loading) return <p>Please Wait! Loading</p>

    if (errormsg !== "") return <p>{errormsg}</p>
    return (
        <div className='relative w-[600px] h-[500px] flex justify-center items-center '>
            <FaArrowAltCircleLeft onClick={handlePrevious} className='absolute top-1/2 left-2 w-7 h-7 text-white drop-shadow-sm' />
            {
                images && images.length > 0 ?
                    images.map((image, index) => (
                        <img
                            key={image.id}
                            src={image.download_url}
                            alt={image.url}
                            className={currentslide === index ?
                                "w-full h-full rounded-md object-cover shadow-lg shadow-[#ffffff4b]" : 
                                "w-full h-full rounded-md object-cover shadow-lg shadow-[#ffffff4b] hidden"}
                        />

                    )) : null
            }
            <span className='absolute flex justify-center bottom-4 gap-1'>
                {
                    images.map((_, index) => (
                        <button key={index} onClick={() => setcurrentslide(index)} className={currentslide === index ?
                            'rounded-full bg-white h-4 w-4 border-none outline-none my-1 cursor-pointer' :
                             "rounded-full  h-4 w-4 border-none outline-none my-1 cursor-pointer bg-gray-500"}></button>
                    ))
                }
            </span>
            <FaArrowAltCircleRight onClick={handleNext} className='absolute top-1/2 right-2 w-7 h-7 text-white drop-shadow-sm' />
        </div>
    )
}

export default ImageSlider