import React, {Component} from 'react'
import {Button, Card, Form} from 'react-bootstrap';
import classes from './EditTourist.module.css';
import axios from 'axios';
import Flight from '../../../components/Flight/Flight';

class EditTourist extends Component {
    state = {
        tourist: {
            id: '',
            name: '',
            surname: '',
            sex: '',
            country: 0,
            dateOfBirth: '',
            notes: ''
        },
        loading: false,
        message: '',

        }

    
    getTouristFromDatabase = () =>{
            axios.get('http://localhost:8081/tourist/' + this.props.match.params.id,)
            .then(response => {
                const tourist = Object.entries(response.data);
                const resultNotFoundMsg = ! tourist.length
                                        ? 'There are no more search results. Go back.'
                                        : '';
                this.setState({                    
                    tourist: {
                        name: tourist[0][1],
                        surname: tourist[1][1],
                        sex: tourist[2][1],
                        country: tourist[3][1],
                        dateOfBirth: tourist[4][1],
                        notes: tourist[5][1],
                        id: tourist[6][1]
                    },
                    message: resultNotFoundMsg,
                    loading: false });
                console.log(tourist);
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
        this.getTouristFromDatabase();
    }

    updateTouristToDatabase = () =>{
        const tourist = {
            name: this.state.tourist.name,
            surname: this.state.tourist.surname,
            sex: this.state.tourist.sex,
            country: this.state.tourist.country,
            dateOfBirth: this.state.tourist.dateOfBirth,
            notes: this.state.tourist.notes
        }
            axios.put('http://localhost:8081/tourist/' + this.props.match.params.id, tourist)
            .then(
                this.setState({
                    tourist:{
                        name: '',
                        surname: '',
                        sex: '',
                        country: 0,
                        dateOfBirth: '',
                        notes: ''
                    }

                })
            ).catch(error => console.log(error))
    }


    onClickUpdateTouristHandler = (e) =>{
        this.updateTouristToDatabase();
        
    }

    onSubmitHandler = event =>{
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        }
        this.setState({validated: true});

        if(form.checkValidity() === true){
            this.onClickUpdateTouristHandler();
        }
    }

render(){
    return (
        <div className={classes.CenterForm}>
                <Card style={{ width: '500px' }}>
                    <Card.Header>Tourist ID: {this.state.tourist.id}</Card.Header>
                    <Card.Body>
                        <Card.Title>Form for editing tourist</Card.Title>
                        <Form noValidate validated={this.state.validated} onSubmit={this.onSubmitHandler}>
                        <Form.Group controlId="setName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control required type="text" placeholder="Type in your name" value={this.state.tourist.name} onChange={(event) => this.setState({ tourist: {...this.state.tourist, name: event.target.value }})} />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Type in your name</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="setSurname">
                            <Form.Label>Surname</Form.Label>
                            <Form.Control required type="text" placeholder="Type in your surname" value={this.state.tourist.surname} onChange={(event) => this.setState({ tourist: {...this.state.tourist, surname: event.target.value } })} />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Type in your surname</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="setSex">
                            <Form.Label>Sex</Form.Label>
                            <Form.Control required type="text" placeholder="Type in your sex" value={this.state.tourist.sex} onChange={(event) => this.setState({ tourist: {...this.state.tourist, sex: event.target.value } })} />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Type in your sex</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="setCountry">
                            <Form.Label>Country</Form.Label>
                            <Form.Control required type="text" placeholder="Type in your country" value={this.state.tourist.country} onChange={(event) => this.setState({ tourist: {...this.state.tourist, country: event.target.value } })} />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Type in your country</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="setDateOfBirth">
                            <Form.Label>Current date of birth: </Form.Label>
                            <Form.Control required min="1900-01-01" type="date" value={this.state.tourist.dateOfBirth} onChange={(event) => this.setState({ tourist: {...this.state.tourist, dateOfBirth: event.target.value } })} />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Type in your name</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="setNotes">
                            <Form.Label>Type in any notes and any comments you have</Form.Label>
                            <Form.Control type="text" placeholder="Type in notes" value={this.state.tourist.notes} onChange={(event) => this.setState({ notes: event.target.value })} />
                        </Form.Group>
                        <Button variant="primary" type="submit"> Update tourist </Button>

                    </Form>
                    </Card.Body>

                </Card>
        </div>
        )
    }
}
export default EditTourist;