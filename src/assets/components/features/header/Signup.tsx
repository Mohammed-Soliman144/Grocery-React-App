import React from 'react'
import {useState, useRef} from 'react'
import useShopping from '../../../hooks/useShoppingContext';
// import { Toast } from '../functions/Toast';
// import type IUserData from '../../../interfaces/IUserData';
// import type IProductData from '../../../interfaces/IProductData';
import { Toast } from '../../common/Toast';
import type IUserData from '../../../types/IUserData';
import type IProductData from '../../../types/IProductData';

export default function Signup(props: {signId: string}): React.JSX.Element {
    // React Context to handle setUserData
    const {userData, setUserData,setShowToast, 
        setToastType, setToastMsg, showToast, setIsSignin, setUserEmail, setProductQty} = useShopping();
    const [isSignup, setIsSignup] = useState<boolean>(true);
    const formRef = useRef<HTMLFormElement>(null);
    const userRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);


    // To Update Exist User SelectedProducts [] with Guest user SelectedProducts must use map (best Practice)
    const updateSelectedProducts = (currentProducts: IProductData[], guestProducts: IProductData[]): IProductData[] => {

        /* Scenarios Of Signup and Signin of users in front end App
            for two scenarios (as your review above) A and B so the below is correct 1- after guest signin i transfer selectedProducts to new user by new email then keep guest user (but remove selectedProducts from guest after transform it) 2- also when returing user at first snapshot is as guest until he is signin in this period if purchase any products when sigin in check if email exist so add new purchases to old one , new email new user remove items from guest after transform to new user is correct?
        */
        // 1- Create New Map contains key as prodId string and value as object as all product data
        const mergedProducts = new Map<string, IProductData>(
            // here map over each product then return from new array brackets [] => contains [id string as key, {object contains all data of product as value}]
            // const [a, b] = array; // here is destructuring
            // const newArray = [id: string, {name: string, age: number}]; here [] brackets as new array
            // note must use Not Null Assertion which is prodId can be string | undefined
            currentProducts.map(prod => [prod.prodId!, {...prod}])
        );

        // 2- Loop For Guest Products and check if prodId is exist inside merged map or not
        guestProducts.forEach(prod => {
            if(mergedProducts.has(prod.prodId!)) {
                const getOldQty = mergedProducts.get(prod.prodId!)?.prodQty;
                const getProductObj = mergedProducts.get(prod.prodId!);
                mergedProducts.set(prod.prodId!, {
                    ...getProductObj!,
                    prodQty: getOldQty! + prod.prodQty!,
                })
            } else {
                mergedProducts.set(prod.prodId!, {
                    ...prod,
                })
            }
        })

        return Array.from(mergedProducts.values());
    }

    function handleAuth( msgToast: string, typeToast: string, handleSignup?: boolean, handleSignin?: boolean): void {
        if(!formRef || formRef.current === null) return;
        const formData = new FormData(formRef.current);
        const allData = Object.fromEntries(formData);
        // Check If Email Exist
        const initialUserData: IUserData = {
            id: crypto.randomUUID(),
            username: (allData.username?.toString() || ""),
            pass: (allData.pass?.toString() || ""),
            email: (allData.email?.toString() || ""),
            currentVisit: new Date().toISOString(),
            lastVisit: new Date().toISOString(),
            VisitNo: 1,
            selectedProducts: userData.users?.find(user => user.email === 'guest@gmail.com')?.selectedProducts || [],
        }
        // setUserData(prevState => (
        //     {
        //         users: prevState.users.map(user => user.email !== 'guest@gmail.com'? user : {...user, selectedProducts: []})
        //     }
        // ));
        const userExist = userData.users.find(user => user.email === initialUserData.email);
        if(handleSignup){ 
            if(allData.username && allData.pass && allData.email) {
                if(!userExist) {
                    setUserData(prevState => ({
                        users: [
                            ...prevState.users,
                            {...initialUserData}
                        ]
                    }));
                    // Here Remove selectedProducts [] to empty Array after Signin
                    setUserData(prevState => (
                        {
                            users: prevState.users.map(user => user.email !== 'guest@gmail.com'? user : {...user, selectedProducts: []})
                        }
                    ));
                    setIsSignin(true);
                    setUserEmail(allData.email.toString());
                    setIsSignup(false);
                    // Fire Toast
                    setToastType(typeToast);
                    setToastMsg(msgToast);
                    setShowToast(true);
                    // Reset Form Inputs
                    formRef.current.reset();
                } else {
                    setToastType('Invalid Signup')
                    setToastMsg(`Already you have account with email ${allData.email}`);
                    setShowToast(true);
                }
            } else {
                setToastType('Invalid Signup')
                setToastMsg('please fill all fields username, password, email');
                setShowToast(true);
            }
        } else if (!handleSignup && handleSignin) {
            if(userExist?.pass === initialUserData.pass) {
                const guestProductList = userData.users.find(user => user.email === 'guest@gmail.com')?.selectedProducts;
                const userExistProductsUpdated = userData.users.find(user => user.email === initialUserData.email && user.pass === initialUserData.pass)?.selectedProducts;

                // Update Selected Products
                const mergedArray = updateSelectedProducts(userExistProductsUpdated!,guestProductList!);
    
                // use flat() to make array 2D converted to array 1D
                // which is .map() function return an array and according to below code return array inside array [{id, qty}] contains object
                // const updateQty: Array<{id: string, qty: number}> = mergedArray.map(prod => [{id: prod.prodId!, qty: prod.prodQty!}]).flat();
                
                // Perfect does not use [] and use explicit return with parenthesis ({id, qty})  
                const updateQty: Array<{id: string, qty: number}> = mergedArray.map(prod => ({id: prod.prodId!, qty: prod.prodQty!}));
                // console.log("updateQty", updateQty);

                // Update State of setProductQty for Buttons
                setProductQty(updateQty);

                setUserData(prevState => (
                    {
                        users: prevState.users.map(user => user.email !== 'guest@gmail.com'? user : {...user, selectedProducts: []})
                    }
                ));
                
                setUserData(prevState => ({
                    users: prevState.users.map(user => user.email === allData.email.toString() ? 
                        {...user, VisitNo: (user.VisitNo || 0) + 1, lastVisit: user.currentVisit, currentVisit: new Date().toISOString(), selectedProducts: [...(mergedArray || [])]} 
                        : user)
                }));

                // Here Remove selectedProducts [] to empty Array after Signin
                setUserData(prevState => (
                    {
                        users: prevState.users.map(user => user.email !== 'guest@gmail.com'? user : {...user, selectedProducts: []})
                    }
                ));
                setIsSignin(true);
                setUserEmail(allData.email.toString());
                // Fire Toast
                setToastType(typeToast);
                setToastMsg(msgToast);
                setShowToast(true);
                // Reset Form Inputs
                formRef.current.reset();
            } else {
                setToastType('Invalid Signin')
                setToastMsg('please review password, email');
                setShowToast(true);
            }
        }
        return;
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        handleAuth(isSignup? "Your are signup successfully!" : "Your are signin successfully!",isSignup? "Signup Notification" : "Signin Notification", isSignup, !isSignup);
        return;
    }

    const handleSign = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        if(!isSignup) {
            setIsSignup(true);
        } else {
            handleAuth("Your are signup successfully!","Signup Notification", true);
        }
        return;
    }

    const handleLogin = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        if(isSignup) {
            setIsSignup(false);
        } else {
            handleAuth("Your are signin successfully!","Signin Notification", false, true);
        }
        return;
    }
    
    return (
        <>
            <form ref={formRef} name='formLogin' onSubmit={(e) => handleSubmit(e)} id={props.signId} className="login" method="GET" noValidate>
                {
                    isSignup ? <h2>signup now</h2> : <h2>login now</h2>
                }
                <div className="inputs">
                    {
                        isSignup &&
                        <>
                            <label aria-label='username'></label>
                            <input ref={userRef} type="text" name='username'  id='user' placeholder='user name' required />
                        </>
                    }
                    <label aria-label='email'></label>
                    <input ref={emailRef} type="email" name='email' placeholder="Your Email" required/>
                    <label aria-label='password'></label>
                    <input ref={passRef} type="password" name='pass' placeholder="Your Password" required/>
                </div>
                <div className='info'>
                    <p>forgot your password <a href="#">click here</a></p>
                    <p>don't have an account <a href="#">create now</a></p>
                </div>
                <div className="buttons">
                    <button type='button' className={`signup-btn ${isSignup? "clicked" : ""}`}     onClick={(e) => handleSign(e)}>
                        
                        signup
                    </button>
                    <button type='button' className={`login-btn ${!isSignup? "clicked" : ""}`}      onClick={(e) => handleLogin(e)}>
                        login
                    </button>
                    <button className='sr-only' type='submit'></button>
                </div>
            </form>
            {   showToast &&
                <Toast/>
            }
        </>
    )
}