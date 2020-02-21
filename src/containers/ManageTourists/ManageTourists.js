import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Tourist from '../../components/Tourist/Tourist';
import classes from './ManageTourists.module.css';
import {Pagination, Row, Col, Alert} from 'react-bootstrap';
import axios from 'axios';
import Spinner from '../../components/Spinner/Spinner';


class ManageTourists extends Component {
    state = {
        tourists: [],
        loading: false,
        message: '',
        totalResults: 0,
        totalPages: 0,
        currentPageNo: 0
    }

    fetchTheTourists = (updatedPageNo) => {
        const pageNumber = updatedPageNo ? updatedPageNo : '';
        axios.get('http://localhost:8081/tourist/all?page=' + pageNumber)
            .then(response => {
                const tourists = Object.entries(response.data);
                const totalPages = tourists[4][1];
                const resultNotFoundMsg = ! tourists[0][1].length
                                        ? 'There are no more search results. Go back.'
                                        : '';
                /* const updatedtourists = Object.keys(tourists).map(key => {
                     return tourists[key];
                 });*/
                this.setState({                    
                    tourists: tourists[0][1],
                    message: resultNotFoundMsg,
                    loading: false,
                    currentPageNo: updatedPageNo,
                    totalPages: totalPages});
                console.log(tourists);
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

    componentDidMount() {
        const currentPageNo = this.state.currentPageNo;

        if(!this.state.loading){
            this.setState({loading: true, message: ''}, () =>{
                this.fetchTheTourists(currentPageNo)
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
                this.fetchTheTourists(updatedPageNo)
            })
        }
    }

    onClickDeleteTouristHandler = (event, id) => {
        event.preventDefault();
        axios.delete('http://localhost:8081/tourist/' + id).then(() => {
            this.fetchTheTourists();
        })
    }

    
    render(){
        const {loading, message, currentPageNo, totalPages} = this.state;


        let tourists = <p style ={{textAlign: 'center'}}>Something went wrong!</p>;
        if(!this.state.error){
            tourists = this.state.tourists.map(tourist => {
                return(
                        <Tourist
                        key={tourist.id}
                        id={tourist.id} 
                        name={tourist.name} 
                        surname={tourist.surname} 
                        dateOfBirth={tourist.dateOfBirth}
                        delete={this.onClickDeleteTouristHandler}/>
                )
            })
        }
    return (
        <Col className={classes.ManageTourists}>
        <Row>
        <Pagination>
            <Pagination.First onClick={(event) => this.onClickPageChangeHandler('prev', event)}/>
            <Pagination.Last onClick={(event) => this.onClickPageChangeHandler('next', event)}/>
        </Pagination>
        </Row>
        <Row>
        <Col className={classes.ManageTourists}>
            {message && <Alert variant='danger'>{message}</Alert>}
            {!loading ? tourists : <Spinner />}
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
export default ManageTourists;