import {useState, useEffect} from 'react'

export default function useCurrentUser<T>(key: string, data: T) {

    const [user, setUser] = useState<T>(() => {
        // To Prevent from server side error must be set out try and catch
        if(typeof(window) === 'undefined') return data;
        try {
            const getDataFromLocalStorage = localStorage.getItem(key);
            return getDataFromLocalStorage ? JSON.parse(getDataFromLocalStorage) : data;
        } catch(error) {
            console.log(`Local Storage Read Error ${error}`)
            return data;
        }
    });

    useEffect(() => {
        try {
            const setDataToLocalStorage = JSON.stringify(user);
            localStorage.setItem(key, setDataToLocalStorage);
        } catch(error) {
            console.log(`Local Storage Write Error ${error}`)

        }
    }, [key, user])

    return [user, setUser] as const
}
