import React from 'react'
// import type IProductData from '../../../interfaces/IProductData'
import type IProductData from '../../types/IProductData'


interface IButton {
    qtyFromParent: number,
    handleClick: (currentProduct: IProductData) => void,
    currentProduct: IProductData
}
export default function Button({qtyFromParent, handleClick, currentProduct}: IButton): React.JSX.Element {
    return (
        <button type='button' onClick={() => handleClick(currentProduct)}>add to cart
            {
                qtyFromParent > 0 &&
                <span>{qtyFromParent}</span>
            }
        </button>
    )
}

