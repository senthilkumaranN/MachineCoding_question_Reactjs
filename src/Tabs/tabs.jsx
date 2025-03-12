import React, { useState } from 'react'

const Tabs = ({ tabscontent, onChange }) => {

    const [currentTabIndex, setcurrnetTabIndex] = useState(0)

    function handleOnClick(getcurrentindex) {
        setcurrnetTabIndex(getcurrentindex)
        onChange?.(getcurrentindex)
    }
    return (
        <div className='min-h-screen flex flex-col gap-2 justify-center items-center'>
            <div className='flex gap-2'>
                {
                        tabscontent.map((item, index) => (
                            <button className={`px-2 py-1 rounded-md transition-all duration-300 ${currentTabIndex === index ? "bg-red-700 text-black " : "bg-green-500"}`} onClick={() => handleOnClick(index)} key={item.label}>
                                <span className='font-bold text-2xl'>{item.label}</span>
                            </button>
                        )) 
                }
            </div>
            <div className='text-xl mt-3 font-bold' >
                {
                    tabscontent[currentTabIndex] && tabscontent[currentTabIndex].content
                }

            </div>
        </div>
    )
}

export default Tabs