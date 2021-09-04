import { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
class ModalBuyTicket extends Component {
  state = {
    name: "",
    surname: "",
    email: "",
    sex: "",
    country: "",
    dateOfBirth: "",
    notes: "",
    validated: false,
    sendMailFlag: false,
  };

  postBuyTicketDTOToDatabase = () => {
    const buyTicketDTO = {
      flightId: this.props.flightId,
      touristDTO: {
        name: this.state.name,
        surname: this.state.surname,
        email: this.state.email,
        sex: this.state.sex,
        country: this.state.country,
        dateOfBirth: this.state.dateOfBirth,
        notes: this.state.notes,
      },
      sendMailFlag: this.state.sendMailFlag,
    };

    axios
      .post("http://localhost:8081/tickets/", buyTicketDTO, {
        responseType: "arraybuffer",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/pdf",
        },
      })
      .then((response) => {
        console.log(response);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "ticket.pdf"); //or any other extension
        document.body.appendChild(link);
        link.click();
        this.setState({
          name: "",
          surname: "",
          email: "",
          sex: "",
          country: "",
          dateOfBirth: "",
          notes: "",
          sendMailFlag: false,
        });
      })
      .catch((error) => console.log(error));
  };

  buyTicketHandler = (e) => {
    this.postBuyTicketDTOToDatabase();
  };

  onSubmitHandler = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.setState({ validated: true });

    if (form.checkValidity() === true) {
      this.buyTicketHandler();
      this.props.onHide(event);
    }
  };
  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Type in your personal information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            validated={this.state.validated}
            onSubmit={this.onSubmitHandler}
          >
            <Form.Group controlId="setName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Type in your name"
                value={this.state.name}
                onChange={(event) =>
                  this.setState({ name: event.target.value })
                }
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Type in your name
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="setSurname">
              <Form.Label>Surname</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Type in your surname"
                value={this.state.surname}
                onChange={(event) =>
                  this.setState({ surname: event.target.value })
                }
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Type in your surname
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="setEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Type in your email"
                value={this.state.email}
                onChange={(event) =>
                  this.setState({ email: event.target.value })
                }
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Type in your email
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="setSex">
              <Form.Label>Sex</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Type in your sex"
                value={this.state.sex}
                onChange={(event) => this.setState({ sex: event.target.value })}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Type in your sex
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="setCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Type in your country"
                value={this.state.country}
                onChange={(event) =>
                  this.setState({ country: event.target.value })
                }
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Type in your country
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="setDateOfBirth">
              <Form.Label>Date of birth</Form.Label>
              <Form.Control
                min="1900-01-01"
                required
                type="date"
                value={this.state.dateOfBirth}
                onChange={(event) =>
                  this.setState({ dateOfBirth: event.target.value })
                }
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Type in your date of birth
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="setNotes">
              <Form.Label>
                Type in any notes and any comments you have
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Type in notes"
                value={this.state.notes}
                onChange={(event) =>
                  this.setState({ notes: event.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="setSendMailFlag">
              <Form.Check
                type="checkbox"
                label="send ticket to your mail?"
                onChange={(event) =>
                  this.setState({ sendMailFlag: event.target.value })
                }
              />
            </Form.Group>
            <Button type="submit">Buy Ticket</Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}
export default ModalBuyTicket;
