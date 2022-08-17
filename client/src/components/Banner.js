import { movies } from './getMovies';

const Banner = () => {

    // let id = Math.floor(Math.random() * 11);
    let movie = movies.results[0]
    return (
        <>
            {movie == '' ?
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div> :
                <div className="card banner-card">
                    <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} className="card-img-top banner-img" />
                    <h1 className="card-title banner-title">{movie.original_title}</h1>
                    <p class="card-text banner-text">{movie.overview}</p>

                </div>
            }
        </>
    );
};

export default Banner;