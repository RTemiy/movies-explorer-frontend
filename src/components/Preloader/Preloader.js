import React from 'react'
import './Preloader.css'

export default function Preloader ({isLoading}) {
    return (
        <div className={isLoading ? 'preloader' : 'disabled'}>
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
    )
};