import React, {Component} from 'react';
import {Button, Card, Form} from 'react-bootstrap';
import classes from './AddTourist.module.css';
import axios from 'axios';

class AddTourist extends Component {
    state ={
        name: '',
        surname: '',
        sex: '',
        country: '',
        dateOfBirth: '',
        notes: '',
        validated: false
    }


    postTouristToDatabase = () =>{
        const tourist = {
            name: this.state.name,
            surname: this.state.surname,
            sex: this.state.sex,
            country: this.state.country,
            dateOfBirth: this.state.dateOfBirth,
            notes: this.state.notes
        }
        
        if(this.props.match.params.id == null){
            axios.post('http://localhost:8081/tourist/', tourist)
            .then(
                this.setState({
                    name: '',
                    surname: '',
                    sex: '',
                    country: '',
                    dateOfBirth: '',
                    notes: ''
                })
            ).catch(error => console.log(error))
        }else{
            axios.patch('http://localhost:8081/flight/' + this.props.match.params.id, tourist)
            .then(
                this.setState({
                    name: '',
                    surname: '',
                    sex: '',
                    country: '',
                    dateOfBirth: '',
                    notes: ''
                })
            ).catch(error => console.log(error))
        }
    }

    addTouristHandler = (e) =>{
        this.postTouristToDatabase();
        
    }

    onSubmitHandler = event =>{
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        }
        this.setState({validated: true});

        if(form.checkValidity() === true){
            this.addTouristHandler();
        }
    }

    render(){
        return (
            <div className={classes.CenterForm}>

            {/*Main form of adding object to database,
             clicking submit button calling ObjectAddHandler function*/}
            <Card style={{ width: '500px' }}>
                <Card.Header>CosmicFlights</Card.Header>
                <Card.Body>
                    <Card.Title>Form for adding tourist.</Card.Title>
                    <Form noValidate validated={this.state.validated} onSubmit={this.onSubmitHandler}>
                        <Form.Group controlId="setName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control required type="text" placeholder="Type in your name" value={this.state.name} onChange={(event) => this.setState({ name: event.target.value })} />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Type in your name</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="setSurname">
                            <Form.Label>Surname</Form.Label>
                            <Form.Control required type="text" placeholder="Type in your surname" value={this.state.surname} onChange={(event) => this.setState({ surname: event.target.value })} />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Type in your surname</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="setSex">
                            <Form.Label>Sex</Form.Label>
                            <Form.Control required type="text" placeholder="Type in your sex" value={this.state.sex} onChange={(event) => this.setState({ sex: event.target.value })} />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Type in your sex</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="setCountry">
                            <Form.Label>Country</Form.Label>
                            <Form.Control required type="text" placeholder="Type in your country" value={this.state.country} onChange={(event) => this.setState({ country: event.target.value })} />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Type in your country</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="setDateOfBirth">
                            <Form.Label>Date of birth</Form.Label>
                            <Form.Control min="1900-01-01" required type="date" value={this.state.dateOfBirth} onChange={(event) => this.setState({ dateOfBirth: event.target.value })} />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Type in your date of birth</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="setNotes">
                            <Form.Label>Type in any notes and any comments you have</Form.Label>
                            <Form.Control type="text" placeholder="Type in notes" value={this.state.notes} onChange={(event) => this.setState({ notes: event.target.value })} />
                        </Form.Group>
                        <Button variant="primary" type="submit"> Add tourist </Button>

                    </Form>
                </Card.Body>

            </Card>

        </div>
        )
    }
}
export default AddTourist;