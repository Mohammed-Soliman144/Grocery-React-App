import React from 'react'
import {nanoid} from 'nanoid'
import { Fragment } from 'react'
// import categories from '../../ts/categories'
import categories from '../../../services/ts/categories'
// Custom Hook to handle IntersectionObserver
import { useObserver } from '../../../hooks/useObserver'
import getImage from '../../../utils/helper'


export default function Categories(): React.JSX.Element {
    const { addToSectionsRef } = useObserver();

    const addNewCategory = categories.map((cat) : React.JSX.Element => (
            <Fragment key={nanoid()}>
                <article>
                    <img src={getImage(cat.imgSrc)} alt={cat.catname} />
                    <h3>{cat.catname}</h3>
                    <p>upto {cat.discount} off</p>
                    <button className="shop-btn" type="button">shop now</button>
                </article>
            </Fragment>
        ))
    return (
        <Fragment>
            <section ref={addToSectionsRef} id='categories' className="categories">
                <h2>product<span> categories</span></h2>
                <div className="articles">
                    {addNewCategory}
                </div>
            </section>
        </Fragment>
    )
}