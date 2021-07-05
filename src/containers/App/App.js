import React, { useState } from "react";
import "./App.css";
import ManageFlights from "../ManageFlights/ManageFlights";
import ManageTourists from "../ManageTourists/ManageTourists";
import FullTourist from "../../components/Tourist/FullTourist/FullTourist";
import Flight from "../../components/Flight/Flight";
import AddTourist from "../ManageTourists/AddTourist/AddTourist";
import EditFlight from "../ManageFlights/EditFlight/EditFlight";
import EditTourist from "../ManageTourists/EditTourist/EditTourist";
import AddFlight from "../ManageFlights/AddFlight/AddFlight";
import Header from "../../components/Header/Header";
import Login from "../../containers/Login/Login";
import { Col } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import SearchStartingDestination from "../SearchStartingDestination/SearchStartingDestination";

function App() {
  const [signedIn, setSignedIn] = useState(true);

  return (
    <div className="App">
      <Header signedIn={signedIn}/>
      <Col className="page-container">
        <Switch>
          <Route path="/allTourists" exact component={ManageTourists} />
          <Route path="/allFlights" exact component={ManageFlights} />
          <Route path="/addTourist" exact component={AddTourist} />
          <Route path="/addFlight" exact component={AddFlight} />
          <Route path="/login" ><Login /></Route>

          <Route
            path="/addTourist/:id"
            exact
            component={(props) => <AddTourist {...props} />}
          />
          <Route
            path="/addFlight/:id"
            exact
            component={(props) => <AddFlight {...props} />}
          />
          <Route
            path="/editTourist/:id"
            exact
            component={(props) => <EditTourist {...props} />}
          />
          <Route
            path="/editFlight/:id"
            exact
            component={(props) => <EditFlight {...props} />}
          />
          <Route path="/tourist/:id" exact component={FullTourist} />
          <Route path="/flight/:id" exact component={Flight} />

          <Route path="/" exact component={SearchStartingDestination} />
          <Route render={() => <h1>Błąd 404 nie znaleziony strony</h1>} />
        </Switch>
      </Col>
      <Footer />
    </div>
  );
}

export default App;
