import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '../../Assets/Image/logo.png'
import './Navbar.css'
import { useLocation } from 'react-router-dom'
import { auth } from '../../Firebase/Firebase.init'
import { onAuthStateChanged } from 'firebase/auth'

const Navbar = () => {
    const { pathname } = useLocation()
    const [user, setUser] = useState({})
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
                setUser({})
            }
        })
    }, [])

    return (
        <nav
            style={
                pathname.includes('blog')
                    ? { display: 'none' }
                    : { display: 'flex' }
            }
        >
            <div className="logo-container">
                <img src={Logo} alt="" />
            </div>
            <div className="link-container">
                <NavLink
                    className={({ isActive }) =>
                        isActive ? 'active-link' : 'link'
                    }
                    to="/"
                >
                    Home
                </NavLink>
                <NavLink
                    className={({ isActive }) =>
                        isActive ? 'active-link' : 'link'
                    }
                    to="/videos"
                >
                    Videos
                </NavLink>
                <NavLink
                    className={({ isActive }) =>
                        isActive ? 'active-link' : 'link'
                    }
                    to="/login"
                >
                    {!user ? (
                        'Log in'
                    ) : (
                        <button className="logout-button">Log Out</button>
                    )}
                </NavLink>
            </div>
        </nav>
    )
}

export default Navbar
