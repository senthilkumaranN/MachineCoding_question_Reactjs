

export default function ({ data, onClick }) {
    return (
        <div className="flex flex-col justify-center items-center mt-5">
            {
                data ?
                    data.map((item, index) => (
                        <p className="text-xl font-bold underline text-blue-500 hover:text-black " key={index} onClick={onClick}>{item}</p>
                    )) : null
            }
        </div>
    )
}