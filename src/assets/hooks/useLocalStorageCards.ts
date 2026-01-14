// When Deals With LocalStorage need useState<T> to getDataFrom localStorage, and useEffect to set data in localstorage
import {useState, useEffect} from 'react'
// This is custom hook Function accepts from Generic Type T which is can object array string according to accept any datatype to save in localStorage and accept key of localStorage as string and data as Generic Type
export default function useLocalStorageCards<T>(keyOfLocal: string, dataOfLocal: T) {
    
    // Get Data From LocalStorage by using useState note useState in localstorage hook from Gnereic Type T
    const [userData, setUserData] = useState<T>(()=> {
        // Check if localStorag exist inside window check if webpage on server there is no localStorage like Nextjs Server
        // Note typeof(window) === 'object' in actual according to window is BOM => Browser Object Model like document is DOM => Document Object Model
        // So if typeof(window) === 'undefined' so the webpage hosted on server there is no local storag
        // which is local storage live inside window or browser so return Default Data
        if(typeof(window) === 'undefined') return dataOfLocal;
        try {
            const getDataFromLocalStorage = localStorage.getItem(keyOfLocal);
            return getDataFromLocalStorage ? JSON.parse(getDataFromLocalStorage) : dataOfLocal;
        } catch(error) {
            console.error(`Local Storage Reading Error ${error}`)
            return dataOfLocal;
        }
    })

    // Set Data to localStorage by using useEffect
    useEffect(()=>{
        try {
            localStorage.setItem(keyOfLocal, JSON.stringify(userData));
        } catch (error) {
            console.error(`Local Storage Writing Error ${error}`)
        }
    },[keyOfLocal, userData])

    return [userData, setUserData] as const;
}