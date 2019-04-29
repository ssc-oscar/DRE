import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import RootReducer from '../rootReducer';
import App from './components/App/App';
import NotFound from './components/App/NotFound';
import Home from './components/Home/Home';
import SignUpPage from './components/SignUp/SignUpPage';
import AuthorSearchPage from './components/AuthorSearch/AuthorSearchPage';
import AuthorResultsPage from './components/AuthorSearch/AuthorResultsPage';
import DashboardPage from './components/Dashboard/DashboardPage';
import rootReducer from '../rootReducer';
import requireAuth from '../utils/requireAuth';
import jwt from 'jsonwebtoken';
import setAuthToken from '../utils/setAuthToken';
import { setCurrentUser } from '../actions/signUpActions';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import "../public/assets/vendor/nucleo/css/nucleo.css";
import "../public/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "../public/assets/css/argon-dashboard-react.css";

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

const token = localStorage.jwtToken;
if (token) {
  setAuthToken(token);
  store.dispatch(setCurrentUser(jwt.decode(token)));
}

render((
  <Provider store={store}>
    <Router>
      <App>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/search" component={requireAuth(AuthorSearchPage)} />
          <Route path="/select" component={requireAuth(AuthorResultsPage)} />
          <Route path="/dash" component={requireAuth(DashboardPage)} />
          <Route path="/error" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </App>
    </Router>
  </Provider>
), document.getElementById('app'));
