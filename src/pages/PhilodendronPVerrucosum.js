import './../css/App.css';
import './../css/TwoColumnLayout.css';
import './../css/fonts.css';
import Header from "../components/Header";
import React, {useEffect, useState} from "react";
import mqtt from "mqtt";

function PhilodendronPVerrucosum() {
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
                <h1>Philodendron - P. Verrucosum</h1>
            </div>
            <div>
                <h3>Current measurements:</h3>
            </div>
            <div className="two-column-layout">
                <div className="column">
                    <h3>Temperature °F</h3>
                    <h4>Ideally between 65 and 80</h4>
                    <p>{temperature}</p>
                </div>
                <div className="column">
                    <h3>Moisture Sensor Capacity</h3>
                    <h4>200 (too dry) -- 2000 (too wet)</h4>
                    <p>{capacity}</p>
                </div>
            </div>
            <div>
                <h3>Instructions:</h3>
                <h3>It is a tropical plant.</h3>
                <h3>Keep at warm and humid condition with adequate light.</h3>
            </div>
        </div>
    );
}

export default PhilodendronPVerrucosum;
