import React from 'react';
import './nav.css'

const Navigation = ({ onRouteChange, isSignIn }) => {
    
        if (isSignIn) {
            return (
            <nav className="ma4 link-wrapper">
                <p onClick={() => onRouteChange("signin")} className='f3 link dim black  pa3 pointer white br2 shadow-2 mr4'>Sign Out</p>
            </nav>
        );
        } else {
            return(
            <nav  className="link-wrapper">
            {/* <Logo/> */}
                <p onClick={() => onRouteChange("signin")} className='f3 link dim black  pa3 pointer white br2 shadow-2 nav-link'>Sign In</p>
                <p onClick={() => onRouteChange("register")} className='f3 link dim black  pa3 pointer white br2 shadow-2 nav-link'>Register</p>
            </nav>
            );
        }
    
}

export default Navigation;