import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './pages/home';
import PetDetailsPage from './pages/detail';
import Navigation from './components/navigation';
import SearchPage from './pages/search';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Switch>
          <Route path="/search">
            <SearchPage />
          </Route>
          <Route path="/:type/:id">
            <PetDetailsPage />
          </Route>
          <Route path="/:type?">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
