import React from 'react'
import {useState, useEffect} from 'react'
// import useShopping from '../../../hooks/useShoppingContext';
import useShopping from '../../hooks/useShoppingContext';

export function Toast():React.JSX.Element {
    const {toastMsg, toastType, setShowToast, showToast} = useShopping();
    const [isClosed, setIsClosed] = useState<boolean>(false);
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>):void => {
        e.preventDefault();
        setIsClosed(true);
        return;
    }

    useEffect(() => {
        if(showToast){
            setTimeout(() => {
                setShowToast(false)
            }, 3000)
        }
    }, [showToast, setShowToast])

    return (
        <>
            <div className={`toast ${isClosed ? "closed" : ""}`}>
                <div>
                    <h5><i className="fa-solid fa-bell fa-lg"></i>{toastType && toastType}</h5>
                    <button type='button' className='close-btn' onClick={(e) => handleClick(e)}><i className="fa-solid fa-close"></i></button>
                </div>
                <p className='message'>{toastMsg && toastMsg}</p>
            </div>
        </>
    )
}