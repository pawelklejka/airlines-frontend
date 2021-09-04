import React from "react";
import { Button, Card, ButtonGroup, ToggleButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import rocket from "../../assets/afr.png";
import classes from "./Flight.module.css";
import ModalBuyTicket from "../../components/ModalBuyTicket/ModalBuyTicket";

const flight = (props) => {
  return (
    <Card className={classes.Flight}>
      <Link to={"flight/" + props.id} style={{ textDecoration: "none" }}>
        <Card.Img variant="top" src={rocket} alt="house" />
        <Card.Body>
          <Card.Title>
            {props.startingDestination} - {props.finalDestination}
            <br />
            {props.price} $
          </Card.Title>
          <Card.Text>
            <br />
            Start: {props.flightStartingTime}
            <br />
            Arrival: {props.flightArrivalTime}
          </Card.Text>
          <ButtonGroup toggle style={{ textDecoration: "none" }}>
            {/* <Link to={"addTourist/" + props.id}> */}
            <Button variant="primary" onClick={props.onClickChangeModalHandler}>
              Buy Ticket
            </Button>
            {/* </Link> */}
            {false ? (
              <React.Fragment>
                <Link to={"editFlight/" + props.id}>
                  <Button variant="warning" onClick={props.edit}>
                    Edit
                  </Button>
                </Link>
                <Link to={"flight/" + props.id}>
                  <Button
                    variant="danger"
                    onClick={(event) => props.delete(event, props.id)}
                  >
                    Delete
                  </Button>
                </Link>
              </React.Fragment>
            ) : null}
          </ButtonGroup>
        </Card.Body>
      </Link>
      <ModalBuyTicket
        show={props.showModal}
        onHide={props.onClickChangeModalHandler}
        flightId={props.id}
      />
    </Card>
  );
};
export default flight;
