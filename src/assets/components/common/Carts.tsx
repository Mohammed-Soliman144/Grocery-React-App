import React from 'react'
import {Fragment} from 'react'
// import useShopping from '../../../hooks/useShoppingContext'
// import handleImage from '../../ts/helper'
import useShopping from '../../hooks/useShoppingContext'
import handleImage from '../../utils/helper'
import { nanoid } from 'nanoid'

export default function Carts(): React.JSX.Element {

    const {currentUser, productQty, handleRemoveProduct} = useShopping();
    const handleClick = (e:React.MouseEvent<HTMLButtonElement>, id: string):void => {
        e.preventDefault();
        handleRemoveProduct(id);
    }
    // Derived Data
    const counter = 
        currentUser.selectedProducts?.reduce((accumulator, value) => accumulator + (value.prodQty ? value.prodQty : 0) ,0) ? 
        currentUser.selectedProducts?.reduce((accumulator, value) => accumulator + (value.prodQty ? value.prodQty : 0) ,0) 
        : 0;
    const payment = currentUser.selectedProducts?.reduce((acc, val) => acc + (val.prodPrice && val.prodQty ? parseFloat(val.prodPrice.split('$')[1]) * val.prodQty : 0) , 0);
    const paymentOptions = {
        style: 'currency',
        currency: 'USD', // ISO Letter 3 digits
        currencyDisplay: 'symbol',
        minimumFractionDigits: 2,
        maximumFractionDigits: 3, 
    } as const;
    const productItems = currentUser.selectedProducts?.map((prod):React.JSX.Element => {
    const prodQty = productQty.find(prd => prd.id === prod.prodId)?.qty;
        return (
            <li key={nanoid()}>
                <figure className="img">
                    <img src={handleImage(prod.prodImg || "")} alt={prod.prodName} />
                </figure>
                <div className="text">
                    <p><strong>{prod.prodName}</strong></p>
                    <p>Price:<span>{prod.prodPrice}</span>Qty:<span>{prodQty || currentUser.selectedProducts?.find(prd => prd.prodId === prod.prodId)?.prodQty}</span></p>                    
                </div>
                <button onClick={(e) => handleClick(e, prod.prodId!)}><i className="fa-solid fa-trash fa-2xl"></i></button>
            </li>
        )
    })
    return (
        <Fragment>
            {productItems && productItems.length > 0 &&
                <section className="carts" id="cartShopping">
                    <ul>
                        {productItems}
                    </ul>
                    <p>total<span> {payment && payment > 0 && payment.toLocaleString("en-US",paymentOptions)}</span> Number of Items<span> {counter > 0 && counter}</span></p>
                    <button className="btn-checkout" type="submit" onClick={() => {console.log(productQty); }}>checkout</button>
                </section>
            }
        </Fragment>
    )
}