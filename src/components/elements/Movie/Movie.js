import React, { Component } from 'react';
import MovieInfo from '../MovieInfo/MovieInfo';
import Grid from '../Grid/Grid';
import Actor from '../Actor/Actor';
import { API_URL, API_KEY } from '../../../config';
import { Container, Row, Col } from 'reactstrap';
import { Button } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Movie.css';

class Movie extends Component {

    static propTypes = {
        watchlist: PropTypes.array,
        emitter: PropTypes.object
    }

    constructor(props){
        super(props)
    }

    state = {
        movie: null,
        actors: null,
        directors: [],
        loading: false
    }

    componentDidMount() {
        console.log(this.props.movieId);
        this.setState({ loading: true })
        const endpoint = `${API_URL}movie/${this.props.match.params.movieId}?api_key=${API_KEY}&language=en-US`;
        this.fetchItems(endpoint);
    }

    fetchItems = (endpoint) => {
        fetch(endpoint)
        .then(result => result.json())
        .then(result => {
            //console.log(result);
            if(result.status_code) {
                this.setState({ loading: false });
            } else {
                this.setState({ movie: result }, () => {
                    const endpoint= `${API_URL}movie/${this.props.match.params.movieId}/credits?api_key=${API_KEY}`;
                    fetch(endpoint)
                    .then(result => result.json())
                    .then(result => {
                        const directors = result.crew.filter( (member) => member.job === "Director");

                        this.setState({
                            actors: result.cast,
                            directors,
                            loading: false
                        })
                    })
                })
            }
        })
        .catch(error => console.error('Error:', error));
    }

    render() {
        console.log(this.props.watchlist);
        const m = this.state.movie;
        const isOnWatchlist = false;
        //const isOnWatchlist = this.props.watchlist.find((wlMovie) => wlMovie.id === m.id)

        return (
            <div className="movies">
                <div className="back-home"> 
                    <Link to="/">                                   
                        <p><span><FontAwesome className="back-arr" name="arrow-circle-o-left" /></span>&nbsp;Back to the list</p>               
                    </Link>
                </div>
                <Row>
                <Col sm={12} lg={12}>
               {this.state.movie ?
                <div>
                    <MovieInfo movie={this.state.movie} directors={this.state.directors}/>
                </div>
                : null }
                </Col>
                </Row>
                <Row>
                <Col sm={12} lg={4}>
                    {/*<div className="add-watchlist">
                        <Button type="button"><span><FontAwesome className="faStar-watchlist" name="star" /></span>&nbsp;&nbsp;Add Watchlist</Button>
                    </div>*/}
                    {!isOnWatchlist && <Button type="button" onClick={() => {
                        this.props.emitter.emit('addToWatchList', m)
                    }}>
                    <span><FontAwesome className="faStar-watchlist" name="star" /></span>&nbsp;&nbsp;Add to Watchlist
                    </Button>}
                    {isOnWatchlist && <Button type="button" onClick={() => {
                    this.props.emitter.emit('removeFromWatchList', m)
                    }}>
                    Remove from Watchlist
                    </Button> }
                </Col>
                <Col sm={12} lg={8} className="star-col">
                {this.state.actors ? 
                    <div className="star-grid">                         
                        {this.state.actors.slice(0, 5).map( (element, i) => {
                            return <Actor key={i} actor={element} />
                        })}
                    </div>
                    : null }
                    {!this.state.actors && !this.state.loading ? <h1>No Movie Found!</h1> : null }
                </Col>
                </Row>
            </div>
        )
    }
}

export default Movie;