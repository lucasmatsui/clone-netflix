import React, { useEffect, useState }  from 'react';
import './App.css';
import Tmdb from './Tmdb';

import Header from './components/Header';
import FeaturedMovie from './components/FeaturedMovie';
import MovieRow from './components/MovieRow';

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAllMovies = async () => {
      setMovieList(await Tmdb.homeMovieList());
      setFeatured(await randomNetflixMovie());
    }

    const randomNetflixMovie = async () => {
      const list = await Tmdb.homeMovieList();
      const netflixMovies = list.filter(m => m.slug === 'originals');
      const randomChosen = Math.floor(Math.random() * (netflixMovies[0].items.results.length - 1));
      const chosen = netflixMovies[0].items.results[randomChosen];
      const allInfoChosen = await Tmdb.specificTv(chosen.id);

      return allInfoChosen;
    }

    loadAllMovies();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
        return true;
      }

      setBlackHeader(false);
      return false;
    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return (
    <div className="page">

      <Header black={blackHeader} />
      
      {featured &&
        <FeaturedMovie movie={featured} />
      }
       
      <section className="lists">
        {movieList.map((movies, key) => (
            <MovieRow key={key} title={movies.title} items={movies.items} />
        ))}
      </section>

      <footer>
        Feito com <span role="img" aria-label="coração">❤️</span> por Lucas Kenzo<br/>
        Direitos de imagem para Netflix<br/>
        Dados pegos do site Themoviedb.org
      </footer>
        
      {movieList.length <= 0 &&
        <div className="loading"></div>
      }

    </div>
  )
}