import './../css/App.css';
import './../css/TwoColumnLayout.css';
import './../css/PageLayout.css'
import '../css/fonts.css';

import Header from "../components/Header";
import React from "react";

function PhilodendronPVerrucosum() {
    return (
        <div className="App">
            <Header />
            <div>
                <h1>Philodendron - P. Verrucosum</h1>
            </div>
            <div className="flex-row-container">
                <div className="flex-row-item header-left">Real-time Measurements</div>
                <div className="flex-row-item header-right">Instructions</div>
                <div className="flex-row-item">
                    <h3>Temperature °F</h3>
                    <h4>Ideally between 65 and 80</h4>
                    <iframe
                        src="http://localhost:3000/d-solo/ddfxbz9kp7i0wf/isak?orgId=1&from=now-15m&to=now&refresh=10s&theme=light&panelId=3"
                        width="450" height="200" frameBorder="0">
                    </iframe>
                </div>
                <div className="flex-row-item">
                    <h3>Moisture Sensor Capacity</h3>
                    <h4>200 (too dry) -- 2000 (too wet)</h4>
                    <iframe
                        src="http://localhost:3000/d-solo/ddfxbz9kp7i0wf/isak?orgId=1&from=now-15m&to=now&refresh=10s&theme=light&panelId=4"
                        width="450" height="200" frameBorder="0">
                    </iframe>
                </div>
                <div className="flex-row-item">
                    <h4>It is a tropical plant.</h4>
                    <h4>Keep at warm and humid condition with adequate light.</h4>
                </div>
            </div>
        </div>
    );
}

export default PhilodendronPVerrucosum;

