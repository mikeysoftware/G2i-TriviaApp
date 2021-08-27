import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Pages
import Home from "pages/Home";
import Quiz from "pages/Quiz";
import About from "pages/About";

function App(): JSX.Element {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/quiz">
          <Quiz />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
