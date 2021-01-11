import React, {Component} from 'react'
import {Button, Card, Form} from 'react-bootstrap';
import classes from './EditFlight.module.css';
import axios from 'axios';
import Flight from '../../../components/Flight/Flight';

class EditFlight extends Component {
    state = {
        flight: {
            id: '',
            startingDestination: '',
            startingTime: '',
            arrivalTime: '',
            rocketCapacity: 0,
            price: ''
        },
        loading: false,
        message: '',

        }

    
    getFlightFromDatabase = () =>{
            axios.get('http://localhost:8081/flight/' + this.props.match.params.id,)
            .then(response => {
                const flight = Object.entries(response.data);
                const resultNotFoundMsg = ! flight.length
                                        ? 'There are no more search results. Go back.'
                                        : '';
                this.setState({                    
                    flight: {
                        startingDestination: flight[0][1],
                        startingTime: flight[1][1],
                        arrivalTime: flight[2][1],
                        rocketCapacity: flight[3][1],
                        price: flight[5][1],
                        id: flight[7][1]
                    },
                    message: resultNotFoundMsg,
                    loading: false });
                console.log(flight);
            })
            .catch(error => {
                if(axios.isCancel(error) || error){
                    this.setState({loading: false,
                         message: 'Fetching data failed'})
                }
                console.log(error);
                // this.setState({error: true});
            });
        }   

    componentDidMount(){
        this.getFlightFromDatabase();
    }

    updateFlightToDatabase = () =>{
        const flight = {
            startingDestination: this.state.flight.startingDestination,
            flightStartingTime: this.state.flight.startingTime,
            flightArrivalTime: this.state.flight.arrivalTime,
            capacity: this.state.flight.rocketCapacity,
            price: this.state.flight.price,
        }
            axios.put('http://localhost:8081/flight/' + this.props.match.params.id, flight)
            .then(
                this.setState({
                    flight:{
                        startingDestination: '',
                        startingTime: '',
                        arrivalTime: '',
                        rocketCapacity: 0,
                        price: ''
                    }

                })
            ).catch(error => console.log(error))
    }


    onSubmitHandler = event =>{
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        }
        this.setState({validated: true});

        if(form.checkValidity() === true){
            this.updateFlightToDatabase();
        }
    }

render(){
    return (
        <div className={classes.CenterForm}>
                <Card style={{ width: '500px' }}>
                    <Card.Header>Flight ID: {this.state.flight.id}</Card.Header>
                    <Card.Body>
                        <Card.Title>Form for editing flight</Card.Title>
                        <Form noValidate validated={this.state.validated} onSubmit={this.onSubmitHandler}>
                            <Form.Group controlId="setStartingDestination">
                                <Form.Label>Set the starting destination - city name</Form.Label>
                                <Form.Control required type="text" placeholder="Type in city name" value={this.state.flight.startingDestination} onChange={(event) => this.setState({ flight: {...this.state.flight, startingDestination: event.target.value }})} />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">Type in city name</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="setStartingTime">
                                <Form.Label>Current starting date is: </Form.Label>
                                <Form.Control required min="2020-01-01T00:00" type="datetime-local"  value={this.state.flight.startingTime} onChange={(event) => this.setState({ flight: {...this.state.flight, startingTime: event.target.value }})} />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">Type in starting date</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="setArrivalTime">
                                <Form.Label>Current arrival date is: </Form.Label>
                                <Form.Control required min="2020-01-01T00:00" type="datetime-local"  value={this.state.flight.arrivalTime} onChange={(event) => this.setState({ flight: {...this.state.flight, arrivalTime: event.target.value }})} />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">Type in arrival date</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="setRocketCapacity">
                                <Form.Label>Set the rocket capacity (number between 10 and 20)</Form.Label>
                                <Form.Control required min="10" max="20" type="number" placeholder="Type in the rocket capacity" min="10" max="20" value={this.state.flight.rocketCapacity} onChange={(event) => this.setState({ flight: {...this.state.flight, rocketCapacity: event.target.value }})} />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">Type in rocket capacity</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="setPrice">
                                <Form.Label>Set the price per seat</Form.Label>
                                <Form.Control required type="number" placeholder="Type in the price" step="0.01" min="100.00" value={this.state.flight.price} onChange={(event) => this.setState({ flight: {...this.state.flight, price: event.target.value }})} />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">Type in price</Form.Control.Feedback>
                            </Form.Group>

                            <Button variant="primary" type="submit"> Update the flight </Button>

                        </Form>
                    </Card.Body>

                </Card>
        </div>
        )
    }
}
export default EditFlight;