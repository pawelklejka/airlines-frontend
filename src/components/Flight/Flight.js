import React from 'react';
import {Button, Card, ButtonGroup, ToggleButton} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import rocket from '../../assets/afr.png';
import classes from './Flight.module.css';
import axios from 'axios';

const flight = (props) => {
    return(
    <Card className={classes.Flight} >
        <Link to={'flight/' + props.id} style={{ textDecoration: 'none' }}>
            <Card.Img variant="top" src={rocket} alt="house" />
            <Card.Body>
                <Card.Title>
                    {props.startingDestination} 
                    <br />
                    {props.price} $
                </Card.Title>
                <Card.Text>

                    Current capacity:
                    <br />
                    {props.touristAmount}/{props.capacity}
                    <br />
                    Start: {props.flightStartingTime}
                    <br />
                    Arrival: {props.flightArrivalTime} 
                </Card.Text>
            </Card.Body>
         </Link>


        <ButtonGroup toggle style={{ textDecoration: 'none' }}> 
                <Link to={'addTourist/' + props.id} >
                    <Button variant="primary" onClick={props.clicked}>
                    Reserve
                    </Button>
                </Link>
                <Link to={'editFlight/' + props.id} >
                <Button variant="warning" onClick={props.edit}>
                Edit
                </Button>
                </Link>
                <Button variant="danger" onClick={(event) => props.delete(event, props.id)}>
                Delete
                </Button>
            </ButtonGroup>
    </Card>
    )

};
export default flight;