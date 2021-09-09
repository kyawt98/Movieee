import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Home from './pages/Home';
import DetailMovie from './components/DetailMovie';
import Nav from './components/Nav';
import Footer from './components/Footer';
function App() {
  return (
    <div className="app"> 
      <Router forceRefresh='true'>
        <Nav />
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/detail/:movie_id" component={ DetailMovie } />
        </Switch>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
