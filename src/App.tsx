import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Redux - Global State
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "store/store";

// Pages
import Home from "pages/Home";
import Quiz from "pages/Quiz";
import Results from "pages/Results";
import PageWrapper from "pages/PageWrapper";

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <PageWrapper>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/quiz">
                <Quiz />
              </Route>
              <Route exact path="/results">
                <Results />
              </Route>
            </Switch>
          </PageWrapper>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
