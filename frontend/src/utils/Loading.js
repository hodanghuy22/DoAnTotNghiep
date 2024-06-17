import React from 'react'
import logo from '../assets/images/logo_cicrle.jpg';

const Loading = () => {
    return (
        <div className="overlay">
        <div className="overlay__inner">
            <div className="overlay__content">
                <div className="spinner">
                    <img src={logo} alt=''style={{borderRadius:'30%', width:'75px'}} />
                </div>
            </div>
        </div>
    </div>
    

    )
}

export default Loading