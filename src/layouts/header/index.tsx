import React from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom';
import { MAIN_PATH } from 'constant';

export default function Header() {
    const navigate = useNavigate();

    const onLogoClickHandler = () => {
        navigate(MAIN_PATH());
    }
    
    return (
        <div>
            <div className='header-behind' />
            <header className='header'>
                <div className="logo" onClick={onLogoClickHandler}>
                    <strong>Gihwan'</strong>s Code Chronicles
                </div>
                <div className='menu'>
                    <div className='header-icon-button'>
                        <div className='icon menu-icon'></div>
                    </div>
                </div>
            </header>
        </div>
    );
}