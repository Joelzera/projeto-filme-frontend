import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Search from './Search';
import Register from './Register'
import Favorites from './Favorites';
import PrivateRoute from './PrivateRoute';
import Profile from './Profile';


const Rotas = () => {
    return (
        <Router>
            <Routes>
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route exact path='/search' element={<PrivateRoute><Search /></PrivateRoute>} />
                <Route exact path='/login/register' element={<Register />} />
                <Route exact path='/favoritos' element={<PrivateRoute><Favorites /></PrivateRoute>} />
                <Route exact path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
            </Routes>
        </Router>
    )
}

export default Rotas