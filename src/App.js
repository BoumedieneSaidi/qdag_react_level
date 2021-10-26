import Navbar from './Navbar';
import Home from './static_pages/Home';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import Contact from './static_pages/Contact';
import PublicationList from './static_pages/PublicationList';
import Demo from './Demo';
function App() {
  return (
    <Router>
          <Navbar/>
          <Switch>
              <Route exact path="/">
                  <Home />
              </Route>
              <Route path="/demo">
                  <Demo />
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
