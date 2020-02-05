import React from 'react';
import Tilt from 'react-tilt'
import brain from './brain-64.png'
import './Logo.css'
 


const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 25, reverse: true}} style={{ height: 150, width: 150 }} >
            <div className="Tilt-inner pa3"><span className="helper"></span><img src={brain} alt='smartbrain logo'/> </div>
            </Tilt>
        </div>
    );
}

export default Logo;