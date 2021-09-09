import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { scrolling } from '../helpers/helpers'
import './nav.css'
const Nav = () => {
    return (
        <div className="nav">
            <Link to="/">
                <img className="logo" src="https://www.logo.wine/a/logo/Netflix/Netflix-Logo.wine.svg" alt="Netflix Logo" />
            </Link>
            <ul className="navbar">
                <li className="nav-item">
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="#" className="nav-link">Login</Link>
                </li>
            </ul>
        </div>
    )
}

export default Nav
