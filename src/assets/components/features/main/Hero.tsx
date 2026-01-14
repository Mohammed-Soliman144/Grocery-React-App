import React from 'react'
// import getImage from '../../ts/helper'
import getImage from '../../../utils/helper'
// Custom Hook to handle IntersectionObserver
import { useObserver } from '../../../hooks/useObserver'

export default function Hero(): React.JSX.Element {
    console.log(getImage("banner-bg.webp"));
    const { addToSectionsRef } = useObserver();
    return (
        <>
            <section ref={addToSectionsRef} id='home' className="hero">
                <img src={getImage("banner-bg.webp")} alt="Fruits Background Image"/>
                <article>
                    <h1>fresh and <span>organic</span> product for your</h1>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis sed voluptates debitis ea architecto qui.</p>
                    <button className="shop-btn" type="button" aria-label='shop button'>shop now</button>
                </article>
            </section>
        </>
    )
}