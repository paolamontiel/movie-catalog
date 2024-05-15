import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import AddMovie from './components/AddMovie';
import EditMovie from './components/EditMovie';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles.css';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<MovieList />} />
          <Route path="/movies/:id" element={<MovieDetail />} />
          <Route path="/add" element={<AddMovie />} />
          <Route path="/edit/:id" element={<EditMovie />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
