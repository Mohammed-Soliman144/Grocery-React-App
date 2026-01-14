// import useFingers from '../../../hooks/useFingers'
// import { nanoid } from 'nanoid'
import React from 'react'
import {Fragment} from 'react'
import {useRef, useState, useLayoutEffect} from 'react'
// import listProducts from '../../ts/products'
import useCarousel from '../../../hooks/useCarousel'
import usePointerCarousel from '../../../hooks/usePointerCarousel'
// import useSetIndex from '../../../hooks/useSetIndex'
// import type IProductData from '../../../interfaces/IProductData'
// import type IUserData from '../../../interfaces/IUserData'
import type IProductData from '../../../types/IProductData'
import type IUserData from '../../../types/IUserData'
// Custom Hook to handle IntersectionObserver
import { useObserver } from '../../../hooks/useObserver'
import useShopping from '../../../hooks/useShoppingContext'
import getImage from '../../../utils/helper'


// Interface to define props that received Products Component from parent MainContent
interface IProducts {
    handleData: (curUser: IUserData ,curProd: IProductData) => void,
    handleQty: (prodId: string) => void,
    AddButton: React.ComponentType<{currentProduct: IProductData, qtyFromParent: number, handleClick:(currentProduct: IProductData) => void }>,
    getQty: {id: string, qty: number}[],
    curUser: IUserData,
}



export default function Products({handleData, handleQty, AddButton, getQty, curUser}: IProducts):React.JSX.Element {    
    // Custom Hook to handle IntersectionObserver
    const { addToSectionsRef } = useObserver();

    // Make React Context handle all listProducts and Custom Hook To handle update Index of Image 
    // Then Passing listProducts and Custom Hook as props
    const {currentIndex, prevIndex, nextIndex, setCurrentIndex, listProducts} = useShopping();


    // Custom Hook to handle gestures of touch event in mobileScreen
    // const {currentImgIndex,handleTouchStart, handleTouchEnd} = useFingers(listProducts.length);
        
    // Custom Hook To handle update Index of Image 
    // const {currentIndex, prevIndex, nextIndex, setCurrentIndex} = useSetIndex(listProducts.length);

    // Custom Hook to handle simulate carousel with buttons
    const {prevImage, nextImage } = useCarousel(listProducts.length, setCurrentIndex);
    
    // Custom Hook to handle Pointer Event
    const {handlePointerDown} = usePointerCarousel(prevIndex, nextIndex);

    // To make ID of Article to get width by using useLayoutEffect
    const articleRef = useRef<HTMLElement>(null);
    // To make ID of Container to get width by using useLayoutEffect
    const containerRef = useRef<HTMLDivElement>(null);
    // To Get With of article syncrohous by using useLayoutEffect
    const [articleWidth, setArticleWidth] = useState<number>(0);
    // To Get With of container syncrohous by using useLayoutEffect
    const [containerWidth, setContainerWidth] = useState<number>(0);



    // <i class="fa-regular fa-star"></i>
    function rating(num: number): React.JSX.Element {
        const stars: React.JSX.Element [] = [];
        for(let i: number = 0, length: number = 5; i < length; i++)
            if(i < num ) 
                stars.push(<i key={i} className="fa-solid fa-star"></i>)
            else 
                stars.push(<i key={i} className="fa-regular fa-star"></i>)
        return (<span>{stars}</span>)
    }


    // useLayoutEffect for synchrous events like get current width or position of element
    useLayoutEffect(() => {
        if(articleRef.current === null || containerRef.current === null) return;

        // Note One Observer is better than two observers
        const observer = new ResizeObserver((entries) => {
            for(const entry of entries) {
                
                // Note borderBoxSize[0].inlineSize or blockSize is supported now on all devices
                // Now Safety use is borderBoxSize[0].inlineSize on all devices  
                // BorderBoxSize = element width + padding + border
                // To get margin use getComputedStyle(element.id).marginLeft return string must convert to number or integer
                const marginLeft = parseFloat(getComputedStyle(entry.target).marginLeft);
                const marginRight = parseFloat(getComputedStyle(entry.target).marginRight);
                const width = entry.borderBoxSize[0].inlineSize + marginLeft + marginRight;
                
                if(entry.target === articleRef.current) {
                    // useState here to get with of articele
                    // width entry.borderBoxSize[0].inlineSize
                    // height entry.borderBoxSize[0].blockSize 
                    setArticleWidth(width);
                } else if (entry.target === containerRef.current) {
                    // useState here to get with of articele
                    // width entry.borderBoxSize[0].inlineSize
                    // height entry.borderBoxSize[0].blockSize
                    setContainerWidth(width);
                }
            }
        })
        
        observer.observe(articleRef.current);
        observer.observe(containerRef.current);

        return () => {
            // for more performance use observer.disconnect
            observer.disconnect();
        }

    }, [])

    // To Avoid Not a Number NAN  
    const translateValue = containerWidth > 0  ? ( - currentIndex  * (articleWidth / containerWidth) * 100) : 0;


    // console.log("art width",articleWidth);
    // console.log("con width",containerWidth);
    const styles: React.CSSProperties = {
        transition: 'translate 0.4s ease-in-out',
        willChange: 'translate',
        translate: `${translateValue}% 0`,
        touchAction: 'none',
    }
    
    const addNewProduct = listProducts.map((product, index): React.JSX.Element => {  
        
        const prdQty = getQty.find(prod => prod.id === index.toString())?.qty;
        // Derived Values from Products to get Current Product
        // console.log(prdQty);
        const currentProduct: IProductData = {
            orderId: index.toString(),
            prodName: product.prodname,
            prodImg: product.imgSrc,
            prodPrice: product.price,
            prodId: index.toString(),
            prodQty: prdQty,
            purchaseDate: new Date().toLocaleDateString() + " - " + new Date().toLocaleTimeString(),
        }
        // console.log(prdQty);
        // console.log(currentProduct.prodQty);
        
        // const handleQty = (currentProduct: IProductData) =>{
        //     return setProductQty(currentProduct);
        // }
        return (
            <Fragment key={index}>
                <article ref={index === 0 ? articleRef : null}>
                    <img src={getImage(product.imgSrc)} alt={product.prodname} />
                    <h3>{product.prodname}</h3>
                    <p>
                        <span>{product.price}</span>
                        {rating(product.rating)}
                    </p>
                    <div className="cart">
                        <AddButton currentProduct={currentProduct} handleClick={(prod) => {handleQty(index.toString()); handleData(curUser, prod);}} qtyFromParent={prdQty || 0}/>
                    </div>
                </article>
            </Fragment>
        )
    })
    
    return (
        <Fragment>
            <section ref={addToSectionsRef} id='products' className="products">
                <h2>our<span> products</span></h2>
                <div className="articles" ref={containerRef} style={styles} 
                    onPointerDown={(e) => handlePointerDown(e)}> 
                    {addNewProduct}
                </div>
                <div className="buttons">
                    <button name='btnLeft' onClick={(e) => prevImage(e)} type='button' className='btn-left'><i className="fa-solid fa-angle-left fa-lg"></i></button>
                    <button name='btnRight' onClick={(e) => nextImage(e)}  type='button' className='btn-right'><i className="fa-solid fa-angle-right fa-lg"></i></button>
                </div>
            </section>
        </Fragment>
    )
}