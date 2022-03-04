import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
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
import VulnerabilitySearchPage from './components/Vulnerability/VulnerabilitySearchPage';
import MappingPage from './components/Mapping/MappingPage';
import MapResultsPage from './components/Mapping/MapResultsPage';
import DashboardPage from './components/Dashboard/DashboardPage';
import ClickhousePage from './components/Clickhouse/ClickhousePage';
import ClickhouseResultsPage from './components/Clickhouse/ClickhouseResultsPage';
import SamplingRestrictionPage from './components/Sampling/SamplingRestrictionPage';
import FastGraph from './components/FastGraph/FastGraphPage';
import FastGraphResults from './components/FastGraph/FastGraphResultsPage';
import rootReducer from '../rootReducer';
import requireAuth from '../utils/requireAuth';
import jwt from 'jsonwebtoken';
import setAuthToken from '../utils/setAuthToken';
import { setCurrentUser } from '../actions/signUpActions';
import {
  BrowserRouter as Router,
  Route,
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
          <Route path="/search" component={AuthorSearchPage} />
          <Route path="/clickhouse" component={ClickhousePage} />
          <Route path="/clickhouseresult" component={ClickhouseResultsPage} />
          <Route path="/select" component={requireAuth(AuthorResultsPage)} />
          <Route path="/dash" component={DashboardPage} />
          <Route path="/locate" component={LocateProfilesPage} />
          <Route path="/lookup" component={LookupSearchPage} />
          <Route path="/lookupresult" component={LookupResultsPage} />
          <Route path="/vulnerability" component={VulnerabilitySearchPage} />
          <Route path="/mapping" component={MappingPage} />
          <Route path="/mapresult" component={MapResultsPage} />
          <Route path="/sampling" component={SamplingRestrictionPage} />
          <Route path="/fastgraph" component={requireAuth(FastGraph)} />
          <Route path="/fastgraphresults" component={requireAuth(FastGraphResults)} />
          <Route path="/upload" component={requireAuth(UploadAuthorsPage)} />
          <Route path="/error" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </App>
    </Router>
  </Provider>
), document.getElementById('app'));
