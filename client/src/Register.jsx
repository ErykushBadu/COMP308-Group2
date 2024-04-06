import React from 'react';
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col } from 'react-bootstrap'; 

function Register() {
    let navigate = useNavigate();
    const [Register] = useMutation(REGISTER);
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
}

export default Register;