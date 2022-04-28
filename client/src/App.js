import './App.css';
import { Route } from 'react-router-dom';
import NavBar from './store/components/NavBar'; 
import CreateGame from './store/components/CreateGame';
import LandingPage from './store/components/LandingPage';
import SearchBar from './store/components/SearchBar';
import Home from './store/components/Home';
import Videogame from './store/components/Videogame';


function App() {
  return (
 
    <div className="App">
      <Route exact path='/' component={LandingPage}/>
      <Route path='/home' component={NavBar}/>
      <Route path='/home' exact component={Home}/> 
      <Route path='/home' component={SearchBar}/>
      <Route path='/home/CreatGame' component={CreateGame}/>
      <Route path='/home' component={Videogame}/>
    </div>
 
  );
}

export default App;
