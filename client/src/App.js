import './App.css';
import { Route } from 'react-router-dom';
import NavBar from './components/NavBar'; 
import CreateGame from './components/CreateGame';
import LandingPage from './components/LandingPage';
import SearchBar from './components/SearchBar';
import Home from './components/Home';
import Videogame from './components/Videogame';


function App() {
  return (
 
    <div className="App">
      <Route exact path='/' component={LandingPage}/>
      {/* <Route path='/Home' component={NavBar}/> */}
      <Route path='/Home' exact component={Home}/> 
      {/* <Route path='/Home' component={SearchBar}/> */}
      {/* <Route path='/Home/CreatGame' component={CreateGame}/>
      <Route path='/Home' component={Videogame}/> */}
    </div>
 
  );
}

export default App;
