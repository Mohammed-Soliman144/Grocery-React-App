import React from 'react'
import {Fragment} from 'react'
import Products from './Products'
import Reviews from './Reviews'
import Features from './Features'
import Categories from './Categories'
import Hero from './Hero'
import Blogs from './Blogs'
// import Button from '../functions/Button'
import Button from '../../common/Button'
import useShopping from '../../../hooks/useShoppingContext'


export default function MainContent(): React.JSX.Element {

    const {updateStateData, productQty, currentUser, handleQty} = useShopping();

    return (
        <Fragment >
            <Hero />
            <Features />
            <Products  
                AddButton={Button} 
                handleData={updateStateData} 
                handleQty={handleQty}
                getQty={productQty}  
                curUser={currentUser} 
            />
            <Categories />
            <Reviews />
            <Blogs />
        </Fragment>
    )
}