import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import RootReducer from '../rootReducer';
import App from './components/App/App';
import NotFound from './components/App/NotFound';
import Home from './components/Home/Home';
import HomeWOC from './components/Home/HomeWOC';
import SignUpPage from './components/SignUp/SignUpPage';
import AuthorSearchPage from './components/AuthorSearch/AuthorSearchPage';
import AuthorResultsPage from './components/AuthorSearch/AuthorResultsPage';
import UploadAuthorsPage from './components/Upload/UploadAuthorsPage';
import LocateProfilesPage from './components/Locate/LocateProfilesPage';
import LookupSearchPage from './components/Lookup/LookupSearchPage';
import LookupResultsPage from './components/Lookup/LookupResultsPage';
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
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  compose(
    applyMiddleware(thunk)
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
          <Route exact path="/" component={HomeWOC} />
	  <Route exact path="/DRE" component={Home} />
          <Route path="/search" component={requireAuth(AuthorSearchPage)} />
          <Route path="/select" component={requireAuth(AuthorResultsPage)} />
          <Route path="/dash" component={requireAuth(DashboardPage)} />
          <Route path="/locate" component={requireAuth(LocateProfilesPage)} />
	  <Route path="/lookup" component={requireAuth(LookupSearchPage)} />
	  <Route path="/lookupresult" component={requireAuth(LookupResultsPage)} />
          <Route path="/upload" component={requireAuth(UploadAuthorsPage)} />
          <Route path="/error" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </App>
    </Router>
  </Provider>
), document.getElementById('app'));
