import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Pagination, Row, Col, Alert} from 'react-bootstrap';
import Flight from '../../components/Flight/Flight';
import classes from './ManageFlights.module.css';
import axios from 'axios';
import Spinner from '../../components/Spinner/Spinner';

class ManageFlights extends Component {
    state = {
        flights: [],
        loading: false,
        message: '',
        totalResults: 0,
        totalPages: 0,
        currentPageNo: 0
    }

    fetchTheFligths = (updatedPageNo) => {
        let pageNumber = '';
        if(updatedPageNo <= 0){
            pageNumber = 0;
        }else{
            pageNumber = updatedPageNo ? updatedPageNo : '';
        }
        axios.get('http://localhost:8081/flight/all?page=' + pageNumber)
            .then(response => {
                const flights = Object.entries(response.data);
                const totalPages = flights[4][1];
                const resultNotFoundMsg = ! flights[0][1].length
                                        ? 'There are no more search results. Go back.'
                                        : '';

                this.setState({                    
                    flights: flights[0][1],
                    message: resultNotFoundMsg,
                    loading: false,
                    currentPageNo: updatedPageNo,
                    totalPages: totalPages});
                console.log(flights);
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

    onClickDeleteFlightHandler = (event, id) => {
        event.preventDefault();
        axios.delete('http://localhost:8081/flight/' + id).then(() => {
            this.fetchTheFligths();
        })
    }

    componentDidMount() {
        const currentPageNo = this.state.currentPageNo;
        if(!this.state.loading){
            this.setState({loading: true, message: ''}, () =>{
                this.fetchTheFligths(currentPageNo)
            })
        }
    }

    onClickPageChangeHandler = (type, e) =>{
        e.preventDefault();
        let updatedPageNo = '';
        if(type === 'prev'){
            updatedPageNo = this.state.currentPageNo - 1;
            if(updatedPageNo <= 0){
                updatedPageNo = 0;
            }
        }else{
            updatedPageNo = this.state.currentPageNo + 1;
        }
        if(!this.state.loading){
            this.setState({loading: true, message: ''}, () =>{
                this.fetchTheFligths(updatedPageNo)
            })
        }
    }
    
    render(){
        const {loading, message, currentPageNo, totalPages} = this.state;


        let flights = <p style ={{textAlign: 'center'}}>Something went wrong!</p>;
        if(!this.state.error){
            flights = this.state.flights.map(flight => {
                return(
                        <Flight 
                        id={flight.id}
                        key={flight.id}
                        startingDestination={flight.startingDestination}
                        flightStartingTime={flight.flightStartingTime}
                        flightArrivalTime={flight.flightArrivalTime}
                        capacity={flight.capacity}
                        touristAmount={flight.touristAmount}
                        price={flight.price}
                        delete={this.onClickDeleteFlightHandler}
                        />

                )
            })
        }
    return (
        <Col className={classes.ManageFlights}>
        <Row>
        <Pagination>
            <Pagination.First onClick={(event) => this.onClickPageChangeHandler('prev', event)}/>
            <Pagination.Last onClick={(event) => this.onClickPageChangeHandler('next', event)}/>
        </Pagination>
        </Row>
        <Row>
        <Col className={classes.ManageFlights}>
            {message && <Alert variant='danger'>{message}</Alert>}
            {!loading ? flights : <Spinner />}
        </Col>
        </Row>
        <Row>
        <Pagination>
            <Pagination.First onClick={(event) => this.onClickPageChangeHandler('prev', event)}/>
            <Pagination.Last onClick={(event) => this.onClickPageChangeHandler('next', event)}/>
        </Pagination>
        </Row>
        </Col>
        )
    }
}
export default ManageFlights;