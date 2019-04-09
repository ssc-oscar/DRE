import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import RootReducer from '../rootReducer';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import App from './components/App/App';
import NotFound from './components/App/NotFound';
import Home from './components/Home/Home';
import SignUpPage from './components/SignUp/SignUpPage';
import AuthorSearchPage from './components/AuthorSearch/AuthorSearchPage';
import AuthorResultsPage from './components/AuthorSearch/AuthorResultsPage';
import './styles/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import rootReducer from '../rootReducer';
import jwt from 'jsonwebtoken';
import setAuthToken from '../utils/setAuthToken';
import { setCurrentUser } from '../actions/signUpActions';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
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
          <Route path="/signup" component={SignUpPage} />
          <Route path="/search" component={AuthorSearchPage} />
          <Route path="/select" component={AuthorResultsPage} />
          <Route component={NotFound} />
        </Switch>
      </App>
    </Router>
  </Provider>
), document.getElementById('app'));
