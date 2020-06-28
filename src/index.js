import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import './index.scss';
import App from './App';
import PlotGenerationPage from './app/components/plotGenerationPage/PlotGenerationPage';
import Navigationbar from './app/components/navigationbar/Navigationbar';

const routing = (
  <Router>
    <div>
      <Navigationbar />
      <Route exact path="/" component={App} />
      <Route path="/dashboard" component={App} />
      <Route path="/generateplot" component={PlotGenerationPage} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));
