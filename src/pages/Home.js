import './../css/App.css';
import './../css/fonts.css';
import React from 'react';

import Header from './../components/Header'

function Home() {
    return (
        <div className="App">
            <Header />
            <br />
            <br />
            <h1>
                House plant condition monitoring IoT system
            </h1>
            <br />
            <br />
            <br />
            <h2>
                Isak is currently taking care of
            </h2>
            <h4>
                Epipremnum - Marble Green
            </h4>
            <h4>
                Philodendron - P. Verrucosum
            </h4>
        </div>
    );
}

export default Home;
