const API_KEY = '';
const API_BASE = 'https://api.themoviedb.org/3';

const request = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`);
    const json = await req.json();

    return json;
}

export default  {
    homeMovieList: async () => {
        return [
            {
                slug: 'originals',
                title: 'Originais do Netflix',
                items: await request(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'trending',
                title: 'Recomendados para Você',
                items: await request(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'toprated',
                title: 'Em Alta',
                items: await request(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'action',
                title: 'Ação',
                items: await request(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'comedy',
                title: 'Comédia',
                items: await request(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'horror',
                title: 'Terror',
                items: await request(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: await request(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'documentary',
                title: 'Documentários',
                items: await request(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`)
            },
        ];
    },
    specificMovie: async (id) => {
        if (!id) {
            return {};
        }

        let movie = await request(`/movie/${id}?language=pt-BR&api_key=${API_KEY}`);
        
        return movie;
    },
    specificTv: async (id) => {
        if (!id) {
            return {};
        }

        let tv = await request(`/tv/${id}?language=pt-BR&api_key=${API_KEY}`);

        return tv;
    }
}