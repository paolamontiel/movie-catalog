import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

function AddMovie() {
  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [year, setYear] = useState('');
  const [cover, setCover] = useState('');
  const [video, setVideo] = useState('');
  const navigate = useNavigate();

  const addMovie = async () => {
    await addDoc(collection(db, "movies"), {
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
      <h2 className="h2-title">Añadir Película</h2>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Título de la película" />
      <input type="text" value={director} onChange={e => setDirector(e.target.value)} placeholder="Director" />
      <input type="number" value={year} onChange={e => setYear(e.target.value)} placeholder="Año de estreno" />
      <input type="url" value={cover} onChange={e => setCover(e.target.value)} placeholder="URL del Cover" />
      <input type="url" value={video} onChange={e => setVideo(e.target.value)} placeholder="URL del Video (YouTube)" />
      <button className="form-button" onClick={addMovie}>Guardar Película</button>
    </div>
  );
}

export default AddMovie;
