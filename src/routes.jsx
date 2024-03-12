import React from 'react'

import Home from './views/home';
import BucketList from './views/bucketList';
import BucketDetail from './views/bucketDetail';
import BucketCreation from './views/bucketCreation';
import BucketTransaction from './views/bucketTransaction';

const routes = [
  { path: '/home', name: 'Home', element: <Home />, exact : true},

  { path: '/bucket/hutang', name: 'Hutang', element: <BucketList props='hutang'/>, exact : true},
  { path: '/bucket/hutang/create', name: 'Hutang create', element: <BucketCreation props='hutang'/>, exact : true},
  { path: '/bucket/hutang/detail/:bucket_id', name: 'Hutang detail', element: <BucketDetail props='hutang' />},
  { path: '/bucket/hutang/add/:bucket_id', name: 'Hutang transaction', element: <BucketTransaction props='hutang'/>, exact : true},

  { path: '/bucket/piutang', name: 'Piutang', element: <BucketList props='piutang'/>, exact : true},
  { path: '/bucket/piutang/create', name: 'Piutang create', element: <BucketCreation props='piutang'/>, exact : true},
  { path: '/bucket/piutang/detail/:bucket_id', name: 'Piutang detail', element: <BucketDetail props='piutang' />},
  { path: '/bucket/piutang/add/:bucket_id', name: 'Piutang transaction', element: <BucketTransaction props='piutang'/>, exact : true}
  
]

export default routes
