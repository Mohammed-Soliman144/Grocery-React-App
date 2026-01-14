import React from 'react'
import { Fragment } from 'react'
import { nanoid } from 'nanoid'
// import features from '../../ts/features'
import features from '../../../services/ts/features'
// Custom Hook to handle IntersectionObserver
import { useObserver } from '../../../hooks/useObserver'
import getImage from '../../../utils/helper'


export default function Features(): React.JSX.Element {

    const { addToSectionsRef } = useObserver();

    const addNewFeature = features.map((feature): React.JSX.Element => (
            <Fragment key={nanoid()}>
                    <article>
                        <img src={getImage(feature.imgSrc)} alt={`${feature.type} Image`} />
                        <h3>{feature.type}</h3>
                        <p>{feature.paragraph}</p>
                        <button type='button'>read more</button>
                    </article>
            </Fragment>
        )) 

    return (
        <>
            <section ref={addToSectionsRef} id='features' className="features">
                <h2>our<span className='special-component'> features</span></h2>
                <div className="articles">
                    {addNewFeature}
                </div>
            </section>
        </>
    )
}