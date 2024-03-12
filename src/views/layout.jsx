import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import routes from '../routes'
import headerImage from '../assets/images/header-image.png'


const Layout = () => {
  return (
    <>
      <div className="content-wrapper">
        <div className="content-header">
          <a href="/">
            <h1 className="card-title text-primary">Hutangku! 🎉</h1>
            <p className="mb-0">Catatan peminjaman.</p>
          </a>
        </div>

        <img className="header-img" src={headerImage} alt='' height="150"/>

        <div className="content-body">
          <Routes>
            {routes.map((route, idx) => {
              return (
                route.element && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    element={route.element}
                  />
                )
              )
            })}
            <Route path="/" element={<Navigate to="/home" replace />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default React.memo(Layout)