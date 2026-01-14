import React from 'react'
import { Fragment } from 'react'
import {nanoid} from 'nanoid'
// import blogs from '../../ts/blogs'
// import getImage from '../../ts/helper'
import blogs from '../../../services/ts/blogs'
import getImage from '../../../utils/helper'
// Custom Hook to handle IntersectionObserver
import { useObserver } from '../../../hooks/useObserver'

export default function Blogs(): React.JSX.Element {
    const { addToSectionsRef } = useObserver();

    const addNewBlog = blogs.map((blog):React.JSX.Element => (
        <Fragment key={nanoid()}>
            <article>
                <img src={getImage(blog.imgSrc)} alt={`${blog.title} Image`} />
                <p>
                    <span><i className="fa-solid fa-user"></i>{blog.writeBy}</span>
                    <span><i className="fa-solid fa-calendar"></i>{blog.date}</span>
                </p>
                    <hr />
                    <h3>{blog.title}</h3>
                    <p>{blog.review}</p>
                    <button className="blog-btn" type="button">read more</button>
            </article>
        </Fragment>
    ))

    return (
        <Fragment>
            <section ref={addToSectionsRef} id='blogs' className="blogs">
                <h2>our <span>blogs</span></h2>
                <div className="articles">
                    {addNewBlog}
                </div>
            </section>
        </Fragment>
    )
}