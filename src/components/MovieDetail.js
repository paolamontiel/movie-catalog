import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      const docRef = doc(db, "movies", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setMovie(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return <div>Cargando...</div>;
  }

  const videoEmbedUrl = movie.video.replace("watch?v=", "embed/");

  return (
    <div className="movie-detail-container">

      <h1>{movie.title}</h1>
      <img src={movie.cover} alt={movie.title} className="movie-poster"/>
    <div className="movie-text">
     <p>Director: {movie.director}</p>
      <p>Año: {movie.year}</p>
      </div>
      <div className="buttons-container">
        <button onClick={() => navigate(`/edit/${id}`)} className="edit-button">Editar</button>
        <button onClick={() => navigate('/movies')} className="return-button">Regresar al catálogo</button>
      </div>
      <p className='trailer-text'>Trailer</p>
      {movie.video && <iframe src={videoEmbedUrl} title="Movie Trailer" className="movie-video" frameborder="0" allow="autoplay; encrypted-media" allowFullscreen></iframe>}

    </div>
  );
}

export default MovieDetail;
