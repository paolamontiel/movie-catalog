import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

function EditMovie() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [year, setYear] = useState('');
  const [cover, setCover] = useState('');
  const [video, setVideo] = useState('');

  useEffect(() => {
    const fetchMovie = async () => {
      const docRef = doc(db, "movies", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTitle(docSnap.data().title);
        setDirector(docSnap.data().director);
        setYear(docSnap.data().year);
        setCover(docSnap.data().cover);
        setVideo(docSnap.data().video);
      }
    };

    fetchMovie();
  }, [id]);

  const updateMovie = async () => {
    const movieRef = doc(db, "movies", id);
    await updateDoc(movieRef, {
      title,
      director,
      year,
      cover,
      video
    });
    navigate("/movies");
  };

  return (
    <div className="form-container">
      <h2 className="h2-title">Editar Película</h2>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Título de la película" />
      <input type="text" value={director} onChange={e => setDirector(e.target.value)} placeholder="Director" />
      <input type="number" value={year} onChange={e => setYear(e.target.value)} placeholder="Año de estreno" />
      <input type="url" value={cover} onChange={e => setCover(e.target.value)} placeholder="URL del Cover" />
      <input type="url" value={video} onChange={e => setVideo(e.target.value)} placeholder="URL del Video (YouTube)" />
      <button className="form-button" onClick={updateMovie}>Actualizar Película</button>
    </div>
  );
}

export default EditMovie;
