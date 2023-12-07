import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage';
import Card from './ui/Card';
import HeaderApplier from './utils/HeaderApplier';
import { AuthProvider } from './context/AuthContext';
import './App.css'
import FilmPage from './pages/FilmPage';
import WatchListPage from './pages/WatchListPage';
import PrivateRoutes from './utils/PrivateRoutes';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route element={<Card />}>
            <Route element={<HeaderApplier />}>
              {/* Auth routes */}
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route element={<PrivateRoutes />}>
                {/* Routes for authenticated users */}
                <Route exact path='/' element={<HomePage />} />
                <Route path='/film/:filmID' element={<FilmPage />} />
                <Route path='/watchlist' element={<WatchListPage />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router >
  );
}

export default App;
