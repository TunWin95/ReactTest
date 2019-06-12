import React, { Component } from 'react';
import Header from '../elements/Header/Header';
import Home from '../Home/Home';
import FontAwesome from 'react-fontawesome';
import { Container, Row, Col } from 'reactstrap';
import NotFound from '../elements/NotFound/NotFound';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Movie from '../elements/Movie/Movie';
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE} from '../../config';
import {button} from 'reactstrap';
import EventEmitter from 'events';
import help from '../../help';
import '../App/App.css';

class App extends Component {

  constructor(props) {
    super(props)

  this.emitter = new EventEmitter();

  this.state = {
    genres: null,
    watchlist: []
  }

  this.emitter.on('addToWatchList', (movie) => {
    movie.genre_ids = movie.genres.map(g => g.id)

    this.setState({
      watchlist: [
        ...this.state.watchlist,
        movie
      ]
    })
    setTimeout(this.saveWatchlist.bind(this), 0)
  })

  this.emitter.on('removeFromWatchList', (movie) => {
    const newWatchlist = this.state.watchlist.filter(m => m.id !== movie.id)
    this.setState({
      watchlist: newWatchlist
    })
    setTimeout(this.saveWatchlist.bind(this), 0)
  })
}

saveWatchlist() {
  localStorage.setItem('watchlist', JSON.stringify(this.state.watchlist))
}

loadWatchlist() {
  const savedWatchlist = localStorage.getItem('watchlist')
  if (savedWatchlist) {
    this.setState({
      watchlist: JSON.parse(savedWatchlist)
    })
  }
}

componentDidMount() {
  this.loadWatchlist()

  fetch(`${API_URL}genre/movie/list?api_key=${API_KEY}`)
  .then(result => result.json())
  .then(result => {
    this.setState({
      genres: result.genres
    })
  })
}

  render(){
    return (
      <BrowserRouter>
        <React.Fragment>
        <Row>
          <Col sm={12} lg={1} className="side-bar">
            <Link to="/">
              <div className="home-icon">
                <FontAwesome className="faHome" name="bars" size="3x"/>
              </div>
            </Link>
            <Link to="../elements/WatchList/WatchList">
              <div className="star-icon">
                <FontAwesome className="faStar" name="star" size="3x"/>
              </div>
            </Link>
          </Col>
          <Col sm={12} lg={11} className="content">
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/:movieId" component={Movie} exact />
              {React.Children.map(this.props.children, child => React.cloneElement(child, {
                watchlist: this.state.watchlist,
                emitter: this.emitter
              }))}
              <Route component={NotFound} />
            </Switch>
          </Col>
          </Row>
        </React.Fragment>
  
      </BrowserRouter>
    )
  }
}

export default App;
