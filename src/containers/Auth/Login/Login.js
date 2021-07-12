import { Component, useState } from "react";
import React from 'react';
import {Form, Button} from 'react-bootstrap';
import classes from './Login.module.css';
import { useParams } from "react-router";

const Login = props =>{
    const [userToBeSignedIn, setUserToBeSignedIn] = useState({username: "", password: ""})

    const onChangeUserNameHandler = (event) => {
                
    }
    const onChangePasswordHandler = (event) => {
        
    }
    const onSubmitHandler = (event) => {
        
    }

    return (
    <div className={classes.Login} >
    {false ? "Zostałeś pomyślnie zalogowany" :
    <React.Fragment>
        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Type in e-mail address</Form.Label>
                {/* we pass here handlers from App.js file, we do this via props of this component */}
                <Form.Control type="email" placeholder="Enter email" value={this.state.userName} onChange={(event) => this.onChangeUserNameHandler(event)}/>
                <Form.Text className="text-muted">
                Nigdy nie udostępnimy Twojego hasła na zewnątrz
                {this.state.error ? "wrong mail or password" : null }
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Type in Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={(event) => this.onChangePasswordHandler(event)}/>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={event => this.onSubmitHandler(event)}>
                Sign In
            </Button>
        </Form>
    </React.Fragment>
    }
    </div>
    );
}

export default Login;