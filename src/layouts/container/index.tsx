import React, { useState } from 'react'
import './style.css'
import { Outlet, useNavigate } from 'react-router-dom'
import Header from 'layouts/header'
import Footer from 'layouts/footer'
import Menu from 'components/menu'

export default function Container() {
    const [menuVisible, setMenuVisible] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const handleSelectFile = (filePath: string) => {
        navigate(`/post/${filePath}`);
        setMenuVisible(false);
    };

    return (
        <div className="container">
            <Header onMenuToggle={toggleMenu} />
            <div className="content">
                <Outlet />
            </div>
            <Footer />
            <Menu visible={menuVisible} onClose={toggleMenu} onSelectFile={handleSelectFile} />
        </div>
    )
}
