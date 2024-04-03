import React from 'react'
import PrivateRoute from './PrivateRoute';

import Dashboard from '../view/Dashboard';
import { Piutang, PiutangDetail, PiutangCreate, PiutangTransaction } from '../view/piutang';
import { Hutang, HutangDetail, HutangCreate, HutangTransaction } from '../view/hutang'

const PathRoute = [
  { path: '/dashboard', name: 'Dashboard', element: <PrivateRoute component={Dashboard} />, exact : true},
  { path: '/piutang', name: 'Piutang', element: <PrivateRoute component={Piutang} />, exact : true},
  { path: '/piutang/create', name: 'Piutang create', element: <PrivateRoute component={PiutangCreate} />, exact : true},
  { path: '/piutang/detail/:id', name: 'Piutang Detail', element: <PrivateRoute component={PiutangDetail} />},
  { path: '/piutang/create/:id', name: 'Piutang Transaction', element: <PrivateRoute component={PiutangTransaction} />},

  { path: '/hutang', name: 'Hutang', element: <PrivateRoute component={Hutang} />, exact : true},
  { path: '/hutang/create', name: 'Hutang create', element: <PrivateRoute component={HutangCreate} />, exact : true},
  { path: '/hutang/detail/:id', name: 'Hutang Detail', element: <PrivateRoute component={HutangDetail} />},
  { path: '/hutang/create/:id', name: 'Hutang Transaction', element: <PrivateRoute component={HutangTransaction} />}
]

export default PathRoute