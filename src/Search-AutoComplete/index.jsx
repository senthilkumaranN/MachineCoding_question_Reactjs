

import React, { useEffect, useState } from 'react'
import List from './List'

const SearchLogic = () => {
    const [loading, setloading] = useState(false)
    const [productdata, setProductdata] = useState([])
    const [searchparam, setSearchparam] = useState("")
    const [filterproduct, setfilterproduct] = useState([])
    const [showDropdown, setshowDropdown] = useState(false)

    async function fetchData() {
        try {
            setloading(true)
            const response = await fetch('https://dummyjson.com/products')
            const data = await response.json()


            if (data.products && data.products.length > 0) {
                const brand = data.products.map(item => item.brand)
                setProductdata(brand)
                setloading(false)
            }

        } catch (e) {
            console.log(e)
            setloading(false)
        }
    }

    function handleOnchange(e) {
        const query = e.target.value.toLowerCase();
        setSearchparam(query)
        if (query.length > 1) {
            const filteredData = productdata && productdata?.length ?
                productdata?.filter((item) => item?.toLowerCase().includes(query)) : []

            setfilterproduct(filteredData);
            setshowDropdown(true)
        } else {
            setshowDropdown(false)
        }

    }

    function handleClick(e) {
        setshowDropdown(false)
        setSearchparam(e.target.innerText)
        setfilterproduct([])
    }


    useEffect(() => {
        fetchData()
    }, [])



    return (
        <div className='min-h-screen  mt-6'>
            {
                loading ? <h2 className='text-center font-semibold text-2xl'>Loading..Please wait</h2> :
                    <div className='flex justify-center'>
                        <input className='border-2 border-blue-500 p-3 rounded-xl'
                            value={searchparam}
                            placeholder="Search Products..."
                            onChange={handleOnchange}
                        />
                    </div>
            }

            {showDropdown && <List onClick={handleClick} data={filterproduct} />}
        </div>
    )
}

export default SearchLogic