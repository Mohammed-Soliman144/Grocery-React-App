import React from 'react'
import { Fragment } from 'react'
// import getImage from '../../ts/helper'
import getImage from '../../../utils/helper'
// import "../../css/Footer.css"
import "../../../css/Footer.css"


export default function Footer(): React.JSX.Element {
    return (
        <Fragment>
            <footer>
                <div className='header'>
                    <section className="column">
                        <h2>grocery<i className="fa-solid fa-basket-shopping"></i></h2>
                        <p className='text-center'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam.</p>
                        <ul className="social-list row">
                            <li className='social'><a href="#"><i className="fa-brands fa-facebook"></i></a></li>
                            <li className='social'><a href="#"><i className="fa-brands fa-twitter"></i></a></li>
                            <li className='social'><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
                            <li className='social'><a href="#"><i className="fa-brands fa-linkedin"></i></a></li>
                        </ul>
                    </section>
                    <section className="contact column">
                        <h2>contact info</h2>
                        <p className='column links'>
                            <span><a href="tel:+124 4567890"><i className="fa-solid fa-phone-volume"></i>+123 4567890</a></span>
                            <span><a href="tel:+124 4567890"><i className="fa-solid fa-phone-volume"></i>+124 4567890</a></span>
                            <span><a href="mailto:xyz@gmail.com"><i className="fa-solid fa-envelope"></i>xyz@gmail.com</a></span>
                            <span><a href="#"><i className="fa-solid fa-location"></i>amman, jordan</a></span>
                        </p>
                    </section>
                    <section className='quick-links column'>
                        <h2 className='heading'>quick links</h2>
                        <ul className="links column">
                            <li><a href="#home"><i className="fa-solid fa-arrow-right"></i>home</a></li>
                            <li><a href="#features"><i className="fa-solid fa-arrow-right"></i>features</a></li>
                            <li><a href="#products"><i className="fa-solid fa-arrow-right"></i>products</a></li>
                            <li><a href="#categories"><i className="fa-solid fa-arrow-right"></i>categories</a></li>
                            <li><a href="#review"><i className="fa-solid fa-arrow-right"></i>review</a></li>
                            <li><a href="#blogs"><i className="fa-solid fa-arrow-right"></i>blogs</a></li>
                        </ul>
                    </section>
                    <section className='column'>
                        <h2 className='heading'>newsletter</h2>
                        <form action="" className="subscribe row" role="subscribe" method="GET">
                            <div className='input-group'>
                                <label>
                                    subscribe for latest updates
                                </label>
                                <input type="email" placeholder='your email' className='input'/>
                            </div>
                            <button type='submit' className='subscribe-btn button-transparent'>subscribe</button>
                        </form>
                            <img src={getImage('payment.png')} alt="payment Image" />
                    </section>
                </div>
                <hr />
                <p className='text-footer'>created with love by <span>mohammed soliman</span> &copy; all copy rights reserved</p>
            </footer>
        </Fragment>
    )    
}