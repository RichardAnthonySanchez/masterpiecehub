import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { fetchArtworkData } from './components/artworkAPI';
import './App.css';
import LoginForm from './components/LoginForm';
import HomePage from './components/HomePage';
import Authentication from './components/Authentication';
import MedievalPage from './components/MedievalPage';
import RenaissancePage from './components/RenaissancePage';
import BaroquePage from './components/BaroquePage';
import NeoclassicismPage from './components/NeoclassicismPage';
import RomanticismPage from './components/RomanticismPage';
import RealismPage from './components/RealismPage';
import ImpressionismPage from './components/ImpressionismPage';
import PostImpressionismPage from './components/PostImpressionismPage';
import SurrealismPage from './components/SurrealismPage';
import PopArtPage from './components/PopArtPage';
import ArtworkPage from './components/ArtworkPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.css';

//init state with no token
function App() {
  const [token, setToken] = useState('');
  const [artworkData, setArtworkData] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    const data = await fetchArtworkData();
    setArtworkData(data);
  };

  fetchData();
}, []);

  //get token after authorized login
  const handleLogin = (token) => {
    setToken(token);
  };

  //render html on homepage
  return (
    <Router>
      <Routes>
        {/* Catch-all route */}
        <Route
          path="/*"
          element={<div>404 - Page Not Found</div>}
        />

        {/* Other routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm handleLogin={handleLogin} />} />
        <Route exact path="/medieval" element={<MedievalPage />} />
        <Route exact path="/renaissance" element={<RenaissancePage />} />
        <Route exact path="/baroque" element={<BaroquePage />} />
        <Route exact path="/neoclassicism" element={<NeoclassicismPage />} />
        <Route exact path="/romanticism" element={<RomanticismPage />} />
        <Route exact path="/realism" element={<RealismPage />} />
        <Route exact path="/impressionism" element={<ImpressionismPage />} />
        <Route exact path="/post-impressionism" element={<PostImpressionismPage />} />
        <Route exact path="/surrealism" element={<SurrealismPage />} />
        <Route exact path="/popart" element={<PopArtPage />} />
        <Route path="/artwork/:id" element={<ArtworkPage />} />

        <Route
          path="/protected"
          element={<Authentication token={token} />} // Wrap Authentication component in a Route
        />
      </Routes>
    </Router>
  );
}

export default App;
