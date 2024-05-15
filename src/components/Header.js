import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
    const [menuActive, setMenuActive] = useState(false);

    return (
        <header className="header">
            <Link to="/" onClick={() => setMenuActive(false)}>
                <img src="/logo_film.png" alt="Film Logo" style={{ height: '100px' }} />
            </Link>
            <div className="menu-toggle" onClick={() => setMenuActive(!menuActive)}>&#9776;</div>
            <nav>
                <ul className={`nav-links ${menuActive ? 'active' : ''}`}>
                    <li><Link to="/" onClick={() => setMenuActive(false)}>Inicio</Link></li>
                    <li><Link to="/movies" onClick={() => setMenuActive(false)}>Ver Películas</Link></li>
                    <li><Link to="/add" onClick={() => setMenuActive(false)}>Añadir Película</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
