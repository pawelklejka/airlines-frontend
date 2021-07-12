import React, { useState, Component } from 'react';
import {Button, Card, Col, Form, Alert, Pagination} from 'react-bootstrap';
import {Link, Route, Switch} from 'react-router-dom';
import classes from './SearchStartingDestination.module.css';
import axios from 'axios';
import Flight from '../../components/Flight/Flight';
import Spinner from '../../components/Spinner/Spinner';

class SearchStartingDestination extends Component{
    constructor(props) {
        super(props);
        this.state = {
        flights: [],
        query: '',
        loading: false,
        message: '',
        totalResults: 0,
        totalPages: 0,
        currentPageNo: 0,};

        this.cancel = '';
    }

    fetchSearchResults = (updatedPageNo = '', query) => {
        const pageNumber = updatedPageNo ? `&page=${updatedPageNo}` : '';
        const searchUrl = `http://localhost:8081/flight/searchByDestination?name=${query}${pageNumber}`;
        if(this.cancel){
            this.cancel.cancel();
        }
        this.cancel = axios.CancelToken.source();

        axios.get(searchUrl, {
            cancelToken: this.cancel.token
        }).then(response => {
                const flights = Object.entries(response.data);
                const totalPages = flights[4][1];
                const resultNotFoundMsg = ! flights[0][1].length
                                        ? 'There are no more search results. Try another starting location.'
                                        : '';
                this.setState({
                    flights: flights[0][1],
                    message: resultNotFoundMsg,
                    loading: false,
                    currentPageNo: updatedPageNo,
                    totalPages: totalPages

                });
                console.log(flights);
            })
            .catch(error => {
                if(axios.isCancel(error) || error){
                    this.setState({loading: false,
                         message: 'Fetching data failed'})
                }
                console.log(error);
            });
    }

    onInputChangeHandler = (e) =>{
        const query = e.target.value;
        if(!query){
            this.setState({query, flights: [], message: ''})
        }else{
            this.setState({query: query, loading: true, message: ''}, () => {
                this.fetchSearchResults(0, query);
            });
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
                this.fetchSearchResults(updatedPageNo, this.state.query)
            })
        }
    }

    render(){
        const {query, loading, message, currentPageNo, totalPages} = this.state;

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
                        />
                )
            })
        }
        return (
            <Col className={classes.SearchStartingDestination }>
            
            <Card className={classes.SearchBar}>
                <Card.Body>
                    <Card.Title>Find the place you can begin your space journey</Card.Title>
                    <Form>
                        <Form.Group controlId="searchStartingDestination">
                            <Form.Label>Type in you starting destination</Form.Label>
                            <Form.Control type="search" placeholder="search for flight" value={query} onChange={this.onInputChangeHandler} autoComplete="off"/>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
           <Pagination className={classes.SearchBar}>
                    <Pagination.First onClick={(event) => this.onClickPageChangeHandler('prev', event)}/>
                    <Pagination.Last onClick={(event) => this.onClickPageChangeHandler('next', event)}/>
            </Pagination>

            <Col className={classes.Flights}>
            {message && <Alert variant='danger'>{message}</Alert>}
            {!loading ? flights : <Spinner />}
            </Col>
    
        </Col>
        
        )
    }
    
};
export default SearchStartingDestination;