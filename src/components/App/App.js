import React from 'react';
import Header from '../elements/Header/Header';
import Home from '../Home/Home';
import FontAwesome from 'react-fontawesome';
import { Container, Row, Col } from 'reactstrap';
import NotFound from '../elements/NotFound/NotFound';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Movie from '../elements/Movie/Movie';
import {button} from 'reactstrap';
import '../App/App.css';


const App = () => {
  return (
    <BrowserRouter>
      <React.Fragment>
      <Row>
        <Col sm={12} lg={1} className="side-bar">
          <div className="home-icon"><FontAwesome className="faHome" name="bars" size="3x"/></div>
          <div className="star-icon"><FontAwesome className="faStar" name="star" size="3x"/></div>
        </Col>
        <Col sm={12} lg={11} className="content">
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/:movieId" component={Movie} exact />
            <Route component={NotFound} />
          </Switch>
        </Col>
        </Row>
      </React.Fragment>

    </BrowserRouter>
  )
}


/*const App = () => {
  return (
    <div>
      <Row>
        <Col sm={12} lg={1} className="side-bar">
          <div className="home-icon"><FontAwesome className="faHome" name="bars" size="3x"/></div>
          <div className="star-icon"><FontAwesome className="faStar" name="star" size="3x"/></div>
        </Col>
        <Col sm={12} lg={11} className="content">
          <Header />        
          <Home />
        </Col>
      </Row>
    </div>
  )
}*/

export default App;
