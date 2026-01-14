import React from 'react'
import {Fragment} from 'react'
import {useState, useRef, useEffect} from 'react'
import Signup from './Signup'
// import '../../css/Header.css'
import '../../../css/Header.css'
// import Carts from '../functions/Carts'
import Carts from '../../common/Carts'
import useShopping from '../../../hooks/useShoppingContext'
import {NavLink} from 'react-router'

// import { nanoid } from 'nanoid'

export default function Header(): React.JSX.Element {

    const {currentUser, handleChangeSearch, handleKeyDown, isSignin} = useShopping();
    const [isOpenned, setIsOpenned] = useState<Array<{btnName: string, btnState: boolean}>>([]); 
    const targetDropId = useRef<string>("");
    const targetSearchId = useRef<string>("");
    const targetSignId = useRef<string>("");
    const targetCartId = useRef<string>("");
    // Derived Value
    const badgeCounter = 
        currentUser.selectedProducts?.reduce((accumulator, value) => accumulator + (value.prodQty ? value.prodQty : 0) ,0) ? 
        currentUser.selectedProducts?.reduce((accumulator, value) => accumulator + (value.prodQty ? value.prodQty : 0) ,0) 
        : 0;

    const handleDrop =  (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const btnname = event.currentTarget.name;
        if(targetDropId && targetDropId.current !== null)
            targetDropId.current = event.currentTarget.dataset.toggleList ?? "";

        setIsOpenned(oldState => {
            const isExist = oldState.some(btn => btn.btnName === btnname);
            oldState = oldState.map(btn => btn.btnName !== btnname && btn.btnState === true ? 
                    {...btn, btnState: !btn.btnState} : btn)
            // console.log(oldState);
            if(!isExist)
                // return [...oldState, {btnName: btnname, btnState: true}]
                return [...oldState, {btnName: btnname, btnState: true}]
            else
                return oldState.map(btn => btn.btnName === btnname ? {...btn, btnState: !btn.btnState} :  btn)
        });
        return;
    }
    
    const handleSearch =  (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const btnname = event.currentTarget.name;
        if(targetSearchId && targetSearchId.current !== null)
            targetSearchId.current = event.currentTarget.dataset.search ?? "";

        setIsOpenned(oldState => {
            const isExist = oldState.some(btn => btn.btnName === btnname);
            oldState = oldState.map(btn => btn.btnName !== btnname && btn.btnState === true ? 
                    {...btn, btnState: !btn.btnState} : btn)
            // console.log(oldState);
            if(!isExist) 
                // return [...oldState, {btnName: btnname, btnState: true}]
                return [...oldState, {btnName: btnname, btnState: true}]
            else
                return oldState.map(btn => btn.btnName === btnname ? {...btn, btnState: !btn.btnState} :  btn)
        });
        return;
    }

    const handleSignup =  (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const btnname = event.currentTarget.name;
        if(targetSignId && targetSignId.current !== null)
            targetSignId.current = event.currentTarget.dataset.signForm ?? "";

        setIsOpenned(oldState => {
            const isExist = oldState.some(btn => btn.btnName === btnname);
            oldState = oldState.map(btn => btn.btnName !== btnname && btn.btnState === true ? 
                    {...btn, btnState: !btn.btnState} : btn)
            // console.log(oldState);
            if(!isExist) 
                // return [...oldState, {btnName: btnname, btnState: true}]
                return [...oldState, {btnName: btnname, btnState: true}]
            else
                return oldState.map(btn => btn.btnName === btnname ? {...btn, btnState: !btn.btnState} :  btn)
        });
        return;
    }

    const handleCartShopping = (e: React.MouseEvent<HTMLButtonElement>):void => {
        e.preventDefault();
        const btnname = e.currentTarget.name;
        if(targetCartId && targetCartId.current !== null)
            targetCartId.current = e.currentTarget.dataset.cartShopping ?? "";

        setIsOpenned(oldState => {
            const isExist = oldState.some(btn => btn.btnName === btnname);
            oldState = oldState.map(btn => btn.btnName !== btnname && btn.btnState === true ? 
                    {...btn, btnState: !btn.btnState} : btn)
            // console.log(oldState);
            if(!isExist) 
                // return [...oldState, {btnName: btnname, btnState: true}]
                return [...oldState, {btnName: btnname, btnState: true}]
            else
                return oldState.map(btn => btn.btnName === btnname ? {...btn, btnState: !btn.btnState} :  btn)
        });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        return;
    }

    
    // Drived Values
    const showDropdown = isOpenned.some(btn => btn.btnName === 'dropdownBtn' && btn.btnState === true ? true : false);
    const showSearch = isOpenned.some(btn => btn.btnName === 'searchBtn' && btn.btnState === true ? true : false);
    const showSign = isOpenned.some(btn => btn.btnName === 'userBtn' && btn.btnState === true ? true : false);
    const showCart = isOpenned.some(btn => btn.btnName === 'cartBtn' && btn.btnState === true ? true : false);

    // console.log(isOpenned);

    useEffect(()=> {
        if(targetDropId && targetDropId.current !== null)
            document.getElementById(`${targetDropId.current}`)?.classList.toggle('openned');
        if(targetSearchId && targetSearchId.current !== null)
            document.getElementById(`${targetSearchId.current}`)?.classList.toggle('openned');
        if(targetSignId && targetSignId.current !== null)
            document.getElementById(`${targetSignId.current}`)?.classList.toggle('openned');
        if(targetSignId && targetSignId.current !== null)
            document.getElementById(`${targetCartId.current}`)?.classList.toggle('openned');
    },[showDropdown, showSearch, showSign, showCart])
    

    // console.log(isOpenned);
    // console.log(showDropdown);
    return (
        <Fragment>
            <header className="main-header row">
                <div className="container">
                    <nav>
                        <a href="" className="nav-brand"><i className="fa-solid fa-basket-shopping fa-lg"></i>grocery</a>
                        <ul className='dropdown-menu'>
                            <li><NavLink to='#home'>home</NavLink></li>
                            <li><NavLink to='#features'>features</NavLink></li>
                            <li><NavLink to='#products'>products</NavLink></li>
                            <li><NavLink to='#categories'>categories</NavLink></li>
                            <li><NavLink to='#review'>review</NavLink></li>
                            <li><NavLink to='#blogs'>blogs</NavLink></li>
                        </ul>
                        <div className="buttons">
                            <button type='button' name='dropdownBtn' data-toggle-list="dropdownMenu" onClick={(e) => handleDrop(e)}  className='navbar-toggler-icon' aria-label='toggler button'>
                                <i className="fa-solid fa-bars"></i>
                            </button>
                            <button type='button' onClick={(e) => handleSearch(e)}  data-search='searchInput' aria-label='search button' name='searchBtn' className="search-btn">
                                <i className="fa-solid fa-search fa-lg"></i>
                            </button>
                            {/* console.log(currentUser); */}
                            <button className="cart"  type='button' data-cart-shopping='cartShopping' onClick={(e) => {handleCartShopping(e);}} aria-label='basket of purchasing button' name='cartBtn'>
                                <i className="fa-solid fa-cart-shopping"></i>
                                {   badgeCounter > 0 &&
                                    <span className='badge'>{badgeCounter}+</span>
                                }
                            </button>
                            <button className="userBtn" onClick={(e) => handleSignup(e)} type='button' aria-label='sign up' name='userBtn' data-sign-form="signUpForm">
                                {
                                    !isSignin ? 
                                        <i className="fa-solid fa-user fa-lg"></i>
                                        :
                                        <i 
                                        className="fa-solid fa-user-check fa-lg"
                                        style={{color: '#32de84'}}
                                        ></i>
                                }
                            </button>
                        </div>
                        {showSearch && 
                            <form action="GET" onSubmit={(e) => handleSubmit(e)} id='searchInput' className="search" role="search">
                                <div className="search-input">
                                    <label aria-label='search label' htmlFor='search-input'></label>
                                    <input className='invisible' onChange={(e) => handleChangeSearch(e)} onKeyDown={(e) => handleKeyDown(e)}  type="search" placeholder='search here ...' aria-label="search input" name='inputSearch'/>
                                    <i className="fa-solid fa-search fa-lg"></i>
                                </div>
                            </form>
                        }
                    </nav>
                    { showDropdown &&
                        <div className="dropdown-list">
                            <ul id='dropdownMenu' className='dropdown-menu'>
                                <li><NavLink to='#home'>home</NavLink></li>
                                <li><NavLink to='#features'>features</NavLink></li>
                                <li><NavLink to='#products'>products</NavLink></li>
                                <li><NavLink to='#categories'>categories</NavLink></li>
                                <li><NavLink to='#review'>review</NavLink></li>
                                <li><NavLink to='#blogs'>blogs</NavLink></li>
                            </ul>
                        </div>
                    }

                    {   !isSignin && showSign &&
                        <>
                            <Signup  signId='signUpForm'/>
                        </>
                    }
                    {
                        showCart &&
                        <Carts />
                    }
                </div>
            </header>
        </Fragment>
    )
}