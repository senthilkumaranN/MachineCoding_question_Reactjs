import React, { useEffect, useState } from 'react'


const ScrollIndicator = ({ url }) => {
    const [loading, setloading] = useState(false)
    const [product, setproducts] = useState([])
    const [errormsg, seterrormsg] = useState("")
    const [scrollpercentage, setscrollpercentage] = useState(0)


    const fetchData = async (geturl) => {
        try {
            setloading(true)
            const response = await fetch(`${geturl}`)
            const result = await response.json()

            if (result && result.products && result.products.length > 0) {
                setproducts(result.products)
                setloading(false)
            }

        } catch (e) {
            seterrormsg(e.message)
            setloading(false)
        }
    }

    function handlescrollpercentage() {

        const howmuchscroll = document.body.scrollTop || document.documentElement.scrollTop

        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight

        if (height === 0) {
            setscrollpercentage(100)
        } else {
            setscrollpercentage((howmuchscroll / height) * 100)
        }

    }

    useEffect(() => {
        if (url !== "") {
            fetchData(url)
        }
    }, [url])



    useEffect(() => {
        window.addEventListener("scroll", handlescrollpercentage);

        return () => {
            window.removeEventListener("scroll", handlescrollpercentage);
        }
    }, [])

    if (errormsg) {
        return <p>Error ! {errormsg}</p>
    }

    if (loading) {
        return <p>Please Wait! Loading...</p>
    }
    return (
        <>
            <div className='fixed top-0 z-50 w-full h-[65px] text-center bg-red-600
            shadow-md flex flex-col justify-center items-center gap-4'>
                <h1 className='font-bold text-3xl capitalize pt-2 text-white'> custom Scroll Indicator</h1>
                <div className='w-full  h-[5px] bg-gray-300'>
                    <div className='h-[5px] bg-blue-500 transition-all duration-300'
                        style={{ width: `${scrollpercentage}%` }}>
                    </div>
                </div>
            </div>
            <div className='mt-[100px] grid grid-cols-3  h-[350px] items-center justify-center'>
                {
                    product && product.length > 0 ?
                        product.map((item) => (
                            <div key={item.id}>
                                <p className="text-red-500 font-bold">{item.title}</p>
                            </div>
                        ))

                        : null
                }
            </div>
        </>
    )
}

export default ScrollIndicator