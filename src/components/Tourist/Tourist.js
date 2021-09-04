import React from "react";
import { Card, Button, ButtonGroup } from "react-bootstrap";
import { Link, Route } from "react-router-dom";
import Tourist from "../Tourist/Tourist";
import user from "../../assets/afu.png";
import classes from "./Tourist.module.css";

const tourist = (props) => (
  <React.Fragment>
    <Card className={classes.Tourist}>
      <Link to={"tourist/" + props.id} style={{ textDecoration: "none" }}>
        <Card.Img variant="top" src={user} alt="user" />
        <Card.Body>
          <Card.Title>
            {props.name} {props.surname}
          </Card.Title>
          <Card.Text>{props.dateOfBirth}</Card.Text>
          <ButtonGroup toggle>
            <Link to={"tourist/" + props.id}>
              <Button variant="primary" onClick={props.clicked}>
                Info
              </Button>
            </Link>
            <Link to={"editTourist/" + props.id}>
              <Button variant="warning" onClick={props.edit}>
                Edit
              </Button>
            </Link>
            <Link to={"tourist/" + props.id}>
              <Button
                variant="danger"
                onClick={(event) => props.delete(event, props.id)}
              >
                Delete
              </Button>
            </Link>
          </ButtonGroup>
        </Card.Body>
      </Link>
    </Card>
  </React.Fragment>
);
export default tourist;
