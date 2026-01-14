import {useContext} from 'react'
// import ShoppingContext from '../assets/components/main/ShoppingContext'
import ShoppingContext from '../components/features/main/ShoppingContext'


export default function useShopping() {
    const context = useContext(ShoppingContext);
    if(!context) throw new Error('Must use useShopping inside ShoppingContext');
    return context;
}