import React from 'react';
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col } from 'react-bootstrap'; 

function Login() {
    let navigate = useNavigate();
    const [Login] = useMutation(LOGIN);
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
}

export default Login;

