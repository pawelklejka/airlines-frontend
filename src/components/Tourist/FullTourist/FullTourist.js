import React from "react";
import { Col, Card } from "react-bootstrap";
import tourist from "../Tourist";
const FullTourist = (props) => {
  return (
    <Card>
      <Col>
        <Card.Img variant="top" src={props.user} alt="rocket" />
      </Col>
      <Col>
        <Card.Body>
          <Card.Title>Tourist ID: {tourist.id}</Card.Title>
          <Card.Text>Tourist name: {tourist.name}</Card.Text>
          <Card.Text>Tourist surname: {tourist.surname}</Card.Text>
          <Card.Text>Tourist date of birth: {tourist.dateOfBirth}</Card.Text>
          <Card.Text>Tourist sex: {tourist.sex}</Card.Text>
        </Card.Body>
      </Col>
    </Card>
  );
};
export default FullTourist;
