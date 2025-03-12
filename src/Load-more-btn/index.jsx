import React, { useEffect, useState } from 'react';

const LoadMoreBtn = () => {
    const [productsList, setProductsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(0);
    const [disable, setDisable] = useState(false);

    console.log(productsList);

    async function fetchData() {
        try {
            setLoading(true);
            const nextPage = count * 2;
            const response = await fetch(`https://dummyjson.com/products?limit=2&skip=${nextPage}`);
            const result = await response.json();
            console.log(result)

            if (result.products && result.products.length > 0) {
                setProductsList((prevProducts) => [...prevProducts, ...result.products]);
            }

        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false); // ✅ Ensure loading state is updated
        }
    }

    useEffect(() => {
        fetchData();
    }, [count]);

    useEffect(() => {
        if (productsList.length >= 100) {
            setDisable(true);
        }
    }, [productsList]);

    if (loading) return <p className="text-center text-lg font-semibold">Please wait!</p>;

    return (
        <div className="min-h-screen bg-slate-100 flex flex-col gap-5 p-5">
            <div className="grid grid-cols-4 gap-2">
                {productsList.length > 0 ? (
                    productsList.map((item,index) => (
                        <div className="p-5 border-2 flex flex-col gap-2" key={`${item.id}-${index}`}>
                            <div className="w-[300px] h-[200px] flex items-center justify-center overflow-hidden">
                                <img className="max-w-full max-h-full object-cover rounded-lg" src={item.thumbnail} alt={item.title} />
                            </div>
                            <h2 
                                className="truncate overflow-hidden whitespace-nowrap  text-center text-2xl font-bold text-gray-700"
                                title={item.title}
                            >
                                {item.title}
                            </h2>
                            <p className="text-center bg-black p-2 rounded-lg text-sm text-white">{item.category}</p>
                        </div>
                    ))
                ) : null}
            </div>
            <div className="text-center">
                <button 
                    disabled={disable} 
                    className={`bg-blue-800 p-2 text-2xl rounded-lg text-white font-bold ${disable ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700 transition"}`}
                    onClick={() => setCount((prevCount) => prevCount + 1)}
                >
                    Load More
                </button>
            </div>
            {disable ? <p className="text-center text-lg font-semibold text-red-600">No more products</p> : null}
        </div>
    );
};

export default LoadMoreBtn;
