import { Component, useEffect, useState } from "react";
import React from "react";
import { Form, Button, Col, Row, Card } from "react-bootstrap";
import classes from './Register.module.css';

const Register = (props) => {
    const [user, setUser] = useState({ username: "", password: "", mail: "" })

    useEffect(() => {
        console.log(user);
    })
    
    const onClickRegisterUser = (event) => {
    event.preventDefault();
    let userToBeSend = { ...user };
        
    }
    //TODO refactor onChange functions and pull out the repeating code and creatining util.js with updateObject func
    const onChangeUsername = (event) => {
        setUser({
            ...user,
            username: event.target.value
        });
    }

    const onChangePassword = (event) => {
        setUser({
            ...user,
            password: event.target.value
        });
    }

    const onChangeMail = (event) => {
        setUser({
            ...user,
            mail: event.target.value
        });
    }

    return (
        <React.Fragment>
            <Card className={classes.Register}>
                <Card.Body>
                    <Form>
                        <Form.Group as={Row} controlId="formGridUsername">
                            <Form.Label>Type in user name</Form.Label>
                            <Form.Control type="username" placeholder=" user name" onChange={onChangeUsername} value={user.username} />
                            {user.username}
                        </Form.Group>

                        <Form.Group as={Row} controlId="formGridPassword">
                            <Form.Label>Type in password</Form.Label>
                            <Form.Control type="username" placeholder="password" onChange={onChangePassword} value={user.password} />
                            {user.password}
                        </Form.Group>

                        <Form.Group as={Row} controlId="formGridMail">
                            <Form.Label>Type in your mail</Form.Label>
                            <Form.Control type="mail" placeholder="email" onChange={onChangeMail} value={user.mail} />
                            {user.mail}
                        </Form.Group>
                        <Button variant="light" type="submit" onClick={event => onClickRegisterUser(event)}>
                        Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </React.Fragment>
    )
}

export default Register;