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
        </div>
    )
}

export default Nav
