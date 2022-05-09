import './App.css';
import { Route } from 'react-router-dom';
import CreateGame from './components/CreateGame';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Videogame from './components/Videogame';


function App() {
  return (
 
    <div className="App">
      <Route exact path='/' component={LandingPage}/>
      <Route path='/home' exact component={Home}/> 
      <Route path='/Home/CreateGame' component={CreateGame}/>
      <Route path="/home/videogame/:id" component={Videogame}/>
    </div>
 
  );
}

export default App;
