import React from 'react'
import {Fragment} from 'react'
import {nanoid} from 'nanoid'
// import reviews from '../../ts/reviews'
// import getImage from '../../ts/helper'
import reviews from '../../../services/ts/reviews'
import getImage from '../../../utils/helper'
import useCarousel from '../../../hooks/useCarousel'
import { useGetElementWidth } from '../../../hooks/useGetElementWidth'
import useSetIndex from '../../../hooks/useSetIndex'
import usePointerCarousel from '../../../hooks/usePointerCarousel'
// Custom Hook to handle IntersectionObserver
import { useObserver } from '../../../hooks/useObserver'

export default function Reviews(): React.JSX.Element {
    const { addToSectionsRef } = useObserver();

    // Custom Hook To Handle and getElement with in different Media Queries
    const {refElementWidth, eleWidth, refContainerWidth, conWidth} = useGetElementWidth();
    // custom Hook To Handle currentIndex of review by using useState
    const {currentIndex,prevIndex, nextIndex, setCurrentIndex} = useSetIndex(reviews.length);
    // Custom Hook to Handle Carousel Buttons
    const {prevImage, nextImage} = useCarousel(reviews.length, setCurrentIndex);
    // custom Hook To Handle Pointer Event
    const {handlePointerDown} = usePointerCarousel(prevIndex, nextIndex);

    function getRating(num: number): React.JSX.Element{    
        const rates: React.JSX.Element [] = []
        for(let i: number = 0, length: number = 5; i < length; i++)
            if(i < num ) 
                rates.push(<i key={nanoid()}  className="fa-solid fa-star"></i>)
            else 
                rates.push(<i key={nanoid()}  className="fa-regular fa-star"></i>)
        return (
            <Fragment key={nanoid()}>
                    <span >{rates}</span>
            </Fragment>
        )
    }

    const addNewReview = reviews.map((review, index): React.JSX.Element => (
        <Fragment key={index}>
            <article ref={index === 0 ? refElementWidth : null}>
                <img src={getImage(review.imgSrc)} alt={`${review.reviewername} Image`} />
                <p>{review.review}</p>
                <h3>{review.reviewername}</h3>
                <p>{getRating(review.rating)}</p>
            </article>
        </Fragment>
    ))

    const translateValue: number = (-currentIndex * (eleWidth / conWidth) * 100);
    const styles = {
        transition: 'translate 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        willChange: 'translate',
        translate: `${translateValue}% 0`,
        touchAction: 'none',
    }

    return (
        <Fragment>
            <section ref={addToSectionsRef} id='review' className="reviews">
                <h2>customer's<span> review</span></h2>
                <div className="articles" style={styles} ref={refContainerWidth} onPointerDown={(e) => handlePointerDown(e)}>
                    {addNewReview}
                </div>
                <div className="buttons">
                    <button type='button' className='btn-left' onClick={(e) => prevImage(e)}><i className="fa-solid fa-angle-left fa-lg"></i></button>
                    <button type='button' className='btn-right' onClick={(e) => nextImage(e)}><i className="fa-solid fa-angle-right fa-lg"></i></button>
                </div>
            </section>
        </Fragment>
    )
}