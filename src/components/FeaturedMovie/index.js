import React from 'react';
import './styles.css';

export default ({ movie }) => {

    let DateMovie = new Date(movie.first_air_date);
    let description = movie.overview.substring(0, 300)+'...';

    const genres = () => {
        let genres = [];
        for (let genre in movie.genres) {
            genres.push(movie.genres[genre].name);
        }

        return genres;
    }

    return (
        <section className="featured" style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
        }}>
            <div className="featured--vertical">
                <div className="featured--horizontal">
                    <div className="featured--name">{movie.original_name}</div>
                    <div className="featured--info">
                        <div className="featured--points">{movie.vote_average} pontos</div>
                        <div className="featured--year">{DateMovie.getFullYear()}</div>
                        <div className="featured--seasons">{movie.number_of_seasons} temporada{movie.number_of_seasons !== 1 ? 's' : ''}</div>
                    </div>
                    <div className="featured--description">{description}</div>
                    <div className="featured--buttons">
                        <a href={`/watch/${movie.id}`} className="featured--watchbutton">► Assistir</a>
                        <a href={`/list/add/${movie.id}`} className="featured--mylistbutton">+ Minha Lista</a>
                    </div>
                    <div className="featured--genres"><strong>Gêneros: </strong>{genres().join(', ')}</div>
                </div> 
            </div>
        </section>
    )
}