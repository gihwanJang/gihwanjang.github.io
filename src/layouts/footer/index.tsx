import React from 'react'
import './style.css'

export default function Footer() {

    const onGitIconButtonClickHandler = () => {
        window.open('https://github.com/gihwanJang');
    };

    return (
        <div id='footer'>
            <div className='footer-container'>
                <div className='footer-top'>
                    <div className='footer-logo-box'>
                        <div className='icon-box'>
                            <div className='icon git-icon'></div>
                        </div>
                        <div className='footer-logo-text'>{`Github Pages`}</div>
                    </div>
                    <div className='footer-link-box'>
                        <div className='footer-email-link'>{`gihwan319@gmail.com`}</div>
                        <div className='icon-button' onClick={onGitIconButtonClickHandler}>
                            <div className='icon git-icon'></div>
                        </div>
                        <div></div>
                    </div>
                </div>
                <div className='footer-bottom'>
                    <div className='footer-copyright'>{`Copyright © 2024 JangGiHwan`}</div>
                </div>
            </div>
        </div>
    )
}