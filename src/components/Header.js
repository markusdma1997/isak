import React from 'react';
import Button from 'react-bootstrap/Button'
import '../css/App.css';
import '../css/Button.css'
import {Link} from "react-router-dom";

function Header() {
    return (
        <div className="App">
            <header className="App-header">
                Isak - House plant condition monitoring
            </header>
            <div className="btn">
                <Link to="/">
                    <Button className="btn-lg green">Home</Button>
                </Link>
                <Link to="/EpipremnumMarbleGreen">
                    <Button className="btn-lg red">Epipremnum - Marble Green</Button>
                </Link>
                <Link to="/PhilodendronPVerrucosum">
                    <Button className="btn-lg blue">Philodendron - P. Verrucosum</Button>
                </Link>
            </div>
        </div>
    );
}

export default Header;