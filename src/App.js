import Navbar from './Navbar';
import Home from './Home';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import Contact from './Contact';
import PublicationList from './PublicationList';
function App() {
  return (
    <Router>
          <Navbar/>
          <Switch>
              <Route exact path="/">
                  <Home />
              </Route>
              <Route path="/contact">
                  <Contact />
              </Route>
              <Route path="/publications">
                  <PublicationList />
              </Route>
          </Switch>
    </Router>
  );
}

export default App;
