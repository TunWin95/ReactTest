import React, { Component } from 'react';
import SearchBar from '../elements/SearchBar/SearchBar';
import Grid from '../elements/Grid/Grid';
import MovieThum from '../elements/MovieThumb/MovieThumb';
import Button from '../elements/Button/Button';
import LoadMoreBtn from '../elements/LoadMoreBtn/LoadMoreBtn';
import Header from '../elements/Header/Header';
import { Link } from 'react-router-dom';
import './Home.css';
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE} from '../../config';

class Home extends Component {
    state = {
        movies: [],
        genre: [],
        loading: false,
        currentPage: 0,
        totalPages: 0,
        searchTerm: ''
    }

    componentDidMount() {
        this.setState({ loading: true });
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-USpage=1`;
        this.fetchItems(endpoint);
    }

    searchItems = (searchTerm) => {
        console.log(searchTerm);
        let endpoint = '';
        this.setState({
            movies: [],
            loading: true,
            searchTerm: searchTerm
        })

        if(searchTerm === '') {
            endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-USpage=1`;
        } else {
            endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}`;
        }
        this.fetchItems(endpoint);
    }

    loadMoreItems = () => {
        let endpoint = '';
        this.setState({ loading:true })

        if(this.state.searchTerm === '') {
            endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${this.state.currentPage + 1}`;
        } else {
            endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${this.state.searchTerm}&page=${this.state.currentPage + 1}`;
        }
        this.fetchItems(endpoint);
    }

    loadTopRated = () => {
        let endpoint = '';
        this.setState({ loading:true })
        endpoint = `${API_URL}movie/top_rated?api_key=${API_KEY}&language=en-USpage=1`;
        this.fetchItems(endpoint);
    }

    loadUpcoming = () => {
        let endpoint = '';
        this.setState({ loading:true })
        endpoint = `${API_URL}movie/upcoming?api_key=${API_KEY}&language=en-USpage=1`;
        this.fetchItems(endpoint);
    }

    loadNowPlaying = () => {
        let endpoint = '';
        this.setState({ loading:true })
        endpoint = `${API_URL}movie/now_playing?api_key=${API_KEY}&language=en-USpage=1`;
        this.fetchItems(endpoint);
    }


    fetchItems = (endpoint) => {
        fetch(endpoint)
        .then(result => result.json())
        .then(result => {
            this.setState({
                movies: [...this.state.movies, ...result.results],
                loading: false,
                currentPage: result.page,
                totalPages: result.total_pages
            }, () => {
                const endpoint= `${API_URL}genre/movie/list?api_key=${API_KEY}`;
                fetch(endpoint)
                .then(result => result.json())
                .then(result => {

                    this.setState({
                        genre: [...this.state.genre, ...result.genres]
                    })
                })
            })
        })
    }

    render() {
        return (
            <div className="home-tab">
                <div>
                    <Header/>
                </div>
                <div>
                    <SearchBar callback={this.searchItems} />
                </div>
                <div>
                <div className="button-group">
                    <Link to="/">
                        <button className="button popular">POPULAR</button>
                    </Link>
                    <button className="button rated" onClick={this.loadTopRated}>TOP RATED</button>
                    <button className="button upcoming" onClick={this.loadUpcoming}>UPCOMING</button>
                    <button className="button playing" onClick={this.loadNowPlaying}>NOW PLAYING</button>
                </div>                
                </div>                
                <div className="mov-grid">
                    <Grid
                        header={this.state.searchTerm ? 'Search Result' : ''}
                        loading={this.state.loading}
                    >
                        {this.state.movies.map( (element, i) => {
                            return (                               
                            <div>
                                <MovieThum
                                    key={i}
                                    clickable={true}
                                    image={element.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}` : './images/no_image.jpg'}
                                    movieId={element.id}
                                    movieName={element.original_title}
                                />
                                <p className="mov-title">{element.original_title}</p>
                                <p className="mov-date">Year: <span className="mov-sub">{new Date(element.release_date).getFullYear()}</span></p>
                                <p className="mov-desc">Genres:&nbsp;
                                {this.state.genre
                                    .filter(g => element.genre_ids.indexOf(g.id) !== -1)
                                    .map(g => g.name).join(', ')}
                                {/*<span className="mov-sub">{gen.name[j]}</span>*/}
                                </p>
                                <p className="mov-vote">{element.vote_average}</p>
                            </div>
                            )
                        })
                        }
                    </Grid>
                    {(this.state.currentPage <= this.state.totalPages && !this.state.loading) ?
                        <LoadMoreBtn text="Load More" onClick={this.loadMoreItems} /> : null
                    }
                </div>
            </div>
        )
    }
}

export default Home;