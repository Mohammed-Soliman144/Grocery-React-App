import {createContext, useState} from 'react'
// import { dataKey, type IAppData } from '../../../interfaces/IAppData';
// import type IUserData from '../../../interfaces/IUserData';
// import type IProductData from '../../../interfaces/IProductData';
// import useLocalStorageCards from '../../../hooks/useLocalStorageCards';
// import listProducts from '../../ts/products'
import { dataKey, type IAppData } from '../../../types/IAppData';
import type IUserData from '../../../types/IUserData';
import type IProductData from '../../../types/IProductData';
import useLocalStorageCards from '../../../hooks/useLocalStorageCards';
import listProducts from '../../../services/ts/products'
import useSetIndex from '../../../hooks/useSetIndex'

interface IShoppingContext {
    updateStateData: (userInfo: IUserData, productInfo: IProductData) => void,
    handleQty: (productQty: string) => void,
    productQty: Array<{id: string, qty: number}>,
    setProductQty: React.Dispatch<React.SetStateAction<Array<{id: string, qty: number}>>>
    currentUser: IUserData,

    handleRemoveProduct: (prodId: string) => void,
    handleChangeSearch: (e:React.ChangeEvent<HTMLInputElement>) => void,
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void,
    listProducts: Array<{imgSrc: string, prodname: string, price: string, rating: number}>,
    currentIndex: number,
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>,
    prevIndex: () => void,
    nextIndex: () => void,
    toastMsg: string,
    toastType: string,
    setToastMsg: React.Dispatch<React.SetStateAction<string>>,
    setToastType: React.Dispatch<React.SetStateAction<string>>,
    showToast: boolean,
    setShowToast: React.Dispatch<React.SetStateAction<boolean>>,

    userData: IAppData,
    setUserData: React.Dispatch<React.SetStateAction<IAppData>>,

    setIsSignin: React.Dispatch<React.SetStateAction<boolean>>,
    isSignin: boolean,    

    userEmail: string,
    setUserEmail: React.Dispatch<React.SetStateAction<string>>,
}

const ShoppingContext = createContext<IShoppingContext | undefined>(undefined);

export function ShoppingProvider({children}: {children: React.ReactNode}): React.JSX.Element {
    
    /*
        -- Explanation Of Context how works deal with the whole app data
            1- at first AppData (interface) as below:
                so AppData is as object of arrays of users and each user has contains array of selected products and each one selectedProducts as object
                {
                    users: 
                        [{userId: string, email: string, selectedProducts[] }]
                }
                and selectedProducts: [
                    {
                        prodId: string,
                        orderId: string,
                        prodname: string,
                    }
                ]
            2- When User visit web site I defined user as guestUser then modify on it
            3- each user can has multiple accounts its fine which app track user based on email as unique identifier
            4- I Have one or Single Source of Truth (state => useState) as :
                const [userData, setUserData] = useState<IAppData>(keyOflocalStorage, 
                    { users: [{ id: initialUserId, username: "Guest", email: 'guest@gmail.com',selectedProducts: [] }] }
                ) // defined user as guest
            4- I have other state to track the current user based on unique email for each user
                const [userEmail, setUserEmail] = useState<string>("")
            5- I Can now modify on current user from guset mode before sign in to current user based on email after signin
            6- I Deal with Current user as Derived Data which is Global data between all layers
    */

    const guestUser: IUserData = {
        id: crypto.randomUUID(),
        username: 'Guest',
        email: 'guest@gmail.com',
        selectedProducts: []
    }

    const [userData, setUserData] = useLocalStorageCards<IAppData>(dataKey, 
        { users: [{ ...guestUser}] })

    const [productQty, setProductQty] = useState<Array<{id: string, qty: number}>>([]);
    const [userEmail, setUserEmail] = useState<string>('guest@gmail.com');
    
    // Current User is Derived Data shared between layers of context
    const currentUser: IUserData = userData.users.find(user => user.email === userEmail)!;

    const {currentIndex, prevIndex, nextIndex, setCurrentIndex} = useSetIndex(listProducts.length)
    // To Handle Item Search when user writing characters inside onChange EVent
    const [itemSearch, setItemSearch] = useState<string>("");
    // To Handle Toast Messages
    const [toastMsg, setToastMsg] = useState<string>("");
    const [toastType, setToastType] = useState<string>("");
    const [showToast, setShowToast] = useState<boolean>(false);
    const [isSignin, setIsSignin] = useState<boolean>(false);

    const handleRemoveProduct = (prodId: string): void => {
        // IAppData {users: IUserData[]} // IUserData {id, selectedProduct: IproductData[]} 
        // IproductData {prodId}
        setUserData(prevState => {
            return {...prevState, 
                users: //[...prevState.users]
                prevState.users.map(user => user.email !== currentUser?.email ? user : {...currentUser, selectedProducts: currentUser?.selectedProducts?.filter(prd => prd.prodId !== prodId)})
            }
        })
        setProductQty(prevState => prevState.map(prd => prd.id !== prodId? prd : {id: "", qty: 0}))
    }
    
    const handleQty = (prodId: string): void => {
        if(productQty.length === 0 && currentUser!.selectedProducts 
            && currentUser!.selectedProducts?.length > 0){
            const destructureArray = currentUser!.selectedProducts.map((item) => ({
                id: item.prodId ?? "",
                qty: item.prodQty ?? 0,
            }));
            setProductQty(destructureArray);
        }
        setProductQty(prevState => {
            // const isProductExist = prevState?.find(prod => prod.id === prodId);
            const isProductExist = prevState?.find(prod => prod.id === prodId);
            if(isProductExist) {
                // update CurrentProduct from currentUser by new ProductQty
                return prevState.map(prod => prod.id === prodId? {...prod, qty: prod.qty + 1} : prod);
            } else {
                // console.log('qty = 1');
                return [...(prevState || []), {id: prodId, qty: 1}]
            }
        })
    }
    // const [currentUser,setCurrentUser] = useLocalStorageCards<string>('currentUser', newUserId); 
    const updateStateData = (userInfo: IUserData, productInfo: IProductData): void => {
        // I will set setUserData by using useState
        /* Note This Interface the data of app
            all data of app (all users data inside app || IAppData as below shape)
            => is represent as Object with specific key named users and value of (key) users is Array Of objects [{}] 
            => thats mean each one user has oneObject inside this array so userInfo is object {} and each user can purchase many of products which each one user object contains array of objects from products (all purchasing)
            => thats mean each product represent as one object {} contains all data related to this product
            => the golden way state are immutable which means 
                array = [1,2,3]  => in RAM array just name points to address memory identifier 0X1000 this address in heap hold all values [1,2,3] react in fact compare address memory identifier when changed.
        */
        setUserData(prevUserData => {
            // Check if User Exist or Not Exist
            const isUserExist = prevUserData.users.some(usersData => usersData.id === userInfo.id);

            // CASE A: New User
            if(!isUserExist) {
                const newUser: IUserData = {
                    ...userInfo,
                    selectedProducts: [{...productInfo}]
                }
                return {
                    ...prevUserData,
                    users: [...prevUserData.users, newUser]
                }
            } 
            /* 
            // CASE B: if User is Exist there are two probilities if has old purchasing or is first time 

            // CASE B1: if User is Exist there are two probilities if the product id with same order id so update this product (suppose the user has old puchase)
            // CASE B2: if user is exist the product id with new order id added to old purchasing products (suppose the user has old puchase)
            // note in both CASE B1 and CASE B2 suppose that the user has old purchasing and return its
            // why suppose in both CASE B1 and CASE B2 the user has old puchasing to simplify the logic which this problem has other solution which can check if user has purchasing before (selectedProducts) as array if length === 0 so this product represent as first purchase process and second case if (selectedProducts) as array if length > 0 so this user has old purchasing process in this situation has also two probilities if the product with order id is exist in old purchasing (so update product id) if not exist add new product to old purchasing
            */
            // CASE B: Exist User
            const existUser = prevUserData.users.map(user => {
                // The Below check to confirm if new user return it 
                if(user.id !== userInfo.id) return user;

                // So all below code if user is already exist or previous user
                // Check if the product is exist
                const isProductExist = user.selectedProducts?.some(prod => prod.orderId === productInfo.orderId);

                // CASE B1: Exist User + New Product [note can has old products (purchases) but new product id different from them]
                if(!isProductExist) {
                    return {
                        ...user,
                        selectedProducts: [...(user.selectedProducts || []), {...productInfo, prodQty: 1}]
                    }
                }

                // CASE B2: So all below Code only if Exist User + the same product id need to update
                // Get Update Product

                const updateProduct = user.selectedProducts!.map(product => product.orderId === productInfo.orderId ?
                    {...product, ...productInfo, prodQty: productInfo.prodQty! + 1 }: product
                );
                // console.log(updateProduct)
                // console.log(productInfo)
                // console.log(productQty)
                // console.log(user.selectedProducts)

                // So Return Exist user with update product
                return {
                    ...user,
                    selectedProducts: updateProduct, // updateProduct is oldProduct + update product = its equals selectedProducts [{}] as array of object
                }
            })

            // Only has one also return all previous user Data + exist user
            return {
                ...prevUserData,
                users: existUser, // note also exist user has all data of old user + exist user that is update of products
            }

        })
    }

    const handleChangeSearch = (e:React.ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault();
        const ItemString = e.currentTarget.value.toLowerCase();
        setItemSearch(ItemString);
        return;
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if(e.key === 'Enter'){
            e.preventDefault();
            setCurrentIndex(prevIndex => {
                const resultIndex = listProducts.findIndex(prod => prod.prodname.includes(itemSearch));
                prevIndex =  resultIndex !== -1 ? resultIndex : prevIndex;
                return prevIndex;
            });
        }
        return;
    }
    // console.log(updateStateData);
    // console.log(userData);
    
    return (
        <ShoppingContext.Provider value = {{updateStateData, currentUser, productQty, setProductQty, handleQty, handleRemoveProduct, handleChangeSearch, handleKeyDown, listProducts, currentIndex, setCurrentIndex, prevIndex, nextIndex, toastMsg, toastType, setToastMsg, setToastType, showToast, setShowToast, setUserData, setIsSignin, setUserEmail, userEmail,
        isSignin, userData}}>
            {children}
        </ShoppingContext.Provider>
    )
}


export default ShoppingContext;
