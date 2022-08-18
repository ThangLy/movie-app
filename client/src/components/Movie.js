import React, { Component } from 'react'
// import { movies } from './getMovies';
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from "axios";

export default class Movies extends Component {
    constructor() {
        super();
        this.state = {
            vote: 1,
            currPage: 1,
            movies: [],
        }
    }

    async componentDidMount() {
        //Side effects 
        const res = await axios.get("http://localhost:8000/api/movies", {
            headers: {
                token:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZmJhZmRlNjRjNGM1OWVkZWU0NzY1YiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2MDczMDMxNCwiZXhwIjoxNjYxMTYyMzE0fQ.pBQMG-1tFSjOdMB_OdJ6I8QOsOEJyNF_3iuJCcl3GXc"
            },
        });
        let data = res.data
        // console.log(data);
        this.setState({
            movies: [...data]
        })
    }

    likeButton = (vote) => {
        alert('You clicked like!');
    }

    unlikeButton = () => {
        alert('You clicked unlike!');
    }
    render() {
        // let movie = movies.results
        return (
            <>
                {
                    this.state.movies.length === 0 ?
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div> :
                        <div>
                            <h3 className="text-center"><strong>Trending</strong></h3>
                            <div className="movies-list">
                                {
                                    this.state.movies.map((movieObj) => (
                                        <div className="card movies-card">
                                            <img src={`https://image.tmdb.org/t/p/original${movieObj.img}`} alt={movieObj.title} className="card-img-top movies-img" />

                                            <h5 className="card-title movies-title">{movieObj.title}</h5>
                                            <h5 className=" vote-count">{movieObj.vote_count} likes</h5>
                                            <div className="like-button" >
                                                <FontAwesomeIcon onClick={() => this.likeButton(movieObj)} style={{ paddingRight: '15px' }} icon={faHeart}
                                                />
                                            </div>
                                            <div className="dislike-button">
                                                <FontAwesomeIcon onClick={() => this.unlikeButton(movieObj)} icon={faHeartBroken} />
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="infinite-loader" style={{ display: 'flex', justifyContent: 'center' }}>
                                <h2>Load More Movies .........................</h2>
                            </div>
                        </div>
                }
            </>
        )
    }
}