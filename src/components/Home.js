import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, getDocs, limit } from 'firebase/firestore';
import { db } from '../firebaseConfig';

function Home() {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            const moviesRef = collection(db, "movies");
            const q = query(moviesRef, limit(6)); 
            const querySnapshot = await getDocs(q);
            const moviesData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setMovies(moviesData);
        };
        fetchMovies();
    }, []);

    return (
        <div className="container">
            <h1>Bienvenido al Catálogo de Películas</h1>
            <p>En esta página guardamos una selección de tus películas favoritas para tener a la mano en esas ocasiones que no sabes qué película ver en casa.</p>
            <div className="movie-grid">
                {movies.map(movie => (
                    <div key={movie.id} className="movie-card" onClick={() => navigate(`/movies/${movie.id}`)}>
                        <img src={movie.cover} alt={movie.title} style={{ width: '100%', height: 'auto' }} />
                        <h3>{movie.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
