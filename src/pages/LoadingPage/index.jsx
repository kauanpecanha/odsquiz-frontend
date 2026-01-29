import React from "react";
import odsquizlogo from '../../assets/hack2030.png'
import './style.css'

import sdgCircle from '../../assets/sdgCircle.png'

const LoadingPage = () => {
    return(
        <div className="Loading">
            <div className="home-column img-column">
                <img  className='logo-center-rotating' src={odsquizlogo} alt="" />
                <img src={sdgCircle} className='rotating' alt="" />
            </div>
            <p className="text">Carregando...</p>
        </div>
    )
}

export default LoadingPage