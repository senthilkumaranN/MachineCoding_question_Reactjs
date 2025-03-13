import React, { useEffect, useState } from 'react'

const TableData = () => {
    const [data, setData] = useState([]); // Correct state name to match convention
    const [loading, setLoading] = useState(false);
    const [filterproducts, setFilterproducts] = useState([])
    const [searchparam, setSearchparam] = useState("")
    const [sort, setSort] = useState("")

    async function fetchData() {
        try {
            setLoading(true); // Set loading to true when fetching data
            const response = await fetch('https://dummyjson.com/products');
            const result = await response.json();
            console.log(result);

            // Update the data with fetched products
            if (result && result.products && result.products.length > 0) {
                setData(result.products);
                setFilterproducts(result.products)
                setLoading(false); // Set loading to false after data is loaded
            }
        } catch (e) {
            console.log(e);
            setLoading(false); // Set loading to false in case of error
        }
    }

    // SortingLogic

    function handleSort(e) {
        const option = e.target.value
        setSort(option)

        ApplyingSort(filterproducts, option)
    }

    function ApplyingSort(products, option) {
        let sortData = [...products]; // Create a copy to avoid mutating original state

        if (option === "asc") {
            sortData.sort((a, b) => a.title.localeCompare(b.title)); // Sorting by Title (Modify as needed)
        } else if (option === "desc") {
            sortData.sort((a, b) => b.title.localeCompare(a.title));
        } else if (option === "price-asc") {
            sortData.sort((a, b) => a.price - b.price); // Sorting by Price (Low to High)
        } else if (option === "price-desc") {
            sortData.sort((a, b) => b.price - a.price); // Sorting by Price (High to Low)
        } else {
            sortData = [...data]; // Reset to original
        }

        setFilterproducts(sortData);
    }

    // filteringLogic

    function handleChange(e) {
        const query = e.target.value.toLowerCase();
        setSearchparam(query);

        if (query.length > 1) {
            const filtered = data.filter((product) =>
                product.title?.toLowerCase().includes(query) ||
                product.category?.toLowerCase().includes(query)
            );

            setFilterproducts(filtered);
        } else {
            setFilterproducts(data);
        }
    }

    useEffect(() => {
        fetchData(); // Fetch data when the component mounts
    }, []);

    return (
        <div className='min-h-screen max-w-6xl mx-auto flex flex-col justify-around p-4'>

            {/* Search Input */}
            <div className='flex justify-center items-center mb-4'>
                <input
                    className='p-2 w-72 border-2 border-gray-300 outline-none rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400'
                    type="text"
                    placeholder='Search the Product...'
                    value={searchparam}
                    onChange={handleChange}
                />
            </div>

            {/* Sorting Dropdown */}
            <div className='flex justify-center items-center mb-5'>
                <select
                    className='p-2 w-64 border-2 border-gray-300 outline-none rounded-lg shadow-sm cursor-pointer focus:ring-2 focus:ring-blue-400'
                    value={sort}
                    onChange={handleSort}
                >
                    <option value="">Select Sorting Option</option>
                    <option value="asc">Title (A-Z)</option>
                    <option value="desc">Title (Z-A)</option>
                    <option value="price-asc">Price (Low to High)</option>
                    <option value="price-desc">Price (High to Low)</option>
                </select>
            </div>

            {/* Loading State */}
            {loading ? (
                <p className='text-center text-3xl font-semibold text-gray-600'>Loading...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className='w-full border border-gray-300 border-collapse shadow-md rounded-lg overflow-hidden'>
                        <thead>
                            <tr className='bg-gray-200 text-gray-700 uppercase text-sm'>
                                <th className='border border-gray-300 px-4 py-2'>Title</th>
                                <th className='border border-gray-300 px-4 py-2'>Stock</th>
                                <th className='border border-gray-300 px-4 py-2'>Price</th>
                                <th className='border border-gray-300 px-4 py-2'>Category</th>
                                <th className='border border-gray-300 px-4 py-2'>Return Policy</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterproducts.map((item, index) => (
                                <tr
                                    key={item.id}
                                    className={`border border-gray-300 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
                                >
                                    <td className='border border-gray-300 px-4 py-2 text-center'>{item.title}</td>
                                    <td className='border border-gray-300 px-4 py-2 text-center'>{item.stock}</td>
                                    <td className='border border-gray-300 px-4 py-2 text-center font-semibold text-blue-600'>
                                        ${item.price}
                                    </td>
                                    <td className='border border-gray-300 px-4 py-2 text-center'>{item.category}</td>
                                    <td className='border border-gray-300 px-4 py-2 text-center'>{item.returnPolicy}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>

    );
};

export default TableData;
