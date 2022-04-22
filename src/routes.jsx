import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import routes from './routelist';
import Header from './components/Navbar';

export default function Routes() {
  return (
    <BrowserRouter>
      <Header routes={routes} />
      <Switch>
        {routes.map(({ path, component }) => (
          <Route exact key={path} path={path} component={component} />
        ))}
      </Switch>
    </BrowserRouter>
  );
}
