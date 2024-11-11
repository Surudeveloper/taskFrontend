import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './users/Login'
import ProductForm from './components/ProductForm/ProductForm'
import ProductList from './components/ProductList/ProductList'
import Dashboard from './Dashboard/Dashboard'
import LandingPage from './Landing/Landing'
import SignUp from './signup/signup'
import Header from './components/Header/Header'
import Footer from './components/Footer/footer'
// const token = localStorage.getItem('token');

const ProtectedRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    
    <Router>
      {isAuthenticated && <Header />} 
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<ProtectedRoute isAuthenticated={isAuthenticated}> <Dashboard /> </ProtectedRoute>} />
        <Route path="/product-form" element={<ProtectedRoute isAuthenticated={isAuthenticated}><ProductForm /></ProtectedRoute>} />
        <Route path="/product-list" element={<ProtectedRoute isAuthenticated={isAuthenticated}><ProductList /></ProtectedRoute>} />
      </Routes>
      {isAuthenticated && <Footer />} 
    </Router>
  );
}

export default App;
