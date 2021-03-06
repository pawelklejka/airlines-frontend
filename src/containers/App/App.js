import React from "react";
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
import { Col } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import SearchStartingDestination from "../SearchStartingDestination/SearchStartingDestination";

function App() {
  return (
    <div className="App">
      <Header />
      <Col className="page-container">
        <Switch>
          <Route path="/addTourist" exact >
            <AddTourist />
          </Route>
          <Route path="/addFlight" exact>
            <AddFlight />
          </Route>
          <Route path="/allTourists" exact>
            <ManageTourists />
          </Route>
          <Route path="/allFlights" exact >
            <ManageFlights />
          </Route>
          <Route
            path="/addTourist/:id"
            exact
            render={(props) => <AddTourist {...props} />}
          />
          <Route
            path="/addFlight/:id"
            exact
            component={(props) => <AddFlight {...props} />}
          />
          <Route
            path="/editTourist/:id"
            exact
            render={(props) => <EditTourist {...props} />}
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
