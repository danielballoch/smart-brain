import React from 'react';
import RightNav from './RightNav'
import Logo from '../Logo/Logo';
import './nav.css'

const Navigation = ({ onRouteChange, isSignIn }) => {
    return (
        <div className="wrapper">
        <Logo/>
        <RightNav onRouteChange={onRouteChange} isSignIn={isSignIn}/> 
        </div>
    )
}

export default Navigation;