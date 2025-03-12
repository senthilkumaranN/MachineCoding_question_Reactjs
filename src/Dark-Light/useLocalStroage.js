import { useEffect, useState } from "react";



export default function useLocalStorage(key, defaultValue) {
    const [value, setvalue] = useState(() => {
        let currentValue;

        try {

            currentValue = localStorage.getItem(key) !== null ?
                JSON.parse(localStorage.getItem(key)) : defaultValue;

        } catch (e) {
            console.log(e)
            currentValue = defaultValue
        }

        return currentValue;

    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setvalue];
}