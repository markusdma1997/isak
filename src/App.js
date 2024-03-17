import './css/App.css';
import './css/fonts.css';
import './css/TwoColumnLayout.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import mqtt from 'mqtt';
import Home from './pages/Home';
import EpipremnumMarbleGreen from './pages/EpipremnumMarbleGreen';
import PhilodendronPVerrucosum from './pages/PhilodendronPVerrucosum';
import axios from "axios";

const backendUrl = 'http://localhost:8000';
const mqttBrokerURL = 'ws://192.168.178.61:9001';
const mqttConnectOptions = {
    username: 'isak',
    password: 'internettavting',
    clientId: 'webapp',
    clean: true,
    keepalive: 600
};

let realtimeMeasurement;
let temperature;
let capacity;

function App() {
    useEffect(() => {
        const mqttClient = mqtt.connect(mqttBrokerURL, mqttConnectOptions);
        mqttClient.on('connect', () => {
            console.log('Connected to MQTT broker');
            mqttClient.subscribe("isak/plant0/measurement");
        });

        mqttClient.on('message', (topic, message) => {
            console.log('Received message: ', topic, message.toString());
            if (topic === 'isak/plant0/measurement') {
                realtimeMeasurement = message.toString();
                temperature = realtimeMeasurement.substring(0, realtimeMeasurement.indexOf('-'));
                capacity = realtimeMeasurement.substring(realtimeMeasurement.indexOf('-') + 1);

                axios.post(backendUrl + '/api/write-to-table', {
                    data: {
                        Temperature: temperature,
                        Capacity: capacity
                    }
                })
                    .then(response => {
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        });

        mqttClient.on('error', (error) => {
            console.error('MQTT client error:', error);
        });
    });

  return (
      <Router>
          <div>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/EpipremnumMarbleGreen" element={<EpipremnumMarbleGreen />} />
                  <Route path="/PhilodendronPVerrucosum" element={<PhilodendronPVerrucosum />} />
              </Routes>
          </div>
      </Router>
  );
}

export default App;
