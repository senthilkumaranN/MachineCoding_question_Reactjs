import React, { useEffect } from 'react';
import useLocalStorage from './useLocalStroage';

const DarkSwitchMode = () => {
    const [theme, setTheme] = useLocalStorage("theme", "dark");

    function handleToggleTheme() {
        setTheme(theme === "light" ? "dark" : "light");
    }

    // Apply theme to the document
    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
            document.documentElement.classList.remove("light");
        } else {
            document.documentElement.classList.add("light");
            document.documentElement.classList.remove("dark");
        }
    }, [theme]); // Runs whenever `theme` changes

   

    return (
        <div className='min-h-screen flex flex-col items-center justify-center transition-all duration-500 bg-white dark:bg-gray-900 text-black dark:text-white'>
            <p className='text-2xl font-bold'>Hello World</p>
            <button className='mt-4 px-4 py-2 bg-blue-500 text-white 
                              rounded-lg hover:bg-blue-700' onClick={handleToggleTheme}>
                Change Theme
            </button>
        </div>
    );
}

export default DarkSwitchMode;
