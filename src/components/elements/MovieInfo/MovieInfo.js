import React from 'react';
import { IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from '../../../config';
import MovieThumb from '../MovieThumb/MovieThumb';
import { Container, Row, Col } from 'reactstrap';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import FontAwesome from 'react-fontawesome';
import './MovieInfo.css';

const MovieInfo = (props) => {
    return (
        <div className="movieinfo">
            <div className="movieinfo-content">
                <Row>
                    <Col sm={12} lg={4}>
                        <div className="movieinfo-thumb">
                            <MovieThumb
                                image={props.movie.poster_path ? `${IMAGE_BASE_URL}${BACKDROP_SIZE}${props.movie.poster_path}` : ''}                       
                                clickable={false}
                            />
                        </div>
                    </Col>
                    <Col sm={12} lg={8}>
                    <div className="movieinfo-text">
                    <p className="info-title">{props.movie.title}</p>
                        <div className="info-sub1">
                            <div className="cir-progress">
                                <CircularProgressbar value={props.movie.vote_average * 10} maxValue={100} text={`${props.movie.vote_average * 10}%`} />
                                <p className="prog-desc">User Score</p>
                            </div>
                            <div className="info-trailer">
                                <FontAwesome className="faPlay" name="play" />
                                <p className="player-desc">Play Trailer</p>
                            </div>
                            <div className="info-side">
                                <table>
                                    <tbody>
                                    <tr>
                                        <td className="info-side-title">Genres</td>
                                        <td>&nbsp;&nbsp;&nbsp;</td>
                                        {props.movie.genres.map((element, i) => {
                                            return <td key={i} className="info-genre">{element.name}</td>
                                        })}
                                    </tr>
                                    <tr>
                                        <td className="info-side-title">Release Year</td>
                                        <td>&nbsp;&nbsp;&nbsp;</td>
                                        <td className="info-redate">{new Date(props.movie.release_date).getFullYear()}</td>
                                    </tr>
                                    <tr>
                                        <td className="info-side-title">Duration</td>
                                        <td>&nbsp;&nbsp;&nbsp;</td>
                                        <td className="info-duration"></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="info-sub2">
                            <p className="info-subtitle">Overview</p>
                            <p className="info-overview">{props.movie.overview}></p>
                            <p className="info-crew">Feature Crew</p>
                            {props.directors.map((element, i) => {
                                return <p key={i} className="director"><span className="info-dir">Director&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>{element.name}</p>
                            })}
                        </div>
                    </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default MovieInfo;