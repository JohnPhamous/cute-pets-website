import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import HomePage from './pages/home';
import PetDetailsPage from './pages/detail';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/pet/details/:id">
            <PetDetailsPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
