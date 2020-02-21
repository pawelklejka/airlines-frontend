import React, {Component} from 'react'
import {Button, Card, Form} from 'react-bootstrap';
import classes from './AddFlight.module.css';
import axios from 'axios';
import Flight from '../../../components/Flight/Flight';

class AddFlight extends Component {
    state = {
        startingDestination: '',
        startingTime: '',
        arrivalTime: '',
        rocketCapacity: 0,
        price: ''
    }

    postFlightToDatabase = () =>{
        const flight = {
            startingDestination: this.state.startingDestination,
            flightStartingTime: this.state.startingTime,
            flightArrivalTime: this.state.arrivalTime,
            capacity: this.state.rocketCapacity,
            price: this.state.price,
        }
        if(this.props.match.params.id == null){
            axios.post('http://localhost:8081/flight/', flight)
            .then(
                this.setState({
                    startingDestination: '',
                    startingTime: '',
                    arrivalTime: '',
                    rocketCapacity: 0,
                    price: ''
                })
            ).catch(error => console.log(error))
        }else{
            axios.patch('http://localhost:8081/tourist/' + this.props.match.params.id, flight)
            .then(
                this.setState({
                    startingDestination: '',
                    startingTime: '',
                    arrivalTime: '',
                    rocketCapacity: 0,
                    price: ''
                })
            ).catch(error => console.log(error))
        }

    }

    onClickAddFlightHandler = (e) =>{
        e.preventDefault();
        this.postFlightToDatabase();
        
    }

render(){
    return (
        <div className={classes.CenterForm}>
                <Card style={{ width: '500px' }}>
                    <Card.Header>CosmicFligths</Card.Header>
                    <Card.Body>
                        <Card.Title>Form for adding flight</Card.Title>
                        <Form>
                            <Form.Group controlId="setStartingDestination">
                                <Form.Label>Set the starting destination - city name</Form.Label>
                                <Form.Control type="text" placeholder="Type in city name" value={this.state.startingDestination} onChange={(event) => this.setState({ startingDestination: event.target.value })} />
                            </Form.Group>

                            <Form.Group controlId="setStartingTime">
                                <Form.Label>Set the starting date for the flight</Form.Label>
                                <Form.Control type="datetime-local"  value={this.state.startingTime} onChange={(event) => this.setState({ startingTime: event.target.value })} />
                            </Form.Group>

                            <Form.Group controlId="setArrivalTime">
                                <Form.Label>Set the arrival date for the flight</Form.Label>
                                <Form.Control type="datetime-local"  value={this.state.arrivalTime} onChange={(event) => this.setState({ arrivalTime: event.target.value })} />
                            </Form.Group>

                            <Form.Group controlId="setRocketCapacity">
                                <Form.Label>Set the rocket capacity (number between 10 and 20)</Form.Label>
                                <Form.Control type="number" placeholder="Type in the rocket capacity" min="10" max="20" value={this.state.rocketCapacity} onChange={(event) => this.setState({ rocketCapacity: event.target.value })} />
                            </Form.Group>

                            <Form.Group controlId="setPrice">
                                <Form.Label>Set the price per seat</Form.Label>
                                <Form.Control type="number" placeholder="Type in the price" step="0.01" min="00.00" value={this.state.price} onChange={(event) => this.setState({ price: event.target.value })} />
                            </Form.Group>

                            <Button variant="primary" type="submit" onClick={ this.onClickAddFlightHandler}> Add the flight </Button>

                        </Form>
                    </Card.Body>

                </Card>
        </div>
        )
    }
}
export default AddFlight;