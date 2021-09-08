import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Home from './pages/Home';
import DetailMovie from './components/DetailMovie';
function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/detail/:movie_id" component={ DetailMovie } />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
