import React from "react";
import "whatwg-fetch";
import {Link, IndexLink} from "react-router";
import Movie from "./movie.jsx";

import SearchForm from "./search-form.jsx";

import {store, addDVD, addBluRay} from "./shared-state.js";

const APIKEY = "ca04a59f3100df556c89da712ff869f0";
const BASE_URL = "https://api.themoviedb.org/3";
const DISCOVER_API = BASE_URL + "/discover/movie?api_key=" + APIKEY;
const GENRES_API = BASE_URL + "/genre/movie/list?api_key=" + APIKEY;
const SEARCH_API = BASE_URL + "/search/movie?api_key=" + APIKEY + "&language=en-US&query=";

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {lastID: 0};
    }

    getMovies() {
        fetch(DISCOVER_API)
            .then(response => response.json())
            .then(data => this.setState({
                    movies: data,
                }))
    }

    componentDidMount() {
        this.getMovies();
        fetch(GENRES_API)
            .then(response => response.json())
            .then(data => this.setState({genreList: data}))
    }

    handleChange(page=1, query, genreId) {
        var currInput;
        if(query) {
            currInput = SEARCH_API + query + "&page=" + page;
        } else if (genreId) {
            currInput = DISCOVER_API + "&with_genres=" + genreId + "&page=" + page;
        } else {
            currInput = DISCOVER_API + "&page=" + page;
        }
        fetch(currInput)
            .then(response => response.json())
            .then(data => this.setState({
                movies: data,
                query: query,
                genreId: genreId
            }));
        }


    render() {
        var totalPages;
        var movies;
        var genres;
        var currentPage;
        var currentQuery;
        var currentGenre;
        var subtPage;
        var addPage;
        
        
        if (this.state.movies) {
            currentPage = this.state.movies.page;
            currentQuery = this.state.movies.query;
            subtPage = this.state.movies.page-1;
            addPage = this.state.movies.page+1;
            totalPages = this.state.movies.total_pages;

            movies = this.state.movies.results.map(m => 
            <Movie key={m.id}  movie={m}>
                <button onClick={() => store.dispatch(addDVD(m, m.id))}>
                    Add DVD
                </button>
                
                <button onClick={() => store.dispatch(addBluRay(m, m.id))}>
                    Add Blu-Ray
                </button>
                
            </Movie>
            );


            genres = this.state.genreList.genres.map(g => <button key={g.id} onClick={() => this.handleChange(1, currentQuery, g.id)}>{g.name}</button>);
        }

        return (
            <div className="container">
                <nav className="genre-nav">
                    <ul>
                        {genres}
                    </ul>
                </nav>


                <div>
                <SearchForm placeholder="Search Movies..."
                    onSearch={query => this.handleChange(1, query)}/>
                    
                </div>

                <p>
                <button onClick={() => this.handleChange(subtPage, null, this.state.genreId)} disabled={(currentPage) == (totalPages)}>Prev page</button>

                <button onClick={() => this.handleChange(addPage, null, this.state.genreId)} disabled={(currentPage) == (totalPages)}>Next page</button>
               </p>

               {currentPage} of {totalPages} pages
                

                <div className="movie-list">{movies}</div>
            </div>
        );
    }
}