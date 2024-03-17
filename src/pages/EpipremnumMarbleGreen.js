import './../css/App.css';
import './../css/TwoColumnLayout.css';
import './../css/PageLayout.css'
import '../css/fonts.css';

import Header from "../components/Header";
import React, {useEffect, useState} from "react";
import mqtt from "mqtt";

function EpipremnumMarbleGreen() {
    const mqttBrokerURL = 'ws://192.168.178.61:9001';
    const mqttConnectOptions = {
        username: 'isak',
        password: 'internettavting',
        clientId: 'webapp',
        clean: true,
        keepalive: 600
    };

    const [temperature, setTemperature] = useState('70 °F');
    const [capacity, setCapacity] = useState('900');

    useEffect(() => {
        const mqttClient = mqtt.connect(mqttBrokerURL, mqttConnectOptions);

        mqttClient.on('connect', () => {
            console.log('Connected to MQTT broker');
            mqttClient.subscribe("isak/plant0/temperature");
            mqttClient.subscribe("isak/plant0/capacity");
        });

        mqttClient.on('message', (topic, message) => {
            console.log('Received message: ', topic, message.toString());
            if (topic === 'isak/plant0/temperature') {
                setTemperature(message.toString());
            }
            if (topic === 'isak/plant0/capacity') {
                setCapacity(message.toString());
            }
        });
        return () => {
            mqttClient.end();
        }
    })
    return (
        <div className="App">
            <Header />
            <div>
                <h1>Epipremnum - Marble Green</h1>
            </div>
            <div className="flex-row-container">
                <div className="flex-row-item header-left">Real-time Measurements</div>
                <div className="flex-row-item header-right">Instructions</div>
                <div className="flex-row-item">
                    <h3>Temperature °F</h3>
                    <h4>Ideally between 65 and 80</h4>
                    <iframe
                        src="http://localhost:3000/d-solo/ddfxbz9kp7i0wf/isak?orgId=1&from=1710671903394&to=1710673703394&refresh=5s&theme=light&panelId=1"
                        width="450" height="200" frameBorder="0">
                    </iframe>
                </div>
                <div className="flex-row-item">
                    <h3>Moisture Sensor Capacity</h3>
                    <h4>200 (too dry) -- 2000 (too wet)</h4>
                    <p>{capacity}</p>
                </div>
                <div className="flex-row-item">
                    <h4>Keep at bright and warm places, avoid direct sunlight.</h4>
                    <h4>Water regularly, allow soil to dry out slightly between watering.</h4>
                    <h4>Use fertilizer every two weeks.</h4>
                </div>
            </div>
        </div>
    );
}

export default EpipremnumMarbleGreen;
