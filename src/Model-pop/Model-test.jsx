

import React, { useRef, useState } from 'react'
import ModelPopComponents from './model'
import useOutsideClick from '../useOutsideClick'

const ModelPop = () => {

    const [showModelpop, setshowModelpop] = useState(false)
    const modelRef = useRef(null)
    useOutsideClick(modelRef, () => setshowModelpop(false))

    function handletogglePop() {
        setshowModelpop(!showModelpop)
    }
    function onClose() {
        setshowModelpop(false)
    }
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <button className="bg-blue-600 text-white rounded-lg px-2 py-1 " onClick={handletogglePop} >ModelPop</button>
            {showModelpop && <ModelPopComponents outsideclosefunction={modelRef} onClose={onClose} />}
        </div>
    )
}

export default ModelPop