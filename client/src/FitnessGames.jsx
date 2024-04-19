import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

function FitnessGames() {
    return (
        <Container>
            <div>
                <h1>Fitness Games</h1>
            </div>

            <br></br>

            <div className="container" align="left">
                <h3>Cardiovascular Exercise Checklist</h3>
                <ul>
                    <li><input type="checkbox"/> 30 minutes of brisk walking</li>
                    <li><input type="checkbox"/> 20 minutes of jogging</li>
                    <li><input type="checkbox"/> 15 minutes of cycling</li>
                    <li><input type="checkbox"/> 20 minutes of swimming</li>
                    <li><input type="checkbox"/> 30 minutes of dancing</li>
                </ul>
            </div>

            <br></br>

            <div className="container" align="left">
                <h3>Strength Training Exercise Checklist</h3>
                <ul>
                    <li><input type="checkbox"/> Push-ups</li>
                    <li><input type="checkbox"/> Squats</li>
                    <li><input type="checkbox"/> Deadlifts</li>
                    <li><input type="checkbox"/> Bench Press</li>
                    <li><input type="checkbox"/> Rows</li>
                </ul>
            </div>

            <br></br>

            <div className="container" align="left">
                <h3>Flexibility Exercise Checklist</h3>
                <ul>
                    <li><input type="checkbox"/> Stretching</li>
                    <li><input type="checkbox"/> Yoga</li>
                    <li><input type="checkbox"/> Pilates</li>
                    <li><input type="checkbox"/> Tai Chi</li>
                    <li><input type="checkbox"/> Foam Rolling</li>
                </ul>
            </div>

            
        </Container>
    );
}

export default FitnessGames;