// Custom Hooks need only to use useState and useEffect
import {useState, useEffect} from 'react'


// Custom Hooks need only to use useState and useEffect
export default function useLocalStorage<T>(key: string, defaultData: T) {

    // Get Data From Local Storage
    const [formData, setFormData] = useState<T>(() => {
        // Must use below code to check if use Nextjs there is no window which means no localStorag so return default value
        if(typeof window === 'undefined') return defaultData;

        try {
            const getDataFromLocal = localStorage.getItem(key);
            return getDataFromLocal ? JSON.parse(getDataFromLocal) : defaultData;
        } catch(error) {
            console.error(`Local Storage Reading Error ${error}`);
            return defaultData;
        }
    })

    // Set Data in Local Storage and Update Local Storage
    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(formData));
        } catch(error) {
            console.error(`Local Storage Writing Error ${error}`);
        }
    }, [key, formData])


    return [formData, setFormData] as const;
}
