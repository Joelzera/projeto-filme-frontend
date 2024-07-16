import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './Login';
import Home from './Home';

const Rotas = () => {
    return(
        <Router>
            <Routes>
                <Route exact path='/login' element = {<Login/>}/>
                <Route exact path='/' element ={<Home/>}/>
            </Routes>
        </Router>
    )
}

export default Rotas