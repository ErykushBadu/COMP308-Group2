import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

/*
To Do:
- Create 3 checklists of different exercise activities the patient can do
*/


function FitnessGames() {
    return (
        <Container>
            <div>
                <h1>Fitness Games</h1>
            </div>

            <p>It is getting late but I will add 3 games here with checkboxes for different activites</p>
        </Container>
    );
}

export default FitnessGames;