// Resuable components


import profile from "../assets/senthilkumaran.jpg"

const ModelPopComponents = ({ id, header, body, footer, onClose, outsideclosefunction }) => {
    return (
        <div id={id || "Model"} className="fixed z-[1] pt-[150px] left-0 top-0 w-full h-full overflow-auto bg-slate-100">
            <div  ref={outsideclosefunction} className="relative bg-white m-auto p-0 border-2 w-[80%] animate-animateModel duration-[0.5s]">
                <div className="py-[16px] px-1  bg-gray-500 ">
                    <span className="cursor-pointer float-right text-[30px]" onClick={onClose}>&times;</span>
                    <h2 className="text-center text-2xl text-white font-extrabold">{header ? header : 'Profile'}</h2>
                </div>
                <div className="my-5 mx-6">
                    {
                        body ? body : (
                            <div className="grid grid-cols-2 items-center">

                                <img src={profile} alt="profile_image" className="w-[200px] h-[200px] ml-[100px] object-fill" />
                                <p className="px-5 font-semibold text-xl">Iam a passionate software developer skilled in MERN stack,
                                    Java, Spring Boot, and microservices, with a focus on backend development and DSA.</p>
                            </div>
                        )
                    }
                </div>
                <div className="py-[16px] px-1 bg-gray-500">
                    {
                        footer ? footer : (
                            <h2 className="text-center text-2xl text-white font-extrabold">Footer</h2>
                        )
                    }
                </div>
            </div>

        </div>
    )
}

export default ModelPopComponents