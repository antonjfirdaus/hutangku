import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './view/Home';
import Login from './view/Login';
import { PublicRoute, routes } from './routes';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicRoute component={Home} />} />
        <Route path="/login" element={<PublicRoute component={Login} />} />
        {routes.map((route, idx) => {
          return (route.element && (<Route key={idx} path={route.path} exact={route.exact} element={route.element} />))
        })}
      </Routes>
    </Router>
  );
}

export default App;
