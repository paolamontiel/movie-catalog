import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

function MovieList() {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            const querySnapshot = await getDocs(collection(db, "movies"));
            setMovies(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };
        fetchMovies();
    }, []);

    const deleteMovie = async (id) => {
        if (window.confirm("¿Estás seguro que deseas eliminar este elemento?")) {
            await deleteDoc(doc(db, "movies", id));
            setMovies(movies.filter(movie => movie.id !== id));
        }
    };

    const goToMovieDetails = (id) => {
        navigate(`/movies/${id}`);
    };

    return (
        <div className="table-responsive">
            <table>
                <thead>
                    <tr>
                        <th>Poster</th>
                        <th>Título</th>
                        <th>Director</th>
                        <th>Año</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map(movie => (
                        <tr key={movie.id}>
                            <td data-label="Poster" onClick={() => goToMovieDetails(movie.id)} style={{ cursor: 'pointer' }}>
                                <img src={movie.cover} alt="Cover" style={{ width: '100px', height: 'auto' }} />
                            </td>
                            <td data-label="Título" onClick={() => goToMovieDetails(movie.id)} style={{ cursor: 'pointer' }} className='movie-name'>
                                {movie.title}
                            </td>
                            <td data-label="Director">{movie.director}</td>
                            <td data-label="Año">{movie.year}</td>
                            <td data-label="Acciones">
                                <button onClick={() => navigate(`/edit/${movie.id}`)} className="action-button">Editar</button>
                                <button onClick={() => deleteMovie(movie.id)} className="delete-button">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MovieList;
